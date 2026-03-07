# QAW Scenario Template

## 6-Part Quality Attribute Scenario

```markdown
# QA-NNN: {Short Title}

## Quality Attribute
{e.g., Performance, Availability, Security, Scalability, Modifiability, Integrability}

## Scenario

| Part | Description |
|------|-------------|
| **Source** | {Who or what generates the stimulus} |
| **Stimulus** | {What condition or event occurs} |
| **Artifact** | {What part of the system is affected} |
| **Environment** | {Under what conditions (normal, peak, failure)} |
| **Response** | {What the system should do} |
| **Measure** | {Quantitative measure of the response} |

## Example

| Part | Description |
|------|-------------|
| **Source** | 10,000 concurrent users |
| **Stimulus** | Place bets during a live football match |
| **Artifact** | Betting API |
| **Environment** | Peak load (Champions League final) |
| **Response** | Process bet and confirm |
| **Measure** | 95th percentile latency < 200ms |

## Priority
- Business Priority: {H/M/L}
- Technical Difficulty: {H/M/L}

## Notes
{Additional context, related scenarios, trade-offs}
```

## Common Quality Attributes for Gambling Platforms

1. **Performance** - Latency, throughput, resource utilization
2. **Availability** - Uptime, MTTR, fault tolerance
3. **Security** - Authentication, authorization, data protection, fraud prevention
4. **Scalability** - Horizontal scaling, elastic capacity
5. **Modifiability** - Time to add features, deploy changes
6. **Integrability** - Third-party game/payment provider integration
7. **Testability** - Test coverage, test automation
8. **Deployability** - CI/CD, rollback capability
9. **Observability** - Monitoring, logging, tracing
10. **Regulatory Compliance** - Licensing, responsible gambling, AML
