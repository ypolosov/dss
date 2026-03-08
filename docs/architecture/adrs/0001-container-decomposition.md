# ADR-0001: Container Decomposition — Hexagonal Architecture with Mastra Agents

## Status

Accepted

## Date

2026-03-08

## Context and Problem Statement

DSS needs to be decomposed from a monolithic system context into containers. The decomposition must support extensibility across three dimensions: interaction channels (QA-003), knowledge sources (QA-004), and specialized agents (QA-005), while enabling MCP interoperability (QA-012).

## Decision Drivers

- QA-005: New agent without modifying existing agents (H,H)
- QA-003: New channel = 1 adapter, 0 core changes (H,M)
- QA-004: New knowledge source = 1 adapter, 0 core changes (H,M)
- QA-012: MCP protocol compatibility (H,M)
- CONS-002: NestJS + Mastra tech stack (constraint)
- CONS-005: Multi-agent architecture (constraint)
- CONC-001: Multi-channel extensibility
- CONC-006: Knowledge source extensibility

## Considered Options

1. Hexagonal Architecture with Mastra Agent Registry
2. NestJS Plugin Architecture with custom agent system
3. Microservices per agent

## Decision Outcome

Chosen option: "Hexagonal Architecture with Mastra Agent Registry", because it leverages the constrained tech stack (Mastra for agents, NestJS for structure) while providing clean separation via ports & adapters for both channels and knowledge sources.

### Container Decomposition

| Container | Responsibility | Technology |
|-----------|---------------|------------|
| API Gateway | Auth, routing, request orchestration | NestJS |
| Agent Orchestrator | Agent registry, intent routing, tool management | Mastra |
| RAG Engine | Embedding, vector search, context assembly | Mastra RAG, pgvector |
| Ingestion Pipeline | Scheduled crawling & indexing | NestJS, Mastra Syncs |
| Discord Bot | Channel adapter for Discord | Discord.js |
| MCP Server | Channel adapter for MCP protocol | MCP SDK |
| PostgreSQL + pgvector | Vector storage, metadata, state | PostgreSQL |

### Key Interfaces (Ports)

- **ChannelPort** (inbound): `onMessage(ctx) → AgentResponse` — implemented by Discord Bot, MCP Server, future adapters
- **KnowledgeSourcePort** (outbound): `ingest() → AsyncGenerator<Document>` — implemented per source (Discord, Confluence, Jira, Bitbucket)
- **Agent Registration**: Mastra-native `new Agent({ name, instructions, tools })` with orchestrator routing

### Consequences

#### Good

- Clean separation of concerns across 3 extensibility dimensions
- Channel adapters are independently deployable and testable
- Knowledge sources follow uniform interface — easy to add Bitbucket, K8s, LikeC4
- Agent extensibility leverages Mastra's native agent model — no custom framework needed
- MCP is just another channel adapter — no special infrastructure

#### Bad

- Mastra coupling — agent extensibility depends on Mastra's API stability
- More containers to deploy and monitor vs monolith
- Need clear contract between Agent Orchestrator and RAG Engine

#### Neutral

- PostgreSQL + pgvector serves both vector storage and relational data — single DB engine
- Ingestion Pipeline could be separated further in future iterations if scale demands

## Pros and Cons of the Options

### Option 1: Hexagonal Architecture with Mastra Agent Registry

- Good, because it aligns with CONS-002 (NestJS) and CONS-005 (multi-agent via Mastra)
- Good, because ports & adapters naturally address QA-003 and QA-004
- Good, because Mastra Agent model directly addresses QA-005
- Bad, because coupling to Mastra framework for agent lifecycle

### Option 2: NestJS Plugin Architecture with custom agent system

- Good, because full control over agent lifecycle
- Bad, because duplicates Mastra's agent orchestration capabilities
- Bad, because more code to maintain, violates CONS-002 (Mastra is non-negotiable)

### Option 3: Microservices per agent

- Good, because maximum isolation and independent scaling
- Bad, because operational overhead (8+ services for 8 roles)
- Bad, because premature for current scale (single-project instance)

## More Information

- Iteration: ITER-01
- Related drivers: CONC-001, CONC-006, CONS-002, CONS-005
