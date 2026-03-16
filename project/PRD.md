# AstroBookings Product Requirements Document

AstroBookings is a frontend web application that enables customers and staff to manage rocket launches and seat bookings through a local backend API.

## Vision and Scope

AstroBookings provides a clear, task-focused interface to create and browse rockets, schedule launches, and manage bookings with reliable API-driven workflows. The MVP goal is to establish the core booking journey and operational visibility while keeping implementation simple and demonstrable.

Target users are customers booking seats on launches and admin/staff users managing rockets, launches, and booking operations.

In scope for MVP: initial application layout, navigation, rocket management basics, launch management basics, booking creation and details, launch booked-passenger visibility, and core frontend service foundations connected to the local API.

Out of scope for MVP: dedicated customer management screens, mock billing and payment workflows, booking cancellation flow, advanced reliability patterns (retry, waitlist), multilingual support, and explicit security hardening.

## Functional Requirements

### FR1 Initial Layout and Navigation
- The application must provide a shared layout with header and footer, including links for home, rockets, launches, and bookings so users can move across core areas consistently.
- **Status**: Planned

### FR2 Rocket Listing and Creation
- The application must allow users to view the rockets list and create a new rocket with required fields aligned to API constraints.
- **Status**: Planned

### FR3 Rocket Details and Launch Scheduling Entry
- The rocket details view must display launches associated with the selected rocket and provide an action to open the create-launch flow for that rocket.
- **Status**: NotStarted

### FR4 Launch Creation and Details
- The application must support creating launches with required fields and show launch details including booked customers and seat-related booking context.
- **Status**: NotStarted

### FR5 Booking Creation and Booking Details
- Users must be able to create a booking for a launch and view booking details summary after creation, including core booking information returned by the API.
- **Status**: NotStarted

### FR6 API Error Handling UX
- For failed API requests in core flows, the UI must show clear, user-friendly error messages and preserve user context so they can retry manually without losing orientation.
- **Status**: NotStarted

## Technical Requirements

### TR1 Angular Standalone SPA Foundation
- The frontend must be implemented as an Angular v19+ standalone SPA with route-based pages for home, rocket creation/details, launch creation/details, and booking details.
- **Status**: NotStarted

### TR2 Core Services Layer
- The application must define core domain services for rockets, launches, and bookings, plus shared API communication utilities to centralize endpoint access and request/response handling.
- **Status**: NotStarted

### TR3 Signal-Based Reactive State
- Page and feature state should use Angular signals to keep UI updates predictable and lightweight for list/detail and form-driven interactions.
- **Status**: NotStarted

### TR4 Backend API Integration and Reliability Baseline
- The frontend must integrate with the local backend API at http://localhost:3000 for rockets, launches, and bookings, with consistent handling of common HTTP error responses as the primary reliability baseline. Success is tracked qualitatively by stable low API error occurrence across core user flows.
- **Status**: NotStarted