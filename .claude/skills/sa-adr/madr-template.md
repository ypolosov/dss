# MADR v3 Template

Use this template when creating new ADRs:

```markdown
# ADR-NNNN: Title

## Status

Proposed | Accepted | Deprecated | Superseded by [ADR-XXXX](XXXX-title.md)

## Date

YYYY-MM-DD

## Context and Problem Statement

{Describe the context and problem. 2-3 sentences.}

## Decision Drivers

- {driver 1, e.g., QA-001: Performance under load}
- {driver 2, e.g., UC-003: Real-time odds update}
- {driver 3, e.g., CON-001: Must use PostgreSQL}

## Considered Options

1. {Option A}
2. {Option B}
3. {Option C}

## Decision Outcome

Chosen option: "{Option X}", because {justification}.

### Consequences

#### Good
- {positive consequence 1}
- {positive consequence 2}

#### Bad
- {negative consequence 1}

#### Neutral
- {neutral consequence}

## Pros and Cons of the Options

### {Option A}
- Good, because {argument}
- Bad, because {argument}

### {Option B}
- Good, because {argument}
- Bad, because {argument}

### {Option C}
- Good, because {argument}
- Bad, because {argument}

## More Information

{Links to related ADRs, documentation, spike results, etc.}
- Related: [ADR-XXXX](XXXX-title.md)
- Iteration: ITER-NN
```
