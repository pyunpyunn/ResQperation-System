# ResQperation: Disaster Response & Household Safety Platform

**Capstone Project** — Associate Degree Computer Technology Major in Software Development

## Project Overview

ResQperation is a comprehensive platform for coordinating disaster response, managing rescue operations, and connecting households with emergency resources. The system consists of four interconnected applications built with modern frameworks.

## Architecture

### Four-Application Structure

```
CAPSTONE/
├── ResQperation-Admin/         Laravel + Inertia.js (Admin Dashboard)
├── ResQperation-Backend/       Laravel API (RESTful Backend)
├── ResQperation-Household/     React Native/Expo (Household App)
├── ResQperation-Rescuer/       React Native/Expo (Responder App)
└── docs/                       Database schema, ERD, documentation
```

### Application Descriptions

**ResQperation-Admin** — Coordinator Dashboard
- Disaster event management and tracking
- Responder and team assignment
- Household request prioritization and dispatch
- Real-time status monitoring
- Built with Laravel, Inertia.js, React, TailwindCSS

**ResQperation-Backend** — API Server
- RESTful API (v1) for all client applications
- Core business logic and data persistence
- Authentication via Laravel Sanctum
- CORS-enabled for cross-platform access
- Built with Laravel 11

**ResQperation-Household** — Mobile App for Households
- Submit emergency requests
- Track request status
- Real-time location sharing
- Communication with responders
- Built with React Native, Expo, TypeScript

**ResQperation-Rescuer** — Mobile App for Responders
- Receive and accept rescue tasks
- Navigate to locations
- Update task status
- Communicate with coordinators and households
- Built with React Native, Expo, TypeScript

## Technology Stack

- **Backend**: PHP 8.3, Laravel 11, MySQL/PostgreSQL
- **Admin Frontend**: React, TypeScript, TailwindCSS, Inertia.js
- **Mobile**: React Native, Expo, TypeScript, TailwindCSS
- **API**: RESTful, JSON, Laravel Sanctum (authentication)
- **Version Control**: Git

## Getting Started

### Prerequisites
- PHP 8.3+
- Node.js 18+ and npm
- MySQL/PostgreSQL
- Expo Go (for mobile testing)

### Setup Instructions

Each application has its own setup process. See the README in each folder:

1. **Backend Setup** (start here)
   ```bash
   cd ResQperation-Backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

2. **Admin Setup**
   ```bash
   cd ResQperation-Admin
   composer install
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Mobile Apps**
   ```bash
   cd ResQperation-Household  # or ResQperation-Rescuer
   npm install
   npx expo start
   ```

## Database Schema

The system includes 28 core tables organized across:
- User Management (users, responders, households, household_members)
- Operations (disaster_events, rescue_teams, incoming_requests)
- Reference Data (severity_levels, status_lookups, request_types)
- Integration (safe_track_accounts, access_tokens)

See [docs/SCHEMA.md](docs/SCHEMA.md) for complete schema documentation and [docs/README.md](docs/README.md) for the ERD.

## Project Structure & Code Quality

- **Real Codebase**: ~400 files of production code
- **Architecture**: Modular four-project separation
- **Backend**: Versioned API (v1), middleware for CORS and rate limiting
- **Mobile**: Expo file-based routing, hooks-based components
- **Admin**: React component architecture with Inertia.js integration

✅ **This project is appropriately scoped for an associate degree capstone.**

## Testing

- Backend: PHPUnit tests in `ResQperation-Backend/tests/`
- Frontend: Component tests can be added with Vitest
- Mobile: Expo testing framework

Run tests:
```bash
# Laravel tests
cd ResQperation-Backend
php artisan test

# Frontend tests (when configured)
npm test
```

## Deployment

- Backend: Deploy to hosting with PHP 8.3+ and MySQL/PostgreSQL
- Admin: Build with Vite and deploy static files to CDN/web server
- Mobile: Publish to Expo Build or native build
- All apps use environment variables (.env) for configuration

## Documentation

- [Database Schema](docs/SCHEMA.md)
- [Backend API](ResQperation-Backend/README.md)
- [Admin Guide](ResQperation-Admin/README.md)
- [Mobile Apps](ResQperation-Household/README.md)

## Cleanup Status ✅

**April 23, 2026 - Major cleanup completed:**
- Removed root-level folder bleed (app/, assets/, components/, etc.)
- Removed orphaned config files from root
- Deleted utility/debug files (verify_bom.php, nullable())
- Removed Blade cache files from committed source
- Removed Expo starter placeholder components and images
- Updated .gitignore across all projects
- Created docs/ folder with schema templates

Remaining: Add custom assets and finalized schema files to docs/.


```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
