# 🔴 PRIORITY ACTIONS - API Keys Rotation & Git Cleanup

## ✅ WHAT'S BEEN COMPLETED

1. ✅ **Code Scan** - No hardcoded secrets in source code
2. ✅ **.env Cleared** - All real keys removed, now has empty placeholders
3. ✅ **.gitignore Verified** - .env and .env.local properly ignored
4. ✅ **Backup Created** - Git backup branch: `backup-before-cleanup-1787584489`

---

## 🔴 PRIORITY 1: ROTATE SUPABASE ANON KEYS (5 MINUTES)

**This must be done first** - it invalidates the exposed keys immediately.

### Manual Steps:

1. **Go to Supabase Dashboard:**
   - URL: https://app.supabase.com
   - Sign in with your account

2. **Select Your Project:**
   - Project Name: `livingwitharthritis`
   - Project ID: `zrvcejlncpndjfyuvcrd`

3. **Navigate to API Settings:**
   - Click: Settings (left sidebar)
   - Click: API
   - Find: "Project API Keys" section

4. **Regenerate Anon Key:**
   - Look for the `anon` (public) key
   - Click the **circular refresh/regenerate icon** next to it
   - Confirm when prompted
   - Copy the **new key** (starts with `eyJh...`)

5. **Update Lovable:**
   - Go to: Lovable > Project Settings > Environment Variables
   - Update: `VITE_SUPABASE_PUBLISHABLE_KEY` = [new key from step 4]
   - Save

6. **Update Local Development (Optional):**
   ```bash
   # Edit .env file with new key
   VITE_SUPABASE_PUBLISHABLE_KEY="[paste new key here]"
   VITE_SUPABASE_URL="https://eswdtpmknwjxtvkyxvmi.supabase.co"
   ```

7. **Verify It Works:**
   ```bash
   npm run dev
   # Should load the site without authentication errors
   ```

**⏰ Estimated Time: 5 minutes**

---

## 🔴 PRIORITY 2: CLEAN GIT HISTORY (10-15 MINUTES)

**Only do this AFTER you've rotated the keys in Priority 1**

### Option A: Using Git Bash (Recommended for Windows)

1. **Open Git Bash:**
   - Right-click in the project folder
   - Select "Git Bash Here"
   - Or press `Ctrl + Shift + ~` in VS Code terminal

2. **Verify You're in the Right Directory:**
   ```bash
   pwd
   # Should show: /c/Users/marydas/livingwitharthritis
   ```

3. **Verify Backup Branch Exists:**
   ```bash
   git branch -a | grep backup-before-cleanup
   # Should show: backup-before-cleanup-1787584489
   ```

4. **Clean First Exposed Key:**
   ```bash
   python -m git_filter_repo --replace-all-text \
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs' \
     '[REDACTED_SUPABASE_KEY_1]'
   ```

5. **Clean Second Exposed Key:**
   ```bash
   python -m git_filter_repo --replace-all-text \
     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maWprZG9pZmloYmdvbWNuYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjg5MjgsImV4cCI6MjA4NjIwNDkyOH0.QR05pSLQl7kGzhtQIEX3R0591pCjoDUsrKEVN__Msy0' \
     '[REDACTED_SUPABASE_KEY_2]'
   ```

6. **Verify the Cleanup:**
   ```bash
   git log --oneline | grep -i supabase | head -5
   # Should NOT show the actual keys anymore
   ```

7. **Force Push to GitHub:**
   ```bash
   git push --force-with-lease origin main
   ```

8. **Verify on GitHub:**
   - Go to: https://github.com/Louis-Maxwell/livingwitharthritis
   - Check commits 84bc520 and 3a8e143
   - Keys should now be replaced with `[REDACTED_SUPABASE_KEY_...]`

### Option B: If Something Goes Wrong

**Recover from backup:**
```bash
git reset --hard backup-before-cleanup-1787584489
git push --force-with-lease origin main
```

---

## 🎯 VERIFICATION CHECKLIST

After completing both priorities:

- [ ] **Priority 1 Complete:**
  - [ ] Supabase key regenerated
  - [ ] Lovable environment variable updated
  - [ ] Local .env updated (if developing locally)
  - [ ] Site loads without auth errors

- [ ] **Priority 2 Complete:**
  - [ ] Git history cleaned
  - [ ] Backup branch created
  - [ ] Changes pushed to GitHub
  - [ ] GitHub shows [REDACTED] instead of actual keys

---

## 📊 Exposed Keys Reference

For your records (will be invalid after rotation):

**Key 1 - Current Project:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs

Project ID: zrvcejlncpndjfyuvcrd
URL: https://zrvcejlncpndjfyuvcrd.supabase.co
```

**Key 2 - Legacy Project:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maWprZG9pZmloYmdvbWNuYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjg5MjgsImV4cCI6MjA4NjIwNDkyOH0.QR05pSLQl7kGzhtQIEX3R0591pCjoDUsrKEVN__Msy0

Project ID: nfijkdoifihbgomcnbnb
URL: https://nfijkdoifihbgomcnbnb.supabase.co
```

---

## ⏱️ Time Estimate

- **Priority 1 (Rotate Keys):** 5 minutes
- **Priority 2 (Clean History):** 10-15 minutes
- **Total:** 15-20 minutes

---

## 🆘 Support

If you encounter issues:

1. **Supabase Help:**
   - Docs: https://supabase.com/docs
   - Support: https://app.supabase.com > Help & Support

2. **Git Filter Repo:**
   - Docs: https://github.com/newren/git-filter-repo
   - Backup exists: `backup-before-cleanup-1787584489`

3. **GitHub:**
   - Secret Scanning: https://github.com/Louis-Maxwell/livingwitharthritis/security/secret-scanning
   - Documentation: https://docs.github.com/en/code-security

---

**Created:** 2026-08-24
**Status:** Ready for manual execution
