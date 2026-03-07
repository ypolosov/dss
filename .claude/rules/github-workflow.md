---
description: GitHub workflow conventions - issues, PRs, labels
globs: .github/**
---

# GitHub Workflow Conventions

## Labels

### Type Labels (required on every issue)
- `type:epic` - Large feature spanning multiple stories
- `type:story` - User-facing story with acceptance criteria
- `type:task` - Technical task, part of a story
- `type:bug` - Defect fix
- `type:spike` - Time-boxed research/investigation

### Role Labels (required on every issue)
- `role:sa` - Solution Architect
- `role:pm` - Project Manager
- `role:ba` - Business Analyst
- `role:dev` - Backend Developer

### Priority Labels
- `priority:high` - Must do, blocking
- `priority:medium` - Important, not blocking
- `priority:low` - Nice to have

### Status Labels
- `status:backlog` - Not started
- `status:in-progress` - Work in progress
- `status:review` - Awaiting review
- `status:done` - Completed

## Issue Body Format
Every issue must include:
1. Description
2. Related artifacts (ADR-NNNN, UC-NNN, QA-NNN)
3. Acceptance criteria (checkboxes)

## Branch Naming
- `feature/<issue-number>-short-description`
- `fix/<issue-number>-short-description`
- `spike/<issue-number>-short-description`

## Commit Messages
- Reference issue number: `feat: add payment module (#42)`
- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`

## PR Conventions
- Title matches the main change
- Body references related issues: `Closes #42`
- Requires review before merge
