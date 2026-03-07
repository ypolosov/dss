---
name: sa-diagram
description: Create and update LikeC4 C4 model diagrams
user_invocable: true
agent: solution-architect
---

# /sa-diagram - LikeC4 Diagram Management

## What this skill does
Creates and updates C4 architecture diagrams using LikeC4 DSL.

## Usage
- `/sa-diagram` - Interactive: show current diagrams, ask what to update
- `/sa-diagram context` - Update system context diagram
- `/sa-diagram container` - Update container diagram
- `/sa-diagram component <container>` - Update component diagram for a container
- `/sa-diagram deployment` - Update deployment diagram

## Process

1. Read current diagram files:
   - `docs/architecture/c4/src/specification.c4` - Element/relation kinds
   - `docs/architecture/c4/src/model.c4` - Model definition
   - `docs/architecture/c4/src/views.c4` - View definitions

2. Ask user what to add/change:
   - New system/container/component?
   - New relationship?
   - Update existing element?

3. Apply changes following LikeC4 DSL syntax (see `.claude/rules/likec4.md`)

4. Suggest running `npx likec4 serve` to preview

## File Organization
- `specification.c4` - Element kinds (person, system, container, component) and relationship kinds
- `model.c4` - The actual model with elements and relationships
- `views.c4` - View definitions (which elements to show, layout)

## Guidelines
- Keep model.c4 as the single source of truth for the architecture model
- Use meaningful identifiers in camelCase (e.g., `gtPlatform`, `paymentGateway`)
- Add descriptions to all elements
- Reference ADRs in element descriptions where relevant
