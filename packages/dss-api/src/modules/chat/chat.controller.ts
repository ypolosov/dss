import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service.js';
import { ChatRequestDto } from './dto/chat-request.dto.js';
import type { ChatResponseDto } from './dto/chat-response.dto.js';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() dto: ChatRequestDto): Promise<ChatResponseDto> {
    return this.chatService.chatViaNetwork(dto);
  }

  @Post('sa')
  async chatSa(@Body() dto: ChatRequestDto): Promise<ChatResponseDto> {
    return this.chatService.chatDirect(dto);
  }
}
