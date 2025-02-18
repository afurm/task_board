# Task Management Application

A full-stack task management application demonstrating modern web development practices with Rails API and React frontend.

## How It Works & Why I Built It This Way

### Core Architecture
I designed this as a decoupled system with two main parts:
1. **Backend API** (Rails) - Handles data and business logic
2. **Frontend SPA** (React) - Provides responsive user interface

This separation allows for:
- Independent deployment and scaling
- Better development workflow
- Easier testing and maintenance

### Key Technical Choices

#### Backend (Rails API)
- **Ruby on Rails 8.0.1**: Chosen for rapid API development and robust ecosystem
- **MySQL**: Selected for reliable data storage and good Rails integration
- **GraphQL API**: Implemented using `graphql-ruby` for:
  - Flexible data querying
  - Reduced network traffic
  - Real-time updates via subscriptions
- **Background Jobs**: Using Whenever gem for recurring task creation

#### Frontend (React)
- **React + TypeScript**: For type-safe, maintainable code
- **Apollo Client**: Manages GraphQL operations and local state
- **CSS Grid/Flexbox**: Creates responsive layouts
- **Local Storage**: Persists user preferences

## Running Locally

### Prerequisites
- Ruby 3.2.0+
- Node.js 16+
- MySQL 8.0+
- Git

### Step 1: Clone & Setup Backend
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd task_app
   ```

2. Install Ruby dependencies:
   ```bash
   bundle install
   ```

3. Setup database:
   ```bash
   # Create and setup database
   rails db:create db:migrate
   
   # Load sample data
   rails db:seed
   ```

4. Start Rails server:
   ```bash
   rails server
   ```
   The API will run on http://localhost:3000

### Step 2: Setup Frontend
1. Open new terminal and navigate to frontend:
   ```bash
   cd task-frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   PORT=3001 npm start
   ```
   The app will open at http://localhost:3001

### Step 3: Setup Recurring Tasks (Optional)
1. Configure cron job:
   ```bash
   cd task_app
   whenever --update-crontab
   ```

2. Verify it's running:
   ```bash
   crontab -l
   ```

## How to Use the Application

1. **View Projects**:
   - Open http://localhost:3001
   - Select a project from the dropdown

2. **View Tasks**:
   - Tasks appear automatically for selected project
   - Toggle between List/Grid views
   - Real-time updates happen automatically

3. **Monitor Task Creation**:
   - New tasks appear every 2 minutes (if cron is enabled)
   - Updates show instantly via WebSocket
   - Fallback polling ensures you never miss updates

## Development Workflow

### Backend Development
1. Create new features:
   ```bash
   rails generate model NewFeature
   ```

2. Run tests:
   ```bash
   rails test
   ```

3. Check API:
   - Visit http://localhost:3000/graphiql
   - Test queries interactively

### Frontend Development
1. Make changes in `src/`
2. Tests run automatically in watch mode:
   ```bash
   npm test
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Troubleshooting

### Common Issues
1. **Database Connection Failed**:
   ```bash
   rails db:reset
   ```

2. **Frontend Can't Connect**:
   - Check if Rails server is running
   - Verify CORS settings in `config/initializers/cors.rb`

3. **Real-time Updates Not Working**:
   - Check WebSocket connection
   - Verify ActionCable configuration

### Getting Help
- Check Rails logs: `tail -f log/development.log`
- Check React console in browser
- Review GraphiQL interface at http://localhost:3000/graphiql

## Next Steps & Scaling

### Immediate Improvements
- Add user authentication
- Implement task priorities
- Add due dates
- Enable project collaboration

### Production Considerations
- Set up proper SSL
- Configure production databases
- Implement rate limiting
- Add monitoring and logging