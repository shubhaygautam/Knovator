# Architecture Overview

This project is divided into **server** and **client** applications.

## Server
- **Express** handles HTTP requests.
- **MongoDB** via Mongoose stores jobs and import logs.
- **Bull** with **Redis** manages a queue for importing jobs.
- **Cron** runs hourly (configurable via `CRON_SCHEDULE`) to enqueue feed URLs.
- A dedicated **worker** process consumes the queue with configurable
  concurrency (`JOB_CONCURRENCY`). It fetches and parses XML feeds,
  converting them to JSON and storing results in the database.

## Client
- **Next.js** provides a simple admin interface.
- Fetches import logs from the server and displays them in a table.

The design aims to be modular so services like the queue worker or API routes
can be expanded into separate services later.
