# QA-002: Ingestion Without Query Degradation

## Quality Attribute
Performance

## Scenario

| Part | Description |
|------|-------------|
| **Source** | Ingestion scheduler |
| **Stimulus** | Full re-indexing of Discord channel (~10K messages) |
| **Environment** | Background process, system serves user queries |
| **Artifact** | RAG Pipeline, pgvector |
| **Response** | Indexing completes without degrading user-facing queries |
| **Measure** | Query throughput drops no more than 20% during ingestion |

## Priority: M
## Difficulty: M

## Related
- CONC-006 (Knowledge Source Extensibility)
