---
name: init-architecture-docs
description: Initialize architecture documentation structure in the project — workspace.dsl with !docs/!adrs, docs/ and adrs/ folders, plus one example doc and one example ADR (MADR).
---

# Init architecture docs

Use when the user wants to create the full architecture documentation layout in the **target project** from scratch.

## Required input

- **Base path** (choose one unless the user specifies):
  - `docs/architecture/` — good for visibility; put `workspace.dsl` there and `docs/`, `adrs/` as subfolders.
  - `.structurizr/` — keeps DSL at repo root level; put `docs/` and `adrs/` alongside or under it.

Recommendation: `docs/architecture/` with `workspace.dsl` at `docs/architecture/workspace.dsl`, and `docs/architecture/docs/`, `docs/architecture/adrs/` for Markdown and ADRs.

## Steps

1. Create the base directory (e.g. `docs/architecture/`).
2. Create **workspace.dsl** with:
   - `workspace` block, name and description.
   - `model` with one placeholder `softwareSystem` (e.g. "Main System").
   - `!docs "docs"` — references the `docs/` subfolder (relative to the DSL file).
   - `!adrs "adrs" madr` — references the `adrs/` subfolder and use MADR importer.
3. Create **docs/** and add one Markdown file, e.g. **00-overview.md**, with a short "Architecture overview" and "Drivers (to be filled)" section.
4. Create **adrs/** and add one ADR in MADR format, e.g. **0001-use-structurizr-and-add.md**, with: Title, Status (e.g. Accepted), Context, Decision, Consequences.

## Example workspace.dsl (minimal)

```dsl
workspace "Solution Architect Demo" "Architecture documentation and C4 model." {

    model {
        softwareSystem "Main System" "Placeholder; refine in ADD iterations."
    }

    !docs "docs"
    !adrs "adrs" madr
}
```

Paths in `!docs` and `!adrs` are relative to the directory containing the DSL file. So if the DSL is at `docs/architecture/workspace.dsl`, use `!docs "docs"` and `!adrs "adrs" madr` and create `docs/architecture/docs/` and `docs/architecture/adrs/`.

## Example 00-overview.md (docs/)

```markdown
# Architecture overview

(To be filled during ADD 3.0 iterations.)

## Drivers

- **Functional:** —
- **Quality attributes:** —
- **Constraints:** —
```

## Example ADR (adrs/ — MADR)

Filename e.g. `0001-use-structurizr-and-add.md`:

```markdown
# 1. Use Structurizr DSL and ADD 3.0 for architecture docs

## Status

Accepted

## Context

We need a single source of truth for architecture and decisions in the repo.

## Decision

We use Structurizr DSL (C4) with !docs and !adrs, and follow ADD 3.0 for design steps.

## Consequences

- Diagrams and docs live in the repo; Structurizr vNext (local/export) for viewing.
- ADRs in MADR format for compatibility with Structurizr importers.
```

## Output

After creating the files, tell the user where everything is and suggest running **ADD 3.0 step-by-step** (or the "Start ADD iteration" command) to begin the first iteration.
