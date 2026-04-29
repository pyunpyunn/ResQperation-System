# ResQperation: Disaster Response and Household Safety Platform

Capstone Project - Associate Degree in Computer Technology, Major in Software Development

## Project Overview

ResQperation is a disaster response platform for coordinating rescue operations, managing incidents, and helping households request emergency assistance.

The project is organized into four connected applications:

- 1 shared backend API
- 1 admin web application
- 2 mobile client applications

## Architecture

### Four-Application Structure

```text
CAPSTONE/
|-- ResQperation-Admin/         Laravel + Inertia admin web app
|-- ResQperation-Backend/       Shared Laravel API backend
|-- ResQperation-Household/     Expo / React Native household app
|-- ResQperation-Rescuer/       Expo / React Native rescuer app
`-- docs/                       Database schema, ERD, documentation
```

### How To Understand The Folders

The part that usually causes confusion is `ResQperation-Admin`.

`ResQperation-Backend` is the main backend service for the whole capstone. It is the shared API server that stores data, runs business logic, and exposes endpoints for the other applications.

`ResQperation-Admin` is different. It is a full-stack web application built with Laravel, Inertia, and React. Because Laravel handles both server-side features and the browser UI in the same project, this folder contains:

- backend-style code such as routes, controllers, middleware, and authentication
- frontend-style code such as React components, pages, JavaScript, and CSS

So the admin folder is not "wrong" for looking like both a backend and a frontend. That is normal for a Laravel web app.

The simplest way to describe the project is:

- `ResQperation-Backend` = shared backend API
- `ResQperation-Admin` = admin web app with both backend and frontend parts
- `ResQperation-Household` = household mobile frontend
- `ResQperation-Rescuer` = rescuer mobile frontend

## Application Descriptions

### ResQperation-Backend

Shared API server for the whole system.

- Provides REST API endpoints for client applications
- Handles business logic and data persistence
- Uses Laravel Sanctum for authentication
- Supports cross-platform communication through JSON APIs

### ResQperation-Admin

Admin and coordinator dashboard.

- Manages disaster events and operational data
- Handles responder and household monitoring
- Supports dispatching, tracking, and account management
- Uses Laravel on the server side and React through Inertia on the frontend

### ResQperation-Household

Mobile app for households.

- Submit emergency requests
- Track request status
- Share location and communicate with responders

### ResQperation-Rescuer

Mobile app for responders.

- Receive rescue tasks
- Navigate to assigned locations
- Update task progress and status

## Technology Stack

- Shared Backend API: PHP, Laravel, MySQL or PostgreSQL, Sanctum
- Admin Web App: Laravel, Inertia.js, React, TypeScript, Tailwind CSS, Vite
- Mobile Apps: React Native, Expo, TypeScript
- Version Control: Git

## Getting Started

Each application has its own setup process.

### 1. Backend Setup

```bash
cd ResQperation-Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### 2. Admin Setup

```bash
cd ResQperation-Admin
composer install
npm install
cp .env.example .env
npm run dev
```

### 3. Mobile App Setup

```bash
cd ResQperation-Household
npm install
npx expo start
```

Use the same process for `ResQperation-Rescuer`.

## Database Schema

The system includes core tables for:

- user and account management
- disaster operations and rescue requests
- status and reference data
- integration and access tokens

See [docs/SCHEMA.md](docs/SCHEMA.md) for the schema and [docs/README.md](docs/README.md) for supporting documentation.

## Testing

- Backend tests: `ResQperation-Backend/tests/`
- Admin tests: `ResQperation-Admin/tests/`
- Mobile apps: Expo-based testing can be added as needed

Example:

```bash
cd ResQperation-Backend
php artisan test
```

## Deployment

- Backend: deploy as the shared Laravel API service
- Admin: deploy as a Laravel web application with built Vite assets
- Mobile apps: publish through Expo or build native app packages
- Deployment guide: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- Pre-release verification: `powershell -ExecutionPolicy Bypass -File .\scripts\verify-deploy.ps1`

## Documentation

- [Root Docs](docs/README.md)
- [Database Schema](docs/SCHEMA.md)
- [Backend API](ResQperation-Backend/README.md)
- [Admin Guide](ResQperation-Admin/README.md)
- [Household App](ResQperation-Household/README.md)
- [Rescuer App](ResQperation-Rescuer/README.md)
