# Troubleshoot MongoDB Connection

## Current Issue
"Database not connected. Please make sure MongoDB is running."

## Quick Fixes

### Option 1: If Using Local MongoDB

**Check if MongoDB Service is Running:**
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find **"MongoDB"** in the list
4. If Status is **"Stopped"**, right-click → **"Start"**

**Or start via Command Prompt (as Administrator):**
```bash
net start MongoDB
```

**Verify MongoDB is running:**
```bash
# Check if port 27017 is listening
netstat -ano | findstr :27017
```

### Option 2: If Using MongoDB Atlas

**Check your connection string in .env:**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Common issues:**
- ❌ Wrong username/password
- ❌ IP address not whitelisted in Atlas
- ❌ Missing `/portfolio` database name
- ❌ Connection string format incorrect

**Fix steps:**
1. Go to MongoDB Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your actual credentials
6. Add `/portfolio` before the `?` for database name
7. Update `.env` file
8. Restart backend server

### Option 3: Check Server Console

Look at your backend server console output. You should see:
- ✅ `MongoDB Connected successfully!` - Working!
- ❌ `MongoDB Connection Failed:` - Check the error message

## Test Connection

After fixing, restart your backend server:
```bash
# Stop server (Ctrl+C)
npm run dev:server
```

You should see: `✅ MongoDB Connected successfully!`

## Still Not Working?

1. **Check .env file exists** in project root
2. **Verify MONGODB_URI format** is correct
3. **Check server console** for specific error messages
4. **For Atlas**: Verify IP is whitelisted in Network Access
5. **For Local**: Verify MongoDB service is running

## Need Help?

Share the error message from your server console - it will show the specific issue!

