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
### Components

For specific conventions on components, see the [components-ng skill](../components-ng/SKILL.md).

### Services

For specific conventions on services, see the [service-ng skill](../service-ng/SKILL.md).


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
