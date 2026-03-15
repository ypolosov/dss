import { Module } from '@nestjs/common';
import { MastraModule } from '../mastra/mastra.module.js';
import { McpController } from './mcp.controller.js';
import { McpService } from './mcp.service.js';

@Module({
  imports: [MastraModule],
  controllers: [McpController],
  providers: [McpService],
})
export class McpModule {}
