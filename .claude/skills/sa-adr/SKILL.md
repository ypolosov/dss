---
name: sa-adr
description: Create or update Architecture Decision Records using MADR v3 format
user_invocable: true
agent: solution-architect
---

# /sa-adr - ADR Management

## What this skill does
Creates and manages Architecture Decision Records in MADR v3 format.

## Usage
- `/sa-adr` - Interactive: ask what decision to record
- `/sa-adr create <title>` - Create new ADR with given title
- `/sa-adr list` - List all existing ADRs with status
- `/sa-adr update <number>` - Update existing ADR
- `/sa-adr supersede <number>` - Supersede an ADR with a new one

## Process

### Creating a new ADR
1. Read existing ADRs from `docs/architecture/adrs/` to determine next number
2. Ask user for:
   - Context and problem statement
   - Decision drivers (reference QA-NNN, UC-NNN, CON-NNN)
   - Considered options (at least 2-3)
3. For each option, discuss pros/cons with the user
4. Ask user to choose the preferred option
5. Generate ADR file using MADR v3 template from `sa-adr/madr-template.md`
6. Save to `docs/architecture/adrs/NNNN-kebab-case-title.md`
7. Update kanban if relevant

### Listing ADRs
1. Read all files in `docs/architecture/adrs/`
2. Parse status from each ADR
3. Present table: Number | Title | Status | Date

### Updating an ADR
1. Read the specified ADR
2. Show current content
3. Ask what to change
4. Apply changes preserving format
