# ResQperation: Disaster Response and Household Safety Platform

Capstone Project - Associate Degree in Computer Technology, Major in Software Development

## Project Overview

ResQperation is organized around one shared backend, one web frontend, and one Ionic mobile app. All users authenticate through the same backend credential system. The UI changes by application and user role.

## Folder Structure

```text
resqperation-system/
|-- backend/        Laravel API, auth, database, seeders, business logic
|-- web/            React web frontend
|-- mobile/         Ionic React mobile app for rescuer and household resident roles
|-- shared/         Shared API config, constants, and utilities
|-- docs/           Documentation
`-- README.md
```

## Authentication Model

There is no "sign in as" or self-registration flow. HQ creates/provides each user's login ID and temporary password.

Supported roles are:

- `super_admin`
- `admin`
- `rescuer`
- `household_resident`

The same `/api/auth/login` endpoint is used by web and mobile. After login, the frontend reads the returned role and displays the correct experience.

## Applications

### backend

Shared Laravel backend for every client.

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### web

Standalone React web frontend.

```bash
cd web
npm install
npm run dev
```

Set `VITE_API_BASE_URL` if the backend is not running at `http://localhost:8000/api`.

### mobile

Single Ionic React mobile app. Rescuer and household resident screens are separated by role after login.

```bash
cd mobile
npm install
npm run dev
```

Set `VITE_API_BASE_URL` if needed.

## Documentation

- [Root Docs](docs/README.md)
- [Database Schema](docs/SCHEMA.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
