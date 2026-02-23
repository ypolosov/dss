# Architecture overview

B2B2C SaaS gambling platform that enables **B2B tenants** (gambling Operators) to efficiently manage and deploy **B2C online Casinos** under unique Brands. The platform is scalable, secure, and customizable; it aims to enhance user engagement, ensure regulatory compliance, and provide advanced analytics. By reducing IT costs, enabling quick market entry, and offering tailored user experiences, it helps Operators increase revenue and profitability.

**MVP target: 1 year.**

**Source of truth:** [Business Architecture](https://veryuniquename.atlassian.net/wiki/spaces/G/pages/229834764/Business+Architecture) (Confluence, space G — GromTech). This repo reflects that content for ADD 3.0 and C4.

## Drivers (summary)

- **Functional:** Multi-tenant platform for Operators to manage and deploy B2C casinos; per-tenant branding; operator and tenant management; deployment and configuration of casino instances; user engagement, regulatory compliance, advanced analytics; integrations (games, payments, KYC/AML, fraud, affiliates).
- **Quality attributes:** Scalability (multi-tenant, many brands/casinos); security (payments, PII, gambling compliance); customizability per tenant/brand; reliability and availability for gambling operations; regulatory compliance (jurisdictions, licensing, responsible gambling).
- **Constraints:** MVP in 1 year; B2B2C and multi-tenant model; regulated gambling markets; competitive market (time-to-market, cost efficiency); stack and integrations fixed (see [01-requirements.md](01-requirements.md) and [ADR 0002](../adrs/0002-platform-stack-and-constraints.md)).

## Decomposition focus

First element to decompose: **Gambling Platform** (whole product). Target first-level containers from Business Architecture: **Platform Infrastructure**, **Operator Tenant**, **Casino** (see [02-decomposition.md](02-decomposition.md)).
