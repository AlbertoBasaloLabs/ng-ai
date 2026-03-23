---
name: components-ng
description: Components with Angular. Use when generating any type of routed page, or presentational component.
---
## Components

- Components are **standalone**, no modules are needed.
- On push **change detection** is set by default for better performance.
- Generate components using the CLI: `ng g c folder/component-name`

### Syntax

- Use `inject()` instead of constructor **injection**.
- Use `input()` and `output()` **signals** for component communication.
- Use `signal()` and `computed()` for **state management**.
- Use `effect()` for exceptional handling of **side effects** in components.

### Templates

- Use `@if`, `@else`, `@switch` for conditional rendering.
- Use `@for` with `track item.id` for iterating over collections.
- Prefer auto-closing tags for components with no projected content (e.g., `<app-header />`).
- Use `[attribute]="signalProperty()"` for computed attributes with dynamic values.
- No hardcoded strings in templates, use properties from component class.
- Avoid pipes and complex expressions in templates, use computed signals.

### Types of components

#### Routed (Page)

- Lazy loaded by the router when navigating to their route.
- Suffixed with `Page` (e.g., `ItemDetailPage`). Generated with: `ng g c routes/item-detail --type=page`
- Exported as `default` for simpler route imports.
- Receive route parameters via `input.required<Type>()` signals.
- Inject repositories for data fetching and stores for shared state — no intermediate service layer.
- Use **`rxResource`** directly for async operations — route input signals feed `request` naturally.
- Write to stores after successful operations to share state with the rest of the app.
- Use presentational components to avoid raw HTML in the template.

```ts
export default class ItemDetailPage {
  readonly #repository = inject(ItemDetailRepository);
  readonly #cartStore = inject(CartStore);

  readonly id = input.required<string>(); // route param

  // rxResource reacts to the input signal directly — no wiring needed
  readonly #itemResource = rxResource({
    request: () => this.id(),
    loader: ({ request: id }) => this.#repository.getById$(id),
  });

  readonly item = this.#itemResource.value;
  readonly isLoading = this.#itemResource.isLoading;
}
```

#### Presentational

- Focused on UI and presentation, with minimal logic.
- No injected services — receive data via `input()` and emit events via `output()`.
- Define a `ViewModel` interface for their input shape — mapping from API models happens in the repository, not here.
- Can contain computed signals for formatting or derived display values.
- Can use other presentational components but no business logic.

##### Sub-types

- **Shared Reusable** — placed in `shared/`, reusable across the app. Examples: `Button`, `Card`, `Table`.
- **Core Application** — placed in `core/`, used once by the app shell. Examples: `Header`, `Footer`, `Sidebar`.

### Layer rules

```
Page          →  Repository   (rxResource for async, direct injection)
Page          →  Store        (reads shared signals, calls store actions)
Store         →  (none)       (pure signals, no dependencies)
Repository    →  (Http API)   (HttpClient only, returns Observables)
```

```mermaid
flowchart TD
  Page --> Repository
  Page --> Store
  Repository --> HttpClient
  Store --> (none)
```


### When to introduce a component service

A dedicated component service is worth adding when a page grows complex enough that it needs:
- Logic shared across **multiple sibling components** under the same page
- Non-trivial **orchestration** between several async resources
- The page class itself becomes hard to read due to volume of signals and actions

In those cases, scope the service to the page with `providers: [PageComponentService]` and inject it in the page and its children.

### Examples

- Routed page example: ./item-detail.page.ts and ./item-detail.page.html
- Presentational component example: ./item-detail.component.ts and ./item-detail.component.html
