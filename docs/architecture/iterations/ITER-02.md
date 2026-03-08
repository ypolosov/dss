# ITER-02: Agent Orchestrator & RAG Engine Component Decomposition

## Date
2026-03-08

## Goal
Decompose Agent Orchestrator and RAG Engine containers into components, leveraging Mastra-native primitives for agent orchestration and retrieval.

## Drivers Addressed
| ID | Driver | How Addressed |
|----|--------|---------------|
| QA-005 | Agent Extensibility (H,H) | Mastra Agent Network — Routing Agent delegates to registered sub-agents, new agent = new `Agent` instance |
| QA-001 | RAG Response Time ≤ 10s (H,M) | Retrieval pipeline budget: embed 0.3s + search 0.1s + assembly 0.1s + LLM 8-9s |
| CONC-003 | Workflow Orchestration | Mastra Memory with `workingMemory` + `semanticRecall` for session state |
| CONC-005 | Tool Integration | Mastra Tools with Zod schemas — shared and per-agent tool registry |

## Elements Refined

### Agent Orchestrator → 5 components
| Component | Mastra Primitive |
|-----------|------------------|
| Routing Agent | `Agent` with `.network()` |
| Agent Registry | `agents` map |
| Tool Registry | `tools` with Zod schemas |
| Memory Manager | `Memory` (LibSQL/PG) |
| Specialized Agents | Independent `Agent` instances |

### RAG Engine → 5 components
| Component | Mastra Primitive |
|-----------|------------------|
| Document Processor | `MDocument.chunk()` |
| Embedding Service | `embedMany()` / `embed()` |
| Vector Store Client | `PgVector` |
| Retrieval Service | Composition |
| Context Assembler | TypeScript |

## Design Concepts Applied
- **Mastra Agent Network** — `.network()` with memory-backed routing
- **Mastra Memory** — `lastMessages` + `workingMemory` + `semanticRecall`
- **Mastra RAG Pipeline** — MDocument → chunk → embed → PgVector → retrieve
- **Mastra Tools** — Zod-typed tools with per-agent and shared scoping

## Decisions Made
- [ADR-0002](../adrs/0002-agent-orchestration-mastra-network.md): Agent Orchestration via Mastra Agent Network
- [ADR-0003](../adrs/0003-rag-engine-retrieval-pipeline.md): RAG Engine Retrieval Pipeline with Mastra RAG

## New Concerns Identified
- Mastra `.network()` is experimental — need fallback strategy if API changes
- Agent description quality is critical for routing accuracy — need guidelines
- PgVector HNSW index tuning needed for >100K vectors
- No reranking in initial design — monitor retrieval precision
- Ingestion Pipeline component decomposition still needed (ITER-03)

## Assessment
| Driver | Status |
|--------|--------|
| QA-005 | ✅ Fully addressed at component level — Mastra Agent Network pattern |
| QA-001 | ✅ Addressed — performance budget defined, pipeline components clear |
| CONC-003 | ✅ Addressed — Memory Manager with workingMemory + semanticRecall |
| CONC-005 | ✅ Addressed — Tool Registry with Zod schemas, per-agent scoping |

## Next Steps
1. ITER-03: Ingestion Pipeline component decomposition + scheduling strategy (QA-002, QA-007)
2. ITER-03: Address QA-006 (LLM fault tolerance) + QA-008 (API auth)
3. Define agent description guidelines for routing quality
4. Prototype Routing Agent + 1 Specialized Agent to validate pattern
