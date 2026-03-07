---
name: dev-scaffold
description: NestJS module scaffolding with hexagonal architecture structure
user_invocable: true
agent: backend-developer
---

# /dev-scaffold - NestJS Module Scaffolding

## What this skill does
Generates a NestJS module following hexagonal architecture (ports & adapters) and DDD patterns.

## Usage
- `/dev-scaffold <module-name>` - Scaffold a new module
- `/dev-scaffold` - Interactive: ask for module name and details

## Generated Structure

For a module named `{name}`:

```
packages/dss-api/src/
  core/domain/{name}/
    {name}.entity.ts              # Aggregate root entity
    {name}.value-objects.ts       # Value objects
    {name}.events.ts              # Domain events
    {name}.repository.port.ts     # Repository interface (outbound port)

  core/application/{name}/
    ports/
      inbound/
        {name}.use-cases.ts       # Use case interfaces (inbound port)
      outbound/
        {name}.repository.port.ts # Re-export or additional outbound ports
    services/
      {name}.service.ts           # Use case implementation
    dto/
      {name}.dto.ts               # Input/Output DTOs

  infrastructure/{name}/
    {name}.repository.ts          # Repository implementation (Drizzle)
    {name}.mapper.ts              # Entity <-> DB mapping
    {name}.schema.ts              # Drizzle schema definition

  interfaces/http/{name}/
    {name}.controller.ts          # REST controller
    {name}.request.ts             # Request validation (class-validator)
    {name}.response.ts            # Response DTOs

  modules/{name}/
    {name}.module.ts              # NestJS module definition
```

## Process
1. Ask for module name (if not provided)
2. Ask for key entity properties
3. Ask for main use cases
4. Generate all files with proper imports and structure
5. Register module in `app.module.ts`
6. Suggest running `/dev-test` to generate tests
