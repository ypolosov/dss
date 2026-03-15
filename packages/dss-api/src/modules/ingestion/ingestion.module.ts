import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service.js';
import { IngestionController } from './ingestion.controller.js';

@Module({
  controllers: [IngestionController],
  providers: [IngestionService],
})
export class IngestionModule {}
