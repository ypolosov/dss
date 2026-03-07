# UC-004: Backend Developer — Code Generation Support

## Actor
Backend Developer (human or AI agent)

## Channel
Discord Bot, Claude Code, Telegram Bot, Slack Bot, Web App

## Preconditions
- Target project context is set
- Codebase is accessible via Git (Bitbucket)
- Architecture decisions and patterns are documented

## Main Flow
1. Backend developer describes coding task or problem
2. System retrieves relevant context: architecture decisions, code patterns, existing modules, requirements
3. System generates backend code aligned with project standards and architecture
4. Developer reviews, iterates, and applies

## Supported Workflows
- Module scaffolding (hexagonal architecture)
- API and service implementation
- Database schema and migration generation
- Feature implementation with context from ADRs and requirements
- Refactoring guided by architecture constraints

## Postconditions
- Generated code follows project conventions and architecture decisions
- Code traceable to requirements and design decisions
