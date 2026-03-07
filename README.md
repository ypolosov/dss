# DSS — Decision Support System

RAG-powered architecture knowledge API for retrieving and reasoning about architecture decisions, patterns, and project knowledge.

## Tech Stack

- **Runtime**: NestJS (TypeScript)
- **AI/LLM**: Mastra framework + Claude (Anthropic API)
- **Database**: PostgreSQL + pgvector (vector storage)
- **ORM**: Drizzle ORM
- **Bot**: Discord.js (team interaction)
- **Knowledge Sources**: Discord, Confluence, Jira
- **Diagrams**: LikeC4 (C4 model as code)

## Architecture

The system ingests knowledge from multiple sources (Discord channels, Confluence pages, Jira issues), generates embeddings via LLM, stores them in PostgreSQL + pgvector, and provides RAG-based retrieval through an MCP-compatible API.

## Documentation

- [Architecture Documentation](docs/architecture/) — ADD 3.0 methodology, C4 diagrams, ADRs
- [CLAUDE.md](CLAUDE.md) — Project instructions for Claude Code CLI
