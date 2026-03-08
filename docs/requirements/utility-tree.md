# Requirements: Utility Tree

> Master utility tree for the DSS API. This is the detailed version maintained by the BA role.
> A summary is synced to `docs/architecture/utility-tree.md` for the SA role.

## Quality Attribute Utility Tree

```
DSS (root)
├── Performance
│   ├── QA-001: RAG Response Time [H,M]
│   │   └── Stimulus: Architect asks architecture question
│   │       Response: ≤ 10 sec including LLM call
│   └── QA-002: Ingestion Throughput [M,M]
│       └── Stimulus: Full re-indexing ~10K messages
│           Response: Query throughput drops ≤ 20%
├── Modifiability
│   ├── QA-003: Channel Extensibility [H,M]
│   │   └── Stimulus: Add new interaction channel (Telegram, Slack)
│   │       Response: ≤ 1 adapter module, 0 core changes
│   ├── QA-004: Knowledge Source Extensibility [H,M]
│   │   └── Stimulus: Add new knowledge source (Bitbucket)
│   │       Response: ≤ 1 adapter module, 0 RAG pipeline changes
│   └── QA-005: Agent Extensibility [H,H] ★ ARCHITECTURE-SIGNIFICANT
│       └── Stimulus: Add new specialized agent (new role)
│           Response: ≤ 1 module, 0 changes to existing agents
├── Reliability
│   ├── QA-006: LLM Fault Tolerance [H,L]
│   │   └── Stimulus: Claude API returns 429/503
│   │       Response: Retry with backoff, user informed within 30 sec
│   └── QA-007: Ingestion Fault Tolerance [M,L]
│       └── Stimulus: Knowledge source unavailable during ingestion
│           Response: Log, continue others, retry within 15 min
├── Security
│   ├── QA-008: API Authentication [H,L]
│   │   └── Stimulus: Unauthorized access to API endpoints
│   │       Response: 100% blocked with 401/403
│   └── QA-009: Prompt Injection Protection [M,H]
│       └── Stimulus: Prompt injection in RAG query
│           Response: No data leakage, system prompts protected
├── Usability
│   └── QA-010: User Onboarding [M,L]
│       └── Stimulus: New user first interaction via Discord Bot
│           Response: First useful query within ≤ 2 min
├── Testability
│   └── QA-011: Domain Testability [M,M]
│       └── Stimulus: Run domain layer unit tests in CI
│           Response: 0 infra deps, execution ≤ 30 sec
└── Interoperability
    └── QA-012: MCP Compatibility [H,M]
        └── Stimulus: Claude Code queries DSS via MCP
            Response: Full MCP spec compliance, ≤ 10 sec
```

## Priority Matrix

|  | High Difficulty | Medium Difficulty | Low Difficulty |
|--|----------------|-------------------|----------------|
| **High Priority** | ★ QA-005 | QA-001, QA-003, QA-004, QA-012 | QA-006, QA-008 |
| **Medium Priority** | QA-009 | QA-002, QA-011 | QA-007, QA-010 |

## Architecture-Significant Scenarios

Items requiring explicit architecture decisions (High Priority + High Difficulty):

### ★ QA-005: Multi-Agent Extensibility
- **Why significant**: Core architectural challenge — designing an agent orchestration layer (Mastra) that supports pluggable agents without coupling.
- **Related concerns**: CONC-002 (Human/AI users), CONC-003 (Workflow orchestration), CONS-005 (Multi-agent architecture)
- **Recommended ADD iteration focus**: Agent registration, orchestration patterns, tool/knowledge sharing between agents

## High Priority Items (by difficulty)

### Easy wins (H,L) — implement first
- **QA-006**: LLM retry is standard Mastra/HTTP middleware pattern
- **QA-008**: NestJS Guards + API key / JWT — well-established patterns

### Medium effort (H,M) — core architecture
- **QA-001**: RAG pipeline optimization (embeddings quality, retrieval strategy, LLM prompt design)
- **QA-003**: Hexagonal architecture ports for channels — design-time decision
- **QA-004**: Hexagonal architecture ports for knowledge sources — design-time decision
- **QA-012**: MCP server implementation as a channel adapter

## Risks

- **QA-009** (M,H): Prompt injection is an evolving threat. May need ongoing investment beyond initial architecture.
- **QA-005** (H,H): Agent orchestration patterns in Mastra framework may constrain extensibility design.

---

> Source: QAW Session 1 (2026-03-08)
> Last updated: 2026-03-08
