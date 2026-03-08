import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const MOCK_KNOWLEDGE_BASE: Record<string, string> = {
  containers: `DSS декомпозирован на следующие контейнеры (ADR-0001):
- API Gateway: Auth, routing, request orchestration (NestJS)
- Agent Orchestrator: Agent registry, intent routing, tool management (Mastra)
- RAG Engine: Embedding, vector search, context assembly (Mastra RAG, pgvector)
- Ingestion Pipeline: Scheduled crawling & indexing (NestJS, Mastra Syncs)
- Discord Bot: Channel adapter for Discord (Discord.js)
- MCP Server: Channel adapter for MCP protocol (MCP SDK)
- PostgreSQL + pgvector: Vector storage, metadata, state`,

  agents: `Оркестрация агентов реализована через Mastra Agent Network (ADR-0002):
- Routing Agent: классификация intent, делегация (Agent с .network())
- Agent Registry: обнаружение и регистрация агентов (agents map в Agent config)
- Tool Registry: общие и per-agent tools (tools map с Zod schemas)
- Memory Manager: состояние сессий, working memory, semantic recall (Memory с LibSQL/PG storage)
- Specialized Agents: доменные агенты — SA, BA, PM, Dev (Agent instances)
Добавление нового агента = создать Agent instance + добавить в agents map. Описания агентов управляют маршрутизацией.`,

  rag: `RAG Engine реализован через Mastra RAG Pipeline (ADR-0003):
- Document Processor: chunking (recursive, 512 tokens, overlap 50) — MDocument.chunk()
- Embedding Service: генерация embeddings — embedMany() / embed()
- Vector Store Client: pgvector операции (upsert, query, delete) — PgVector
- Retrieval Service: embed query → search → rank
- Context Assembler: форматирование chunks в LLM-ready context
Performance budget: ≤ 10 sec total (query embedding ~0.3s, vector search ~0.1s, context assembly ~0.1s, LLM ~8-9s)`,

  architecture: `DSS использует гексагональную архитектуру с Mastra Agent Registry (ADR-0001):
- Порты (inbound): ChannelPort — onMessage(ctx) → AgentResponse (Discord Bot, MCP Server, будущие адаптеры)
- Порты (outbound): KnowledgeSourcePort — ingest() → AsyncGenerator<Document> (Discord, Confluence, Jira, Bitbucket)
- Регистрация агентов: Mastra-native new Agent({ name, instructions, tools }) с оркестратором маршрутизации
Tech stack: NestJS + Mastra, PostgreSQL + pgvector, Discord.js, MCP SDK`,
};

function findRelevantKnowledge(query: string): string {
  const lowerQuery = query.toLowerCase();
  const results: string[] = [];

  const keywords: Record<string, string[]> = {
    containers: ['контейнер', 'container', 'декомпозиц', 'decompos', 'gateway', 'pipeline'],
    agents: ['агент', 'agent', 'маршрутиз', 'routing', 'оркестр', 'orchestr', 'network', 'делегац'],
    rag: ['rag', 'retrieval', 'embedding', 'vector', 'chunk', 'поиск', 'индекс'],
    architecture: ['архитектур', 'architect', 'гексагон', 'hexagon', 'порт', 'port', 'адаптер', 'adapter'],
  };

  for (const [key, terms] of Object.entries(keywords)) {
    if (terms.some((term) => lowerQuery.includes(term))) {
      results.push(MOCK_KNOWLEDGE_BASE[key]!);
    }
  }

  if (results.length === 0) {
    return 'Релевантная информация не найдена в базе знаний. Попробуйте уточнить запрос, используя термины: контейнеры, агенты, RAG, архитектура.';
  }

  return results.join('\n\n---\n\n');
}

export const ragQueryTool = createTool({
  id: 'rag-query',
  description:
    'Поиск информации в базе знаний архитектуры DSS. Используй для ответов на вопросы об архитектуре, контейнерах, агентах, RAG pipeline и принятых решениях (ADR).',
  inputSchema: z.object({
    query: z
      .string()
      .describe('Поисковый запрос на русском или английском языке'),
  }),
  outputSchema: z.object({
    results: z.string().describe('Найденные фрагменты из базы знаний'),
    source: z.string().describe('Источник информации'),
  }),
  execute: async (inputData) => {
    const results = findRelevantKnowledge(inputData.query);
    return {
      results,
      source: 'Mock KB (ADR-0001, ADR-0002, ADR-0003)',
    };
  },
});
