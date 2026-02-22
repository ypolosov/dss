---
name: structurizr-dsl-quick-ref
description: Quick reference for Structurizr DSL (C4, !docs, !adrs) and Structurizr vNext commands (local, export).
---

# Structurizr DSL quick ref

Use when the user or agent is editing or extending the Structurizr workspace (C4 model, docs, ADRs). Paths below assume the DSL file is e.g. `docs/architecture/workspace.dsl` with sibling folders `docs/` and `adrs/`.

## Workspace and docs/ADRs

```dsl
workspace "Name" "Description" {
    !docs "docs"                    // Markdown in docs/ (relative to DSL file)
    !adrs "adrs" madr               // ADRs: madr | adrtools | log4brains
    model { ... }
}
```

## C4 model (essentials)

- **Person:** `person "Name" "Description"`
- **Software system:** `softwareSystem "Name" "Description"`
- **Container:** inside a `softwareSystem` block: `container "Name" "Description"`
- **Component:** inside a `container` block: `component "Name" "Description"`
- **Relationship:** `person -> softwareSystem "Uses"` or `container -> container "Calls"`
- **Grouping:** `group "Group Name" { ... }` for grouping elements

Example:

```dsl
model {
    user = person "User" "End user"
    sys = softwareSystem "My System" "Description" {
        web = container "Web App" "Frontend"
        api = container "API" "Backend"
        web -> api "HTTP"
    }
    user -> sys "Uses"
}
```

## Views (optional)

- **System Context:** `views { systemContext sys { include * } }`
- **Container:** `container sys { include * }`
- **Component:** `component web { include * }`

## Structurizr vNext commands

- **View/edit diagrams locally:** `structurizr local` (or equivalent; see [Structurizr commands](https://docs.structurizr.com/commands)). Serves from the directory containing `workspace.dsl` (or configured data directory). Use when the user wants to open the workspace in a browser.
- **Export:** `structurizr export -format mermaid` (or `plantuml`, `html`) to generate files for embedding in Markdown or CI. Export output path is configurable; typically next to the workspace or in `docs/`.

If the user does not have Structurizr installed, suggest exporting to Mermaid and embedding in Markdown, or using the **Diagrams** skill for Mermaid C4 templates.

## File location

- DSL file: usually `workspace.dsl` in the chosen base (e.g. `docs/architecture/workspace.dsl`).
- `!docs "docs"` and `!adrs "adrs"` point to folders **relative to the DSL file directory** (e.g. `docs/architecture/docs/` and `docs/architecture/adrs/`).
