import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChatController } from './chat.controller.js';
import type { ChatService } from './chat.service.js';
import type { ChatRequestDto } from './dto/chat-request.dto.js';

function createMockChatService(): ChatService {
  return {
    chatDirect: vi.fn().mockResolvedValue({
      text: 'Mock SA response',
      threadId: 'thread-123',
      agentId: 'sa-agent',
    }),
    chatViaNetwork: vi.fn().mockResolvedValue({
      text: 'Mock network response',
      threadId: 'thread-456',
      agentId: 'sa-agent',
    }),
  } as unknown as ChatService;
}

describe('ChatController', () => {
  let controller: ChatController;
  let chatService: ChatService;

  beforeEach(() => {
    chatService = createMockChatService();
    controller = new ChatController(chatService);
  });

  describe('POST /chat (chatViaNetwork)', () => {
    it('should delegate to chatViaNetwork and return response', async () => {
      const dto: ChatRequestDto = { message: 'Как работает маршрутизация?' };

      const result = await controller.chat(dto);

      expect(chatService.chatViaNetwork).toHaveBeenCalledWith(dto);
      expect(result.text).toBe('Mock network response');
      expect(result.agentId).toBe('sa-agent');
      expect(result.threadId).toBe('thread-456');
    });

    it('should pass threadId and resourceId through', async () => {
      const dto: ChatRequestDto = {
        message: 'test',
        threadId: 'custom-thread',
        resourceId: 'user-1',
      };

      await controller.chat(dto);

      expect(chatService.chatViaNetwork).toHaveBeenCalledWith(
        expect.objectContaining({
          threadId: 'custom-thread',
          resourceId: 'user-1',
        }),
      );
    });
  });

  describe('POST /chat/sa (chatDirect)', () => {
    it('should delegate to chatDirect and return response', async () => {
      const dto: ChatRequestDto = { message: 'Какие контейнеры?' };

      const result = await controller.chatSa(dto);

      expect(chatService.chatDirect).toHaveBeenCalledWith(dto);
      expect(result.text).toBe('Mock SA response');
      expect(result.agentId).toBe('sa-agent');
      expect(result.threadId).toBe('thread-123');
    });
  });
});
