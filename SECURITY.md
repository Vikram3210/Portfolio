# 🔒 Security Guide - Protecting Your Secrets

## ⚠️ IMPORTANT: Never Commit Secrets!

This guide ensures all your sensitive information (MongoDB credentials, JWT secrets, API keys) remains secure and never exposed in your repository.

---

## ✅ What's Protected

The following files and patterns are **automatically ignored** by Git:

- `.env` - All environment variable files
- `.env.*` - Any environment file variants
- `server/.env` - Server-specific environment files
- `*.env` - Any file ending in .env

---

## 🔐 Secrets You Must Protect

### 1. MongoDB Connection String
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```
**Never commit this!** Contains your database username and password.

### 2. JWT Secret
```
JWT_SECRET=your-super-secret-random-string-here
```
**Never commit this!** Used to sign authentication tokens.

### 3. API Keys (if you add any)
```
STRIPE_API_KEY=sk_live_...
SENDGRID_API_KEY=SG....
```
**Never commit these!** Any third-party API keys.

---

## 📝 How to Set Up Environment Variables

### Local Development

1. **Create `.env` file in root directory:**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

2. **Create `server/.env` file:**
   ```bash
   # Copy the example file
   cp server/.env.example server/.env
   ```

3. **Fill in your actual values** (these files are already in .gitignore)

### Production Deployment

**Vercel/Netlify (Frontend):**
- Go to Project Settings → Environment Variables
- Add: `VITE_API_URL=https://your-backend-url.com/api`

**Render/Railway (Backend):**
- Go to Environment Variables section
- Add all required variables:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `FRONTEND_URL`
  - `PORT`
  - `NODE_ENV`

---

## 🚨 If You Accidentally Committed Secrets

### Step 1: Remove from Git History

```bash
# Remove file from Git tracking (but keep local file)
git rm --cached .env
git rm --cached server/.env

# Commit the removal
git commit -m "Remove sensitive .env files"

# Push the changes
git push origin main
```

### Step 2: Rotate Your Secrets

**If secrets were exposed, you MUST change them:**

1. **MongoDB Atlas:**
   - Go to Database Access
   - Change your database user password
   - Update your `.env` file with new password

2. **JWT Secret:**
   - Generate a new secret: `openssl rand -base64 32`
   - Update in `.env` and hosting platform
   - **Note:** All existing user sessions will be invalidated

3. **Check Git History:**
   ```bash
   # Check if secrets are in commit history
   git log --all --full-history -- .env
   ```

### Step 3: Clean Git History (If Needed)

If secrets were pushed to GitHub, you may need to:
1. Change all exposed secrets immediately
2. Consider using `git filter-branch` or BFG Repo-Cleaner (advanced)
3. Or create a new repository and start fresh

---

## ✅ Security Checklist

Before pushing to GitHub, verify:

- [ ] No `.env` files are tracked: `git ls-files | grep .env`
- [ ] `.gitignore` includes `.env` patterns
- [ ] No hardcoded secrets in code files
- [ ] No secrets in documentation (only examples)
- [ ] All environment variables use `process.env`
- [ ] Logs don't expose sensitive information

---

## 🔍 Verify Your Repository is Secure

### Check for tracked .env files:
```bash
git ls-files | findstr /i "\.env"
```
**Should return nothing!**

### Check .gitignore is working:
```bash
git check-ignore .env
```
**Should return: `.env`**

### Search for potential secrets in code:
```bash
# Search for MongoDB connection strings
git grep -i "mongodb+srv://" -- "*.js" "*.jsx" "*.ts" "*.tsx"

# Search for hardcoded passwords
git grep -i "password.*=" -- "*.js" "*.jsx" "*.ts" "*.tsx"
```
**Should only find examples in documentation, not real values!**

---

## 🛡️ Best Practices

1. **Always use environment variables** - Never hardcode secrets
2. **Use .env.example files** - Show structure without real values
3. **Rotate secrets regularly** - Especially if shared or exposed
4. **Use different secrets** - Dev, staging, and production should differ
5. **Limit access** - Only share secrets with trusted team members
6. **Monitor your repository** - Use GitHub's secret scanning if available

---

## 📚 Example .env Files

### Root `.env.example`:
```env
# Frontend Environment Variables
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### `server/.env.example`:
```env
# Backend Server Environment Variables
PORT=5001
NODE_ENV=development

# MongoDB Connection String (NEVER COMMIT REAL VALUES!)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# JWT Secret (NEVER COMMIT REAL VALUES!)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

**Note:** These are examples only. Create your own `.env` files with real values (they're already in .gitignore).

---

## 🆘 Need Help?

If you suspect your secrets were exposed:
1. **Immediately change all exposed secrets**
2. **Review your Git history** to see what was committed
3. **Update all deployed applications** with new secrets
4. **Monitor for unauthorized access**

---

## ✅ Current Security Status

- ✅ `.env` files are in `.gitignore`
- ✅ No secrets are logged in console
- ✅ All secrets use environment variables
- ✅ Documentation only contains examples
- ✅ Code doesn't hardcode credentials

**Your repository is secure!** 🎉

