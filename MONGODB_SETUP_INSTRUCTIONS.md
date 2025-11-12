# MongoDB Setup Instructions

## The Issue
Your registration is failing because MongoDB is not running. The server needs MongoDB to store user data.

## Solution Options

### Option 1: Start MongoDB Locally (If Installed)

**Windows:**
1. Open Services (Win + R, type `services.msc`)
2. Find "MongoDB" service
3. Right-click and select "Start"

Or use Command Prompt (as Administrator):
```bash
net start MongoDB
```

**Check if MongoDB is installed:**
```bash
mongod --version
```

If not installed, download from: https://www.mongodb.com/try/download/community

---

### Option 2: Use MongoDB Atlas (Cloud - Recommended for Easy Setup)

1. **Sign up for free account:**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Create a free account (M0 cluster is free forever)

2. **Create a cluster:**
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select a cloud provider and region
   - Click "Create"

3. **Set up database access:**
   - Go to "Database Access" in the left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Set up network access:**
   - Go to "Network Access" in the left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your current IP address
   - Click "Confirm"

5. **Get connection string:**
   - Go to "Database" in the left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `portfolio`

6. **Update your .env file:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

7. **Restart your backend server:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   npm run dev:server
   ```

---

### Option 3: Install MongoDB Locally

**Windows:**
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service (recommended)
5. Install MongoDB Compass (GUI tool - optional but helpful)

After installation, MongoDB will start automatically as a service.

---

## Verify MongoDB Connection

After setting up MongoDB, check the server console. You should see:
```
✅ MongoDB Connected: ...
```

If you see:
```
❌ Error connecting to MongoDB: ...
```

Check:
- MongoDB service is running
- Connection string in .env is correct
- Network/firewall allows connection
- For Atlas: IP address is whitelisted

---

## Quick Test

Once MongoDB is connected, try registering again. The error should be resolved!

