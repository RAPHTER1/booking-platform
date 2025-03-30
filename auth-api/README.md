# Auth API

A microservice responsible for authentication and authorization in the Booking Platform. It handles user authentication using JWT tokens and manages access control through roles and permissions.

## Features

- JWT-based authentication with refresh tokens
- Role-based access control
- Secure password handling with bcrypt
- Input validation using Zod
- PostgreSQL database integration
- CORS configuration
- Rate limiting

## Quick Start

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=3001

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Database
DB_HOST=booking-db
DB_PORT=5432
DB_USER=booking_admin
DB_PASSWORD=your_password
DB_NAME=booking_db
```

### Local Development

```bash
# Install dependencies
pnpm install

# Start the service
pnpm start
```

### Docker

```bash
# Build and run
docker build -t auth-api .
docker run -p 3001:3001 --env-file .env auth-api
```

## API Endpoints

### POST /api/auth/login

Authenticate a user and receive a JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "refreshToken": "refresh_token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user",
    "permissions": ["read:profile", "write:profile"]
  }
}
```

### GET /api/auth/verify-token

Verify the validity of a JWT token.

**Headers:**
```
Authorization: Bearer your_jwt_token
```

**Response:**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user",
    "permissions": ["read:profile", "write:profile"]
  }
}
```

## Project Structure

```
auth-api/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── validations/    # Input validation schemas
│   ├── app.js          # Express app configuration
│   └── index.js        # Application entry point
├── .env                # Environment variables
└── package.json        # Project dependencies
```

## Notes

This API is focused solely on authentication and authorization. User creation and role management are handled by the Admin API. This separation ensures better security and maintainability of the platform. 