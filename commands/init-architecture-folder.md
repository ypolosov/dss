---
name: init-architecture-folder
description: Initialize architecture documentation structure (workspace.dsl, docs/, adrs/) in the project. Usage: run when starting architecture docs from scratch.
---

# Initialize architecture folder

Use the **Init architecture docs** skill to create the full structure in this project:

- Structurizr workspace (e.g. `docs/architecture/workspace.dsl` or `.structurizr/workspace.dsl`) with `!docs` and `!adrs` stubs
- `docs/` (or `docs/architecture/docs/`) with a sample context/overview doc
- `adrs/` with one example ADR (MADR format)

Ask the user for the preferred base path (e.g. `docs/architecture` or `.structurizr`) if not already set, then create the files and folders. Confirm when done and suggest opening the ADD 3.0 step-by-step flow next.
