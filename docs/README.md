# ResQperation Project Documentation

This folder contains the official documentation for the ResQperation capstone project, including database schemas, API notes, and deployment guidance.

## Contents

- **schema.sql** - Complete SQL schema for all 28 tables across the ResQperation system
- **ERD.png/pdf** - Entity Relationship Diagram showing table relationships and cardinality
- **API.md** - Backend API documentation
- **DEPLOYMENT.md** - Verified deployment and release checklist for all four apps

## Project Structure

### Four Applications

1. **ResQperation-Admin** (`ResQperation-Admin/`)
2. **ResQperation-Backend** (`ResQperation-Backend/`)
3. **ResQperation-Household** (`ResQperation-Household/`)
4. **ResQperation-Rescuer** (`ResQperation-Rescuer/`)

## Database Schema Overview

The system includes 28 core tables across these categories:

- **User Management**: users, responders, households, household_members
- **Operations**: disaster_events, rescue_teams, incoming_requests, request_types
- **Status/Reference Data**: severity_levels, status_lookups
- **Integration**: safe_track_accounts, access_tokens

See `schema.sql` for complete table definitions with all columns, indexes, and relationships.

## Setup Instructions

Use the root README for the project overview and [DEPLOYMENT.md](DEPLOYMENT.md) for the current deployment workflow.
