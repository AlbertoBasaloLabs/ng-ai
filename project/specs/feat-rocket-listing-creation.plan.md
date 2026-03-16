# Rocket Listing and Creation Plan

## Steps

### Step 1: Define Rocket Domain Contracts
Define strict TypeScript models and request contracts that match the backend API.
- [ ] Define `Rocket`, `RocketRange`, and `CreateRocketRequest` types aligned with `name`, `range`, and `capacity`.
- [ ] Keep model contracts in a shared app location so list and create flows reuse the same types.
- [ ] Ensure request/response typing avoids `any` and follows strict mode.

### Step 2: Implement Rockets Data Access Layer
Create a dedicated repository/service for rockets listing and creation operations.
- [ ] Add `getRockets()` mapped to `GET /rockets`.
- [ ] Add `createRocket(request)` mapped to `POST /rockets`.
- [ ] Normalize API error payloads into a consistent UI-friendly shape.
- [ ] Keep HTTP logic out of components.

### Step 3: Build Rockets State Service
Centralize list and create state using Angular signals for loading, success, and error outcomes.
- [ ] Add signals for listing state: `rockets`, `loadingList`, `listError`.
- [ ] Add signals for creation state: `creating`, `createError`, `createSuccess`.
- [ ] Add commands: `loadRockets()` and `createRocket()`.
- [ ] Trigger list refresh after successful creation.

### Step 4: Create Rockets Listing View
Build the rockets area UI to display list, loading, and empty states from service signals.
- [ ] Render a visible loading state while list data is being fetched.
- [ ] Render rockets returned by API when data exists.
- [ ] Render empty-state message when no rockets are returned.
- [ ] Include a clear action in empty/list states to navigate to create-rocket.

### Step 5: Add Dedicated Create-Rocket Route and Page
Provide a focused route for creating rockets and make it reachable from rockets context.
- [ ] Add a dedicated route for rocket creation (for example `/rockets/create`).
- [ ] Create a standalone create-rocket page component.
- [ ] Add navigation entry points from rockets list and empty state.
- [ ] Add cancel/back navigation to return to rockets area.

### Step 6: Implement Create-Rocket Form Validation
Enforce required fields before submit and provide clear field-level guidance.
- [ ] Build reactive form controls for `name`, `range`, and `capacity`.
- [ ] Add validators: required fields, enum-safe range selection, capacity numeric constraints.
- [ ] Disable submission while form is invalid or request is in progress.
- [ ] Show field-level validation messages for missing/invalid input.

### Step 7: Handle Create Submission and Success Flow
Send valid payloads, show success feedback, and update rockets context after creation.
- [ ] Submit API payload matching backend constraints exactly.
- [ ] Show a clear success message when creation completes.
- [ ] Refresh rockets list and return user to rockets context.
- [ ] Ensure newly created rocket appears in the refreshed list.

### Step 8: Handle Listing and Creation Failure Flows
Provide recoverable errors while preserving user orientation and entered data.
- [ ] Show listing error message while keeping user in rockets context.
- [ ] Show creation error message without clearing entered form values.
- [ ] Preserve form data on create failure to enable manual retry.
- [ ] Provide retry actions for both listing and creation errors.

### Step 9: Add Tests and Validate Acceptance Criteria
Cover required scenarios with unit/integration tests and final verification.
- [ ] Test rockets list loading, success, empty, and error states.
- [ ] Test create form validation and blocked invalid submissions.
- [ ] Test successful create flow (success message + list refresh + new rocket visible).
- [ ] Test create failure flow preserves form values and supports retry.
- [ ] Run `npm test` and verify all acceptance criteria are covered.
