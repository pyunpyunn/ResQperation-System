# Deployment Guide

ResQperation now deploys as three application surfaces:

- `backend` - Laravel API
- `web` - React web frontend
- `mobile` - Ionic React mobile app

## Backend

```bash
cd backend
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
php artisan migrate --force
php artisan optimize
```

Confirm:

```bash
curl http://localhost:8000/api/health
curl http://localhost:8000/api/v1/health
```

## Web

```bash
cd web
npm ci
npm run build
```

Configure `VITE_API_BASE_URL` to point to the deployed backend API.

## Mobile

```bash
cd mobile
npm ci
npm run build
```

Use Ionic/Capacitor packaging for native builds after the web build passes.

## Verification

From the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\verify-deploy.ps1
```
