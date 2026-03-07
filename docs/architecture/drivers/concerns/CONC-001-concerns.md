# Architecture Concerns

## CONC-001: Multi-Channel Extensibility
System starts with Discord Bot but must support adding new channels (Claude Code, Telegram, Slack, Web App) without redesigning core logic. Channels are adapters in hexagonal architecture.

## CONC-002: Human and AI Agent Users
Users can be both humans and AI agents. Interaction model must support both.

## CONC-003: Workflow Orchestration
Multi-step interactive workflows must be orchestrated across chat sessions. State must be preserved between steps.

## CONC-004: Project-Specific RAG Context
RAG retrieval must be scoped to the target project. Responses must be grounded in project-specific knowledge, not generic.

## CONC-005: Tool Integration
System provides not just information retrieval (RAG) but also actionable tools (create Jira issues, generate code, update docs, manage Bitbucket PRs, query Kubernetes, etc.).

## CONC-006: Knowledge Source Extensibility
Knowledge sources are adapters (hexagonal architecture). New sources can be added without modifying core logic. First set: Discord, Confluence, Jira, Bitbucket, LikeC4, Kubernetes API.

## CONC-007: Project Agnosticism
DSS must be configurable to any project. Project-specific configuration (sources, tools, conventions) must be externalized, not hardcoded.
