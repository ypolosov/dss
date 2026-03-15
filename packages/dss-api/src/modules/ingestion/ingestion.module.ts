import { Module } from '@nestjs/common';
import { MastraModule } from '../mastra/mastra.module.js';
import { IngestionService } from './ingestion.service.js';
import { IngestionController } from './ingestion.controller.js';

@Module({
  imports: [MastraModule],
  controllers: [IngestionController],
  providers: [IngestionService],
})
export class IngestionModule {}
