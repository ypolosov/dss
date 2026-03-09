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
- Architecture: defined (ADR-0001..0003, C4, utility tree, kanban)
- Implementation: prototype (mock RAG, no real knowledge retrieval)
- MCP server: not implemented
- Chain status: OPEN (knowledge capabilities not yet available to upstream)

## Next Steps to Close the Chain
1. Replace mock RAG with real embedding + pgvector pipeline
2. Implement ingestion from project sources
3. Implement MCP server exposing knowledge retrieval tools
4. Register in target project's `.mcp.json`
