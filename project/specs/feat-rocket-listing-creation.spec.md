# Rocket Listing and Creation Specification
- **Type**: feat
- **Status**: Draft

## Problem Description

Users and staff cannot manage rockets in the MVP flow without a dedicated way to browse existing rockets and create new ones with valid required data. This prevents launch planning and blocks downstream launch and booking journeys.

### User Stories

- As a staff user, I want to view all rockets in one place so that I can quickly understand available fleet options.
- As a staff user, I want to create a rocket with required information so that it can be used in future launch scheduling.
- As an operations user, I want clear validation and error feedback when entering rocket data so that I can correct input without confusion.

## Solution Overview

### User/App interface

- Present the rockets area on the home page, showing the list of available rockets.
- Provide a dedicated create-rocket route for creating a new rocket.
- Make the create-rocket route reachable from the rockets area.
- Present required rocket fields clearly and mark invalid input states.
- Show success feedback when rocket creation completes.
- Keep user orientation by returning to or refreshing the rockets list after creation.

### Model and logic

- Define the rocket list and rocket creation flows as core domain interactions.
- Enforce required field completeness before submission.
- Align field expectations and request shape with backend API constraints.
- Handle API response outcomes with clear success and error states.

### Persistence

- Persist created rockets through the backend API.
- Refresh displayed rocket data from the API after successful creation.
- Do not introduce local long-term storage for rocket records.

## Acceptance Criteria

- [ ] When a user opens the rockets area, the system shall display the list of rockets returned by the API.
- [ ] While the rockets list is loading, the system shall present a visible loading state.
- [ ] When the rockets API returns no items, the system shall display an empty-state message with an action to create a rocket.
- [ ] While creating a rocket, when required fields are missing, the system shall prevent submission and show field-level validation guidance.
- [ ] When a user submits a valid create-rocket form, the system shall send a create request aligned with API field constraints.
- [ ] If rocket creation succeeds, then the system shall show a success message and include the new rocket in the rockets list view.
- [ ] If rocket listing fails, then the system shall show a clear user-facing error message and keep the user in the rockets context.
- [ ] If rocket creation fails, then the system shall show a clear user-facing error message and preserve entered form values for manual retry.
