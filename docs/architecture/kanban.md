# Architecture Design Kanban

## Backlog

- [ ] Ingestion Pipeline component decomposition + scheduling (QA-002, QA-007)
- [ ] Prompt injection protection strategy (QA-009)
- [ ] PgVector HNSW index tuning for scale
- [ ] Agent description guidelines for routing quality
- [ ] Reranking strategy for RAG retrieval precision
- [ ] Circuit breaker monitoring via health endpoint
- [ ] Per-client API key management

## In Design

## Decided

- [x] **Container Decomposition** — Hexagonal + Mastra Agents → [ADR-0001](adrs/0001-container-decomposition.md) (ITER-01)
- [x] **Agent Orchestration** — Mastra Agent Network → [ADR-0002](adrs/0002-agent-orchestration-mastra-network.md) (ITER-02)
- [x] **RAG Engine Pipeline** — Mastra RAG → [ADR-0003](adrs/0003-rag-engine-retrieval-pipeline.md) (ITER-02)
- [x] **Vector Store — LibSQL for Dev** — LibSQLVector dev / PgVector prod → [ADR-0004](adrs/0004-vector-store-libsql-for-development.md) (ITER-02, amends ADR-0003)
- [x] **LLM Fault Tolerance** — Retry + Circuit Breaker + Graceful Degradation → [ADR-0005](adrs/0005-llm-fault-tolerance-retry-circuit-breaker.md) (ITER-03)
- [x] **API Authentication** — Global API Key Guard (deny-by-default) → [ADR-0006](adrs/0006-api-authentication-global-api-key.md) (ITER-03)

## Implemented

- [x] **Container Decomposition** — API Gateway + Agent Orchestrator + RAG Engine реализованы (ADR-0001)
- [x] **Agent Orchestration** — Routing Agent + SA Agent + Mastra Network (ADR-0002)
- [x] **RAG Engine Pipeline** — MDocument chunking + OpenAI embeddings + LibSQLVector + createVectorQueryTool (ADR-0003)
- [x] **Vector Store — LibSQL for Dev** — LibSQLVector factory с VECTOR_STORE_TYPE env switch (ADR-0004)

## Verified
