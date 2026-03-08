# QA-006: LLM Provider Fault Tolerance

## Quality Attribute
Reliability

## Scenario

| Part | Description |
|------|-------------|
| **Source** | LLM Provider (Claude API) |
| **Stimulus** | API returns 429 (rate limit) or 503 |
| **Environment** | Normal operation |
| **Artifact** | LLM integration layer |
| **Response** | System retries with exponential backoff, informs user of delay |
| **Measure** | Up to 3 retries, user gets response or clear error within 30 sec |

## Priority: H
## Difficulty: L

## Related
- CONS-002 (Tech Stack — Mastra framework)
