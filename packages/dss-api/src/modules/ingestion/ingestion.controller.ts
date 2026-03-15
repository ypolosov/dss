import { Controller, Post } from '@nestjs/common';
import * as path from 'node:path';
import { IngestionService } from './ingestion.service.js';
import type { IngestionResultDto } from './dto/ingestion-result.dto.js';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('docs')
  async ingestDocs(): Promise<IngestionResultDto> {
    const docsPath = path.resolve(process.cwd(), '../../docs');
    return this.ingestionService.ingestDirectory(docsPath);
  }
}
