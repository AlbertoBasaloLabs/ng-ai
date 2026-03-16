# Initial Layout and Navigation Specification
- **Type**: feat
- **Status**: Draft

## Problem Description

Users cannot consistently move across core AstroBookings areas without a shared page structure and predictable primary navigation. This blocks core MVP journeys because users may lose orientation between home, rockets, launches, and bookings.

### User Stories

- As a customer, I want to move quickly between home, launches, and bookings so that I can complete booking tasks without getting lost.
- As a staff user, I want consistent access to rockets, launches, and bookings from any page so that I can manage operations efficiently.
- As a new user, I want clear global navigation and page framing so that I can understand where I am in the app.

## Solution Overview

### User/App interface

- Provide one shared application layout used by core pages.
- Include a persistent header and footer.
- Include primary navigation links for home, rockets, launches, and bookings.
- Show current section context through active navigation state.
- Keep navigation usable on desktop and mobile viewports.

### Model and logic

- Define a single source of truth for primary navigation items and destinations.
- Ensure navigation state reflects the currently displayed area.
- Keep route transitions predictable and preserve user orientation when navigation errors occur.

### Persistence

- No new backend persistence is required for this feature.
- Navigation context is derived from current application state and route location.

## Acceptance Criteria

- [ ] When the application loads, the system shall display a shared layout with a header, footer, and primary links for Home, Rockets, Launches, and Bookings.
- [ ] While a user is on any core page, when the user selects a primary link, the system shall navigate to the selected area.
- [ ] Where a primary link corresponds to the current area, the system shall present that link as active.
- [ ] When a user refreshes the current route, the system shall preserve the shared layout and correct active navigation state.
- [ ] If a user navigates to an unknown route, then the system shall present a recoverable not-found view that keeps access to primary navigation.
- [ ] When the application is viewed on a mobile viewport, the system shall keep all primary navigation destinations reachable.
- [ ] If route navigation fails in a core flow, then the system shall show a clear user-facing error message and keep the current context visible.
