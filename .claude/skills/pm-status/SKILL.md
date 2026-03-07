---
name: pm-status
description: Status report generation - project progress based on GitHub issues
user_invocable: true
agent: project-manager
---

# /pm-status - Status Report

## What this skill does
Generates a project status report based on GitHub issue states.

## Usage
- `/pm-status` - Full status report
- `/pm-status sprint` - Current sprint status
- `/pm-status role <role>` - Status by role (sa/pm/ba/dev)

## Process

1. **Collect Data**
   ```bash
   gh issue list --state all --json number,title,state,labels,createdAt,closedAt
   ```

2. **Analyze**
   - Count issues by state (open/closed)
   - Group by type (epic/story/task/bug)
   - Group by role (sa/pm/ba/dev)
   - Group by priority
   - Calculate completion percentage

3. **Generate Report**
   ```markdown
   # Status Report — {date}

   ## Summary
   - Total issues: N
   - Open: N | Closed: N
   - Completion: N%

   ## By Type
   | Type | Open | Closed | Total |
   |------|------|--------|-------|

   ## By Role
   | Role | Open | Closed | Total |
   |------|------|--------|-------|

   ## By Priority
   | Priority | Open | Closed | Total |
   |----------|------|--------|-------|

   ## Blockers & Risks
   - {blocker 1}

   ## Next Steps
   - {action item 1}
   ```

4. **Present and Ask**
   - Show the report
   - Ask if user wants to take action on any items
