import { Module } from '@nestjs/common';
import { MastraModule } from './modules/mastra/mastra.module.js';
import { ChatModule } from './modules/chat/chat.module.js';

@Module({
  imports: [MastraModule, ChatModule],
})
export class AppModule {}
