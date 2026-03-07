---
description: MADR v3 format for Architecture Decision Records
globs: docs/architecture/adrs/**
---

# ADR Format (MADR v3)

## File Naming
- `NNNN-kebab-case-title.md` (e.g., `0001-use-postgresql-for-primary-storage.md`)
- Numbers are zero-padded to 4 digits
- `0000-template.md` is reserved for the template

## Required Sections
1. **Title** - `# ADR-NNNN: Descriptive Title`
2. **Status** - Proposed | Accepted | Deprecated | Superseded by ADR-XXXX
3. **Date** - YYYY-MM-DD format
4. **Context and Problem Statement** - 2-3 sentences
5. **Decision Drivers** - Bulleted list referencing QA-NNN, UC-NNN, CON-NNN
6. **Considered Options** - Numbered list (minimum 2)
7. **Decision Outcome** - Chosen option with justification
8. **Consequences** - Good, Bad, Neutral subsections
9. **Pros and Cons** - Per option analysis

## Optional Sections
- **More Information** - Links, related ADRs, iteration reference

## Status Transitions
```
Proposed → Accepted → Deprecated
                    → Superseded by ADR-XXXX
```

## Cross-References
- Link to related ADRs: `[ADR-0002](0002-title.md)`
- Reference iteration: `ITER-01`
- Reference drivers: `QA-001`, `UC-003`, `CON-002`
