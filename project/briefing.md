# AstroBookings Briefing

A **frontend web application** for offering bookings for rocket launches.

- A header with home link and rocket, launch, and booking management links.

- A footer with company information and contact details.

- At home page a list of rockets and a button to create a new one.

- At new rocket page, a form to create a new rocket with name, description, and capacity fields.

- At rocket details page, a list of scheduled launches and a button to create a new one.

- At new launch page, a form to create a new launch with name, description, price, minimum passengers, and scheduled date fields.

- At launch details page, a list of customers booked and a button to create a new booking.

- At booking details page, a summary of the booking and a button to cancel it.

- Data and logic are handled by a backend API, but can be used for testing and improved user experience.

  - Launches are scheduled for specific rockets, with pricing and minimum passenger thresholds.

  - Rockets have limited seats; launch requests are validated against rocket capacity.

  - Launch status lifecycle: scheduled → confirmed → successful, or cancellation/suspension paths.

  - A customer is identified by their email address and has a name and phone number.

  - One customer can book multiple seats on a launch but cannot exceed the available seats.

  - Customers are billed upon booking, and payments are processed through a mock gateway.

> [!WARNING]
> AstroBookings is a fictional space travel company.
> The system is designed for demonstration and training purposes. 
> Not for production use; no security is required at the initial stage.

## API Overview
- Runs locally on http://localhost:3000
- [Endpoints](./api-endpoint.md) for rockets, launches, customers, and bookings.
- [Models](./api-models.md) defining the data structures for each resource.

>[!NOTE]
> Backend API at https://github.com/AlbertoBasalo/astro-bookings-express
