---
description: GT gambling platform project context
globs: **/*
---

# GT Project Context

## Overview
GT is an online gambling platform (casino + sports betting). The DSS system supports architecture and development decisions for this platform.

## Tech Stack
- **Backend**: NestJS (TypeScript), hexagonal architecture, DDD
- **Database**: PostgreSQL + pgvector
- **ORM**: Drizzle ORM
- **Messaging**: Discord bot (discord.js) for team communication
- **AI/LLM**: Claude (via Anthropic API / Mastra framework)
- **RAG Sources**: Discord channels, Confluence, Jira
- **Diagrams**: LikeC4 (C4 model as code)
- **CI/CD**: GitHub Actions
- **Project Management**: GitHub Issues + Projects

## Architecture Approach
- ADD 3.0 (Attribute-Driven Design) methodology
- MADR v3 for Architecture Decision Records
- C4 model for architecture visualization (via LikeC4)
- Hexagonal (ports & adapters) architecture pattern
- Domain-Driven Design (DDD) tactical patterns
- Modular monolith as initial deployment strategy

## Key Quality Attributes
Priority quality attributes for the GT platform (to be refined via QAW):
- Performance (latency for real-time betting)
- Availability (24/7 operation)
- Security (financial transactions, PII)
- Scalability (concurrent users during events)
- Modifiability (rapid feature delivery)
- Integrability (third-party game providers, payment systems)
