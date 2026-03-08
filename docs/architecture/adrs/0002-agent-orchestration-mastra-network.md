# ADR-0002: Agent Orchestration via Mastra Agent Network

## Status

Accepted

## Date

2026-03-08

## Context and Problem Statement

The Agent Orchestrator container needs internal component design. It must support adding new specialized agents without modifying existing ones (QA-005), maintain conversation state across multi-step workflows (CONC-003), and provide actionable tools to agents (CONC-005).

## Decision Drivers

- QA-005: New agent without modifying existing agents (H,H)
- CONC-003: Workflow orchestration — state preserved between steps
- CONC-005: Tool integration — not just RAG, but actionable tools
- CONS-002: Mastra framework (non-negotiable)
- CONS-005: Multi-agent architecture

## Considered Options

1. Mastra Agent Network with Routing Agent
2. Custom intent router with Mastra Agents
3. Mastra Workflows as primary orchestration

## Decision Outcome

Chosen option: "Mastra Agent Network with Routing Agent", because it leverages Mastra's native `.network()` API for multi-agent collaboration with built-in memory and routing.

### Component Design

| Component | Responsibility | Mastra Primitive |
|-----------|---------------|------------------|
| Routing Agent | Intent classification, delegation | `Agent` with `.network()` |
| Agent Registry | Agent discovery and registration | `agents` map in Agent config |
| Tool Registry | Shared and per-agent tools | `tools` map with Zod schemas |
| Memory Manager | Session state, working memory, semantic recall | `Memory` with LibSQL/PG storage |
| Specialized Agents | Domain-specific agents (SA, BA, PM, Dev...) | `Agent` instances |

### Agent Registration Pattern

```typescript
// Each agent is independent — adding a new one requires 0 changes to existing agents
const saAgent = new Agent({
  id: 'sa-agent',
  name: 'Solution Architect',
  instructions: '...',
  model: 'anthropic/claude-sonnet-4-5-20250514',
  tools: { createAdr, updateC4, ... }
})

// Routing agent discovers and delegates
const routingAgent = new Agent({
  id: 'routing-agent',
  instructions: 'Route to the appropriate specialist agent...',
  model: 'anthropic/claude-sonnet-4-5-20250514',
  agents: { saAgent, baAgent, pmAgent, devAgent, ... },
  tools: { ragQuery, ... },
  memory: new Memory({ storage: new LibSQLStore(...) })
})
```

### Consequences

#### Good

- Adding a new agent = create `Agent` instance + add to `agents` map — no changes to routing logic (descriptions drive routing)
- Memory provides multi-step workflow state via `workingMemory` and `semanticRecall`
- Tools are first-class with Zod schemas — type-safe, auto-documented
- Mastra Dashboard provides built-in observability for agent interactions

#### Bad

- `.network()` is experimental in Mastra — API may change
- Routing quality depends on agent descriptions — poor descriptions = poor routing
- Memory storage in LibSQL/PG adds operational complexity

#### Neutral

- Agent count limited by LLM context window for routing (practical limit ~20-30 agents)
- Tools can be shared across agents or scoped per-agent

## Pros and Cons of the Options

### Option 1: Mastra Agent Network with Routing Agent

- Good, because native Mastra primitive — no custom framework
- Good, because `.network()` handles delegation, memory, and task completion detection
- Good, because agent descriptions serve as routing criteria — self-documenting
- Bad, because `.network()` is experimental API

### Option 2: Custom intent router with Mastra Agents

- Good, because full control over routing logic
- Bad, because duplicates routing that Mastra provides natively
- Bad, because more code to maintain, test, and evolve

### Option 3: Mastra Workflows as primary orchestration

- Good, because deterministic step-by-step execution
- Bad, because less flexible for dynamic intent routing
- Bad, because workflows are better for known sequences, not open-ended agent selection

## More Information

- Iteration: ITER-02
- Related: [ADR-0001](0001-container-decomposition.md)
- Mastra docs: Agent Networks, Memory, Tools
