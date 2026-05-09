# ResQperation Mobile

This folder is an Expo React Native app for Expo Go.

## Run With Backend

Open one terminal for the Laravel backend:

```powershell
cd C:\CAPSTONEE\ResQperation-System\backend
composer install
copy .env.example .env
php artisan key:generate
New-Item -ItemType File -Path database\database.sqlite -Force
php artisan migrate --seed
composer run serve:lan
```

Open a second terminal for the mobile app:

```powershell
cd C:\CAPSTONEE\ResQperation-System\mobile
npm install
npm run dev
```

Then open Expo Go on your phone and scan the QR code from the mobile terminal.
Keep the phone and laptop on the same Wi-Fi network.

## Test Accounts

```text
Rescuer:
User ID: RTR-24001
Password: temp_rescuer

Household resident:
User ID: HHR-24001
Password: temp_resident
```

## Network Notes

Do not use `localhost` from your phone. On a phone, `localhost` means the phone
itself, not your laptop.

By default, the app reads the laptop IP from Expo and calls:

```text
http://YOUR_LAPTOP_WIFI_IP:8000/api
```

If auto-detection does not work, copy `.env.example` to `.env` and set:

```text
EXPO_PUBLIC_API_BASE_URL=http://YOUR_LAPTOP_WIFI_IP:8000/api
```

Restart `npm run dev` after changing `.env`.
