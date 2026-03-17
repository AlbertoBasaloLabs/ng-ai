---
name:  coding-ng
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
- Use auto-closing tags for void elements (e.g., `<app-header />`, `<app-user-form />`).
- Use `[attribute]` for computed attributes with dynamic values.

### Types

### Routed 

- Suffixed with `Page` type (e.g., `UserPage`). Ex: `ng g c routes/user --type=page`
- Export the class as `default` for simpler imports at routes.
- Receive route parameters via signals with `input.required<Type>()`.
- **Injected** with services to manage data and business logic.
- No raw HTML in their templates, use presentational components to encapsulate UI logic.

### Presentational

- **Focused on UI** and presentation, with minimal logic.
- No injected services, receive data and emit events through **input and output signals**.

### Shared Reusable

- Presentational components placed in a `shared` folder, **reusable** across the application.
- Examples: `Button`, `Card`, `List`, `Table`, `Form`, etc.

### Core 

- Presentational components placed in a `core` folder, used **only once by the app** component
- Examples: `Header`, `Footer`, `Navbar`, `Sidebar`, `Dialog`, `Modal`, `Toast`, etc.

## Services

- Services are used for **business logic, data management, and communication** with APIs.
- Provided in root by decorator `@Injectable({ providedIn: 'root' })`.
- Generate services using the CLI: `ng g s folder/service-name`

### State Management Services

- Manage asynchronous data with **signals** keeping _loading_, _error_, _resolved_ states.
- Exposes state to components through **signals**.
- Exposes **command methods** to update state and perform actions.
- Used by components, uses repositories to handle data fetching and transformations.

### Repository Services

- Handle **communication with APIs** and data sources.
- Encapsulate `HTTP` calls and data transformations.
- Leverages `interceptors` for cross-cutting concerns like:
  - authentication, error handling, data caching, and logging.

## Routing

- Configure routing at `app.config.ts` file with:
  - `provideRouter(routes, withComponentInputBinding()),` function.
For each route create:
- A **routed** component with type `Page` (e.g., `UserPage`) 
- A **presentational** component for the UI (e.g., `UserProfile`).
- A **service** to manage data and business logic for the route (e.g., `UserService`).
- Optionally:
  - a **guard** to protect the route based on authentication or permissions.
  - a **resolver** to fetch data before activating the route.
  - a **repository service** to handle data fetching and transformations.
  
```bash
# for route /users/:id
ng g c routes/user --type=page # make it default export
ng g c routes/user/user-profile
ng g s routes/user/user  
```

- Define routes in a separate `routes` folder with `app.routes.ts` file.

```ts
export const routes: Route[] = [
  {
    path: 'users/:id ',
    loadComponent: () => import('./routes/user/user.page'),
  }
```

## HTTP communication

- Configure http at `app.config.ts` file with:
  - `provideHttpClient(withFetch(), withInterceptors([])),` function.

- Use `HttpClient` for making HTTP requests.

```ts
class UserRepository {
  // Inject HttpClient
  #httpClient = inject(HttpClient);
  
  // Fetch user data
  getUser$(id: string): Observable<User> {
    return this.#httpClient.get<User>(`/api/users/${id}`);
  }

  // Create or update user data
  saveUser$(user: User): Observable<User> {
    if (user.id) {
      return this.#httpClient.put<User>(`/api/users/${user.id}`, user);
    } else {
      return this.#httpClient.post<User>('/api/users', user);
    }
  } 
}
```

### Resources to interop with signals in services

```ts
class UserService {
  #repository = inject(UserRepository);
  
  #userResource = rxResource<User, {id: string}>({
    request: () => ({id: this.userId()}),
    loader: ({request}) => this.#repository.getUser$(request.id),
  });

  userId = signal('');
  user = this.#userResource.value;
  error = this.#userResource.error;
  loading = this.#userResource.isLoading;

  saveUser(user: User) {
    this.#repository.saveUser$(user).subscribe({
      next: (savedUser) => this.userId.set(savedUser.id),
      error: (err) => throw Error(err)
    });
  }
}
```
