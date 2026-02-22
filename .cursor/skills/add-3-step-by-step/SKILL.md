---
name: add-3-step-by-step
description: Run ADD 3.0 one step at a time: map each step to artifacts and file paths (docs/, adrs/, workspace.dsl), then create or update only after user confirmation.
---

# ADD 3.0 step-by-step

Use when the user is doing an ADD (Attribute Driven Design) 3.0 iteration and needs to know **which step is next**, **what artifacts** to create or update, and **where** they live in the repo.

## ADD 3.0 recap

**Part 1 — Tactics and quality**
1. Confirm sufficient requirements.
2. Choose an element of the system to decompose.
3. Identify candidate architectural drivers (functional, quality attributes, constraints, system type, design objectives, concerns).
4. Choose a design concept (pattern, tactic, reference architecture, framework) that satisfies the drivers.

**Part 2 — Document decomposition**
1. Instantiate architectural elements and allocate responsibilities.
2. Define interfaces for the instantiated elements.
3. Verify and refine requirements; make them constraints for those elements.
4. Repeat for the next element.

## Mapping steps to artifacts and paths

Assume the project uses the structure from **Init architecture docs**: e.g. `docs/architecture/workspace.dsl`, `docs/architecture/docs/`, `docs/architecture/adrs/`. Adjust paths if the user chose a different base (e.g. `.structurizr/`).

| ADD step | Artifacts | Where |
|----------|-----------|--------|
| Part 1.1 — Confirm requirements | Requirements / drivers list | `docs/01-requirements.md` or `docs/00-overview.md` (Drivers section) |
| Part 1.2 — Choose element to decompose | Current element name/scope | `docs/02-decomposition.md` or in overview; optionally in `workspace.dsl` as existing C4 element |
| Part 1.3 — Identify drivers | Prioritized drivers (functional, QA, constraints) | `docs/01-requirements.md` or `docs/drivers.md`; can reference in ADR |
| Part 1.4 — Choose design concept | Design decision (pattern/tactic/etc.) | New or updated ADR in `adrs/` (MADR); optionally brief in `docs/` |
| Part 2.1 — Instantiate elements & responsibilities | New C4 elements, responsibilities | `workspace.dsl` (model: softwareSystem, container, component); `docs/` for narrative |
| Part 2.2 — Define interfaces | Interfaces between elements | `workspace.dsl` (relationships, or doc in element); `docs/03-interfaces.md` or per-element doc |
| Part 2.3 — Verify & refine requirements | Updated requirements/constraints | `docs/01-requirements.md` or constraints section; ADR if new constraint |
| Part 2.4 — Next element | — | Loop: choose next element (Part 1.2) and repeat |

## Workflow for the agent

1. **Infer current state** from existing files: read `docs/*.md` and `adrs/*.md`, and `workspace.dsl` if present. Determine the last completed step (e.g. "drivers documented", "first container added").
2. **Propose the next step** by name (e.g. "Part 1.4 — Choose design concept") and list the concrete artifacts to create or update with full paths.
3. **Wait for user confirmation** before creating or editing files. If the user says "do it" or "yes", create/update only those artifacts.
4. **Summarize** what was done and suggest the next step (or ask if they want to continue).

## Human-guided rule

One step at a time. Do not run multiple ADD steps in one go unless the user explicitly asks to apply several steps.

## Optional: track iteration in a doc

If the user wants a single "iteration log", maintain e.g. `docs/iteration-log.md` with entries like: "Iteration 1 — Part 1.3: drivers documented in 01-requirements.md; Part 1.4: ADR 0002 layered pattern added."
