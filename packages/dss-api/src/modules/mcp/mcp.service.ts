import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { z } from 'zod';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { MastraService } from '../mastra/mastra.service.js';

/**
 * MCP Server service — channel adapter exposing DSS knowledge retrieval
 * tools via Model Context Protocol.
 *
 * Implements ChannelPort as defined in ADR-0001.
 * Uses SSEServerTransport for HTTP-based MCP communication.
 */
@Injectable()
export class McpService implements OnModuleInit {
  private readonly logger = new Logger(McpService.name);
  private mcpServer!: McpServer;
  private readonly transports = new Map<string, SSEServerTransport>();
  private readonly adrsPath: string;

  constructor(private readonly mastraService: MastraService) {
    this.adrsPath =
      process.env['ADR_DOCS_PATH'] ??
      path.resolve(process.cwd(), '../../docs/architecture/adrs');
  }

  async onModuleInit(): Promise<void> {
    this.mcpServer = new McpServer(
      { name: 'dss-mcp-server', version: '0.1.0' },
      { capabilities: { tools: {} } },
    );

    this.registerTools();
    this.logger.log('MCP Server initialized with tools registered');
  }

  /**
   * Handles SSE connection establishment (GET /mcp/sse).
   * Creates a new SSEServerTransport per client session.
   */
  async handleSseConnection(
    res: ServerResponse,
    messageEndpoint: string,
  ): Promise<void> {
    const transport = new SSEServerTransport(messageEndpoint, res);
    const sessionId = transport.sessionId;
    this.transports.set(sessionId, transport);

    this.logger.log(`MCP SSE session started: ${sessionId}`);

    transport.onclose = () => {
      this.transports.delete(sessionId);
      this.logger.log(`MCP SSE session closed: ${sessionId}`);
    };

    await this.mcpServer.connect(transport);
  }

  /**
   * Handles incoming MCP messages (POST /mcp/message).
   * Routes messages to the correct SSEServerTransport by sessionId.
   *
   * parsedBody is required because Express body-parser middleware consumes
   * the request stream before it reaches the MCP transport.
   */
  async handleMessage(
    sessionId: string,
    req: IncomingMessage,
    res: ServerResponse,
    parsedBody?: unknown,
  ): Promise<void> {
    const transport = this.transports.get(sessionId);
    if (!transport) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Session not found' }));
      return;
    }

    await transport.handlePostMessage(req, res, parsedBody);
  }

  /**
   * Registers MCP tools that expose DSS knowledge retrieval capabilities.
   */
  private registerTools(): void {
    this.registerQueryKnowledgeTool();
    this.registerListAdrsTool();
    this.registerGetAdrTool();
  }

  private registerQueryKnowledgeTool(): void {
    this.mcpServer.tool(
      'query-knowledge',
      'Semantic search in DSS architecture knowledge base. Returns relevant architecture documentation chunks.',
      { query: z.string().describe('Search query for the knowledge base') },
      async ({ query }) => {
        try {
          const saAgent = this.mastraService.getAgent('sa-agent');
          const result = await saAgent.generate(query);

          return {
            content: [{ type: 'text' as const, text: result.text }],
          };
        } catch (error) {
          const message =
            error instanceof Error ? error.message : String(error);
          this.logger.error(`query-knowledge failed: ${message}`);
          return {
            content: [
              { type: 'text' as const, text: `Error: ${message}` },
            ],
            isError: true,
          };
        }
      },
    );
  }

  private registerListAdrsTool(): void {
    this.mcpServer.tool(
      'list-adrs',
      'List available Architecture Decision Records (ADRs) with their titles and statuses.',
      async () => {
        try {
          const adrs = await this.listAdrFiles();
          const text = adrs.length > 0 ? adrs.join('\n') : 'No ADRs found.';

          return {
            content: [{ type: 'text' as const, text }],
          };
        } catch (error) {
          const message =
            error instanceof Error ? error.message : String(error);
          this.logger.error(`list-adrs failed: ${message}`);
          return {
            content: [
              { type: 'text' as const, text: `Error: ${message}` },
            ],
            isError: true,
          };
        }
      },
    );
  }

  private registerGetAdrTool(): void {
    this.mcpServer.tool(
      'get-adr',
      'Get the full content of a specific Architecture Decision Record by its ID (e.g. "0001").',
      {
        id: z
          .string()
          .describe('ADR ID, e.g. "0001" or "0001-container-decomposition"'),
      },
      async ({ id }) => {
        try {
          const content = await this.readAdr(id);
          return {
            content: [{ type: 'text' as const, text: content }],
          };
        } catch (error) {
          const message =
            error instanceof Error ? error.message : String(error);
          this.logger.error(`get-adr failed for id=${id}: ${message}`);
          return {
            content: [
              { type: 'text' as const, text: `Error: ${message}` },
            ],
            isError: true,
          };
        }
      },
    );
  }

  /**
   * Lists ADR files from the docs/architecture/adrs directory.
   * Returns formatted list with ADR ID, title, and status.
   */
  private async listAdrFiles(): Promise<string[]> {
    let entries: string[];
    try {
      entries = await fs.readdir(this.adrsPath);
    } catch {
      return [];
    }

    const adrFiles = entries
      .filter((f) => f.endsWith('.md') && f !== '0000-template.md')
      .sort();

    const results: string[] = [];

    for (const file of adrFiles) {
      const filePath = path.join(this.adrsPath, file);
      const content = await fs.readFile(filePath, 'utf-8');

      const titleMatch = content.match(/^#\s+(.+)$/m);
      const statusMatch = content.match(/^##\s+Status\s*\n+(.+)$/m);

      const id = file.replace('.md', '');
      const title = titleMatch?.[1] ?? id;
      const status = statusMatch?.[1]?.trim() ?? 'Unknown';

      results.push(`- ${id}: ${title} [${status}]`);
    }

    return results;
  }

  /**
   * Reads a specific ADR file by ID (prefix match).
   */
  private async readAdr(id: string): Promise<string> {
    let entries: string[];
    try {
      entries = await fs.readdir(this.adrsPath);
    } catch {
      throw new Error(`ADR directory not accessible: ${this.adrsPath}`);
    }

    const normalizedId = id.replace(/^ADR-/i, '');
    const match = entries.find(
      (f) => f.startsWith(normalizedId) && f.endsWith('.md'),
    );

    if (!match) {
      throw new Error(
        `ADR not found: ${id}. Use list-adrs to see available ADRs.`,
      );
    }

    return fs.readFile(path.join(this.adrsPath, match), 'utf-8');
  }
}
