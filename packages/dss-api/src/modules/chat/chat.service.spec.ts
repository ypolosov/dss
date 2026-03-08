import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChatService } from './chat.service.js';
import type { MastraService } from '../mastra/mastra.service.js';

function createMockMastraService(): MastraService {
  const mockGenerate = vi.fn().mockResolvedValue({
    text: 'SA agent response about containers',
  });

  const mockNetworkStream = {
    async *[Symbol.asyncIterator]() {
      yield { type: 'routing-agent-start', payload: {} };
      yield { type: 'agent-execution-start', payload: { agentId: 'sa-agent' } };
      yield { type: 'routing-agent-text-delta', payload: { text: 'Ответ ' } };
      yield { type: 'routing-agent-text-delta', payload: { text: 'от routing agent' } };
      yield { type: 'network-execution-event-finish', payload: {} };
    },
  };

  const mockNetwork = vi.fn().mockResolvedValue(mockNetworkStream);

  const mockAgent = (id: string) => ({
    generate: mockGenerate,
    network: mockNetwork,
    id,
  });

  return {
    getAgent: vi.fn((id: string) => mockAgent(id)),
    mastra: {} as any,
    onModuleInit: vi.fn(),
  } as unknown as MastraService;
}

describe('ChatService', () => {
  let service: ChatService;
  let mastraService: MastraService;

  beforeEach(() => {
    mastraService = createMockMastraService();
    service = new ChatService(mastraService);
  });

  describe('chatDirect', () => {
    it('should call SA agent generate and return response', async () => {
      const result = await service.chatDirect({ message: 'Какие контейнеры?' });

      expect(mastraService.getAgent).toHaveBeenCalledWith('sa-agent');
      expect(result.text).toBe('SA agent response about containers');
      expect(result.agentId).toBe('sa-agent');
      expect(result.threadId).toBeDefined();
    });

    it('should use provided threadId', async () => {
      const result = await service.chatDirect({
        message: 'test',
        threadId: 'custom-thread-123',
      });

      expect(result.threadId).toBe('custom-thread-123');
    });
  });

  describe('chatViaNetwork', () => {
    it('should call routing agent network and collect text', async () => {
      const result = await service.chatViaNetwork({ message: 'Как работает маршрутизация?' });

      expect(mastraService.getAgent).toHaveBeenCalledWith('routing-agent');
      expect(result.text).toBe('Ответ от routing agent');
      expect(result.agentId).toBe('sa-agent');
      expect(result.threadId).toBeDefined();
    });

    it('should use provided threadId and resourceId', async () => {
      const result = await service.chatViaNetwork({
        message: 'test',
        threadId: 'thread-1',
        resourceId: 'user-1',
      });

      expect(result.threadId).toBe('thread-1');
    });

    it('should default agentId to routing-agent when no delegation', async () => {
      const emptyStream = {
        async *[Symbol.asyncIterator]() {
          yield { type: 'routing-agent-text-delta', payload: { text: 'Direct response' } };
          yield { type: 'network-execution-event-finish', payload: {} };
        },
      };

      (mastraService.getAgent as any).mockReturnValue({
        network: vi.fn().mockResolvedValue(emptyStream),
      });

      const result = await service.chatViaNetwork({ message: 'Погода?' });

      expect(result.agentId).toBe('routing-agent');
      expect(result.text).toBe('Direct response');
    });
  });
});
