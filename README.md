# Solution Architect (Cursor Plugin)

Cursor plugin for **human-guided** architecture design using **ADD 3.0** (Attribute Driven Design) and **wiki-style documentation** in the repo: Structurizr DSL (C4), Markdown docs, and ADRs.

## Purpose

- Guide you through ADD 3.0 steps one at a time and record drivers, elements, interfaces, and decisions in the repository.
- Keep a single source of truth: **workspace.dsl** (C4 model) with `!docs` and `!adrs` pointing to Markdown and Architecture Decision Records.
- Support diagram workflows: Structurizr (primary), Mermaid C4, and optionally mingrammer/diagrams for deployment/infra.

## ADD 3.0 (short)

ADD 3.0 is an iterative design method (SEI):

- **Part 1:** Confirm requirements → choose element to decompose → identify architectural drivers → choose design concept (pattern/tactic/reference architecture/framework).
- **Part 2:** Instantiate elements and allocate responsibilities → define interfaces → verify and refine requirements → repeat for the next element.

The plugin’s **ADD 3.0 step-by-step** skill maps each step to concrete files and sections (e.g. `docs/`, `adrs/`, `workspace.dsl`).

## Repository structure (recommended)

After running **Init architecture docs** (or the “Initialize architecture folder” command), you get:

- **workspace.dsl** — C4 model and `!docs`, `!adrs` (e.g. under `docs/architecture/`).
- **docs/** — Markdown: overview, drivers, decomposition, interfaces.
- **adrs/** — ADRs in MADR (or adr-tools) format.

Paths are configurable; the default suggestion is `docs/architecture/` with `workspace.dsl`, `docs/`, and `adrs/` inside it.

## Structurizr

- **Viewing/editing:** Use [Structurizr vNext](https://docs.structurizr.com/commands) (`local` command) to serve the workspace from the directory that contains `workspace.dsl`. Structurizr Lite is deprecated; vNext is the supported local tooling.
- **Export:** Use the `export` command (e.g. to Mermaid or PlantUML) to generate diagrams for Markdown or CI.
- **Installation:** Follow the [Structurizr commands](https://docs.structurizr.com/commands) documentation (e.g. Java + JAR or Docker). The plugin does not install Structurizr for you; it only references the structure and commands.

## Diagram options

| Use case | Recommended |
|----------|-------------|
| C4 + single source of truth + links to docs/ADRs | Structurizr DSL → export to Mermaid/PlantUML/HTML |
| C4 in Markdown without running Structurizr | Mermaid C4 (templates in the **Diagrams** skill) |
| Deployment / infrastructure (cloud, K8s) | mingrammer/diagrams (Python) or Structurizr deployment view |

See the **Diagrams** skill in the plugin for when to use Structurizr vs Mermaid vs mingrammer.

## Plugin contents

- **Rules:** When discussing architecture, follow ADD 3.0 and the docs structure (`workspace.dsl`, `!docs`, `!adrs`). Applied when relevant paths are open.
- **Skills:** Init architecture docs, ADD 3.0 step-by-step, Structurizr DSL quick ref, Diagrams.
- **Agent:** Solution Architect — human-guided ADD and wiki-style docs.
- **Commands:** Initialize architecture folder, Start ADD iteration.

## Usage

1. Install or link the plugin in Cursor.
2. In the **target project**, run **Initialize architecture folder** (or invoke the Init architecture docs skill) to create the structure.
3. Use **Start ADD iteration** or the ADD 3.0 step-by-step skill to advance one step at a time; the agent will propose artifacts and paths and wait for your confirmation before writing.
4. Edit `workspace.dsl` and docs as needed; use Structurizr vNext `local` to view diagrams and `export` to embed Mermaid/PlantUML in Markdown if you like.

## License

MIT.
