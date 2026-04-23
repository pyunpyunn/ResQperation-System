# ResQperation Backend API v1 Documentation

**Base URL**: `http://localhost:8000/api/v1`  
**Version**: 1.0  
**Authentication**: Laravel Sanctum (Bearer Tokens)

---

## Table of Contents

- [Authentication](#authentication)
- [Response Format](#response-format)
- [Endpoints](#endpoints)
  - [Health & Status](#health--status)
  - [Authentication](#authentication-endpoints)
  - [Users](#users)
  - [Responders](#responders)
  - [Households](#households)
  - [Disaster Events](#disaster-events)
  - [Requests](#requests)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## Authentication

### Overview

ResQperation uses **Laravel Sanctum** for token-based authentication. After login, clients receive an access token that must be included in all subsequent requests.

### Login

**Endpoint**: `POST /auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200 OK):
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "responder"
  },
  "token": "1|AbCdEfGhIjKlMnOpQrStUvWxYz..."
}
```

### Register

**Endpoint**: `POST /auth/register`

Request:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "account_type": "household" // or "responder"
}
```

Response (201 Created):
```json
{
  "message": "Registration successful",
  "user": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  "token": "2|XyZaBcDeFgHiJkLmNoPqRsTuVw..."
}
```

### Using Token

Include the token in the `Authorization` header:

```
Authorization: Bearer 1|AbCdEfGhIjKlMnOpQrStUvWxYz...
```

---

## Response Format

All API responses follow a consistent JSON structure.

### Success Response (200, 201)

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": 1,
    "name": "Example",
    ...
  }
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Item 1" },
    { "id": 2, "name": "Item 2" }
  ],
  "pagination": {
    "total": 50,
    "per_page": 15,
    "current_page": 1,
    "last_page": 4
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

---

## Endpoints

### Health & Status

#### Health Check (No Auth Required)

**Endpoint**: `GET /health`

Response:
```json
{
  "status": "ok",
  "message": "ResQperation API v1 is running",
  "timestamp": "2026-04-23T10:30:00Z"
}
```

---

### Authentication Endpoints

#### Logout

**Endpoint**: `POST /auth/logout`  
**Auth**: Required

Response (200 OK):
```json
{
  "message": "Logged out successfully"
}
```

#### Get Current User

**Endpoint**: `GET /user`  
**Auth**: Required

Response (200 OK):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "responder",
  "created_at": "2026-04-01T08:00:00Z"
}
```

---

### Users

#### Get All Users (Admin Only)

**Endpoint**: `GET /users`  
**Auth**: Required | Admin  
**Query Parameters**:
- `page` (int, default: 1)
- `per_page` (int, default: 15, max: 100)
- `role` (string: 'admin', 'responder', 'household')

Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "responder",
      "created_at": "2026-04-01T08:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

### Responders

#### List All Responders

**Endpoint**: `GET /responders`  
**Auth**: Required  
**Query Parameters**:
- `page` (int)
- `per_page` (int)
- `available` (boolean)
- `team_id` (int)

Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "title": "EMT",
      "team_id": 5,
      "is_available": true,
      "assigned_area": "Barangay 1",
      "last_location": {
        "latitude": 14.5995,
        "longitude": 120.9842
      }
    }
  ],
  "pagination": { ... }
}
```

#### Get Responder Details

**Endpoint**: `GET /responders/:id`  
**Auth**: Required

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "title": "Emergency Medical Technician",
    "team": {
      "id": 5,
      "name": "Alpha Team"
    },
    "current_assignments": [
      {
        "id": 3,
        "disaster": "Typhoon Karding",
        "area": "Barangay 1",
        "status": "active"
      }
    ],
    "recent_field_reports": [...]
  }
}
```

#### Create Responder (Admin Only)

**Endpoint**: `POST /responders`  
**Auth**: Required | Admin

Request:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "title": "EMT",
  "team_id": 5
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Responder created successfully",
  "data": { ... }
}
```

---

### Households

#### List All Households

**Endpoint**: `GET /households`  
**Auth**: Required | Admin  
**Query Parameters**:
- `page` (int)
- `per_page` (int)
- `barangay` (string)
- `disaster_id` (int)

Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "head_name": "Maria Santos",
      "phone": "09171234567",
      "address": "123 Main St",
      "barangay": "Barangay 1",
      "member_count": 5,
      "current_status": "safe",
      "needs_assistance": false,
      "qr_code": "HH-001-ABC123"
    }
  ],
  "pagination": { ... }
}
```

#### Get Household Details

**Endpoint**: `GET /households/:id`  
**Auth**: Required

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "head_name": "Maria Santos",
    "phone": "09171234567",
    "address": "123 Main St",
    "barangay": "Barangay 1",
    "qr_code": "HH-001-ABC123",
    "members": [
      {
        "id": 1,
        "name": "Maria Santos",
        "age": 45,
        "relationship": "Head",
        "is_pwd": false,
        "is_senior": false
      },
      {
        "id": 2,
        "name": "Juan Santos",
        "age": 12,
        "relationship": "Child",
        "is_pwd": false,
        "is_senior": false
      }
    ],
    "active_requests": [
      {
        "id": 5,
        "type": "Medical Assistance",
        "status": "assigned",
        "created_at": "2026-04-23T08:15:00Z"
      }
    ],
    "last_location": {
      "latitude": 14.5995,
      "longitude": 120.9842,
      "updated_at": "2026-04-23T10:00:00Z"
    }
  }
}
```

#### Register Household

**Endpoint**: `POST /households`  
**Auth**: Not required (public endpoint)

Request:
```json
{
  "head_name": "Maria Santos",
  "phone": "09171234567",
  "address": "123 Main St",
  "barangay": "Barangay 1"
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Household registered successfully",
  "data": {
    "id": 1,
    "head_name": "Maria Santos",
    "qr_code": "HH-001-ABC123",
    ...
  }
}
```

---

### Disaster Events

#### List Active Disasters

**Endpoint**: `GET /disasters`  
**Auth**: Required  
**Query Parameters**:
- `page` (int)
- `per_page` (int)
- `status` (string: 'active', 'resolved')
- `severity` (string: 'low', 'medium', 'high', 'critical')

Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "type": "Typhoon",
      "name": "Typhoon Karding",
      "description": "Strong tropical storm affecting Metro Manila",
      "severity": "high",
      "status": "active",
      "started_at": "2026-04-20T15:00:00Z",
      "affected_households": 1245,
      "active_responders": 34,
      "evacuation_sites": 5
    }
  ],
  "pagination": { ... }
}
```

#### Get Disaster Details

**Endpoint**: `GET /disasters/:id`  
**Auth**: Required

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 3,
    "type": "Typhoon",
    "name": "Typhoon Karding",
    "description": "Strong tropical storm",
    "severity": "high",
    "status": "active",
    "started_at": "2026-04-20T15:00:00Z",
    "ended_at": null,
    "stats": {
      "total_households_affected": 1245,
      "households_evacuated": 432,
      "active_responders": 34,
      "evacuation_sites": 5,
      "pending_requests": 87
    },
    "assigned_teams": [
      { "id": 5, "name": "Alpha Team", "members": 12 }
    ],
    "evacuation_sites": [...]
  }
}
```

#### Create Disaster Event (Admin Only)

**Endpoint**: `POST /disasters`  
**Auth**: Required | Admin

Request:
```json
{
  "type": "Earthquake",
  "name": "Metro Manila Quake 2026",
  "description": "Magnitude 6.2 earthquake",
  "severity_id": 4,
  "start_time": "2026-04-23T08:30:00Z"
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Disaster event created",
  "data": { ... }
}
```

---

### Requests

#### List Requests

**Endpoint**: `GET /requests`  
**Auth**: Required  
**Query Parameters**:
- `page` (int)
- `status` (string: 'pending', 'assigned', 'completed')
- `type` (string)
- `disaster_id` (int)
- `household_id` (int)

Response (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "type": "Medical Assistance",
      "household": {
        "id": 1,
        "name": "Maria Santos"
      },
      "urgency": "high",
      "status": "assigned",
      "description": "Child with fever, needs medical evaluation",
      "assigned_responder": {
        "id": 1,
        "name": "John Doe"
      },
      "created_at": "2026-04-23T08:15:00Z",
      "updated_at": "2026-04-23T09:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

#### Get Request Details

**Endpoint**: `GET /requests/:id`  
**Auth**: Required

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 5,
    "type": "Medical Assistance",
    "status": "assigned",
    "urgency": "high",
    "description": "Child with fever",
    "household": { ... },
    "disaster": { ... },
    "assigned_responder": { ... },
    "messages": [
      {
        "from": "household",
        "content": "Our child is very sick",
        "timestamp": "2026-04-23T08:15:00Z"
      }
    ]
  }
}
```

#### Submit Request (Household)

**Endpoint**: `POST /requests`  
**Auth**: Required

Request:
```json
{
  "type_id": 2,
  "household_id": 1,
  "urgency_id": 3,
  "description": "Child with fever, needs medical evaluation",
  "latitude": 14.5995,
  "longitude": 120.9842
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "Request submitted successfully",
  "data": { ... }
}
```

#### Update Request Status (Responder/Admin)

**Endpoint**: `PATCH /requests/:id`  
**Auth**: Required

Request:
```json
{
  "status": "completed",
  "notes": "Patient evaluated and given medication"
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "Request updated",
  "data": { ... }
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (no token or invalid) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 422 | Unprocessable Entity (validation error) |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |

### Validation Error Example

**Status**: 422 Unprocessable Entity

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."],
    "password": ["Password must be at least 8 characters."]
  }
}
```

### Authentication Error Example

**Status**: 401 Unauthorized

```json
{
  "success": false,
  "message": "Unauthenticated"
}
```

---

## Rate Limiting

- **Public endpoints** (health, register): Unlimited
- **Authenticated endpoints**: 60 requests per minute per user
- **Admin endpoints**: 100 requests per minute per admin

Rate limit headers:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1619101200
```

When rate limited (429 Too Many Requests):
```json
{
  "success": false,
  "message": "Too Many Requests",
  "retry_after": 60
}
```

---

## Query Filtering Examples

### Filter by Status

```
GET /requests?status=pending&status=assigned
```

### Complex Filtering

```
GET /disasters?status=active&severity=high&page=1&per_page=25
```

### Sorting

```
GET /households?sort=created_at&order=desc
```

---

## Webhooks (Future Feature)

ResQperation will support webhooks for real-time notifications:

- `disaster.created`
- `request.submitted`
- `request.assigned`
- `request.completed`
- `household.location_updated`
- `responder.status_changed`

---

## Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:8000/api/v1/health

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get current user
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/v1/user
```

### Using Postman

1. Import the API collection: [Link to Postman JSON]
2. Set `{{base_url}}` to `http://localhost:8000/api/v1`
3. Set `{{token}}` variable with your auth token
4. Start testing!

### Using Thunder Client / REST Client

See `.vscode/extensions/thunder-client/` or `.vscode/rest-client.http` for pre-built requests.

---

## Support & Issues

- **Documentation**: See [Backend README](../ResQperation-Backend/README.md)
- **Issues**: Report bugs in the project's issue tracker
- **Questions**: Contact the development team

**Last Updated**: April 23, 2026  
**API Version**: 1.0  
**Status**: In Development
