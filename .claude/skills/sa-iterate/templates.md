# ADD 3.0 Design Concepts Reference

## Architecture Patterns

### Structural Patterns
- **Layered** - Separation into presentation, business, data layers
- **Hexagonal (Ports & Adapters)** - Core domain isolated from infrastructure
- **Modular Monolith** - Modules with clear boundaries, deployable as one unit
- **Microservices** - Independent deployable services
- **CQRS** - Separate read and write models
- **Event Sourcing** - Store state changes as sequence of events

### Communication Patterns
- **Request/Response** - Synchronous HTTP/gRPC calls
- **Event-Driven** - Async communication via events/messages
- **Saga** - Distributed transaction management
- **API Gateway** - Single entry point for clients
- **BFF (Backend for Frontend)** - Dedicated backend per frontend type

### Data Patterns
- **Database per Service** - Each service owns its data
- **Shared Database** - Single database, multiple services
- **CQRS** - Separate read/write stores
- **Event Store** - Append-only event log

## Availability Tactics
- **Detect**: Heartbeat, Ping/Echo, Monitor, Timestamp, Voting
- **Recover**: Active Redundancy, Passive Redundancy, Spare, Rollback, Retry, Ignore, Degradation, Reconfiguration
- **Prevent**: Removal from Service, Transactions, Predictive Model

## Performance Tactics
- **Control Resource Demand**: Manage Work Requests, Limit Event Response, Prioritize Events, Reduce Overhead, Bound Execution Times, Increase Resource Efficiency
- **Manage Resources**: Increase Resources, Introduce Concurrency, Maintain Multiple Copies, Schedule Resources

## Security Tactics
- **Detect**: Detect Intrusion, Detect Service Denial, Verify Message Integrity, Detect Message Delay
- **Resist**: Authenticate Actors, Authorize Actors, Maintain Data Confidentiality, Maintain Integrity, Limit Exposure, Encrypt Data
- **React**: Revoke Access, Lock Computer, Inform Actors
- **Recover**: Audit Trail, Restore

## Modifiability Tactics
- **Reduce Size of Module**: Split Module, Increase Cohesion
- **Increase Cohesion**: Encapsulate, Use Intermediary, Restrict Dependencies, Abstract Common Services
- **Defer Binding**: Runtime Registration, Configuration Files, Polymorphism, Component Replacement, Adherence to Protocols

## Scalability Tactics
- **Horizontal Scaling**: Load Balancer, Stateless Services, Sharding
- **Vertical Scaling**: Resource Upgrade
- **Caching**: In-Memory Cache, Distributed Cache, CDN
- **Async Processing**: Message Queue, Background Workers
