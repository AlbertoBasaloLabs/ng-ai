---
name: service-ng
description: Services with Angular. Use when generating any type of service, store or data provider.
---
## Services

- Services are used for **business logic, data management, and communication** with APIs.
- Provided in root by decorator `@Injectable({ providedIn: 'root' })`.
- Generate services using the CLI: `ng g s folder/service-name`

### Types of services

#### Component Services

- Used by components to manage local state and logic.
- Encapsulate logic that is specific to a component or a group of components.
- Uses stores to manage state with signals and effects.
- Uses repositories to handle data fetching and transformations.

#### Store Services

- Manage data with **signals** keeping _loading_, _error_, _resolved_ states.
- Exposes state through **signals**.
- Exposes actions as **methods** to update state.

#### Repository Services

- Handle **communication with APIs** and data sources.
- Encapsulate `HTTP` calls and data transformations.
- Leverages `interceptors` for cross-cutting concerns like:
  - authentication, error handling, data caching, and logging.

### Examples

- Component service example: ./item-detail.component.service.ts
- Store service example: ./item-detail.store.ts
- Repository service example: ./item-detail.repository.ts

