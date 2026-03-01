# CV Builder Backend

A NestJS backend API for the CV Builder application with PostgreSQL database.

## Features

- **Authentication**: JWT-based authentication with registration and login
- **User Management**: CRUD operations for users
- **Database**: PostgreSQL with TypeORM
- **API Documentation**: Swagger/OpenAPI documentation
- **Validation**: Input validation with class-validator
- **Security**: Password hashing with bcryptjs
- **Architecture**: Clean architecture with controllers, services, and models

## Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your database credentials
```

## Environment Variables

Update your `.env` file with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=cv_builder

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Application Configuration
PORT=3000
NODE_ENV=development

# API Configuration
API_PREFIX=api/v1
```

## Database Setup

1. Make sure PostgreSQL is installed and running
2. Create a database named `cv_builder`
3. Update the database credentials in your `.env` file

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:
```
http://localhost:3000/api/docs
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/profile` - Get user profile (protected)

### Users
- `GET /users` - Get all users (protected)
- `GET /users/:id` - Get user by ID (protected)
- `POST /users` - Create user (protected)
- `PATCH /users/:id` - Update user (protected)
- `DELETE /users/:id` - Delete user (protected)

## Project Structure

```
src/
├── auth/
│   ├── controllers/
│   ├── services/
│   ├── strategies/
│   └── guards/
├── users/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── dto/
├── common/
│   ├── decorators/
│   └── guards/
├── config/
├── database/
├── app.module.ts
└── main.ts
```

## Scripts

- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with watch
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests

## License

ISC
