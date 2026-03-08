# Utility Tree

## Quality Attribute Priorities

| ID | Quality Attribute | Scenario | Priority (H/M/L) | Difficulty (H/M/L) |
|----|-------------------|----------|-------------------|---------------------|
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

## Architecture-Significant Scenarios

Scenarios with **High Priority + High Difficulty** require explicit architectural decisions:

- **QA-005** — Multi-agent extensibility (agent orchestration design)

## Legend
- **Priority**: Business importance (High / Medium / Low)
- **Difficulty**: Technical difficulty to achieve (High / Medium / Low)
- Focus on items with High priority first
- Items with High priority AND High difficulty are architecture-significant

> Source: QAW Session 1 (2026-03-08). See [qaw-results.md](../../requirements/qaw-results.md) for full details.
