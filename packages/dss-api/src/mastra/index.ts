import { Mastra } from '@mastra/core';
import { routingAgent, saAgent } from './agents/index.js';

export const mastra = new Mastra({
  agents: { routingAgent, saAgent },
});
