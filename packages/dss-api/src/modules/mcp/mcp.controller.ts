import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { McpService } from './mcp.service.js';

/**
 * MCP channel adapter HTTP endpoints.
 *
 * Provides SSE-based MCP transport:
 * - GET  /mcp/sse     — establishes SSE connection, returns message endpoint URL
 * - POST /mcp/message — receives MCP JSON-RPC messages from clients
 *
 * Implements ChannelPort (ADR-0001) as an HTTP interface for MCP clients
 * such as Claude Code.
 */
@Controller('mcp')
export class McpController {
  constructor(private readonly mcpService: McpService) {}

  /**
   * SSE endpoint — establishes a Server-Sent Events connection.
   * The MCP client connects here first and receives the message endpoint URL.
   */
  @Get('sse')
  async sse(@Req() req: Request, @Res() res: Response): Promise<void> {
    // Build the absolute message endpoint URL for this server
    const protocol = req.protocol;
    const host = req.get('host') ?? 'localhost:3000';
    const messageEndpoint = `${protocol}://${host}/mcp/message`;

    await this.mcpService.handleSseConnection(res, messageEndpoint);
  }

  /**
   * Message endpoint — receives MCP JSON-RPC messages via POST.
   * Routes messages to the correct SSE session by sessionId query parameter.
   *
   * Express body-parser consumes the request stream, so the parsed body
   * is forwarded explicitly to the SSE transport.
   */
  @Post('message')
  async message(
    @Query('sessionId') sessionId: string,
    @Body() body: unknown,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    await this.mcpService.handleMessage(sessionId, req, res, body);
  }
}
