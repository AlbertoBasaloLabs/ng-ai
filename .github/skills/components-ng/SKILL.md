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
- Use `effects()` for exceptional handling of **side effects** in components.

### Templates

- Use `@if`, `@else`, `@switch` for conditional rendering.
- Use `@for` with `track item.id` for iterating over collections.
- Prefer auto-closing tags for components with no projected content (e.g., `<app-header />`).
- Use `[attribute]="signalProperty()"` for computed attributes with dynamic values.
- No hardcoded strings in templates, use properties from component class.
- Avoid pipes and complex expressions in templates, use computed signals.

### Types of components

### Routed 

- Lazy loaded by the router when navigating to their route, used for pages and views.
- Suffixed with `Page` type (e.g., `UserPage`). Ex: `ng g c routes/user --type=page`
- Export the class as `default` for simpler imports at routes.
- Receive route parameters via signals with `input.required<Type>()`.
- Also known as _Container_, _Parent_ or _Smart_ components, as they manage data and business logic:
  - **Injected** with services to manage data and business logic.
  - Do not make direct calls to APIs in components, use services instead.
  - Avoid complex raw HTML in templates, use presentational components to encapsulate UI presentation.

### Presentational

- **Focused on UI** and presentation, with minimal logic.
- Also known as _Dumb_ or _Child_ components, as they receive data and emit events:
  - No injected data services, receive data and emit events through **input and output signals**.
  - Can use raw HTML or any other presentational components in their templates, but no business logic.

#### Sub types of presentational components

- **Shared Reusable**
  - Placed in a `shared` folder, **reusable** across the application.
  - Examples: `Button`, `Card`, `List`, `Table`, `Form`, etc.

- **Core Application**
  - Placed in a `core` folder, used **only once by the app** component
  - Examples: `Header`, `Footer`, `Navbar`, `Sidebar`, `Dialog`, `Modal`, `Toast`, etc.

### Examples

- Routed page example: ./item-detail.page.ts and ./item-detail.page.html
- Presentational component example: ./item-detail.component.ts and ./item-detail.component.html

