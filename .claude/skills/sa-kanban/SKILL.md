---
name: sa-kanban
description: Architecture design kanban board management
user_invocable: true
agent: solution-architect
---

# /sa-kanban - Design Kanban

## What this skill does
Manages the architecture design kanban board at `docs/architecture/kanban.md`.

## Usage
- `/sa-kanban` - Show current board
- `/sa-kanban add <title>` - Add item to Backlog
- `/sa-kanban move <id> <column>` - Move item between columns
- `/sa-kanban update` - Sync board with current state of ADRs and decisions

## Columns
1. **Backlog** - Identified but not started
2. **In Design** - Currently being designed (in an ADD iteration)
3. **Decided** - ADR accepted, design documented
4. **Implemented** - Code reflects the decision
5. **Verified** - Tested and validated

## Board Format in kanban.md

```markdown
# Architecture Design Kanban

## Backlog
- [ ] DD-001: {title} (drivers: QA-001, UC-002)

## In Design
- [ ] DD-002: {title} (ITER-01, drivers: QA-003)

## Decided
- [x] DD-003: {title} (ADR-0001)

## Implemented
- [x] DD-004: {title} (ADR-0002, PR #15)

## Verified
- [x] DD-005: {title} (ADR-0003, tested)
```

## Sync Logic
When running `/sa-kanban update`:
1. Read all ADRs - items with accepted ADRs move to "Decided"
2. Check for related PRs - items with merged PRs move to "Implemented"
3. Report any inconsistencies
