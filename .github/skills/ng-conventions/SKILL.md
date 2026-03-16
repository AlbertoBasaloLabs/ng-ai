---
name: ng-conventions
description: Best practices and conventions for Angular development. To be used when working on Angular projects to ensure code quality and maintainability.
---

# Ng Conventions

- Use the CLI to generate components, services, and other Angular artifacts to ensure consistent file structure and naming conventions.
- Follow the Angular Style Guide for naming conventions, such as using camelCase for variables and functions, and PascalCase for classes and components.

## Angular Configuration

Set the this defaults for CLI generation in `angular.json`:

```json
"schematics": {
  "@schematics/angular:component": {
    "changeDetection": "OnPush",
  }
}
```

## Components

- Componentes are **standalone**, no modules are needed.
- On push **change detection** is set by default for better performance.
- Generate components using the CLI: `ng g c folder/component-name`
- Do not make direct calls to APIs in components, use services instead.

### Syntax

- Use `inject()` instead of constructor **injection**.
- Use `input()` and `output()` **signals** for component communication.
- Use `signal()` and `computed()` for **state management**.
- Use `effects()` for exceptional handling of **side effects** in components.

### Templates

- Use `@if`, `@else`, `@switch` for conditional rendering.
- Use `@for` with `track item.id` for iterating over collections.

### Types

### Routed 

- Suffixed with `Page` type (e.g., `UserPage`). Ex: `ng g c routes/user --type=page`
- Receive route parameters via signals with `input.required<Type>()`.
- Injected wirth services to manage data and business logic.
- No raw HTML in their templates, use presentational components to encapsulate UI and logic.

### Presentational

- Focused on UI and presentation, with minimal logic.
- No injected services, receive data and emit events through inputs and outputs signals.

### Shared Reusable

- Presentational components placed in a `shared` folder, reusable across the application.
- Examples: `Button`, `Card`, `List`, `Table`, `Form`, etc.

### Core 

- Presentational components placed in a `core` folder, used only once by the app component
- Examples: `Header`, `Footer`, `Navbar`, `Sidebar`, `Dialog`, `Modal`, `Toast`, etc.

## Services

- Services are used for business logic, data management, and communication with APIs.
- Provided in root by decorator `@Injectable({ providedIn: 'root' })`.
- Generate services using the CLI: `ng g s folder/service-name`

### State Management Services

- Manage asynchronous data with signals keeping loading, error, empty and data states.
- Exposes state to components through signals.
- Exposes comand methods to update state and perform actions.
- Used by components, uses repositories to handle data fetching and transformations.

### Repository Services

- Handle communication with APIs and data sources.
- Encapsulate HTTP calls and data transformations.
- Take care of error handling and data caching if needed.
- Leverages interceptors for cross-cutting concerns like authentication and logging.

## Routing

- Define routes in a separate `routes` folder with `app.routes.ts` file.

For each route create:
- A routed component with type `Page` (e.g., `UserPage`) 
- A presentational component for the UI (e.g., `UserProfile`).
- A service to manage data and business logic for the route (e.g., `UserService`).
- Optionally:
  - a guard to protect the route based on authentication or permissions.
  - a resolver to fetch data before activating the route.
  - a repository service to handle data fetching and transformations.
