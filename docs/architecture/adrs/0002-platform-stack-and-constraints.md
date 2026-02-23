# 2. Platform stack and technical constraints

## Status

Accepted

## Context

The platform must deliver MVP in 1 year, reduce development cost and time (use of ready-made services), and align with team skills and market availability of developers. Regulatory and integration requirements (payments, games, KYC/AML, fraud) must be met.

## Decision

- **Runtime:** Node.js. **Language:** TypeScript/JavaScript.
- **Backend:** Nest.js for API and microservices.
- **Frontend:** Next.js (B2C and SSR); Refine for operator and platform back-office.
- **Data:** PostgreSQL (ACID, source of truth), TypeORM; Redis for caching.
- **API style:** REST + SSE for platform and tenant APIs.
- **DevOps:** Jenkins (CI); Digital Ocean (dev), AWS (prod); Cloudflare (DNS/CDN). Monorepo in Bitbucket.
- **Integrations:** Seon (fraud), Praxis (payments), Softswiss (games), SendGrid (notifications), LiveChat (support), Google Analytics. HashiCorp Vault for secrets; Payload for CMS.

## Consequences

- Backend and frontend are JavaScript/TypeScript; team can share types and tooling.
- Nest.js and Next.js provide structure and speed for MVP; Refine accelerates back-office UIs.
- PostgreSQL and Redis are well-understood; integration layer must abstract external providers (payments, games, KYC/AML).
- Regulatory and multi-tenant concerns (data isolation, reporting, licensing) must be designed into the architecture from the start.
