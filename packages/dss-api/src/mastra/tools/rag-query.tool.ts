import { createVectorQueryTool } from '@mastra/rag';
import { ModelRouterEmbeddingModel } from '@mastra/core/llm';
import { VECTOR_CONFIG } from '../vector/config.js';

export const ragQueryTool = createVectorQueryTool({
  id: 'rag-query',
  vectorStoreName: 'dssVectorStore',
  indexName: VECTOR_CONFIG.indexName,
  model: new ModelRouterEmbeddingModel(VECTOR_CONFIG.embeddingModel),
  description:
    'Поиск информации в базе знаний архитектуры DSS. Используй для ответов на вопросы об архитектуре, контейнерах, агентах, RAG pipeline и принятых решениях (ADR).',
});
