---
description: LikeC4 DSL conventions for C4 architecture diagrams
globs: docs/architecture/c4/**
---

# LikeC4 Conventions

## File Structure
- `specification.c4` - Element kinds, relationship kinds, styles
- `model.c4` - Architecture model (elements, relationships)
- `views.c4` - View definitions

## Naming
- Element identifiers: camelCase (e.g., `gtPlatform`, `paymentService`)
- Element titles: human-readable with spaces (e.g., "GT Platform", "Payment Service")
- All elements must have a `description`
- Technology should be specified where applicable

## Element Hierarchy
```
person → (external actors)
softwareSystem → container → component
database, queue → (specialized containers)
```

## Relationships
- Always specify direction: `source -> target "label"`
- Use relationship kinds: `sync`, `async`
- Keep labels concise: "Reads/Writes", "Publishes events", "Authenticates"

## Views
- One view per level of abstraction minimum
- System context view is mandatory
- Container view for each software system
- Component views only for complex containers

## Commands
```bash
npx likec4 serve          # Start dev server with hot reload
npx likec4 build          # Build static site
npx likec4 export png     # Export views as PNG
```
