# ResQperation Project Documentation

This folder contains the official documentation for the ResQperation capstone project, including database schemas, ERDs, and architectural overviews.

## Contents

- **schema.sql** — Complete SQL schema for all 28 tables across the ResQperation system
- **ERD.png/pdf** — Entity Relationship Diagram showing table relationships and cardinality
- **API.md** — Backend API documentation (v1 endpoints, authentication, response formats)
- **ARCHITECTURE.md** — System architecture overview and inter-service communication

## Project Structure

### Four Applications

1. **ResQperation-Admin** (Laravel + Inertia.js)
   - Dashboard for disaster response coordination
   - User, responder, and request management
   - Location: `ResQperation-Admin/`

2. **ResQperation-Backend** (Laravel API)
   - RESTful API backend (v1)
   - Core business logic and database
   - Location: `ResQperation-Backend/`

3. **ResQperation-Household** (React Native/Expo)
   - Mobile app for household members
   - Request submission and status tracking
   - Location: `ResQperation-Household/`

4. **ResQperation-Rescuer** (React Native/Expo)
   - Mobile app for rescue responders
   - Disaster event tracking and task management
   - Location: `ResQperation-Rescuer/`

## Database Schema Overview

The system includes 28 core tables across these categories:

- **User Management**: users, responders, households, household_members
- **Operations**: disaster_events, rescue_teams, incoming_requests, request_types
- **Status/Reference Data**: severity_levels, status_lookups
- **Integration**: safe_track_accounts, access_tokens

See `schema.sql` for complete table definitions with all columns, indexes, and relationships.

## Setup Instructions

See each project's README for environment setup and deployment instructions:
- [Admin Setup](../ResQperation-Admin/README.md)
- [Backend Setup](../ResQperation-Backend/README.md)
- [Household Setup](../ResQperation-Household/README.md)
- [Rescuer Setup](../ResQperation-Rescuer/README.md)
