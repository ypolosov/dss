# QA-007: Ingestion Source Fault Tolerance

## Quality Attribute
Reliability

## Scenario

| Part | Description |
|------|-------------|
| **Source** | Knowledge Source (Confluence) |
| **Stimulus** | Source unavailable during ingestion |
| **Environment** | Scheduled indexing |
| **Artifact** | Ingestion pipeline |
| **Response** | System logs error, continues with other sources, retries on schedule |
| **Measure** | 0 data loss from other sources, retry within 15 min |

## Priority: M
## Difficulty: L

## Related
- CONC-006 (Knowledge Source Extensibility)
