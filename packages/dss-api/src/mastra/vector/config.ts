import * as path from 'node:path';

const rawDimension = parseInt(process.env['EMBEDDING_DIMENSION'] ?? '1536', 10);
if (Number.isNaN(rawDimension) || rawDimension <= 0) {
  throw new Error(
    `Invalid EMBEDDING_DIMENSION: ${process.env['EMBEDDING_DIMENSION']}`,
  );
}

export const VECTOR_CONFIG = {
  storeType: process.env['VECTOR_STORE_TYPE'] ?? 'libsql',
  dbUrl: process.env['VECTOR_DB_URL'] ?? 'file:../../vectors.db',
  indexName: process.env['VECTOR_INDEX_NAME'] ?? 'dss_knowledge',
  embeddingModel:
    process.env['EMBEDDING_MODEL'] ?? 'openai/text-embedding-3-small',
  dimension: rawDimension,
  docsPath:
    process.env['INGESTION_DOCS_PATH'] ??
    path.resolve(process.cwd(), '../../docs'),
};
