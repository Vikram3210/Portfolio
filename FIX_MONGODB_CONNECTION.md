# Fix MongoDB Atlas Connection String

## Current Issue
The connection string has a placeholder `xxxxx` instead of your actual cluster name.

**Current (incorrect):**
```
mongodb+srv://vikram:vikrampass@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

## How to Get the Correct Connection String

### Step 1: Go to MongoDB Atlas
1. Log in: https://cloud.mongodb.com
2. You should see your cluster dashboard

### Step 2: Get Connection String
1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Select **"Node.js"** as driver
4. Copy the connection string shown

It will look like:
```
mongodb+srv://<username>:<password>@cluster0.ABC123.mongodb.net/?retryWrites=true&w=majority
```

**Important:** The `ABC123` part is your actual cluster identifier (not `xxxxx`)

### Step 3: Update the Connection String
1. Replace `<username>` with: `vikram`
2. Replace `<password>` with: `vikrampass` (your actual password)
3. Add `/portfolio` before the `?` for database name

**Final format:**
```
mongodb+srv://vikram:vikrampass@cluster0.ABC123.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Step 4: Update .env File
Open `.env` and replace the `MONGODB_URI` line with your corrected connection string.

### Step 5: Restart Server
The server should automatically restart (if using `--watch`) or restart manually:
```bash
npm run dev:server
```

## Expected Output
After fixing, you should see:
```
✅ MongoDB Connected successfully!
   Host: cluster0.ABC123.mongodb.net
   Database: portfolio
```

## Common Issues

**Still getting ENOTFOUND error?**
- Double-check the cluster name in Atlas matches your connection string
- Make sure there are no typos
- Verify the connection string format is correct

**Authentication failed?**
- Check username and password are correct
- Make sure password doesn't contain special characters that need URL encoding
- Verify database user exists in Atlas

**Network access denied?**
- Go to Atlas → Network Access
- Make sure your IP is whitelisted (or allow from anywhere for development)

