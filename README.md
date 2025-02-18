# Task Management Application

A full-stack task management application built with Rails API backend and React frontend.

## Architecture

### Backend (Rails API)
- **Framework**: Ruby on Rails 8.0.1 (API mode)
- **Database**: MySQL
- **Key Features**:
  - GraphQL API using `graphql-ruby`
  - Real-time updates via GraphQL subscriptions
  - Background job for recurring tasks (every 2 minutes)
  - Database cleaning for tests
  - CORS configuration for frontend access

### Frontend (React)
- **Framework**: React with TypeScript
- **State Management**: Apollo Client
- **Key Features**:
  - Real-time task updates via GraphQL subscriptions
  - List and Grid view options
  - Persistent view preferences
  - Mock service worker for testing
  - Responsive design

## Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd task_app
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Configure database:
   ```bash
   rails db:create db:migrate db:seed
   ```

4. Start the server:
   ```bash
   rails server
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd task-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   PORT=3001 npm start
   ```

## Testing

### Backend Tests
Run the test suite:
```bash
cd task_app
rails test
```

### Frontend Tests
Run the test suite:
```bash
cd task-frontend
npm test
```

## Production Deployment

### Backend Deployment
1. Set production environment variables:
   - `DATABASE_URL`
   - `RAILS_MASTER_KEY`
   - `RAILS_ENV=production`

2. Configure production database:
   ```bash
   RAILS_ENV=production rails db:migrate
   ```

3. Start the server:
   ```bash
   RAILS_ENV=production rails server
   ```

### Frontend Deployment
1. Set production environment variables:
   - `REACT_APP_API_URL`
   - `REACT_APP_WS_URL`

2. Build the production bundle:
   ```bash
   npm run build
   ```

3. Serve the static files using a web server of your choice.

## API Documentation

### GraphQL Queries
- `projects`: Get all projects
- `project(id: ID!)`: Get a specific project
- `tasks`: Get all tasks
- `tasksByProject(projectId: ID!)`: Get tasks for a specific project

### GraphQL Subscriptions
- `taskCreated`: Real-time updates when new tasks are created

## Security Considerations
- CORS is configured for specific origins in production
- GraphQL rate limiting should be implemented
- API authentication should be added for production use
- WebSocket connections should be secured in production

## Future Improvements
- User authentication and authorization
- Task completion status
- Due dates and priorities
- Project collaboration features
- Enhanced error handling
- Performance optimizations

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License. 