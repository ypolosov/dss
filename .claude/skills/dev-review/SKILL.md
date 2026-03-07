---
name: dev-review
description: Code review - check code against architecture decisions and patterns
user_invocable: true
agent: backend-developer
---

# /dev-review - Code Review

## What this skill does
Reviews code against architecture decisions (ADRs), hexagonal patterns, and DDD conventions.

## Usage
- `/dev-review` - Review all uncommitted changes
- `/dev-review <file-or-dir>` - Review specific file or directory
- `/dev-review pr <number>` - Review a pull request

## Review Checklist

### Architecture Compliance
- [ ] Code follows hexagonal architecture (core has no infra dependencies)
- [ ] Ports are interfaces, adapters are implementations
- [ ] Domain entities have no framework decorators
- [ ] Repository implementations are in infrastructure/

### DDD Patterns
- [ ] Entities have proper identity
- [ ] Value objects are immutable
- [ ] Aggregate boundaries are respected
- [ ] Domain events are used for side effects

### Code Quality
- [ ] No business logic in controllers
- [ ] DTOs validate input at boundaries
- [ ] Error handling is consistent
- [ ] No hardcoded configuration

### ADR Compliance
- [ ] Implementation matches relevant ADRs
- [ ] New patterns not covered by ADRs are flagged

### Testing
- [ ] Unit tests exist for domain logic
- [ ] Use case tests mock outbound ports
- [ ] No infrastructure in unit tests

## Process
1. Read the code to review
2. Read relevant ADRs from `docs/architecture/adrs/`
3. Check against each checklist item
4. Generate review report with findings
5. Suggest fixes for each issue found
6. Present options: apply fixes, create issues, or skip
