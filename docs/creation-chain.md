# Creation Chain

## Concept
A creation chain is a sequence of creating systems where each creates value
for the next. Each creating system is universal — it can serve any target.

## DSS's Role: Knowledge Layer
DSS provides project knowledge retrieval through RAG + multi-agent + MCP:
- Architecture knowledge (ADRs, patterns, design decisions, rationale)
- Domain knowledge (from project sources: docs, issues, code, discussions)
- Contextual answers via specialized agents

## Recursive Loop
DSS architecture was designed using architecture-driven design methodology.
When DSS MCP server is operational, it feeds knowledge back to methodology
tools, enabling them to make better-informed design decisions about DSS itself.

## Current Status
- Architecture: defined (ADR-0001..0004, C4, utility tree, kanban)
- RAG pipeline: operational (LibSQLVector, OpenAI embeddings, MDocument chunking)
- Ingestion: local markdown docs via POST /ingestion/docs (34 files, 153 chunks)
- Agents: routing + SA agent with real vector-based retrieval
- MCP server: not implemented
- Chain status: OPEN (knowledge capabilities not yet available to upstream)

## Next Steps to Close the Chain
1. ~~Replace mock RAG with real embedding + vector pipeline~~ DONE
2. ~~Implement ingestion from local project docs~~ DONE
3. Extend ingestion to external sources (Discord, Confluence, Jira)
4. Implement MCP server exposing knowledge retrieval tools
5. Register in target project's `.mcp.json`
