# MongoDB Setup Guide

## Option 1: Local MongoDB Installation

### Windows
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will be installed and running as a service by default
4. The default connection string is: `mongodb://localhost:27017/portfolio`

### Mac
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux
```bash
# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (Free tier is available)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string from "Connect" → "Connect your application"
7. Replace `<password>` with your database user password
8. Example: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

## Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `MONGODB_URI` in `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```
   or for Atlas:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

## Testing the Connection

After starting the server, you should see:
```
MongoDB Connected: localhost
Server is running on port 5000
```

If you see an error, check:
1. MongoDB is running (for local installation)
2. Connection string is correct
3. Network access is allowed (for Atlas)
4. Database user credentials are correct

## Database Structure

The application will automatically create the following collections:
- `users` - User portfolio information
- `projects` - User projects/portfolio items

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/email/:email` - Get user by email
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/user/:userId` - Get projects by user ID
- `GET /api/projects/featured/featured` - Get featured projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Health Check
- `GET /api/health` - Check server status

