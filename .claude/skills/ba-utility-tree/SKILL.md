---
name: ba-utility-tree
description: Create and update the quality attribute utility tree with priorities
user_invocable: true
agent: business-analyst
---

# /ba-utility-tree - Utility Tree Management

## What this skill does
Creates and maintains a utility tree that prioritizes quality attributes for architecture design.

## Usage
- `/ba-utility-tree` - Show current tree and options
- `/ba-utility-tree build` - Interactive session to build the tree from scratch
- `/ba-utility-tree add` - Add a quality attribute to existing tree
- `/ba-utility-tree prioritize` - Re-prioritize existing attributes

## Process

### Building the Tree
1. Read existing QAW results from `docs/requirements/qaw-results.md`
2. Read existing QA scenarios from `docs/architecture/drivers/quality-attributes/`
3. Present the utility tree structure (see template)
4. For each quality attribute:
   - Ask for specific scenarios (stimulus → response → measure)
   - Ask for business priority (H/M/L)
   - Ask for technical difficulty (H/M/L)
5. Save to `docs/requirements/utility-tree.md`
6. Sync summary to `docs/architecture/utility-tree.md`
7. Update individual QA files in `docs/architecture/drivers/quality-attributes/`

### Priority Matrix
```
              High Difficulty    Low Difficulty
High Priority    (H,H) *          (H,L)
Low Priority     (L,H)            (L,L)
```
* (H,H) items are architecturally significant - must be addressed in ADD iterations

## Output
Updates both `docs/requirements/utility-tree.md` and `docs/architecture/utility-tree.md`.
