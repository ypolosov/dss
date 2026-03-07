# ADD-AI: Architecture Decision Support Toolkit

## Overview

Universal Claude Code CLI toolkit for architecture-driven development. Contains agents, skills, and rules implementing ADD 3.0 (Attribute-Driven Design) methodology. **Project-agnostic** — clone `.claude/` into any project workspace to enable DSS capabilities.

## Structure

```
.claude/
  agents/           # 4 role-based agents
    solution-architect.md
    business-analyst.md
    project-manager.md
    backend-developer.md
  skills/            # 16 skills (slash commands)
    sa-*/            # Solution Architect (6): init, iterate, adr, diagram, review, kanban
    ba-*/            # Business Analyst (4): utility-tree, qaw, usecase, requirements
    pm-*/            # Project Manager (3): plan, issue, status
    dev-*/           # Backend Developer (3): scaffold, test, review
  rules/             # 8 context rules
    language.md              # Language policy (Russian interaction, English code)
    human-in-the-loop.md     # Agent proposes, human decides
    architecture-conventions.md  # ID formats, directory structure
    likec4.md                # LikeC4 C4 diagram conventions
    adr-format.md            # MADR v3 format
    github-workflow.md       # GitHub issues, branches, commits
    nestjs-patterns.md       # Hexagonal architecture patterns
    gt-context.md            # GT Platform target context (example)
  settings.json      # Permissions config
```

## Language Policy

- **User interaction**: Russian (all responses, questions, options)
- **Code & artifacts**: English (variable names, commit messages, ADR titles, LikeC4 DSL)
- **Documentation content**: Russian for narratives, English for technical terms

## Roles & Commands

### Solution Architect (SA)
- `/sa-init` - Initialize docs/architecture/ structure in target project
- `/sa-iterate` - Run ADD 3.0 iteration (interactive, 7-step)
- `/sa-adr` - Create/update MADR v3 records
- `/sa-diagram` - Create/update LikeC4 C4 diagrams
- `/sa-review` - Architecture review checklist
- `/sa-kanban` - Architecture design kanban board

### Business Analyst (BA)
- `/ba-utility-tree` - Create/update quality attribute utility tree
- `/ba-qaw` - Quality Attribute Workshop facilitation
- `/ba-usecase` - Use case specification
- `/ba-requirements` - Requirements elicitation session

### Project Manager (PM)
- `/pm-plan` - Sprint planning
- `/pm-issue` - GitHub issues CRUD (via `gh` CLI)
- `/pm-status` - Status report generation

### Backend Developer (Dev)
- `/dev-scaffold` - Generate NestJS module (hexagonal structure)
- `/dev-test` - TDD test generation
- `/dev-review` - Code review

## Human-in-the-Loop Principle

The agent PROPOSES, the human DECIDES. Every response must end with 3-5 numbered options. Never make irreversible decisions autonomously.

## Usage

Clone or copy `.claude/` directory into any target project workspace. The toolkit provides architecture-driven development support through Claude Code CLI.

### Target-Specific Context

Add project-specific rules in `.claude/rules/` (e.g., `gt-context.md` is an example for the GT gambling platform). These rules are loaded automatically when working in the project workspace.

## Development

When developing the toolkit itself:
- Agents define role personas and behavior
- Skills define slash-command workflows (each has `SKILL.md` + optional templates)
- Rules define conventions loaded as context into every conversation
- Test changes by using skills in a target project workspace
