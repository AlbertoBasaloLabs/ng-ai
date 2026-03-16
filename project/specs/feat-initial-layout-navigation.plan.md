# Initial Layout and Navigation Plan

## Steps

### Step 1: Define Navigation Contract
Create one typed source of truth for primary navigation so routes and UI stay aligned.
- [ ] Create a `primary-navigation` model with `label`, `path`, and `section` keys.
- [ ] Use strict TypeScript types (`readonly`, narrow unions) to prevent route/name drift.
- [ ] Include exactly four items: Home (`/`), Rockets (`/rockets`), Launches (`/launches`), Bookings (`/bookings`).

### Step 2: Configure Core Routes
Add the core route map and route metadata needed for active state and recovery.
- [ ] Define routes for `/`, `/rockets`, `/launches`, `/bookings`.
- [ ] Attach `data.section` metadata to each route for active-link resolution.
- [ ] Add wildcard route `**` to a recoverable not-found page.

### Step 3: Build Shared Application Shell
Replace the starter screen with a persistent layout used by all pages.
- [ ] Update root app template to render header, main content outlet, and footer.
- [ ] Keep header/footer outside routed content so they remain visible on all routes, including not-found.
- [ ] Add a dedicated inline area in the shell for route error messages.

### Step 4: Implement Header Navigation (Desktop + Mobile)
Create a standalone OnPush header component with accessible primary navigation.
- [ ] Render links from the navigation model instead of hardcoded markup.
- [ ] Add active-link behavior (`routerLinkActive`, `aria-current="page"`).
- [ ] Add a collapsible mobile menu that keeps all primary destinations reachable.
- [ ] Close mobile menu after successful navigation.

### Step 5: Implement Footer Component
Create a simple persistent footer for consistent page framing.
- [ ] Add a standalone OnPush footer component under `core/`.
- [ ] Integrate footer into the shared shell.

### Step 6: Create Routed Page Stubs
Add minimal routed pages to support navigation and section context.
- [ ] Create `HomePage`, `RocketsPage`, `LaunchesPage`, and `BookingsPage` components.
- [ ] Keep templates minimal and focused on section identity for MVP.
- [ ] Ensure each route lands on the correct page component.

### Step 7: Add Not-Found Recovery
Provide a recoverable unknown-route experience without losing app context.
- [ ] Create `NotFoundPage` with clear message and recovery action (link/button to Home).
- [ ] Confirm shared header/footer/navigation remain visible on unknown routes.

### Step 8: Handle Navigation Errors in Layout
Surface route navigation failures clearly while preserving current context.
- [ ] Listen for router `NavigationError` events in the root shell.
- [ ] Show a user-friendly inline error banner below the header.
- [ ] Keep current page context visible when an error occurs.

### Step 9: Update and Add Tests
Shift tests from starter assertions to behavior tied to the specification.
- [ ] Update app root tests to assert header, footer, outlet, and error region rendering.
- [ ] Add routing tests for primary link navigation and active-state updates.
- [ ] Add tests for unknown-route recovery with persistent shell.
- [ ] Add tests for mobile navigation reachability and accessibility.
- [ ] Add tests for navigation-error banner behavior.

### Step 10: Verify End-to-End Acceptance
Validate behavior against all acceptance criteria before closing the feature.
- [ ] Run `npm test` and resolve any regressions.
- [ ] Manually verify navigation across all four core destinations.
- [ ] Refresh each core route and verify correct active state persists.
- [ ] Validate mobile viewport behavior for complete destination reachability.
- [ ] Validate unknown-route and route-error experiences match the spec.
