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
- **Provide** their component service in `providers: []` — this scopes the service to the page lifetime.
- Wire the route input signal into the component service via `connect()` in `ngOnInit`.
- Delegate all data and async logic to the component service — no direct repository or store injection.
- Use presentational components to avoid raw HTML in the template.

```ts
@Component({
  providers: [ItemDetailComponentService], // scoped to this page
})
export default class ItemDetailPage implements OnInit {
  readonly id = input.required<string>();
  readonly #service = inject(ItemDetailComponentService);

  ngOnInit(): void {
    this.#service.connect(this.id); // wire route signal into rxResource
  }
}
```

#### Presentational

- Focused on UI and presentation, with minimal logic.
- No injected services — receive data via `input()` and emit events via `output()`.
- Define a `ViewModel` interface for their input shape — mapping from API models happens in the repository or component service, not here.
- Can contain computed signals for formatting or derived display values.
- Can use other presentational components but no business logic.

##### Sub-types

- **Shared Reusable** — placed in `shared/`, reusable across the app. Examples: `Button`, `Card`, `Table`.
- **Core Application** — placed in `core/`, used once by the app shell. Examples: `Header`, `Footer`, `Sidebar`.

### Examples

- Routed page example: ./item-detail.page.ts and ./item-detail.page.html
- Presentational component example: ./item-detail.component.ts and ./item-detail.component.html
