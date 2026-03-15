export const VECTOR_CONFIG = {
  storeType: process.env.VECTOR_STORE_TYPE ?? 'libsql',
  dbUrl: process.env.VECTOR_DB_URL ?? 'file:../../vectors.db',
  indexName: process.env.VECTOR_INDEX_NAME ?? 'dss_knowledge',
  embeddingModel: process.env.EMBEDDING_MODEL ?? 'openai/text-embedding-3-small',
  dimension: parseInt(process.env.EMBEDDING_DIMENSION ?? '1536', 10),
};
