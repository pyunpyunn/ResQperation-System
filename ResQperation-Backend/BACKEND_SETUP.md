# Backend Setup Instructions

## Quick Start

### 1. Environment Configuration
Copy the enhanced `.env.example`:
```bash
cp .env.example .env
```

Update these variables:
```env
APP_NAME=ResQperation
APP_ENV=local
DB_DATABASE=resqperation
DB_USERNAME=root
DB_PASSWORD=your_password
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 2. Register Middleware in `bootstrap/app.php`

Add CORS middleware to your application:
```php
use App\Http\Middleware\CorsMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withMiddleware(function (Middleware $middleware) {
        // Add CORS middleware
        $middleware
            ->append(CorsMiddleware::class)
            ->append(RateLimitMiddleware::class);
    })
    ->withRouting(
        // ... existing routing
    );
```

### 3. Database Setup
```bash
# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# (Optional) Seed data
php artisan db:seed
```

### 4. Test the Setup
```bash
# Health check endpoint
curl http://localhost:8000/api/v1/health

# Expected response:
# {
#   "status": "ok",
#   "message": "ResQperation API v1 is running",
#   "timestamp": "2026-04-13T..."
# }
```

### 5. Start Development Server
```bash
php artisan serve
# Or with queue listener:
npm run dev
```

---

## Using the New Response System

### In Your Controllers
```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Traits\HasApiResponses;
use App\Http\Resources\DisasterResource;
use App\Models\Disaster;

class DisasterController extends Controller
{
    use HasApiResponses;

    public function index()
    {
        $disasters = Disaster::paginate();
        return $this->responsePaginated($disasters, 'Disasters retrieved');
    }

    public function store(StoreDisasterRequest $request)
    {
        $disaster = Disaster::create($request->validated());
        return $this->responseSuccess(
            DisasterResource::make($disaster),
            'Disaster created successfully',
            201
        );
    }

    public function show(Disaster $disaster)
    {
        return $this->responseSuccess(
            DisasterResource::make($disaster)
        );
    }

    public function update(UpdateDisasterRequest $request, Disaster $disaster)
    {
        $disaster->update($request->validated());
        return $this->responseSuccess(
            DisasterResource::make($disaster),
            'Disaster updated successfully'
        );
    }

    public function destroy(Disaster $disaster)
    {
        $disaster->delete();
        return $this->responseSuccess(
            null,
            'Disaster deleted successfully',
            204
        );
    }
}
```

### Example API Resource
```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class DisasterResource extends ApiResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'location' => $this->location,
            'severity' => $this->severity,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
```

---

## API Endpoints Structure

All endpoints follow the pattern: `/api/{version}/{resource}`

### Current Endpoints
- **GET /api/v1/health** - Health check (public)
- **GET /api/v1/user** - Current user profile (authenticated)

### To Add (Examples)
```php
// In routes/api/v1.php - add inside protected middleware group:

Route::apiResource('disasters', DisasterController::class);
Route::apiResource('responders', ResponderController::class);
Route::apiResource('households', HouseholdController::class);
Route::apiResource('requests', RequestController::class);
```

This auto-generates:
- `GET /api/v1/disasters` - List all
- `POST /api/v1/disasters` - Create
- `GET /api/v1/disasters/{id}` - Show
- `PUT /api/v1/disasters/{id}` - Update
- `DELETE /api/v1/disasters/{id}` - Delete

---

## Rate Limiting Usage

Rate limiting is enabled by default and applies to all authenticated users.

### Limits
- **Default**: 60 requests per minute per authenticated user
- **Unauthenticated**: 60 requests per minute per IP

### Customize Rate Limits
In your routes, specify custom limits:
```php
Route::middleware('rate.limit:100,1')->get('/expensive-endpoint', callback);
// 100 requests per 1 minute
```

### Response Headers
Every API response includes:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
```

When limit is exceeded:
```
HTTP/1.1 429 Too Many Requests
Retry-After: 30

{
  "status": "error",
  "message": "Too many requests",
  "error": "You have exceeded the rate limit. Please try again later.",
  "retry_after": 30
}
```

---

## CORS Configuration

### For Mobile Apps (Expo)
The mobile apps use deep linking, configure:
```env
CORS_ALLOWED_ORIGINS=resqperationhousehold://,resqperationrescuer://,http://localhost:8081
```

### For Web Apps (React/Vue)
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://app.example.com
```

### Testing CORS
```bash
curl -X GET http://localhost:8000/api/v1/health \
  -H "Origin: http://localhost:3000" \
  -v
```

Check response headers for `Access-Control-Allow-Origin`.

---

## Environment Variables Reference

### Core Application
```env
APP_NAME=ResQperation
APP_ENV=local|production
APP_KEY=base64:...
APP_DEBUG=true|false
APP_URL=http://localhost:8000
```

### Database (MySQL)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=resqperation
DB_USERNAME=root
DB_PASSWORD=
```

### API Configuration
```env
API_VERSION=v1
API_PREFIX=api
API_PAGINATION_PER_PAGE=15
API_PAGINATION_MAX_PER_PAGE=100
API_RATE_LIMIT_ENABLED=true
API_RATE_LIMIT_REQUESTS=60
API_RATE_LIMIT_PERIOD=1
```

### CORS
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Queue (for background jobs)
```env
QUEUE_CONNECTION=database  # or redis for production
```

---

## Production Deployment

### 1. Update `.env`
```env
APP_ENV=production
APP_DEBUG=false
LOG_LEVEL=warning
```

### 2. Database
```env
DB_CONNECTION=mysql
DB_HOST=production-db-host
DB_DATABASE=resqperation_prod
DB_USERNAME=prod_user
DB_PASSWORD=strong_password
```

### 3. Queue & Cache (Scale with Redis)
```env
QUEUE_CONNECTION=redis
CACHE_STORE=redis
REDIS_HOST=redis-host
REDIS_PASSWORD=redis_password
```

### 4. Security
```env
CORS_ALLOWED_ORIGINS=https://app.resqperation.com
SANCTUM_STATEFUL_DOMAINS=app.resqperation.com
```

### 5. Run
```bash
php artisan migrate --force
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start queue worker
php artisan queue:work --daemon
```

---

## Troubleshooting

### CORS Errors
**Error**: `Access to XMLHttpRequest at 'http://localhost:8000' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution**: 
1. Check `CORS_ALLOWED_ORIGINS` includes the origin
2. Ensure CorsMiddleware is registered in `bootstrap/app.php`
3. Test with curl first

### Rate Limiting Too Strict
**Error**: `429 Too Many Requests` after a few requests

**Solution**:
1. Check `API_RATE_LIMIT_ENABLED` not true in development
2. Or increase `API_RATE_LIMIT_REQUESTS`
3. Test endpoints with `Sanctum` token for user-based limits

### Database Connection Issues
**Error**: `SQLSTATE[HY000]: General error: 3 Error writing to file`

**Solution**:
1. Ensure MySQL server is running
2. Check DB credentials in `.env`
3. Run `php artisan migrate`

---

## Next Steps

1. ✅ Set up environment variables
2. ✅ Register middleware
3. ✅ Create API resource controllers
4. ✅ Create request validation classes
5. ✅ Create API resources for responses
6. ✅ Test endpoints with Postman/Insomnia
7. ✅ Implement authentication flows
8. ✅ Scale with Redis for production

See `BACKEND_IMPROVEMENTS.md` for detailed technical documentation.
