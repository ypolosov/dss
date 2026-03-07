---
name: sa-init
description: Initialize docs/architecture/ structure with all required files and LikeC4 project
user_invocable: true
agent: solution-architect
---

# /sa-init - Initialize Architecture Documentation

## What this skill does
Creates the complete `docs/architecture/` structure with starter files for the ADD 3.0 process.

## Steps

1. Check if `docs/architecture/` already exists and has content
   - If yes, ask user whether to skip, merge, or overwrite

2. Create directory structure:
   ```
   docs/architecture/
     README.md
     utility-tree.md
     kanban.md
     c4/
       package.json
       src/
         specification.c4
         model.c4
         views.c4
     adrs/
       0000-template.md
     drivers/
       use-cases/
       quality-attributes/
       constraints/
       concerns/
     decisions/
     views/
     iterations/
   ```

3. Initialize `docs/architecture/README.md` with:
   - Project name and description
   - Links to all sections
   - Architecture principles placeholder

4. Initialize `docs/architecture/kanban.md` with columns:
   - Backlog | In Design | Decided | Implemented | Verified

5. Initialize `docs/architecture/utility-tree.md` with empty tree structure

6. Initialize LikeC4 project:
   - `c4/package.json` with likec4 dependency
   - `c4/src/specification.c4` with basic C4 element kinds
   - `c4/src/model.c4` with system context stub
   - `c4/src/views.c4` with initial view definitions

7. Create ADR template at `adrs/0000-template.md` (MADR v3)

8. Report what was created and suggest next steps:
   - Run `/ba-qaw` to identify quality attributes
   - Run `/sa-iterate` to start first ADD iteration
