---
name: ba-usecase
description: Use case specification - create and manage structured use cases
user_invocable: true
agent: business-analyst
---

# /ba-usecase - Use Case Management

## What this skill does
Creates and manages use case specifications in a structured format.

## Usage
- `/ba-usecase` - List existing use cases
- `/ba-usecase create` - Create a new use case interactively
- `/ba-usecase update <UC-NNN>` - Update an existing use case
- `/ba-usecase review` - Review all use cases for completeness

## Process

### Creating a Use Case
1. Ask user to describe the scenario
2. Identify actors and system boundaries
3. Document main success scenario (step by step)
4. Identify alternative flows and error flows
5. Document preconditions and postconditions
6. Assign ID: UC-NNN
7. Save to `docs/requirements/use-cases/UC-NNN-title.md`
8. Create driver summary in `docs/architecture/drivers/use-cases/UC-NNN.md`

## Use Case Template
```markdown
# UC-NNN: {Title}

## Actors
- Primary: {actor}
- Secondary: {actor}

## Preconditions
- {condition 1}

## Main Success Scenario
1. {step}
2. {step}
3. {step}

## Alternative Flows
### AF-1: {name}
- At step N: {alternative}

## Error Flows
### EF-1: {name}
- At step N: {error handling}

## Postconditions
- {condition}

## Quality Attributes
- Related: QA-NNN, QA-NNN

## Business Rules
- {rule 1}
```

## Listing Use Cases
Read `docs/requirements/use-cases/` and present a summary table:
| ID | Title | Actors | Related QAs |
