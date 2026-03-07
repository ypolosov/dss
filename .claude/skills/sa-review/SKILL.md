---
name: sa-review
description: Architecture review - evaluate design against quality attribute scenarios
user_invocable: true
agent: solution-architect
---

# /sa-review - Architecture Review

## What this skill does
Evaluates the current architecture against quality attribute scenarios and identifies risks.

## Process

1. **Gather Context**
   - Read `docs/architecture/utility-tree.md` for QA priorities
   - Read `docs/architecture/c4/src/model.c4` for current design
   - Read all ADRs from `docs/architecture/adrs/`
   - Read design decisions from `docs/architecture/decisions/`

2. **Analyze Coverage**
   - For each high-priority QA scenario, check if there's a design decision addressing it
   - Identify QAs without corresponding ADRs or design decisions
   - List unaddressed architecture drivers

3. **Risk Assessment**
   - Identify potential single points of failure
   - Check for missing error handling strategies
   - Evaluate scalability bottlenecks
   - Review security boundaries
   - Assess deployment complexity

4. **Generate Review Report**
   Present findings in a table:
   | QA Scenario | Status | ADR | Risk Level | Notes |
   |-------------|--------|-----|------------|-------|

5. **Recommendations**
   - Suggest ADRs to create
   - Propose additional iterations
   - Highlight areas needing spike/prototyping

6. **Next Steps** - present options:
   - Start ADD iteration to address gaps
   - Create specific ADRs
   - Update diagrams
   - Conduct deeper analysis on a specific area
