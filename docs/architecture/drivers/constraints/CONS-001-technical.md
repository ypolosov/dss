# Technical Constraints

## CONS-001: Single Project Scope
DSS is project-agnostic but each instance serves exactly one target project. Configurable to any project, but no runtime multi-project switching.

## CONS-002: Tech Stack (DSS itself)
- Runtime: Node.js, TypeScript
- Framework: NestJS (hexagonal architecture, DDD)
- AI/LLM: Mastra framework (non-negotiable), Claude (Anthropic API)
- Database: PostgreSQL + pgvector
- ORM: Drizzle ORM
- Bot: Discord.js

## CONS-003: Knowledge Sources (first target project)
Extensible via adapter pattern. First project integrations:
- Discord channels, threads, messages (project development discussions)
- Atlassian Confluence (project requirements)
- Atlassian Jira (Scrum project management)
- Atlassian Bitbucket (project source code)
- LikeC4 (architecture as code)
- Kubernetes cluster API (runtime infrastructure)

## CONS-004: Interaction Channels
- Primary (work): Discord Bot
- Primary (debug): Mastra Dashboard
- Future: Claude Code, Telegram Bot, Slack Bot, Web App

## CONS-005: Multi-Agent Architecture
System is implemented as a multi-agent system with specialized agents per role/workflow.

## CONS-006: Target Project Stack
First target project (GT) uses Atlassian stack (Jira, Confluence, Bitbucket), not GitHub.
