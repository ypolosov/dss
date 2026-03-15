# DSS API: Decision Support System Backend

## Overview

NestJS + Mastra API with Discord bot and RAG pipeline. Provides architecture knowledge retrieval as RAG-MCP backend for the add-ai toolkit.

## Creation Chain Context

DSS serves as the knowledge layer in a creation chain — a sequence of creating
systems where each creates value for the next.

- DSS architecture was designed using architecture-driven design methodology (ADD 3.0)
- When MCP server is implemented, DSS provides project knowledge retrieval capabilities
  to any upstream creating system or target project
- First-principles thinking capabilities can be applied to analyze DSS architecture

### MCP Server Contract (future)
When implemented, DSS MCP server will provide knowledge retrieval tools:
- Architecture decision search (ADRs, design decisions, rationale)
- Pattern and tactics retrieval
- Domain knowledge queries
Target projects register DSS in `.mcp.json` to enable knowledge retrieval.

## Tech Stack

- **Runtime**: Node.js, TypeScript
- **Framework**: NestJS (hexagonal architecture, DDD)
- **AI/LLM**: Mastra framework, Claude (Anthropic API)
- **Database**: PostgreSQL + pgvector
- **ORM**: Drizzle ORM
- **Bot**: Discord.js
- **RAG Sources**: Discord channels, Confluence, Jira
- **Diagrams**: LikeC4 (C4 model as code)
- **CI/CD**: GitHub Actions
- **Project Management**: GitHub Issues

## Project Structure

```
docs/
  architecture/          # ADD 3.0 documentation
    c4/                  # LikeC4 diagrams (C4 model as code)
    adrs/                # Architecture Decision Records (MADR v3)
    drivers/             # Use cases, quality attributes, constraints, concerns
    decisions/           # Design decisions log
    iterations/          # ADD iteration logs
    kanban.md            # Design kanban board
    utility-tree.md      # Quality attribute priorities
  requirements/          # Requirements (utility tree, QAW, use cases)
packages/
  dss-api/               # NestJS + Mastra API application
```

## Language Policy

- **User interaction**: Russian (all responses, questions, options)
- **Code & artifacts**: English (variable names, commit messages, ADR titles, LikeC4 DSL)
- **Documentation content**: Russian for narratives, English for technical terms

## Human-in-the-Loop Principle

The agent PROPOSES, the human DECIDES. Every response must end with 3-5 numbered options. Never make irreversible decisions autonomously.

## Key Paths

- `docs/architecture/` - Architecture documentation (ADD iterations, ADRs, C4 diagrams)
- `docs/architecture/c4/` - LikeC4 project (diagrams as code)
- `docs/architecture/adrs/` - Architecture Decision Records (MADR v3)
- `docs/requirements/` - Requirements (utility tree, QAW, use cases)
- `packages/dss-api/` - NestJS + Mastra API application

## Build & Test Commands

```bash
# LikeC4 diagrams
cd docs/architecture/c4 && npx likec4 serve    # Dev server
cd docs/architecture/c4 && npx likec4 build     # Build static site

# GitHub CLI
gh issue list                                    # List issues
gh issue create --title "..." --body "..."       # Create issue
```

## Development Workflow: Plugin-First Approach

When working on DSS, ALWAYS use add-ai and fpf-ai plugin skills as primary tools:

### Before implementation
1. Read relevant ADRs (`docs/architecture/adrs/`) and C4 model (`docs/architecture/c4/src/`)
2. Use `fpf-ai:fpf-review` or `fpf-ai:fpf-analyze` to validate design approach
3. Use `add-ai:review-code` scope to understand existing patterns

### During implementation
- `add-ai:dev-implement` — implement features following ADRs and architecture patterns
- `add-ai:dev-scaffold` — scaffold new modules with hexagonal architecture
- `add-ai:sa-adr` — create ADR when making a new architectural decision
- `add-ai:sa-diagram` — update C4 diagrams when adding containers/components
- `fpf-ai:fpf-design` — design new subsystems using first principles

### After implementation
1. `add-ai:review-code` — verify implementation against ADRs and patterns
2. `add-ai:nav-consistency` — check cross-artifact consistency (C4 refs, artifact IDs)
3. `fpf-ai:fpf-review` — check boundary discipline and composition correctness
4. Update C4 model if new components were added

### Key principle
Architecture artifacts (`docs/architecture/`) are the source of truth for design decisions. Code must follow them. If code needs to diverge — create or update an ADR first, then implement.

## Project Ecosystem

- DSS is a universal RAG system; this is the first target project using it
- DSS knows about add-ai (ADD 3.0 methodology) and fpf-ai (first-principles thinking)
- DSS does not reference other target projects outside its known ecosystem
- Architecture was designed using ADD 3.0 (via add-ai plugin)
- During DSS sessions, add-ai and/or fpf-ai plugins may be loaded

## Diagramming

- This project uses LikeC4 for C4 diagrams
- Diagram source files: `docs/architecture/c4/src/`
- Validation: `cd docs/architecture/c4 && npx likec4 validate`
- Never generate Mermaid or PlantUML syntax

## Validation Rules

- Before referencing a C4 element — verify it exists in `docs/architecture/c4/src/model.c4`
- Before cross-referencing an artifact (UC-NNN, QA-NNN, ADR-NNNN) — verify the file exists in the corresponding directory

## MCP Servers

Configured in `.mcp.json`:
- `github` - GitHub MCP server for issues/PRs

## Environment Variables

See `.env.example` for required variables.
