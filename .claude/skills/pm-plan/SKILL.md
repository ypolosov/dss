---
name: pm-plan
description: Sprint planning - break down work into GitHub issues
user_invocable: true
agent: project-manager
---

# /pm-plan - Sprint Planning

## What this skill does
Facilitates sprint planning by breaking down architecture decisions and requirements into actionable GitHub issues.

## Usage
- `/pm-plan` - Start a planning session
- `/pm-plan sprint <N>` - Plan specific sprint number
- `/pm-plan review` - Review current sprint progress

## Process

### Planning Session
1. **Gather Context**
   - Read `docs/architecture/kanban.md` for design decisions ready for implementation
   - Read accepted ADRs from `docs/architecture/adrs/`
   - Read requirements from `docs/requirements/`
   - List existing GitHub issues: `gh issue list`

2. **Identify Work Items**
   - For each "Decided" item on kanban, propose implementation tasks
   - Break down into hierarchy: Epic → Stories → Tasks
   - Estimate relative complexity (S/M/L/XL)

3. **Present Plan**
   - Show proposed issues in a table
   - Ask user to confirm, modify, or reject items
   - Ask for sprint scope (how many items)

4. **Create Issues**
   - Create approved GitHub issues using `gh issue create`
   - Apply proper labels (type, role, priority)
   - Link issues to ADRs and requirements in the body
   - Set up epic-story-task relationships via issue references

5. **Sprint Summary**
   - Present created issues
   - Show sprint capacity vs. planned work
   - Suggest next actions
