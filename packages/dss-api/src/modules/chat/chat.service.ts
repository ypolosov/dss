import { Injectable } from '@nestjs/common';
import { MastraService } from '../mastra/mastra.service.js';
import type { ChatRequestDto } from './dto/chat-request.dto.js';
import type { ChatResponseDto } from './dto/chat-response.dto.js';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ChatService {
  constructor(private readonly mastraService: MastraService) {}

  async chatViaNetwork(dto: ChatRequestDto): Promise<ChatResponseDto> {
    const routingAgent = this.mastraService.getAgent('routing-agent');
    const threadId = dto.threadId ?? randomUUID();
    const resourceId = dto.resourceId ?? 'anonymous';

    const stream = await routingAgent.network(dto.message, {
      memory: { thread: threadId, resource: resourceId },
    });

    let text = '';
    let respondingAgentId = 'routing-agent';

    for await (const chunk of stream as any) {
      if (chunk.type === 'agent-execution-start') {
        respondingAgentId = (chunk.payload as any).agentId;
      }

      // Delegated agent text via wrapped events
      if (chunk.type.startsWith('agent-execution-event-')) {
        const inner = (chunk as any).payload;
        if (inner?.type === 'text-delta') {
          text += inner.payload?.text ?? '';
        }
      }

      // Routing agent own text
      if (chunk.type === 'routing-agent-text-delta') {
        text += (chunk.payload as any).text ?? '';
      }

      // Direct text-delta (if emitted at top level)
      if (chunk.type === 'text-delta') {
        text += (chunk.payload as any).text ?? '';
      }

      // Final result from network step finish
      if (chunk.type === 'network-execution-event-step-finish') {
        const result = (chunk.payload as any)?.result;
        if (result && !text) {
          text = typeof result === 'string' ? result : JSON.stringify(result);
        }
      }
    }

    return { text, threadId, agentId: respondingAgentId };
  }

  async chatDirect(dto: ChatRequestDto): Promise<ChatResponseDto> {
    const saAgent = this.mastraService.getAgent('sa-agent');
    const threadId = dto.threadId ?? randomUUID();

    const result = await saAgent.generate(dto.message);

    return {
      text: result.text,
      threadId,
      agentId: 'sa-agent',
    };
  }
}
