---
name: ba-qaw
description: Quality Attribute Workshop facilitation - structured QA scenario generation
user_invocable: true
agent: business-analyst
---

# /ba-qaw - Quality Attribute Workshop

## What this skill does
Facilitates a Quality Attribute Workshop (QAW) to systematically identify and specify quality attribute scenarios.

## Usage
- `/ba-qaw` or `/ba-qaw start` - Start a new QAW session
- `/ba-qaw continue` - Resume an in-progress session
- `/ba-qaw review` - Review and refine existing scenarios

## QAW Process (6 Parts)

### Part 1: QAW Presentation
1. Explain the QAW process to the user
2. Confirm understanding and readiness

### Part 2: Business/Mission Presentation
1. Ask user to describe the business context
2. Document key business drivers
3. Identify stakeholders and their concerns

### Part 3: Architecture Plan Presentation
1. Review current architecture (if exists) from `docs/architecture/c4/src/model.c4`
2. Identify existing architectural approaches
3. Note areas without decisions yet

### Part 4: Identification of Architecture Drivers
1. List key quality attributes relevant to the system
2. For each attribute, brainstorm specific scenarios
3. Use the 6-part scenario template (see `ba-qaw/template.md`)

### Part 5: Scenario Brainstorming
For each quality attribute category:
1. Present the category (e.g., Performance, Security)
2. Ask user to describe real-world scenarios
3. Help formalize into 6-part scenarios
4. Assign QA-NNN identifiers

### Part 6: Scenario Consolidation & Prioritization
1. Present all collected scenarios
2. Merge similar scenarios
3. Ask user to vote on priority (H/M/L)
4. Assess technical difficulty (H/M/L)
5. Save results to `docs/requirements/qaw-results.md`
6. Sync to `docs/architecture/drivers/quality-attributes/`

## Output
- `docs/requirements/qaw-results.md` - Full QAW session log
- `docs/architecture/drivers/quality-attributes/QA-NNN.md` - Individual QA files
