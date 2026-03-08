import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export function createMemory(): Memory {
  return new Memory({
    storage: new LibSQLStore({
      id: 'dss-memory-storage',
      url: 'file:../../mastra.db',
    }),
    options: {
      lastMessages: 20,
      semanticRecall: false,
    },
  });
}
