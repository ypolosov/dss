---
name: dev-test
description: TDD test generation - write tests first for domain logic and use cases
user_invocable: true
agent: backend-developer
---

# /dev-test - TDD Test Generation

## What this skill does
Generates test files following TDD principles - tests first, then guide implementation.

## Usage
- `/dev-test <module-name>` - Generate tests for a module
- `/dev-test unit <file-path>` - Generate unit test for specific file
- `/dev-test integration <module-name>` - Generate integration tests

## Test Types

### Unit Tests (domain + application)
- Entity creation and validation
- Value object equality and validation
- Domain service logic
- Use case service (mock ports)

### Integration Tests
- Repository implementation against test DB
- Controller endpoints (supertest)
- Module wiring

## Test Structure
```
packages/dss-api/test/
  unit/
    core/domain/{name}/
      {name}.entity.spec.ts
      {name}.value-objects.spec.ts
    core/application/{name}/
      {name}.service.spec.ts
  integration/
    {name}/
      {name}.repository.spec.ts
      {name}.controller.spec.ts
```

## Process
1. Read the module's domain entities and use cases
2. For each entity: generate creation, validation, state change tests
3. For each use case: generate tests with mocked outbound ports
4. Present tests to user
5. Ask if user wants to implement (or fix tests first)

## Test Conventions
- Use `describe` / `it` pattern
- Test names describe behavior: `it('should reject bet when balance is insufficient')`
- AAA pattern: Arrange, Act, Assert
- Mock outbound ports, never mock domain logic
