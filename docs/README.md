# ResQperation Project Documentation

This folder contains project documentation for the ResQperation capstone project, including database schemas, API notes, and deployment guidance.

## Contents

- **schema.sql** - Complete SQL schema for the ResQperation system
- **ERD.png/pdf** - Entity Relationship Diagram showing table relationships and cardinality
- **API.md** - Backend API documentation
- **DEPLOYMENT.md** - Deployment and release checklist

## Project Structure

1. **backend** (`backend/`) - shared Laravel API, auth, database, seeders, and business logic
2. **web** (`web/`) - React web frontend
3. **mobile** (`mobile/`) - single Expo React Native app for rescuer and household resident roles
4. **shared** (`shared/`) - shared API config, constants, and utilities

## Database Schema Overview

The system includes core tables across these categories:

- **User Management**: users, responders, households, household members
- **Operations**: disaster events, rescue teams, incoming requests, request types
- **Status/Reference Data**: severity levels, status lookups
- **Integration**: SafeTrack accounts and access tokens

See `schema.sql` for complete table definitions with all columns, indexes, and relationships.
