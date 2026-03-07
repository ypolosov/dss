---
description: Architecture documentation conventions and ID formats
globs: docs/architecture/**
---

# Architecture Conventions

## ID Formats
- Use cases: `UC-NNN` (e.g., UC-001, UC-002)
- Quality attributes: `QA-NNN` (e.g., QA-001, QA-002)
- Design decisions: `DD-NNN` (e.g., DD-001, DD-002)
- ADRs: `ADR-NNNN` (e.g., ADR-0001) - matches file name `NNNN-title.md`
- Constraints: `CON-NNN` (e.g., CON-001)
- Concerns: `CRN-NNN` (e.g., CRN-001)
- Architecture iterations: `ITER-NN` (e.g., ITER-01)

## Directory Structure
```
docs/architecture/
  README.md              # Overview, links to all sections
  utility-tree.md        # Quality attribute utility tree
  kanban.md              # Design kanban board
  c4/                    # LikeC4 diagrams (package with its own package.json)
  adrs/                  # Architecture Decision Records (MADR v3)
  drivers/               # Architecture drivers
    use-cases/           # UC-NNN files
    quality-attributes/  # QA-NNN scenario files
    constraints/         # CON-NNN files
    concerns/            # CRN-NNN files
  decisions/             # Design decisions (DD-NNN)
  views/                 # Architecture views
  iterations/            # ADD iteration logs (ITER-NN)
```

## Cross-References
- Always reference related artifacts by ID: "See UC-001", "Per ADR-0003"
- ADRs must link to the design decisions and quality attributes they address
- Design decisions must reference the iteration where they were made
