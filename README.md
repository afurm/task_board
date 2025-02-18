# Task Management Application

A full-stack task management application built with Rails API and React frontend.

## Features

- RESTful API backend with Rails 8.0.1
- React + TypeScript frontend
- Real-time updates via GraphQL subscriptions
- Automated recurring task creation
- Responsive design with CSS Grid/Flexbox
- Local storage for user preferences

## Prerequisites

- Ruby 3.2.0+
- Node.js 16+
- MySQL 8.0+
- Git

## Installation

### Backend Setup

```bash
# Clone repository
git clone [repository-url]
cd task_app

# Install dependencies
bundle install

# Setup database
rails db:create db:migrate
rails db:seed

# Start server
rails server
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd task-frontend

# Install dependencies
npm install

# Start development server
PORT=3001 npm start
```

### Configure Recurring Tasks (Optional)

```bash
cd task_app
whenever --update-crontab

# Verify cron job
crontab -l
```

## Usage

1. Access the application at http://localhost:3001
2. Select a project from the dropdown
3. View and manage tasks in List/Grid views
4. Real-time updates occur automatically

## Development

### Backend

```bash
# Generate new features
rails generate model NewFeature

# Run tests
rails test

# API testing
Visit http://localhost:3000/graphiql
```

### Frontend

```bash
# Run tests
npm test

# Build for production
npm run build
```

## Troubleshooting

If you encounter issues:

1. Database problems: `rails db:reset`
2. Check Rails logs: `tail -f log/development.log`
3. Verify CORS settings in `config/initializers/cors.rb`
4. Check browser console for frontend errors

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)