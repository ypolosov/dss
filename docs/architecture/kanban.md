# Architecture Design Kanban

## Backlog

- [ ] Ingestion Pipeline component decomposition + scheduling (QA-002, QA-007)
- [ ] API Gateway auth strategy (QA-008)
- [ ] LLM fault tolerance — retry & circuit breaker (QA-006)
- [ ] Prompt injection protection strategy (QA-009)
- [ ] PgVector HNSW index tuning for scale
- [ ] Agent description guidelines for routing quality
- [ ] Reranking strategy for RAG retrieval precision

## In Design

## Decided

- [x] **Container Decomposition** — Hexagonal + Mastra Agents → [ADR-0001](adrs/0001-container-decomposition.md) (ITER-01)
- [x] **Agent Orchestration** — Mastra Agent Network → [ADR-0002](adrs/0002-agent-orchestration-mastra-network.md) (ITER-02)
- [x] **RAG Engine Pipeline** — Mastra RAG → [ADR-0003](adrs/0003-rag-engine-retrieval-pipeline.md) (ITER-02)

## Implemented

## Verified
