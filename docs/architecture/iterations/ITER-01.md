# ITER-01: Container Decomposition

## Date
2026-03-08

## Goal
Decompose DSS from System Context to Container level, addressing extensibility across channels, knowledge sources, and agents.

## Drivers Addressed
| ID | Quality Attribute | Scenario | How Addressed |
|----|-------------------|----------|---------------|
| QA-005 | Modifiability | Agent extensibility | Mastra Agent Registry — each agent is independent `Agent` instance |
| QA-003 | Modifiability | Channel extensibility | `ChannelPort` interface with adapter pattern (Discord, MCP) |
| QA-004 | Modifiability | Knowledge source extensibility | `KnowledgeSourcePort` interface with adapter per source |
| QA-012 | Interoperability | MCP compatibility | MCP Server as a `ChannelPort` adapter |

## Element Refined
**DSS** (softwareSystem) → decomposed into 6 containers + 1 database

## Design Concepts Applied
- **Hexagonal Architecture** (Ports & Adapters) — for channel and knowledge source extensibility
- **Mastra Agent Registry** — for agent extensibility and orchestration
- **Adapter Pattern** — each channel and source is an independent adapter module

## Containers Identified

| Container | Responsibility | Technology |
|-----------|---------------|------------|
| API Gateway | Auth, routing, request orchestration | NestJS |
| Agent Orchestrator | Agent registry, intent routing, tools | Mastra |
| RAG Engine | Embedding, vector search, context assembly | Mastra RAG, pgvector |
| Ingestion Pipeline | Crawling & indexing from sources | NestJS, Mastra Syncs |
| Discord Bot | Channel adapter: Discord | Discord.js |
| MCP Server | Channel adapter: MCP protocol | MCP SDK |
| PostgreSQL + pgvector | Vector storage, metadata, state | PostgreSQL |

## Decisions Made
- [ADR-0001](../adrs/0001-container-decomposition.md): Container Decomposition — Hexagonal Architecture with Mastra Agents

## New Concerns Identified
- Agent Orchestrator ↔ RAG Engine contract needs detailed design (ITER-02 candidate)
- Ingestion Pipeline scheduling and incremental sync strategy (ITER-02 candidate)
- Agent state persistence across multi-step workflows (CONC-003)
- Auth strategy for API Gateway (QA-008) — not addressed in this iteration

## Assessment
| Driver | Status |
|--------|--------|
| QA-005 | Addressed at container level. Component-level detail needed (ITER-02) |
| QA-003 | Addressed — ChannelPort defined, 2 adapters instantiated |
| QA-004 | Addressed — KnowledgeSourcePort defined, 4 sources planned |
| QA-012 | Addressed — MCP Server container defined as ChannelPort adapter |

## Next Steps
1. ITER-02: Decompose Agent Orchestrator into components (agent registration, routing, tool binding)
2. ITER-02: Detail RAG Engine internals (retrieval strategy, embedding pipeline)
3. Address QA-001 (Performance) and QA-006 (Reliability) in subsequent iteration
4. Address QA-008 (Security/Auth) — define auth strategy
