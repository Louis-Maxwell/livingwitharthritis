# 🔒 Security Remediation Plan - API Keys & Secrets

## Status Overview

| Item | Status | Action Required |
|------|--------|-----------------|
| **Current Code** | ✅ SECURE | No keys in source code |
| **.env File** | ✅ CLEARED | Keys removed from tracking |
| **Supabase Keys** | ⏳ PENDING | Must rotate manually |
| **Git History** | ⏳ PENDING | Can clean after key rotation |

---

## 🔴 IMMEDIATE ACTION REQUIRED

### Step 1: Rotate Supabase Anon Keys (5 minutes)

**DO THIS FIRST** - Rotating keys will invalidate the old exposed keys in git history.

1. Go to: https://app.supabase.com
2. Select project: **livingwitharthritis**
3. Navigate to: **Settings > API**
4. Find the **`anon` (public)** key
5. Click the **circular refresh icon** to regenerate
6. Confirm regeneration
7. Copy the new key

**Update Environments:**

```bash
# 1. Update Lovable
# Go to: Lovable > Project Settings > Environment Variables
# Update: VITE_SUPABASE_PUBLISHABLE_KEY = [new key from step 7]

# 2. Update local development (optional)
# Edit .env file:
VITE_SUPABASE_PUBLISHABLE_KEY="[new key from step 7]"
```

**Verify It Works:**
```bash
npm run dev
# Should load without auth errors
```

---

### Step 2: Clean Git History (10-20 minutes) - AFTER KEY ROTATION

**Only do this after you've rotated the keys in Step 1.**

#### Option A: Using git-filter-repo (Recommended)

```bash
# Install if not already installed
pip install git-filter-repo

# Clean both exposed keys from history
git filter-repo --replace-all-text-regex \
  --regex='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0\.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs' \
  --replacement='[REDACTED_SUPABASE_ANON_KEY]'

git filter-repo --replace-all-text-regex \
  --regex='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maWprZG9pZmloYmdvbWNuYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjg5MjgsImV4cCI6MjA4NjIwNDkyOH0\.QR05pSLQl7kGzhtQIEX3R0591pCjoDUsrKEVN__Msy0' \
  --replacement='[REDACTED_SUPABASE_ANON_KEY_LEGACY]'

# Force push to GitHub (DESTRUCTIVE - rewrites history)
git push --force-with-lease origin main
```

#### Option B: Using GitHub's Secret Scanning (Easiest)

GitHub will automatically detect and alert you to the exposed keys. Once you've rotated them:
1. Go to: https://github.com/Louis-Maxwell/livingwitharthritis/security/secret-scanning
2. Dismiss the alerts (they're now invalid since keys were rotated)
3. GitHub will prompt to clean history
4. Confirm the cleanup

#### Option C: BFG Repo-Cleaner (Alternative)

```bash
# Download BFG from https://rtyley.github.io/bfg-repo-cleaner/
# Create a file with the exposed keys
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs" > secrets.txt
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maWprZG9pZmloYmdvbWNuYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjg5MjgsImV4cCI6MjA4NjIwNDkyOH0.QR05pSLQl7kGzhtQIEX3R0591pCjoDUsrKEVN__Msy0" >> secrets.txt

java -jar bfg.jar --replace-all $(cat secrets.txt)
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force-with-lease
```

---

## ✅ Verification Checklist

After completing both steps:

- [ ] Supabase anon key has been rotated in the dashboard
- [ ] New key is updated in Lovable environment variables
- [ ] Local .env file has been updated with new key
- [ ] Application loads without auth errors (`npm run dev`)
- [ ] Git history has been cleaned (if you chose to do so)
- [ ] GitHub secrets scanning shows keys as resolved

---

## 📋 Exposed Keys Reference

**For your records only** (will be invalid after rotation):

```
Key 1 (Current Project):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs
Project ID: zrvcejlncpndjfyuvcrd
URL: https://zrvcejlncpndjfyuvcrd.supabase.co

Key 2 (Legacy/Old Project):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maWprZG9pZmloYmdvbWNuYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjg5MjgsImV4cCI6MjA4NjIwNDkyOH0.QR05pSLQl7kGzhtQIEX3R0591pCjoDUsrKEVN__Msy0
Project ID: nfijkdoifihbgomcnbnb
URL: https://nfijkdoifihbgomcnbnb.supabase.co
```

---

## 🛡️ Best Practices Going Forward

1. ✅ **Never commit .env files** - Already in .gitignore
2. ✅ **Use .env.example as template** - Already in place
3. ✅ **Set secrets in deployment UI** - Not in code
4. ✅ **Rotate keys regularly** - Now you have a process
5. ✅ **Monitor GitHub secret scanning** - GitHub will alert you
6. ✅ **Use environment variables** - All code uses env vars correctly

---

## 📞 Support

If you encounter issues:
- **Supabase docs:** https://supabase.com/docs/guides/auth
- **Git filter-repo:** https://github.com/newren/git-filter-repo
- **GitHub secret scanning:** https://docs.github.com/en/code-security/secret-scanning
