import { Module } from '@nestjs/common';
import { MastraModule } from './modules/mastra/mastra.module.js';
import { ChatModule } from './modules/chat/chat.module.js';
import { IngestionModule } from './modules/ingestion/ingestion.module.js';

@Module({
  imports: [MastraModule, ChatModule, IngestionModule],
})
export class AppModule {}
