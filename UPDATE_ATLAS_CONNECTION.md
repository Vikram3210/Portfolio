# Update MongoDB Atlas Connection String

## Step-by-Step Guide

### Step 1: Get Your Connection String from Atlas

1. Log in to MongoDB Atlas: https://cloud.mongodb.com
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 2: Update Your Connection String

**Important:** You need to:
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Add `/portfolio` before the `?` for the database name

**Example:**
```
Original: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
Updated:  mongodb+srv://portfolio_user:MyPassword123@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Step 3: Update .env File

Open your `.env` file in the project root and replace the `MONGODB_URI` line:

**Before:**
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**After (with your actual credentials):**
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Step 4: Restart Backend Server

1. Stop your current backend server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm run dev:server
   ```

### Step 5: Verify Connection

Look at the server console. You should see:
```
🔌 Attempting to connect to MongoDB: mongodb+srv://your_username:***@cluster0.xxxxx.mongodb.net/portfolio
✅ MongoDB Connected successfully!
   Host: cluster0.xxxxx.mongodb.net
   Database: portfolio
```

If you see this, you're all set! 🎉

---

## Troubleshooting

**Connection timeout?**
- Check that your IP address is whitelisted in Atlas Network Access
- Verify username and password are correct

**Authentication failed?**
- Double-check username and password in connection string
- Make sure there are no extra spaces

**Still having issues?**
- Share the error message from server console
- Verify connection string format is correct

---

## Quick Format Check

Your connection string should look like:
```
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

Make sure:
- ✅ No `<` or `>` brackets (replace with actual values)
- ✅ `/portfolio` is before the `?`
- ✅ Username and password are URL-encoded if they contain special characters

