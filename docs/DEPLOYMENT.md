# ResQperation Deployment Guide

This guide matches the current repository as of April 27, 2026.

The capstone is deployable as four separate targets:

- `ResQperation-Backend` is the shared Laravel API.
- `ResQperation-Admin` is a separate Laravel + Inertia web app.
- `ResQperation-Household` is an Expo mobile client.
- `ResQperation-Rescuer` is an Expo mobile client.

## What was verified

Before deployment, run the repository check script from the project root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-deploy.ps1
```

That script checks for:

- unresolved merge conflict markers
- required `.env.example` files
- Laravel tests
- production Vite builds
- Laravel `optimize` caching
- Expo linting
- Expo dependency and configuration health through `expo-doctor`

## Important Repository Note

The two mobile apps currently exist in the root repository as gitlink entries, but the root repo does not contain a `.gitmodules` file.

That means:

- deploying from this local workspace is fine because the folders are present
- deploying from a fresh clone of only the root repo may omit the mobile app contents

If you plan to use CI/CD from the root repository, normalize that structure first by either:

1. converting `ResQperation-Household` and `ResQperation-Rescuer` into normal directories tracked by the root repo
2. or restoring a proper `.gitmodules` setup that points to real submodule remotes

## Environment Files

Each application now has its own deployable environment template:

- `ResQperation-Backend/.env.example`
- `ResQperation-Admin/.env.example`
- `ResQperation-Household/.env.example`
- `ResQperation-Rescuer/.env.example`

Do not deploy using local `.env` files copied from development without reviewing:

- domain names
- database credentials
- queue/cache drivers
- CORS origins
- mobile API base URLs

## Backend Deployment

### Required runtime

- PHP 8.3+
- Composer 2+
- Node.js compatible with the checked-in frontend toolchain
- MySQL or PostgreSQL

### First-time setup

```bash
cd ResQperation-Backend
composer install --no-dev --optimize-autoloader
npm ci
cp .env.example .env
php artisan key:generate
php artisan migrate --force
npm run build
php artisan optimize
```

### Required production values

Set these at minimum in `ResQperation-Backend/.env`:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.your-domain.com

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=resqperation
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password

CORS_ALLOWED_ORIGINS=https://admin.your-domain.com
SANCTUM_STATEFUL_DOMAINS=admin.your-domain.com
QUEUE_CONNECTION=database
CACHE_STORE=database
SESSION_DRIVER=database
```

### Health endpoint

The API now exposes:

```text
GET /api/health
```

Expected healthy response:

```json
{
  "status": "ok",
  "database": "ok",
  "app": "ResQperation",
  "timestamp": "2026-04-27T..."
}
```

## Admin Deployment

`ResQperation-Admin` is a Laravel application, not a static SPA. Deploy it the same way you would deploy a Laravel app with built Vite assets.

### First-time setup

```bash
cd ResQperation-Admin
composer install --no-dev --optimize-autoloader
npm ci
cp .env.example .env
php artisan key:generate
php artisan migrate --force
npm run build
php artisan optimize
```

### Required production values

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://admin.your-domain.com

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=resqperation_admin
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password

HQ_AUTH_COOKIE_NAME=resq_hq_access
HQ_AUTH_TTL_MINUTES=480
HQ_AUTH_ISSUER=https://admin.your-domain.com
SESSION_SECURE_COOKIE=true
```

## Mobile App Deployment

Both mobile apps now use `EXPO_PUBLIC_API_BASE_URL` instead of relying on hardcoded local IP addresses in source code.

### Local device testing

For physical-device local testing, set the base URL to your laptop's LAN IP:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.10:8000
```

### Production builds

For production, point both apps to the deployed backend API:

```env
EXPO_PUBLIC_API_BASE_URL=https://api.your-domain.com
```

### Validation before release

Run these in each mobile app:

```bash
npm ci
npm run lint
npx expo-doctor
```

Note:

- `expo-doctor` is a better fit than web export here because these apps use native-only packages such as `react-native-maps`
- native store submission still requires your final app identifiers, signing, and EAS/App Store/Play Store configuration

## Deployment Order

Use this order when releasing:

1. Deploy the database changes first.
2. Deploy `ResQperation-Backend` and confirm `GET /api/health` returns `200`.
3. Deploy `ResQperation-Admin` and confirm login plus dashboard routing works.
4. Build mobile clients with the production API URL.
5. Smoke-test one create/read flow from each client against production.

## Pre-Deploy Checklist

- `scripts/verify-deploy.ps1` passes from the repo root
- backend and admin `.env` files are production-safe
- `APP_DEBUG=false` for both Laravel apps
- the backend `CORS_ALLOWED_ORIGINS` matches the real admin domain
- both mobile apps use the real production API URL
- database migrations succeed with `--force`
- `php artisan optimize` succeeds on both Laravel apps
- no local-only IP addresses remain in committed source

## Common Failure Points

- Backend `.env.example` conflict markers: now fixed, but keep the repo check in place so future merges do not reintroduce them.
- Admin static-only hosting: do not deploy `ResQperation-Admin` to static hosts like Netlify/Vercel unless you rewrite the architecture, because it depends on Laravel routes and server-side behavior.
- Mobile `.env` tracking: local `.env` files should remain local. Use `.env.example` as the template, not the deployed secret source.
- Root repository mobile gitlinks: safe locally, risky for fresh-clone automation until normalized.
