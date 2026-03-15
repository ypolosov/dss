import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../../common/guards/api-key.guard.js';
import { VECTOR_CONFIG } from '../../mastra/vector/config.js';
import { IngestionService } from './ingestion.service.js';
import type { IngestionResultDto } from './dto/ingestion-result.dto.js';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @UseGuards(ApiKeyGuard)
  @Post('docs')
  async ingestDocs(): Promise<IngestionResultDto> {
    return this.ingestionService.ingestDirectory(VECTOR_CONFIG.docsPath);
  }
}
