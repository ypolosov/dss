import { Injectable, type OnModuleInit } from '@nestjs/common';
import type { Agent } from '@mastra/core/agent';
import type { Mastra } from '@mastra/core';

@Injectable()
export class MastraService implements OnModuleInit {
  private mastraInstance!: Mastra;

  async onModuleInit(): Promise<void> {
    const { mastra } = await import('../../mastra/index.js');
    this.mastraInstance = mastra;
  }

  get mastra(): Mastra {
    return this.mastraInstance;
  }

  getAgent(id: string): Agent {
    return this.mastraInstance.getAgentById(id);
  }
}
