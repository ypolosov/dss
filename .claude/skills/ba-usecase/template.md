# Use Case Template

```markdown
# UC-NNN: {Title}

## Summary
{One sentence description}

## Actors
- **Primary**: {main actor}
- **Secondary**: {supporting actors}
- **System**: {system under design}

## Preconditions
1. {What must be true before the use case starts}

## Trigger
{What initiates this use case}

## Main Success Scenario
1. {Actor does X}
2. {System responds with Y}
3. {Actor does Z}
4. {System completes action}

## Alternative Flows

### AF-1: {Alternative Name}
- **At step**: {N}
- **Condition**: {when this happens}
- **Steps**:
  1. {alternative step}
  2. {returns to step M or ends}

## Error Flows

### EF-1: {Error Name}
- **At step**: {N}
- **Condition**: {error condition}
- **Steps**:
  1. {error handling step}
  2. {system notifies actor}

## Postconditions

### Success
- {What is true after successful completion}

### Failure
- {What is true after failure}

## Quality Attributes
- {QA-NNN: relevant quality attribute}

## Business Rules
- {BR-1: business rule}

## Notes
- {Additional context}
```
