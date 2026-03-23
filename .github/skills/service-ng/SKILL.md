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

- Own all **async orchestration and presentation state**.
- Use **`rxResource`** (from `@angular/core/rxjs-interop`) for all async operations — provides `isLoading`, `error`, and `value` signals out of the box.
- Write results into a store only when other parts of the app need to share that state.
- View-local data (e.g. the currently displayed item) never needs to go into a store.

#### Store Services

- **Pure signal state — no async, no Observables, no `rxResource`.**
- Exist solely to **share state across the app** (e.g. cart, auth, user preferences).
- Expose state as readonly signals and mutations as descriptive methods (`add`, `remove`, `clear`).
- Written to by component services after successful operations.

#### Repository Services

- The **only layer that uses `HttpClient`**.
- Encapsulate all HTTP calls and data transformations.
- Always return **`Observable`** — consumed exclusively by component services via `rxResource`.
- Leverage `interceptors` for cross-cutting concerns:
  - authentication, error handling, caching, and logging.

### `rxResource` pattern in component services

```ts
// One resource per async operation — each has its own request signal
readonly #itemId = signal<string | null>(null);
readonly #itemResource = rxResource({
  request: () => this.#itemId(),
  loader: ({ request: id }) => this.#repository.getById$(id!),
});

readonly #addToCartRequest = signal<AddToCartRequest | null>(null);
readonly #addToCartResource = rxResource({
  request: () => this.#addToCartRequest(),
  loader: ({ request }) => this.#repository.addToCart$(request!),
});

// Presentation signals are scoped to their operation
readonly itemLoading      = this.#itemResource.isLoading;
readonly addToCartLoading = this.#addToCartResource.isLoading;

// Write to the store only when the result needs to be shared
addToCart(quantity: number): void {
  this.#cartStore.add({ ...item, quantity }); // optimistic update
  this.#addToCartRequest.set({ itemId: item.id, quantity });
}
```

### When to use the store vs keep state local

| State | Where it lives |
|---|---|
| Currently displayed item | `rxResource.value()` in component service |
| Load / save loading & error | `rxResource` signals in component service |
| Cart contents | `CartStore` — shared across header, checkout, etc. |
| Auth / current user | `AuthStore` — shared across the whole app |

### Layer dependency rules

```
Component Service  →  Store      (reads shared signals, calls store actions)
Component Service  →  Repository (feeds Observables into rxResource)
Store              →  (none)     (pure signals, no dependencies)
Repository         →  (none)     (no imports from Store or Component Service)
```

### Examples

- Component service example: ./item-detail.component.service.ts
- Cart store example:        ./cart.store.ts
- Repository example:        ./item-detail.repository.ts
