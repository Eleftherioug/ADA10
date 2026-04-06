# Task Management API

A REST API for managing tasks with user authentication, built with Node.js, Express, PostgreSQL, and Sequelize.

## Features

- User registration and authentication
- JWT-based authentication
- CRUD operations for tasks
- User-specific task management
- PostgreSQL database with Sequelize ORM

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Utility
- `GET /health` - Health check endpoint
- `GET /api/health` - API health check endpoint
- `GET /` - API information

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file:
   ```bash
   NODE_ENV=development
   PORT=3000
   JWT_SECRET=your-local-jwt-secret
   JWT_EXPIRES_IN=24h
   DATABASE_URL=your-postgres-connection-string
   ```
3. Create the database tables:
   ```bash
   npm run setup
   ```
4. Seed the database (optional):
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. The API will be available at `http://localhost:3000`

### Sample Users

If you run the seed script, you'll have these test users available:
- `john@example.com` / `password123`
- `jane@example.com` / `password123`
- `mike@example.com` / `password123`

### Testing

Use the following sample requests to test the API:

```bash
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

```bash
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

```bash
POST /api/tasks
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "Complete project",
  "description": "Finish the task management API",
  "priority": "high"
}
```

## Database

This API uses PostgreSQL through Sequelize. For Render deployment, create a PostgreSQL database in Render and set your service's `DATABASE_URL` environment variable to the database's external connection string.

## Environment Variables

- `NODE_ENV` - Environment (`development` or `production`)
- `PORT` - Server port
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - JWT token expiration time
- `DATABASE_URL` - PostgreSQL connection string

## Deployment

This API is ready to deploy to Render.

1. Create a PostgreSQL database in Render.
2. Create a new Render Web Service connected to this GitHub repo.
3. Use `npm install` as the build command.
4. Use `npm start` as the start command.
5. Add these environment variables in Render:
   - `NODE_ENV=production`
   - `JWT_SECRET=your-secure-jwt-secret`
   - `JWT_EXPIRES_IN=24h`
   - `DATABASE_URL=your-render-postgres-external-url`
