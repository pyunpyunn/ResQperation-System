# ResQperation Deployment Guide

This guide covers deployment for all four ResQperation applications: Backend API, Admin Dashboard, Household App, and Rescuer App.

---

## Table of Contents

- [Backend API Deployment](#backend-api-deployment)
- [Admin Dashboard Deployment](#admin-dashboard-deployment)
- [Mobile Apps Deployment](#mobile-apps-deployment)
- [Database Setup](#database-setup)
- [Environment Configuration](#environment-configuration)
- [SSL/HTTPS Setup](#ssl-https-setup)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## Backend API Deployment

### Prerequisites

- PHP 8.3+ with extensions: curl, dom, fileinfo, filter, gd, hash, json, mbstring, openssl, pcre, pdo, tokenizer, xml
- MySQL 8.0+ or PostgreSQL 14+
- Composer 2.0+
- Node.js 18+ (for frontend assets)

### Local Development Setup

```bash
cd ResQperation-Backend

# 1. Install dependencies
composer install

# 2. Create environment file
cp .env.example .env

# 3. Generate application key
php artisan key:generate

# 4. Configure database in .env
# Update DB_CONNECTION, DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 5. Run migrations
php artisan migrate

# 6. Seed initial data (optional)
php artisan db:seed

# 7. Generate personal access token key (Sanctum)
php artisan passport:install

# 8. Start development server
php artisan serve
# API will be available at http://localhost:8000/api/v1
```

### Production Deployment (Linux/Apache/Nginx)

#### Using Shared Hosting (cPanel/Plesk)

1. **Upload Files**
   ```bash
   # Upload ResQperation-Backend to your hosting account
   # Example: public_html/resqperation-backend/
   ```

2. **Set Permissions**
   ```bash
   chmod -R 755 storage bootstrap/cache
   chmod -R 777 storage bootstrap/cache
   ```

3. **Configure Document Root**
   - Point the public domain to `public_html/resqperation-backend/public/`

4. **Setup Environment**
   - Copy `.env.example` to `.env`
   - Update database credentials
   - Run: `php artisan key:generate`

5. **Run Migrations**
   - Use SSH: `php artisan migrate`
   - Or use Adminer/phpMyAdmin to import SQL

6. **Create .htaccess** in `public/`
   ```
   <IfModule mod_rewrite.c>
       <IfModule mod_negotiation.c>
           Options -MultiViews -Indexes
       </IfModule>
       RewriteEngine On
       RewriteCond %{HTTP:Authorization} .
       RewriteRule ^(.*)$ index.php [L,QSA]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule ^(.*)$ index.php/$1 [L,QSA]
   </IfModule>
   ```

#### Using VPS (DigitalOcean, Linode, AWS)

1. **Install PHP & MySQL**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install php8.3 php8.3-cli php8.3-fpm php8.3-curl php8.3-mysql php8.3-gd
   sudo apt install mysql-server
   sudo apt install nginx composer
   ```

2. **Clone Repository**
   ```bash
   cd /var/www
   git clone https://github.com/your-org/resqperation.git
   cd resqperation/ResQperation-Backend
   ```

3. **Setup PHP-FPM**
   ```bash
   # Edit /etc/php/8.3/fpm/pool.d/www.conf
   sudo nano /etc/php/8.3/fpm/pool.d/www.conf
   
   # Change user/group to www-data
   # Set pm to dynamic with appropriate values
   sudo systemctl restart php8.3-fpm
   ```

4. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name api.resqperation.local;
       
       root /var/www/resqperation/ResQperation-Backend/public;
       index index.php;
       
       location / {
           try_files $uri $uri/ /index.php?$query_string;
       }
       
       location ~ \.php$ {
           fastcgi_pass unix:/run/php/php8.3-fpm.sock;
           fastcgi_index index.php;
           include fastcgi_params;
           fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
       }
       
       location ~ /\.ht {
           deny all;
       }
   }
   ```

5. **Setup Database**
   ```bash
   mysql -u root -p
   
   CREATE DATABASE resqperation;
   CREATE USER 'resqperation'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON resqperation.* TO 'resqperation'@'localhost';
   FLUSH PRIVILEGES;
   ```

6. **Install & Configure**
   ```bash
   cd /var/www/resqperation/ResQperation-Backend
   composer install --no-dev --optimize-autoloader
   
   cp .env.example .env
   php artisan key:generate
   
   # Update .env with production database credentials
   nano .env
   
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   
   sudo chown -R www-data:www-data /var/www/resqperation
   chmod -R 755 /var/www/resqperation
   chmod -R 777 /var/www/resqperation/storage /var/www/resqperation/bootstrap/cache
   ```

#### Using Docker

```dockerfile
# Dockerfile
FROM php:8.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN php artisan key:generate
RUN php artisan config:cache
RUN php artisan route:cache

CMD ["php-fpm"]
```

Build and run:
```bash
docker build -t resqperation-api .
docker run -d --name resqperation-api \
  -e DB_HOST=db \
  -e DB_DATABASE=resqperation \
  -e DB_USERNAME=root \
  -e DB_PASSWORD=password \
  -p 9000:9000 \
  resqperation-api
```

---

## Admin Dashboard Deployment

### Prerequisites

- Node.js 18+
- npm or yarn
- PHP 8.3+ (if serving alongside Backend)

### Development Setup

```bash
cd ResQperation-Admin

npm install
npm run dev
# Admin will be available at http://localhost:5173
```

### Production Build

```bash
cd ResQperation-Admin

# 1. Install dependencies
npm install --production

# 2. Build Vite + Inertia.js
npm run build

# 3. Verify build output
ls -la public/build/
# Should show manifest.json and asset files
```

### Deployment

#### Option 1: Served by Laravel (Inertia.js with Laravel)

```bash
# Backend serves frontend
cd ResQperation-Admin

composer install
npm install
npm run build

# Configure in webpack.mix.js or vite.config.js
# to output to public/build/

# Access at: http://localhost:8000 (via Laravel server)
```

#### Option 2: Separate SPA Hosting

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Upload to hosting**
   - Upload `dist/` contents to your web server
   - Example: `public_html/admin/`

3. **Configure for client-side routing**
   - Create `.htaccess` or Nginx config to rewrite to `index.html`

   **Apache (.htaccess)**
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /admin/
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /admin/index.html [L]
   </IfModule>
   ```

   **Nginx**
   ```nginx
   server {
       listen 80;
       server_name admin.resqperation.local;
       
       root /var/www/resqperation/admin/dist;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Configure API endpoint**
   - Create `.env.production`
   - Set `VITE_API_BASE_URL=https://api.resqperation.com/api/v1`

#### Option 3: Netlify/Vercel

```bash
# Setup
npm install -g netlify-cli

# Configure netlify.toml
cat > netlify.toml << EOF
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
EOF

# Deploy
netlify deploy --prod
```

---

## Mobile Apps Deployment

### Expo Build & Publishing

#### Expo Go (Development)

```bash
cd ResQperation-Household  # or ResQperation-Rescuer

npm install
npx expo start

# Scan QR code with Expo Go app to preview
```

#### Production Build

```bash
# 1. Setup Expo account
npx eas login

# 2. Configure eas.json
cat > eas.json << EOF
{
  "build": {
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}
EOF

# 3. Build APK (Android)
npx eas build --platform android --local

# 4. Build IPA (iOS)
npx eas build --platform ios --local
```

#### Google Play Store

```bash
# 1. Create/update app.json
# - Ensure version is incremented
# - Set android.package and ios.bundleIdentifier

# 2. Generate signed APK
npx eas build --platform android --auto-submit

# 3. Configure Android app signing in play.google.com
# - Upload signed APK
# - Fill out store listing
# - Review policies
# - Submit for review
```

#### Apple App Store

```bash
# Requires Apple Developer account ($99/year)

# 1. Generate provisioning profiles
npx eas build --platform ios --auto-submit

# 2. Configure App Store Connect
# - Create app record
# - Fill metadata
# - Upload build
# - Submit for review (Apple takes 1-2 days)
```

---

## Database Setup

### Initial Migration

```bash
cd ResQperation-Backend

# Run all migrations
php artisan migrate

# Or specific migration
php artisan migrate --path=database/migrations/2026_04_01_085302_create_initial_resq_tables.php
```

### Database Backup

```bash
# MySQL
mysqldump -u resqperation -p resqperation > backup_$(date +%Y%m%d_%H%M%S).sql

# PostgreSQL
pg_dump -U resqperation resqperation > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Database Restore

```bash
# MySQL
mysql -u resqperation -p resqperation < backup_20260423_100000.sql

# PostgreSQL
psql -U resqperation resqperation < backup_20260423_100000.sql
```

---

## Environment Configuration

### Backend Production .env

```env
APP_NAME=ResQperation
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:your_generated_key_here
APP_URL=https://api.resqperation.com

DB_CONNECTION=mysql
DB_HOST=db.example.com
DB_PORT=3306
DB_DATABASE=resqperation_prod
DB_USERNAME=resqperation_user
DB_PASSWORD=strong_database_password

CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=465
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=noreply@resqperation.com
MAIL_FROM_NAME="ResQperation"

LOG_CHANNEL=stack
LOG_LEVEL=warning

SANCTUM_SKIPPED_MIDDLEWARE=cors
```

### Admin Production .env.production

```env
VITE_API_BASE_URL=https://api.resqperation.com/api/v1
VITE_APP_NAME=ResQperation Admin
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt with Nginx

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d api.resqperation.com -d admin.resqperation.com

# Configure Nginx for HTTPS
# Add to server block:
listen 443 ssl http2;
ssl_certificate /etc/letsencrypt/live/api.resqperation.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/api.resqperation.com/privkey.pem;

# Auto-renew
sudo systemctl enable certbot.timer
```

---

## Monitoring & Maintenance

### Application Health Checks

```bash
# Check API health
curl https://api.resqperation.com/api/v1/health

# Check Laravel logs
tail -f /var/www/resqperation/ResQperation-Backend/storage/logs/laravel.log

# Check system resources
free -h  # Memory
df -h    # Disk space
top      # CPU usage
```

### Performance Monitoring

```bash
# Clear application cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Optimize for production
php artisan optimize

# Monitor database queries
# Set in .env during debugging:
DB_QUERY_LOG=true
```

### Automated Backups

```bash
# Create backup script: backup.sh
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u resqperation -p $DB_PASS resqperation > /backups/db_$DATE.sql
tar -czf /backups/app_$DATE.tar.gz /var/www/resqperation
```

### Setup Cron Jobs

```bash
# Edit crontab
crontab -e

# Add:
0 2 * * * /var/www/resqperation/backup.sh          # Daily backups at 2 AM
0 */6 * * * php /var/www/resqperation/artisan queue:work --stop-when-empty
```

---

## Troubleshooting

### "500 Internal Server Error"

```bash
# 1. Check Laravel logs
tail storage/logs/laravel.log

# 2. Verify permissions
chmod 755 storage bootstrap/cache
chmod 777 storage bootstrap/cache

# 3. Clear cache
php artisan cache:clear

# 4. Check database connection
php artisan tinker
>>> DB::connection()->getPdo()
```

### "CORS Error"

```bash
# Check CORS_ALLOWED_ORIGINS in .env
CORS_ALLOWED_ORIGINS=https://admin.resqperation.com,https://app.resqperation.com

# Verify middleware in app/Http/Middleware/HandleCors.php
```

### "Database Connection Failed"

```bash
# Test connection
php artisan tinker
>>> config('database.connections.mysql')
>>> DB::connection()->getPdo()

# Verify credentials in .env
# Check MySQL is running: service mysql status
```

---

## Monitoring External Services

### Health Check Dashboard

Create a monitoring endpoint in `routes/api.php`:

```php
Route::get('/health', function () {
    return response()->json([
        'api' => 'ok',
        'database' => DB::connection()->getDatabaseName() ? 'ok' : 'error',
        'cache' => Cache::put('health_check', true, 1) ? 'ok' : 'error',
        'timestamp' => now(),
    ]);
});
```

---

## Support

For deployment issues:
- Check Laravel documentation: https://laravel.com/docs/deployment
- Expo docs: https://docs.expo.dev/
- Contact DevOps team

**Last Updated**: April 23, 2026
