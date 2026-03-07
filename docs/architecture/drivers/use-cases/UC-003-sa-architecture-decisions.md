# UC-003: Solution Architect — Architecture Decision Support

## Actor
Solution Architect (human or AI agent)

## Channel
Discord Bot, Claude Code, Telegram Bot, Slack Bot, Web App

## Preconditions
- Target project context is set
- Architecture documentation exists (ADRs, C4 diagrams, drivers)

## Main Flow
1. SA describes architecture question or design problem
2. System retrieves relevant context: existing ADRs, patterns, constraints, quality attributes
3. System proposes options with trade-off analysis grounded in project knowledge
4. SA makes decision, system formalizes into artifacts (ADR, C4 updates)

## Supported Workflows
- ADD 3.0 iterations
- ADR creation and updates
- C4 diagram generation and updates
- Architecture review against quality attribute scenarios
- Documentation actualization

## Postconditions
- Architecture decisions documented (ADRs)
- Diagrams updated
- Decisions traceable to drivers
