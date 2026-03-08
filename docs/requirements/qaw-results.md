# QAW Session Results

> Quality Attribute Workshop results for the DSS API.

## Session 1 — 2026-03-08

### Participants
- Solution Architect (human)
- AI facilitator (Claude)

### Business Context
DSS (Decision Support System) — RAG-powered API для поддержки архитектурных решений. Мультиагентная система, работающая с Discord, Confluence, Jira, Bitbucket, LikeC4, Kubernetes. Обслуживает 8 ролей: BA, PM, SA, Backend/Frontend Dev, Tester, Reviewer, DevOps. Primary channel — Discord Bot, с перспективой MCP, Telegram, Slack, Web.

### Architecture Overview
- System Context: DSS + 5 внешних систем (Discord, Confluence, Jira, LLM Provider, pgvector)
- Style: Hexagonal Architecture + DDD + Multi-Agent (Mastra)
- Stack: NestJS, TypeScript, Mastra, Drizzle ORM, PostgreSQL + pgvector
- Контейнеры ещё не детализированы

---

## Consolidated Scenarios

| ID | Quality Attribute | Scenario (short) | Priority | Difficulty |
|----|-------------------|-------------------|----------|------------|
| QA-001 | Performance | RAG query response ≤ 10 sec | H | M |
| QA-002 | Performance | Ingestion without query degradation | M | M |
| QA-003 | Modifiability | New channel = 1 adapter, 0 core changes | H | M |
| QA-004 | Modifiability | New knowledge source = 1 adapter, 0 core changes | H | M |
| QA-005 | Modifiability | New agent without modifying existing agents | H | H |
| QA-006 | Reliability | LLM retry + graceful degradation ≤ 30 sec | H | L |
| QA-007 | Reliability | Ingestion tolerant to source unavailability | M | L |
| QA-008 | Security | API auth — 100% unauthorized requests blocked | H | L |
| QA-009 | Security | Prompt injection protection | M | H |
| QA-010 | Usability | Onboarding — first useful query ≤ 2 min | M | L |
| QA-011 | Testability | Domain tests without infrastructure deps ≤ 30 sec | M | M |
| QA-012 | Interoperability | MCP protocol compatibility, response ≤ 10 sec | H | M |

### Architecture-Significant Scenarios
- **QA-005** (H/H) — Multi-agent extensibility is the key architectural challenge

---

## Detailed Scenarios

### QA-001: RAG Query Response Time

| Part | Description |
|------|-------------|
| **Source** | Architect via Discord Bot |
| **Stimulus** | Asks a question about architecture decision |
| **Environment** | Normal operation, DB contains ~100K embeddings |
| **Artifact** | RAG Pipeline |
| **Response** | System retrieves relevant context and generates answer |
| **Measure** | Response time ≤ 10 sec (including LLM call) |

### QA-002: Ingestion Without Query Degradation

| Part | Description |
|------|-------------|
| **Source** | Ingestion scheduler |
| **Stimulus** | Full re-indexing of Discord channel (~10K messages) |
| **Environment** | Background process, system serves user queries |
| **Artifact** | RAG Pipeline, pgvector |
| **Response** | Indexing completes without degrading user-facing queries |
| **Measure** | Query throughput drops no more than 20% during ingestion |

### QA-003: New Channel Extensibility

| Part | Description |
|------|-------------|
| **Source** | Developer |
| **Stimulus** | Adding a new interaction channel (e.g., Telegram Bot) |
| **Environment** | Design-time |
| **Artifact** | Channel adapter layer |
| **Response** | New channel added without changes to core logic |
| **Measure** | ≤ 1 module (adapter), 0 changes in domain/application layer |

### QA-004: New Knowledge Source Extensibility

| Part | Description |
|------|-------------|
| **Source** | Developer |
| **Stimulus** | Adding a new knowledge source (e.g., Bitbucket) |
| **Environment** | Design-time |
| **Artifact** | Knowledge Source adapter layer |
| **Response** | New source connects via port implementation |
| **Measure** | ≤ 1 module (adapter), 0 changes in core RAG pipeline |

### QA-005: Multi-Agent Extensibility

| Part | Description |
|------|-------------|
| **Source** | Developer |
| **Stimulus** | Adding a new specialized agent (new role) |
| **Environment** | Design-time |
| **Artifact** | Agent orchestration layer |
| **Response** | New agent registers without modifying existing agents |
| **Measure** | ≤ 1 module, 0 changes to existing agents |

### QA-006: LLM Provider Fault Tolerance

| Part | Description |
|------|-------------|
| **Source** | LLM Provider (Claude API) |
| **Stimulus** | API returns 429 (rate limit) or 503 |
| **Environment** | Normal operation |
| **Artifact** | LLM integration layer |
| **Response** | System retries with exponential backoff, informs user of delay |
| **Measure** | Up to 3 retries, user gets response or clear error within 30 sec |

### QA-007: Ingestion Source Fault Tolerance

| Part | Description |
|------|-------------|
| **Source** | Knowledge Source (Confluence) |
| **Stimulus** | Source unavailable during ingestion |
| **Environment** | Scheduled indexing |
| **Artifact** | Ingestion pipeline |
| **Response** | System logs error, continues with other sources, retries on schedule |
| **Measure** | 0 data loss from other sources, retry within 15 min |

### QA-008: API Authentication

| Part | Description |
|------|-------------|
| **Source** | Unauthorized user |
| **Stimulus** | Direct access attempt to API endpoints |
| **Environment** | Production |
| **Artifact** | API Gateway |
| **Response** | Request rejected with 401/403 |
| **Measure** | 100% unauthorized requests blocked |

### QA-009: Prompt Injection Protection

| Part | Description |
|------|-------------|
| **Source** | Discord user |
| **Stimulus** | Prompt injection in RAG query |
| **Environment** | Normal operation |
| **Artifact** | RAG Pipeline, LLM layer |
| **Response** | System filters/detects injection, responds safely |
| **Measure** | No sensitive data leakage, system prompts not disclosed |

### QA-010: User Onboarding

| Part | Description |
|------|-------------|
| **Source** | New user (Architect) |
| **Stimulus** | First interaction via Discord Bot |
| **Environment** | Normal operation |
| **Artifact** | Bot UI/UX |
| **Response** | Bot provides onboarding with available commands and examples |
| **Measure** | User performs first useful query within ≤ 2 minutes |

### QA-011: Domain Testability

| Part | Description |
|------|-------------|
| **Source** | Developer |
| **Stimulus** | Running domain layer unit tests |
| **Environment** | CI pipeline |
| **Artifact** | Domain modules |
| **Response** | Tests run in isolation without external dependencies |
| **Measure** | 0 infrastructure dependencies, execution time ≤ 30 sec |

### QA-012: MCP Interoperability

| Part | Description |
|------|-------------|
| **Source** | Claude Code (MCP client) |
| **Stimulus** | Query to DSS via MCP protocol |
| **Environment** | Normal operation |
| **Artifact** | MCP Server interface |
| **Response** | DSS responds with standard MCP response containing RAG context |
| **Measure** | Full MCP spec compatibility, response ≤ 10 sec |
