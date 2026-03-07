---
name: sa-iterate
description: Run an ADD 3.0 iteration - interactive 7-step architecture design process
user_invocable: true
agent: solution-architect
---

# /sa-iterate - ADD 3.0 Iteration

## What this skill does
Guides the user through one complete ADD 3.0 iteration interactively.

## Prerequisites
- `docs/architecture/` must be initialized (run `/sa-init` if not)
- Architecture drivers should exist in `docs/architecture/drivers/`
- Utility tree should have priorities (`docs/architecture/utility-tree.md`)

## Process (7 Steps)

### Step 1: Review Inputs
1. Read `docs/architecture/utility-tree.md` for prioritized quality attributes
2. Read `docs/architecture/drivers/` for use cases, constraints, concerns
3. Read previous iterations from `docs/architecture/iterations/`
4. Summarize current state for the user
5. Ask: "Готовы начать итерацию? Какие драйверы в фокусе?"

### Step 2: Establish Iteration Goal
1. Present the highest-priority unaddressed drivers
2. Ask user to select 2-4 drivers for this iteration
3. Document the iteration goal

### Step 3: Choose Element to Refine
1. Show current C4 model elements (read `docs/architecture/c4/src/model.c4`)
2. Suggest which element to decompose/refine
3. Ask user to confirm or choose another element

### Step 4: Choose Design Concepts
1. For each selected driver, propose applicable:
   - Architecture patterns (e.g., CQRS, Event Sourcing, Saga)
   - Tactics (e.g., load balancing, caching, circuit breaker)
   - Technologies (e.g., Redis, Kafka, PostgreSQL)
2. Reference `sa-iterate/templates.md` for pattern catalog
3. Ask user to choose or suggest alternatives

### Step 5: Instantiate Elements
1. Define new elements, their responsibilities, and interfaces
2. Map elements to design concepts from Step 4
3. Show how elements address selected drivers
4. Ask user to confirm the design

### Step 6: Sketch Views & Record Decisions
1. Update LikeC4 diagrams (`docs/architecture/c4/src/`)
2. Create ADRs for significant decisions (using `/sa-adr` internally)
3. Create design decision records in `docs/architecture/decisions/`
4. Show user the updated views

### Step 7: Review & Assess
1. Review how well the iteration addressed its goals
2. Identify any new drivers or concerns discovered
3. Update the kanban board (`docs/architecture/kanban.md`)
4. Write iteration log to `docs/architecture/iterations/ITER-NN.md`
5. Present options:
   - Start next iteration
   - Refine current decisions
   - Switch to another activity (BA, PM, Dev)
