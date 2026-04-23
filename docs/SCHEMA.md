# Database Schema Reference

## Table Overview

### User & Access Management
- **users** — Platform users (admins, coordinators)
- **responders** — Registered rescue responders with skills/certifications
- **households** — Registered household units
- **household_members** — Individual members within households
- **safe_track_accounts** — Integration with SafeTrack system

### Operations & Requests
- **disaster_events** — Active disaster events with location and severity
- **rescue_teams** — Teams assigned to specific disaster events
- **incoming_requests** — Requests submitted by households for assistance
- **request_types** — Categories of requests (medical, shelter, evacuation, etc.)

### Reference & Status Data
- **severity_levels** — Disaster severity classifications
- **status_lookups** — Status values for requests and teams
- **access_tokens** — Personal access tokens for API authentication

## Key Relationships

```
disaster_events ← rescue_teams → responders
                ↓
        incoming_requests → request_types
                ↓
          households → household_members
                ↓
            safe_track_accounts
```

## Schema Notes

Add detailed schema documentation here:
- Column types and constraints
- Indexes and performance considerations
- Migration history
- Backup procedures

**TO DO**: Add your ERD.png/pdf file to the docs/ folder for visual reference.
