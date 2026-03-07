# DSS API: Decision Support System Backend

## Overview

NestJS + Mastra API with Discord bot and RAG pipeline. Provides architecture knowledge retrieval as RAG-MCP backend for the add-ai toolkit.

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

## MCP Servers

Configured in `.mcp.json`:
- `github` - GitHub MCP server for issues/PRs

## Environment Variables

See `.env.example` for required variables.
