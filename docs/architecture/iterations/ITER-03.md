# ITER-03: LLM Fault Tolerance & API Authentication

## Date
2026-03-15

## Goal
Address reliability of LLM integration layer (QA-006) and secure all API endpoints (QA-008). These are high-priority, low-difficulty drivers identified in ITER-01 and ITER-02 as next steps.

## Drivers Addressed
| ID | Driver | How Addressed |
|----|--------|---------------|
| QA-006 | LLM Fault Tolerance (H,L) | Retry with exponential backoff + circuit breaker pattern at Agent/Tool layer |
| QA-008 | API Authentication (H,L) | Global API Key guard for all endpoints, with evolution path to JWT/OAuth |

## Secondary Drivers Considered
| ID | Driver | Status |
|----|--------|--------|
| QA-002 | Ingestion throughput (M,M) | Partially addressed -- isolation via separate NestJS module provides scheduling foundation |
| QA-007 | Ingestion fault tolerance (M,L) | Partially addressed -- retry tactic at source adapter level follows same pattern as QA-006 |

## Elements Refined

### API Gateway -- Auth Layer
Current state: `ApiKeyGuard` applied only to `IngestionController` via `@UseGuards`. Chat endpoints are unprotected.

Refined to: Global `APP_GUARD` provider with `ApiKeyGuard`, applying authentication to **all** endpoints by default. Public endpoints (health check) can opt out via `@Public()` decorator.

| Component | Responsibility | Technology |
|-----------|---------------|------------|
| ApiKeyGuard (global) | Validates `x-api-key` header against `DSS_API_KEY` env var | NestJS Guard, APP_GUARD |
| @Public() decorator | Marks endpoints that skip auth (health, readiness) | NestJS SetMetadata |

### Agent Orchestrator -- LLM Resilience Layer
Current state: No error handling for LLM provider failures. A 429 or 503 from Claude API propagates directly to user as 500.

Refined to: Three-layer resilience strategy applied at Agent-to-LLM boundary.

| Component | Responsibility | Technology |
|-----------|---------------|------------|
| Retry with Backoff | Retries transient LLM errors (429, 503) up to 3 times with exponential backoff | Mastra model config / custom middleware |
| Circuit Breaker | Opens after N consecutive failures, fails fast for recovery period | NestJS interceptor / custom wrapper |
| Graceful Degradation | Returns informative error to user when all retries exhausted | NestJS ExceptionFilter |

## Design Concepts Applied

### Availability Tactics (QA-006)
- **Retry** -- exponential backoff (base 1s, factor 2x, max 3 retries, jitter) for transient 429/503 errors
- **Circuit Breaker** -- half-open/open/closed states; opens after 5 consecutive failures; 30s recovery window
- **Graceful Degradation** -- structured error response with retry guidance instead of raw 500

### Security Tactics (QA-008)
- **Authenticate Actors** -- API Key authentication as first layer (shared secret per client)
- **Authorize Access** -- all endpoints protected by default (deny-by-default posture)
- **Evolution Path** -- API Key now, JWT bearer tokens for multi-tenant scenarios, OAuth2 for delegated access in future

### Reliability Tactics (QA-002, QA-007 partial)
- **Source Isolation** -- each knowledge source adapter handles its own retry/skip logic independently
- **Process Isolation** -- ingestion runs as separate NestJS module, not blocking query path

## Detailed Design

### LLM Fault Tolerance (ADR-0005)

Retry flow:
```
User Request
  -> Agent Orchestrator
    -> LLM Call #1 (fail: 429)
      -> wait 1s + jitter
    -> LLM Call #2 (fail: 503)
      -> wait 2s + jitter
    -> LLM Call #3 (success)
  -> Response to user
```

Circuit breaker states:
```
CLOSED (normal) -- all calls pass through
  |-- 5 consecutive failures -->
OPEN (fast-fail) -- all calls rejected immediately, return cached/degraded response
  |-- 30 sec timeout -->
HALF-OPEN (probe) -- allow 1 test call
  |-- success --> CLOSED
  |-- failure --> OPEN
```

Graceful degradation response:
```json
{
  "error": "LLM_PROVIDER_UNAVAILABLE",
  "message": "LLM provider is temporarily unavailable. Please retry in 30 seconds.",
  "retryAfter": 30
}
```

### API Authentication (ADR-0006)

Global guard registration in `AppModule`:
```typescript
@Module({
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
```

Auth flow:
```
Request -> ApiKeyGuard (global)
  -> Check @Public() metadata
    -> If public: PASS
    -> If not public: validate x-api-key header
      -> Match DSS_API_KEY env: PASS (200)
      -> No match: REJECT (401)
      -> No DSS_API_KEY configured: PASS (dev mode)
```

Key rotation: Environment variable swap + restart. No session invalidation needed (stateless tokens).

Evolution milestones:
1. **Phase 1 (current)**: Shared API key per client (`x-api-key` header)
2. **Phase 2 (multi-tenant)**: JWT bearer tokens with client ID claims
3. **Phase 3 (delegated)**: OAuth2 for third-party integrations (MCP clients)

## Decisions Made
- [ADR-0005](../adrs/0005-llm-fault-tolerance-retry-circuit-breaker.md): LLM Fault Tolerance -- Retry with Exponential Backoff and Circuit Breaker
- [ADR-0006](../adrs/0006-api-authentication-global-api-key.md): API Authentication -- Global API Key Guard

## New Concerns Identified
- Circuit breaker state needs monitoring -- consider exposing via health endpoint
- API key management for multiple clients (Discord Bot, MCP Server, direct API users) -- single shared key sufficient for now, per-client keys when needed
- Rate limiting per client not yet addressed -- consider in future iteration when multi-client scenario emerges
- Ingestion Pipeline component decomposition still needs dedicated iteration (deferred from ITER-02)

## Assessment
| Driver | Status |
|--------|--------|
| QA-006 | Addressed -- retry + circuit breaker + graceful degradation defined |
| QA-008 | Addressed -- global API key guard, deny-by-default, evolution path to JWT/OAuth |
| QA-002 | Partially noted -- ingestion isolation via separate module, detailed scheduling deferred |
| QA-007 | Partially noted -- per-source retry follows QA-006 pattern, detailed design deferred |

## Next Steps
1. ITER-04: Ingestion Pipeline component decomposition + scheduling strategy (QA-002, QA-007)
2. Implement ADR-0005 -- add retry/circuit breaker to Mastra agent LLM calls
3. Implement ADR-0006 -- promote ApiKeyGuard to global, add @Public() decorator
4. Address QA-009 (Prompt injection protection) -- requires dedicated iteration
5. Circuit breaker monitoring via health endpoint
