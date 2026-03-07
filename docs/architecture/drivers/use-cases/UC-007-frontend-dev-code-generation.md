# UC-007: Frontend Developer — Code Generation Support

## Actor
Frontend Developer (human or AI agent)

## Channel
Discord Bot, Claude Code, Telegram Bot, Slack Bot, Web App

## Preconditions
- Target project context is set
- Codebase is accessible via Git (Bitbucket)
- Architecture decisions, UI/UX patterns, and design system are documented

## Main Flow
1. Frontend developer describes coding task or problem
2. System retrieves relevant context: architecture decisions, UI patterns, component library, existing modules, requirements
3. System generates frontend code aligned with project standards and architecture
4. Developer reviews, iterates, and applies

## Supported Workflows
- Component scaffolding
- Page and feature implementation
- State management and API integration code
- Feature implementation with context from ADRs and requirements
- Refactoring guided by architecture constraints

## Postconditions
- Generated code follows project conventions and architecture decisions
- Code traceable to requirements and design decisions
