import { LibSQLVector } from '@mastra/libsql';
import { VECTOR_CONFIG } from './config.js';

export function createVectorStore(): LibSQLVector {
  const { storeType, dbUrl } = VECTOR_CONFIG;

  if (storeType === 'libsql') {
    return new LibSQLVector({ id: 'dss-vector', url: dbUrl });
  }

  throw new Error(
    `Unsupported vector store type: ${storeType}. Supported: libsql`,
  );
}
