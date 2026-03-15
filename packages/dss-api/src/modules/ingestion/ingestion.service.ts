import { Injectable, Logger } from '@nestjs/common';
import { MDocument } from '@mastra/rag';
import { embedMany } from 'ai';
import { ModelRouterEmbeddingModel } from '@mastra/core/llm';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { VECTOR_CONFIG } from '../../mastra/vector/config.js';
import { MastraService } from '../mastra/mastra.service.js';
import type { IngestionResultDto } from './dto/ingestion-result.dto.js';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);
  private indexEnsured = false;

  constructor(private readonly mastraService: MastraService) {}

  async ingestDirectory(dirPath: string): Promise<IngestionResultDto> {
    const vectorStore = this.mastraService.getVector('dssVectorStore');
    const files = await this.collectMarkdownFiles(dirPath);
    let chunksCreated = 0;
    const errors: string[] = [];

    await this.ensureIndex(vectorStore);

    const model = new ModelRouterEmbeddingModel(VECTOR_CONFIG.embeddingModel);

    for (const filePath of files) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const doc = MDocument.fromMarkdown(content);
        await doc.chunk({
          strategy: 'recursive',
          maxSize: 512,
          overlap: 50,
        });
        const chunks = doc.getDocs();

        if (chunks.length === 0) continue;

        const { embeddings } = await embedMany({
          model,
          values: chunks.map((c) => c.text),
        });

        const relativePath = path.relative(process.cwd(), filePath);

        await vectorStore.upsert({
          indexName: VECTOR_CONFIG.indexName,
          vectors: embeddings,
          metadata: chunks.map((c, i) => ({
            text: c.text,
            source: relativePath,
            chunkIndex: i,
          })),
        });

        chunksCreated += chunks.length;
        this.logger.log(
          `Ingested ${relativePath}: ${chunks.length} chunks`,
        );
      } catch (error) {
        const msg = `Failed to ingest ${filePath}: ${error instanceof Error ? error.message : String(error)}`;
        this.logger.error(msg);
        errors.push(msg);
      }
    }

    return {
      filesProcessed: files.length,
      chunksCreated,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  private async ensureIndex(
    vectorStore: ReturnType<MastraService['getVector']>,
  ): Promise<void> {
    if (this.indexEnsured) return;
    await vectorStore.createIndex({
      indexName: VECTOR_CONFIG.indexName,
      dimension: VECTOR_CONFIG.dimension,
      metric: 'cosine',
    });
    this.indexEnsured = true;
  }

  private async collectMarkdownFiles(dirPath: string): Promise<string[]> {
    const results: string[] = [];
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', 'dist', '.git'].includes(entry.name)) continue;
        results.push(...(await this.collectMarkdownFiles(fullPath)));
      } else if (entry.name.endsWith('.md')) {
        results.push(fullPath);
      }
    }

    return results;
  }
}
