# QA-001: RAG Query Response Time

## Quality Attribute
Performance

## Scenario

| Part | Description |
|------|-------------|
| **Source** | Architect via Discord Bot |
| **Stimulus** | Asks a question about architecture decision |
| **Environment** | Normal operation, DB contains ~100K embeddings |
| **Artifact** | RAG Pipeline |
| **Response** | System retrieves relevant context and generates answer |
| **Measure** | Response time ≤ 10 sec (including LLM call) |

## Priority: H
## Difficulty: M

## Related
- [UC-003](../use-cases/UC-003-sa-architecture-decisions.md)
- CONC-004 (Project-Specific RAG Context)
