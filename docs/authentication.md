# Authentication System

The authentication system in this project uses a custom implementation with session tokens stored in HTTP-only cookies.

## Overview

The authentication flow is built with Next.js Server Actions and a PostgreSQL database to store user information and sessions.

## Database Schema

The authentication system uses two main models:

```prisma
model User {
  id           Int       @id @default(autoincrement())
  email        String    @unique
  passwordHash String
  sessions     Session[]
  cart         Cart?
}

model Session {
  id        String   @id
  userId    Int
  expiresAt DateTime
  user      User     @relation(references: [id], fields: [userId], onDelete: Cascade)
}
```

## Authentication Flow

### Registration

1. User submits email and password via the sign-up form
2. Server validates the input with Zod schema
3. Password is hashed using SHA-256
4. User is created in the database
5. A session is automatically created and user is logged in

### Login

1. User submits credentials via the sign-in form
2. Server validates the input
3. System finds the user by email
4. Password is verified by comparing hashes
5. A session token is generated and stored
6. Session token is set as an HTTP-only cookie

### Session Management

- Sessions are stored in the database with an expiration date
- Sessions automatically extend when the user is active
- The middleware extends cookie expiration on GET requests
- CSRF protection is implemented in the middleware

## Key Functions

- `generateSessionToken()`: Creates a unique session token
- `createSession()`: Stores a new session in the database
- `validateSessionToken()`: Verifies if a session is valid
- `getCurrentSession()`: Gets the current user session from cookies
- `registerUser()`: Handles new user registration
- `loginUser()`: Authenticates a user and creates a session
- `logoutUser()`: Invalidates the current session

## Security Features

- Passwords are hashed using SHA-256
- HTTP-only cookies prevent JavaScript access to session tokens
- CSRF protection in middleware validates request origins
- Sessions have a 30-day expiration that refreshes with activity
- Session tokens are never exposed to the client JavaScript

## Authentication UI Components

- `SignIn`: The login form component
- `SignUp`: The registration form component

## Implementation Files

- `src/actions/auth.ts`: Server actions for authentication
- `src/app/auth/sign-in/page.tsx`: Sign-in page
- `src/app/auth/sign-up/page.tsx`: Sign-up page
- `middleware.ts`: CSRF protection and cookie management
