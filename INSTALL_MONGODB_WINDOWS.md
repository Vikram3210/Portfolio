# Install MongoDB on Windows

## Quick Installation Steps

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version**: Latest (7.0.x recommended)
   - **Platform**: Windows
   - **Package**: MSI
3. Click **"Download"**

### Step 2: Run the Installer
1. Run the downloaded `.msi` file
2. Click **"Next"** through the setup wizard
3. **Important**: Check **"Install MongoDB as a Service"**
4. Select **"Run service as Network Service user"** (default)
5. Check **"Install MongoDB Compass"** (GUI tool - optional but helpful)
6. Click **"Install"**
7. Wait for installation to complete

### Step 3: Verify Installation
Open a new PowerShell/Command Prompt and run:
```bash
mongod --version
```

You should see version information.

### Step 4: Start MongoDB
MongoDB should start automatically as a Windows Service.

To check if it's running:
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find **"MongoDB"** in the list
4. Check if Status is **"Running"**

If not running:
- Right-click **"MongoDB"** → **"Start"**

### Step 5: Test Connection
MongoDB runs on `localhost:27017` by default.

Your `.env` file should have:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### Step 6: Restart Backend Server
1. Stop your backend server (Ctrl+C)
2. Restart it:
   ```bash
   npm run dev:server
   ```
3. You should see: `✅ MongoDB Connected: localhost`

---

## Alternative: Use MongoDB Atlas (Cloud - No Installation)

If you don't want to install MongoDB locally, use MongoDB Atlas instead:
- See `MONGODB_ATLAS_QUICK_SETUP.md` for instructions
- Free, no installation needed
- Works immediately

---

## Troubleshooting

**MongoDB service won't start?**
- Run installer as Administrator
- Check Windows Event Viewer for errors
- Make sure port 27017 is not in use

**Can't find mongod command?**
- Add MongoDB bin folder to PATH:
  - Usually: `C:\Program Files\MongoDB\Server\7.0\bin`
  - Or restart your terminal after installation

**Port 27017 already in use?**
- Another MongoDB instance might be running
- Check: `netstat -ano | findstr :27017`

