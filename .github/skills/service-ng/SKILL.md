---
name: service-ng
description: Services with Angular. Use when generating any type of repository, store, or component service.
---
## Services

- Services are used for **data fetching, shared state, and async orchestration**.
- Provided in root by default: `@Injectable({ providedIn: 'root' })`.
- Generate services using the CLI: `ng g s folder/service-name`

---

### Architecture overview

Three distinct service types with strict responsibilities. Each layer has one reason to exist.

```
Page  →  Repository   (rxResource for async operations)
Page  →  Store        (reads shared signals, calls store actions)
Store →  (none)       (pure signals, no dependencies)
Repository → (none)   (HttpClient only, returns Observables)
```

---

### Repository

- The **only layer that uses `HttpClient`**.
- Encapsulates all HTTP calls and data transformations.
- Always returns **`Observable`** — never signals, never promises.
- Maps HTTP responses to **`ViewModel`** types consumed by components.
- Leverages `interceptors` for cross-cutting concerns: authentication, error handling, caching, logging.
- Naming: suffix methods with `$` to signal they return an Observable (e.g. `getById$`, `save$`).

```ts
@Injectable({ providedIn: 'root' })
export class ItemDetailRepository {
  readonly #httpClient = inject(HttpClient);

  getById$(id: string): Observable<ItemDetailViewModel> {
    return this.#httpClient.get<ItemDetailViewModel>(`/api/items/${id}`);
  }

  addToCart$(request: AddToCartRequest): Observable<CartItem> {
    return this.#httpClient.post<CartItem>(`/api/cart`, request);
  }
}
```

- Example: ./item-detail.repository.ts

---

### Store

- **Pure signal state — no async, no Observables, no `rxResource`.**
- Exists solely to **share state across the app** (e.g. cart, auth, user preferences).
- `providedIn: 'root'` — lives for the entire app lifetime.
- Exposes state as **readonly signals**.
- Exposes mutations as **descriptive action methods** (`add`, `remove`, `clear`).
- Written to by pages after successful async operations.

```ts
@Injectable({ providedIn: 'root' })
export class CartStore {
  readonly #items: WritableSignal<CartItem[]> = signal<CartItem[]>([]);

  readonly items: Signal<CartItem[]> = this.#items.asReadonly();
  readonly count = computed(() => this.#items().reduce((sum, i) => sum + i.quantity, 0));
  readonly total = computed(() => this.#items().reduce((sum, i) => sum + i.price * i.quantity, 0));

  add(item: CartItem): void {
    this.#items.update((current) => {
      const index = current.findIndex((i) => i.itemId === item.itemId);
      const exists = index !== -1;
      if (exists) {
        const updated = [...current];
        updated[index].quantity += item.quantity;
        return updated;
      }
      return [...current, item];
    });
  }

  remove(itemId: string): void {
    this.#items.update((current) => current.filter((i) => i.itemId !== itemId));
  }

  clear(): void {
    this.#items.set([]);
  }
}
```

- Example: ./cart.store.ts

---

### Component Service (optional)

- Only introduced when a **page grows complex** enough to warrant it:
  - Logic shared across multiple sibling components under the same page.
  - Non-trivial orchestration between several async resources.
  - The page class itself becomes hard to read.
  - Too much mapping is needed to convert repository data into component-friendly types.
- **Scoped to the page** via `providers: [PageComponentService]` — not root.
- Follows the same rules as a page: injects repository and store, owns `rxResource`.
- When NOT needed, pages inject repository and store directly (see page pattern below).

---

### `rxResource` — async pattern for pages and component services

`rxResource` (from `@angular/core/rxjs-interop`) is the standard bridge between `Observable`-based repositories and the signals world. Use it for all async operations — queries and commands alike.

#### Query — reactive on a signal
Re-fetches automatically when the request signal changes (e.g. route input):

```ts
readonly #itemResource = rxResource({
  request: () => this.id(), // signal drives the fetch
  loader: ({ request: id }) => this.#repository.getById$(id),
});

readonly item: Signal<T | undefined> = this.#itemResource.value;
readonly isLoading: Signal<boolean> = this.#itemResource.isLoading;
readonly error: Signal<string | null> = computed(() => 
  this.#itemResource.error() ? 'Failed to load.' : null 
);
```

#### Command — triggered imperatively
Use a nullable signal as the trigger; set it to fire the operation:

```ts
readonly #addToCartRequest = signal<AddToCartRequest | null>(null);
readonly #addToCartResource = rxResource({
  request: () => this.#addToCartRequest(),
  loader: ({ request }) => this.#repository.addToCart$(request!),
});

// Trigger:
onAddToCartRequested(): void {
  this.#addToCartRequest.set({ itemId: '123', quantity: 1 });
}
```

#### Optimistic store update
Write to the store immediately for instant UI feedback; the resource confirms in the background:

```ts
onAddToCartRequested(): void {
  const item = this.item();
  if (!item) return;

  this.#cartStore.add({ ...item, quantity: 1 });              // optimistic
  this.#addToCartRequest.set({ itemId: item.id, quantity: 1 }); // confirms via HTTP
}
```

---

### Examples

- Repository example:         ./item-detail.repository.ts
- Store example:               ./cart.store.ts
- Page using both directly:    ./item-detail.page.ts
