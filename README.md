# ResQperation: Disaster Response and Household Safety Platform

Capstone Project - Associate Degree in Computer Technology, Major in Software Development

## Project Overview

ResQperation is organized around one shared backend, one web frontend, and one Expo mobile app. All users authenticate through the same backend credential system. The UI changes by application and user role.

## Folder Structure

```text
resqperation-system/
|-- backend/        Laravel API, auth, database, seeders, business logic
|-- web/            React web frontend
|-- mobile/         Expo React Native mobile app for rescuer and household resident roles
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

```powershell
cd backend
composer install
copy .env.example .env
php artisan key:generate
New-Item -ItemType File -Path database/database.sqlite -Force
php artisan migrate --seed
composer run serve:lan
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

Single Expo React Native mobile app. Rescuer and household resident screens are separated by role after login.

```bash
cd mobile
npm install
npm run dev
```

Scan the QR code in Expo Go. The app auto-detects the laptop IP from Expo for local phone testing. Set `EXPO_PUBLIC_API_BASE_URL` only if you need to override the backend URL.

## Documentation

- [Root Docs](docs/README.md)
- [Database Schema](docs/SCHEMA.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
