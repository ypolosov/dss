---
name: pm-issue
description: GitHub issues CRUD - create, read, update, close issues via gh CLI
user_invocable: true
agent: project-manager
---

# /pm-issue - GitHub Issue Management

## What this skill does
CRUD operations for GitHub issues using the `gh` CLI.

## Usage
- `/pm-issue` - List open issues
- `/pm-issue create <type> <title>` - Create a new issue (type: epic/story/task/bug/spike)
- `/pm-issue view <number>` - View issue details
- `/pm-issue update <number>` - Update an issue
- `/pm-issue close <number>` - Close an issue
- `/pm-issue label <number> <labels>` - Add/remove labels

## Issue Creation Flow

1. Ask for (if not provided):
   - Type (epic/story/task/bug/spike)
   - Title
   - Description
   - Role label (sa/pm/ba/dev)
   - Priority (high/medium/low)
   - Related ADRs or requirements

2. Generate issue body:
   ```markdown
   ## Description
   {description}

   ## Related
   - ADR: {ADR-NNNN}
   - Requirement: {UC-NNN / QA-NNN}

   ## Acceptance Criteria
   - [ ] {criterion 1}
   - [ ] {criterion 2}

   ## Notes
   {additional context}
   ```

3. Create via `gh`:
   ```bash
   gh issue create --title "..." --body "..." --label "type:task,role:dev,priority:high"
   ```

4. Report created issue number and URL

## Listing Issues
```bash
gh issue list --state open --label "type:story"
gh issue list --state open --label "role:sa"
gh issue list --assignee @me
```
