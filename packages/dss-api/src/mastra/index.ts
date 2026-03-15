import { Mastra } from '@mastra/core';
import { routingAgent, saAgent } from './agents/index.js';
import { createVectorStore } from './vector/index.js';

const dssVectorStore = createVectorStore();

export const mastra = new Mastra({
  agents: { routingAgent, saAgent },
  vectors: { dssVectorStore },
});

export { dssVectorStore };
