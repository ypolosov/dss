# ADR-0006: API Authentication -- Global API Key Guard

## Status

Accepted

## Date

2026-03-15

## Context and Problem Statement

The DSS API Gateway currently applies authentication only to the Ingestion endpoint (`POST /ingestion/docs`) via a per-controller `@UseGuards(ApiKeyGuard)`. Chat endpoints (`POST /chat`, `POST /chat/sa`) are completely unprotected -- any client can send requests without authentication. This violates QA-008 which requires 100% of unauthorized requests to be blocked. The system needs a global authentication strategy that protects all endpoints by default, with an explicit opt-out mechanism for public endpoints.

## Decision Drivers

- QA-008: 100% unauthorized requests blocked (H,L)
- CONC-002: Human and AI Agent users -- both must authenticate
- CONS-004: Multiple interaction channels (Discord Bot, MCP Server, direct API) -- each needs credentials
- QA-010: User onboarding -- auth should not impede first useful query within 2 min

## Considered Options

1. Global API Key guard (deny-by-default)
2. Per-controller API key guards (current approach, extended)
3. JWT bearer tokens from the start

## Decision Outcome

Chosen option: "Global API Key guard", because it provides deny-by-default security with minimal complexity, leverages the existing `ApiKeyGuard` implementation, and is appropriate for the current single-tenant, trusted-client deployment model. JWT/OAuth is planned as a future evolution when multi-tenant or delegated access scenarios emerge.

### Implementation Design

#### Global Guard Registration

The `ApiKeyGuard` is registered as a global guard via NestJS `APP_GUARD` provider, replacing per-controller `@UseGuards()` decorators:

```typescript
// app.module.ts
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class AppModule {}
```

#### Guard Logic

| Check | Result |
|-------|--------|
| Endpoint has `@Public()` decorator | PASS (skip auth) |
| `DSS_API_KEY` env var not set | PASS (dev mode, no auth required) |
| `x-api-key` header matches `DSS_API_KEY` | PASS (authenticated) |
| `x-api-key` header missing or mismatched | REJECT 401 |

The existing guard logic for `INGESTION_API_KEY` is consolidated into a single `DSS_API_KEY` environment variable, simplifying key management.

#### @Public() Decorator

Endpoints that must be accessible without authentication (health checks, readiness probes) use the `@Public()` decorator:

```typescript
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

#### Endpoint Protection Matrix

| Endpoint | Auth Required | Rationale |
|----------|--------------|-----------|
| `POST /chat` | Yes | Core query endpoint -- must be authenticated |
| `POST /chat/sa` | Yes | Direct agent access -- must be authenticated |
| `POST /ingestion/docs` | Yes | Data modification -- must be authenticated |
| `GET /health` (future) | No (@Public) | Kubernetes liveness/readiness probes |

#### Client Configuration

| Client | How it authenticates |
|--------|---------------------|
| Discord Bot | Sends `x-api-key` header in HTTP requests to API Gateway |
| MCP Server | Sends `x-api-key` header (configured via MCP server env) |
| Direct API users | Include `x-api-key` header in requests |
| Mastra Dashboard | Localhost bypass or API key in dev mode |

#### Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `DSS_API_KEY` | Shared API key for all clients | Production: yes. Dev: no (auth disabled if unset) |
| `INGESTION_API_KEY` | Deprecated -- consolidated into `DSS_API_KEY` | No (backward compat for 1 release) |

### Evolution Path

| Phase | Auth Mechanism | Trigger |
|-------|---------------|---------|
| **Phase 1** (current) | Shared API key (`x-api-key`) | Single-tenant, trusted clients |
| **Phase 2** | JWT bearer tokens with client ID claims | Multi-tenant deployment or per-client rate limiting needed |
| **Phase 3** | OAuth2 with scopes | Third-party integrations, delegated access (MCP marketplace) |

The `ApiKeyGuard` is designed to be replaceable -- the global `APP_GUARD` pattern means switching to JWT requires only changing the guard implementation, not touching controllers.

### Consequences

#### Good

- Deny-by-default posture -- new endpoints are automatically protected without developer action
- Removes the current vulnerability where chat endpoints are unprotected
- Single `DSS_API_KEY` simplifies key management vs. per-module keys
- Dev-friendly: auth is disabled when `DSS_API_KEY` is not set (local development)
- `@Public()` decorator is explicit -- security reviewers can easily audit which endpoints are open
- Global guard is non-invasive -- removes `@UseGuards()` from individual controllers

#### Bad

- Shared API key means all clients have identical access -- no per-client authorization
- API key in header is less secure than JWT (no expiration, no claims, no signature verification)
- Key rotation requires coordinated update across all clients + restart
- No audit trail of which client made a request (all share same key)

#### Neutral

- API key auth is stateless -- no session storage needed
- Health endpoint exception via `@Public()` is a common NestJS pattern
- CORS and rate limiting are orthogonal concerns -- not addressed in this ADR

## Pros and Cons of the Options

### Option 1: Global API Key guard (deny-by-default)

- Good, because deny-by-default prevents accidental exposure of new endpoints
- Good, because leverages existing `ApiKeyGuard` implementation -- minimal code change
- Good, because appropriate for current single-tenant, trusted-client model
- Good, because dev-friendly -- no auth overhead when key is not configured
- Bad, because shared key provides no per-client differentiation
- Bad, because no token expiration -- compromised key requires manual rotation

### Option 2: Per-controller API key guards (extend current approach)

- Good, because explicit -- each controller declares its auth requirement
- Bad, because opt-in model -- new endpoints are unprotected by default (security gap)
- Bad, because developer must remember to add `@UseGuards()` to every new controller
- Bad, because current state already demonstrates the risk -- chat endpoints are unprotected

### Option 3: JWT bearer tokens from the start

- Good, because industry-standard, supports claims, expiration, and signature verification
- Good, because per-client identity from day one
- Bad, because requires token issuance infrastructure (auth server or manual token generation)
- Bad, because premature complexity -- no current need for per-client identity or token expiration
- Bad, because slows down onboarding (QA-010) -- clients need to obtain and manage tokens
- Bad, because violates YAGNI -- multi-tenant scenario is not yet confirmed

## More Information

- Iteration: ITER-03
- Related: [ADR-0001](0001-container-decomposition.md) (API Gateway container)
- QA-008 scenario: `docs/architecture/drivers/quality-attributes/QA-008-api-authentication.md`
- Existing guard: `packages/dss-api/src/common/guards/api-key.guard.ts`
- NestJS global guards: https://docs.nestjs.com/guards#binding-guards
