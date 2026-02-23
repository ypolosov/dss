# Decomposition (ADD)

**Element to decompose:** Gambling Platform (software system).

**Source:** [Business Architecture — Systems Levels](https://veryuniquename.atlassian.net/wiki/spaces/G/pages/229834764/Business+Architecture).

---

## First-level decomposition (containers)

The platform is decomposed into three main containers:

| Container | Responsibility |
|-----------|----------------|
| **Platform Infrastructure** | Shared platform: Gateway, CI/CD, Platform CRM, Events bus, IAM, Reports. Container Registry, Secrets, Configuration, Observability, platform instance environment. |
| **Operator Tenant** | Per-tenant backoffice: Gateway, Operator CRM, Events bus, IAM, Reports. One logical tenant per Operator. |
| **Casino** | Per-brand B2C: Gateway, Brand (front), IAM, CMS, Events bus; integrations (Games, Payments, AML, KYC, Affiliations, Fraud detection). One logical casino per Brand. |

**Relationships (conceptual):**

- Platform Infrastructure hosts and operates Operator Tenants.
- Operator Tenant hosts and operates Casinos.
- **Platform Owner** manages Platform Infrastructure (and thus tenants).
- **Operator** manages Operator Tenant and its Casinos.
- **Player** (end-user) uses Casino.

---

## Value streams (reference)

- **Platform Development:** Plan → Develop → Test → Release → Deploy → Operate → Maintain.
- **Platform Operations (White Label / Turnkey):** Browse platform, manage staff, integrations, deploy tenant, onboard operator, deploy casino, operate, reports, analytics.
- **B2B (White Label / Turnkey):** Operator manages tenant, game/payment providers, casinos, players, deposits/withdrawals, KYC/AML, complaints, promos/bonuses, support, compliance, reports, analytics.
- **B2C:** Player browses casino, onboard, select game, play, deposit/withdraw, profile, responsible gambling, promotions, support.

Detailed stages and capabilities are in Business Architecture (Value Streams, Business Capabilities).

---

## Next ADD steps

- **Part 2.2:** Define interfaces between Platform Infrastructure ↔ Operator Tenant ↔ Casino.
- **Part 2.3:** Verify and refine requirements (constraints per container).
- **Part 2.4:** Choose next element to decompose (e.g. Platform Infrastructure, Operator Tenant, or Casino) and repeat.
