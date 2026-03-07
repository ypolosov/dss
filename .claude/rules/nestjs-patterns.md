---
description: NestJS hexagonal architecture and DDD patterns
globs: src/**,packages/**/src/**
---

# NestJS Patterns

## Hexagonal Architecture Layers

### Core (no framework dependencies)
- `core/domain/` - Entities, Value Objects, Domain Events, Repository Ports
- `core/application/` - Use Case interfaces (inbound ports), Use Case services, DTOs

### Infrastructure (framework-dependent)
- `infrastructure/persistence/` - Drizzle ORM repositories
- `infrastructure/external/` - Third-party API adapters
- `infrastructure/event-bus/` - NestJS CQRS event bus

### Interfaces (inbound adapters)
- `interfaces/http/` - REST controllers
- `interfaces/discord/` - Discord bot commands

### Modules
- `modules/` - NestJS module definitions wiring ports to adapters

## Dependency Rule
```
interfaces → core ← infrastructure
              ↑
           modules (wiring)
```
Core NEVER imports from infrastructure or interfaces.

## Entity Pattern
```typescript
export class Entity {
  constructor(
    public readonly id: string,
    private props: EntityProps,
  ) {}

  // Business methods that enforce invariants
  // Return domain events for side effects
}
```

## Repository Port Pattern
```typescript
// In core/domain/
export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  save(order: Order): Promise<void>;
  delete(id: string): Promise<void>;
}
```

## Use Case Pattern
```typescript
// In core/application/
export interface PlaceOrderUseCase {
  execute(dto: PlaceOrderDto): Promise<OrderResult>;
}
```

## Module Wiring
```typescript
@Module({
  providers: [
    { provide: 'OrderRepository', useClass: DrizzleOrderRepository },
    { provide: 'PlaceOrderUseCase', useClass: PlaceOrderService },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
```
