# MongoDB Atlas Quick Setup Guide

## Step-by-Step Instructions

### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email (or use Google/GitHub)
3. Verify your email if prompted

### Step 2: Create a Free Cluster
1. After logging in, click **"Build a Database"**
2. Choose **"M0 FREE"** tier (Free forever, no credit card required)
3. Select a cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to you (e.g., `us-east-1` for US)
5. Click **"Create"** (takes 1-3 minutes)

### Step 3: Create Database User
1. In the setup wizard, you'll see "Create Database User"
2. Choose **"Password"** authentication
3. Enter a username (e.g., `portfolio_user`)
4. Enter a password (save this! You'll need it)
5. Click **"Create Database User"**

### Step 4: Set Network Access
1. In the setup wizard, you'll see "Network Access"
2. Click **"Add My Current IP Address"** (recommended)
   - OR click **"Allow Access from Anywhere"** (for development only)
3. Click **"Finish and Close"**

### Step 5: Get Connection String
1. Once cluster is created, click **"Connect"** button
2. Choose **"Connect your application"**
3. Select **"Node.js"** as driver
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your .env File
1. Open your `.env` file in the project root
2. Replace the connection string:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add `/portfolio` before the `?` for the database name
   
   Example:
   ```
   MONGODB_URI=mongodb+srv://portfolio_user:YourPassword123@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### Step 7: Restart Backend Server
1. Stop your current backend server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev:server
   ```
3. You should see: `✅ MongoDB Connected: ...`

### Step 8: Test Registration
Try registering again - it should work now! 🎉

---

## Troubleshooting

**Connection timeout?**
- Make sure your IP is whitelisted in Network Access
- Check that username/password are correct in connection string

**Authentication failed?**
- Verify username and password are correct
- Make sure there are no extra spaces in the connection string

**Still having issues?**
- Check the server console for specific error messages
- Verify the connection string format is correct

---

## Alternative: Install MongoDB Locally

If you prefer to install MongoDB locally instead:

1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Complete" installation
4. Install as Windows Service (recommended)
5. MongoDB will start automatically

Then your `.env` can stay as:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```

