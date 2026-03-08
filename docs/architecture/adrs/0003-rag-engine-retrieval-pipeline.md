# ADR-0003: RAG Engine — Retrieval Pipeline with Mastra RAG

## Status

Accepted

## Date

2026-03-08

## Context and Problem Statement

The RAG Engine container needs internal component design. It must deliver relevant context within the 10-second response time budget (QA-001) and support source-agnostic document processing for extensible knowledge sources (QA-004).

## Decision Drivers

- QA-001: RAG query response ≤ 10 sec including LLM call (H,M)
- QA-004: New knowledge source = 1 adapter, 0 core changes (H,M)
- CONC-004: Project-specific RAG context — grounded, not generic
- CONS-002: Mastra RAG + pgvector (tech stack constraint)

## Considered Options

1. Mastra RAG Pipeline (MDocument + PgVector + embed)
2. LangChain-style retrieval chain
3. Custom vector search with raw pgvector SQL

## Decision Outcome

Chosen option: "Mastra RAG Pipeline", because it aligns with the Mastra tech stack constraint and provides document processing, embedding, and vector search as cohesive primitives.

### Component Design

| Component | Responsibility | Mastra Primitive |
|-----------|---------------|------------------|
| Document Processor | Chunking (recursive, 512 tokens, overlap 50) | `MDocument.chunk()` |
| Embedding Service | Embedding generation for docs and queries | `embedMany()` / `embed()` |
| Vector Store Client | pgvector operations (upsert, query, delete) | `PgVector` |
| Retrieval Service | Orchestrates: embed query → search → rank | Composition |
| Context Assembler | Formats chunks into LLM-ready context | TypeScript |

### Performance Budget (QA-001: ≤ 10 sec total)

| Step | Component | Budget |
|------|-----------|--------|
| Query embedding | Embedding Service | ~0.3 sec |
| Vector search | Vector Store Client (topK=10) | ~0.1 sec |
| Context assembly | Context Assembler | ~0.1 sec |
| LLM generation | Agent (external) | ~8-9 sec |
| **Total** | | **≤ 10 sec** |

### Chunking Strategy

- Strategy: `recursive` — respects paragraph and sentence boundaries
- Max chunk size: 512 tokens — balances context quality vs. embedding precision
- Overlap: 50 tokens — ensures no context lost at boundaries
- Metadata: source type, source ID, timestamp, project ID

### Consequences

#### Good

- Mastra MDocument handles multiple input formats (text, HTML, PDF, markdown)
- PgVector is co-located with relational data — single DB engine
- Chunking strategy is configurable per knowledge source
- Embedding model is swappable via `ModelRouterEmbeddingModel`

#### Bad

- PgVector performance may degrade with very large datasets (>1M vectors) — may need HNSW index tuning
- Single embedding model for all content types may not be optimal
- No built-in reranking in Mastra — may need to add if precision is insufficient

#### Neutral

- topK=10 is a starting point — can tune based on retrieval quality metrics
- Embedding cache not in initial design — add if LLM latency becomes bottleneck

## Pros and Cons of the Options

### Option 1: Mastra RAG Pipeline

- Good, because consistent with tech stack (Mastra + pgvector)
- Good, because `MDocument` provides uniform chunking across content types
- Good, because `PgVector` integrates with existing PostgreSQL
- Bad, because less flexibility than raw pgvector SQL for advanced queries

### Option 2: LangChain-style retrieval chain

- Good, because rich ecosystem of retrievers and rerankers
- Bad, because introduces Python dependency or extra JS library
- Bad, because violates Mastra-native constraint

### Option 3: Custom vector search with raw pgvector SQL

- Good, because maximum performance control
- Bad, because more code to maintain (chunking, embedding, search)
- Bad, because loses Mastra RAG abstractions

## More Information

- Iteration: ITER-02
- Related: [ADR-0001](0001-container-decomposition.md), [ADR-0002](0002-agent-orchestration-mastra-network.md)
- Mastra docs: RAG Overview, Chunking and Embedding, Retrieval
