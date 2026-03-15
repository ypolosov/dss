# ADR-0005: LLM Fault Tolerance -- Retry with Exponential Backoff and Circuit Breaker

## Status

Accepted

## Date

2026-03-15

## Context and Problem Statement

DSS depends on an external LLM provider (Claude API via Anthropic) for both agent responses and embedding generation. The provider can return transient errors (429 rate limit, 503 service unavailable) which currently propagate as unhandled 500 errors to users. The system needs a resilience strategy that retries transient failures, prevents cascading failures during sustained outages, and provides clear feedback to users when the LLM is unavailable (QA-006: response or clear error within 30 seconds).

## Decision Drivers

- QA-006: LLM retry + graceful degradation within 30 sec (H,L)
- QA-001: RAG query response within 10 sec (H,M) -- retry must not violate this budget under normal conditions
- CONS-002: Mastra framework (non-negotiable) -- solution must work within Mastra agent model
- CONC-003: Workflow orchestration -- multi-step workflows must handle mid-flow LLM failures

## Considered Options

1. Retry with exponential backoff + circuit breaker (layered resilience)
2. Simple retry with fixed delay (retry only)
3. LLM provider failover (multi-provider)

## Decision Outcome

Chosen option: "Retry with exponential backoff + circuit breaker", because it provides layered resilience -- retry handles transient spikes, circuit breaker prevents cascading failures during sustained outages, and graceful degradation gives users actionable feedback. All within the 30-second total budget defined by QA-006.

### Resilience Layers

| Layer | Responsibility | Configuration |
|-------|---------------|---------------|
| Retry | Handle transient 429/503 errors | Max 3 retries, base 1s, factor 2x, jitter |
| Circuit Breaker | Prevent cascading failures | Threshold 5 failures, recovery 30s, half-open probe |
| Graceful Degradation | User-facing error response | Structured JSON with `retryAfter` hint |

### Retry Configuration

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Max retries | 3 | Covers typical rate-limit bursts without exceeding 30s budget |
| Base delay | 1000 ms | Sufficient for rate-limit recovery |
| Backoff factor | 2x | Exponential: 1s, 2s, 4s (total ~7s worst case) |
| Jitter | +/- 500ms | Prevents thundering herd across concurrent requests |
| Retryable errors | 429, 503, ECONNRESET, ETIMEDOUT | Transient network and provider errors |

### Timing Budget (QA-006 compliance)

| Scenario | Time Budget |
|----------|-------------|
| Normal (no retries) | 8-10s (within QA-001) |
| 1 retry | ~11s |
| 2 retries | ~13s |
| 3 retries (all fail) | ~17s + circuit breaker evaluation |
| Circuit breaker open | Immediate fail (~50ms) + degraded response |
| **Worst case** | **< 20s** (well within 30s QA-006 budget) |

### Circuit Breaker States

```
CLOSED (normal operation)
  -- Tracks consecutive failure count
  -- After 5 consecutive failures: transition to OPEN

OPEN (fast-fail mode)
  -- All LLM calls immediately rejected
  -- Returns graceful degradation response
  -- After 30s timeout: transition to HALF-OPEN

HALF-OPEN (recovery probe)
  -- Allows exactly 1 LLM call through
  -- Success: transition to CLOSED, reset failure count
  -- Failure: transition back to OPEN, restart 30s timer
```

### Implementation Approach

The resilience logic is implemented as a NestJS interceptor wrapping agent calls in the chat service layer, between the API Gateway and Agent Orchestrator:

```
ChatController -> LlmResilienceInterceptor -> ChatService -> Mastra Agent -> LLM Provider
```

The interceptor:
1. Checks circuit breaker state (fast-fail if OPEN)
2. Delegates to the agent call
3. On transient error: retries with exponential backoff
4. On persistent failure: opens circuit breaker, returns structured error

Mastra's `Agent.generate()` and `Agent.stream()` calls are the wrap points. The Mastra model configuration also supports provider-level `maxRetries` which handles basic retry at the SDK level, but the circuit breaker and graceful degradation require the application-layer interceptor.

### Graceful Degradation Response

When all retries are exhausted or circuit breaker is open, the system returns:

```json
{
  "error": "LLM_PROVIDER_UNAVAILABLE",
  "message": "LLM provider is temporarily unavailable. Please retry in 30 seconds.",
  "retryAfter": 30
}
```

This replaces the current behavior of propagating raw 500 errors.

### Consequences

#### Good

- Transient LLM errors (429, 503) are handled transparently -- users often get a successful response without knowing about retries
- Circuit breaker prevents request pile-up during sustained outages -- fast-fail preserves system resources
- Structured error response gives users clear guidance on what to do
- Timing budget stays within QA-006's 30-second limit in all scenarios
- Interceptor pattern is non-invasive -- no changes to agent code or Mastra configuration

#### Bad

- Circuit breaker state is in-memory -- lost on restart (acceptable for single-instance deployment)
- During OPEN state, all users are affected even if the LLM has partially recovered (mitigated by 30s HALF-OPEN probe)
- Retry adds latency to already-slow LLM calls when retries are needed (bounded by 30s budget)
- No per-operation differentiation -- embedding calls and agent calls use same retry policy (sufficient for current scale)

#### Neutral

- Mastra SDK's built-in `maxRetries` provides a base layer -- the interceptor adds circuit breaker and graceful degradation on top
- Circuit breaker thresholds (5 failures, 30s recovery) are starting points -- tunable via environment variables
- Monitoring/alerting for circuit breaker state transitions is not included in this ADR -- should be addressed when observability strategy is defined

## Pros and Cons of the Options

### Option 1: Retry with exponential backoff + circuit breaker

- Good, because layered resilience handles both transient spikes and sustained outages
- Good, because exponential backoff with jitter prevents thundering herd
- Good, because circuit breaker protects system resources during prolonged failures
- Good, because graceful degradation gives users actionable feedback
- Bad, because more complexity than simple retry (circuit breaker state machine)
- Bad, because in-memory circuit breaker state is not shared across instances

### Option 2: Simple retry with fixed delay

- Good, because simple to implement -- no state machine
- Good, because covers the most common case (transient 429 errors)
- Bad, because no protection against sustained outages -- retries pile up
- Bad, because fixed delay is suboptimal (too short for rate limits, too long for transient errors)
- Bad, because no fast-fail mechanism -- every request waits through all retries even during outage

### Option 3: LLM provider failover (multi-provider)

- Good, because maximum availability -- if Claude is down, use OpenAI/Gemini
- Good, because eliminates single point of failure at LLM layer
- Bad, because violates CONS-002 (Mastra + Claude is the chosen stack)
- Bad, because significant complexity -- different prompt formats, response formats, capabilities
- Bad, because cost management across multiple providers
- Bad, because premature optimization -- Claude API has 99.9%+ availability

## More Information

- Iteration: ITER-03
- Related: [ADR-0001](0001-container-decomposition.md) (Agent Orchestrator container), [ADR-0002](0002-agent-orchestration-mastra-network.md) (Agent Network)
- QA-006 scenario: `docs/architecture/drivers/quality-attributes/QA-006-llm-fault-tolerance.md`
- Mastra model retry docs: model configuration supports `maxRetries` at SDK level
