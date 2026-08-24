#!/bin/bash
# Clean git history of exposed Supabase keys

set -e

echo "🧹 Git History Cleanup Script"
echo "=============================="
echo ""
echo "This script will remove exposed Supabase keys from git history"
echo ""

# Check if we're in a git repo
if [ ! -d ".git" ]; then
  echo "❌ Not a git repository. Run this from the repo root."
  exit 1
fi

# Create backup reference
BACKUP_BRANCH="backup-before-cleanup-$(date +%s)"
echo "📦 Creating backup branch: $BACKUP_BRANCH"
git branch $BACKUP_BRANCH
echo "✅ Backup created. You can always return to it with: git reset --hard $BACKUP_BRANCH"
echo ""

# Remove first exposed key
echo "🔑 Removing first exposed Supabase key..."
git filter-repo --replace-all-text-regex \
  --regex='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0\.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs' \
  --replacement='[REDACTED_SUPABASE_ANON_KEY_1]'
echo "✅ First key removed"
echo ""

# Remove second exposed key
echo "🔑 Removing second exposed Supabase key (legacy)..."
git filter-repo --replace-all-text-regex \
  --regex='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maWprZG9pZmloYmdvbWNuYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjg5MjgsImV4cCI6MjA4NjIwNDkyOH0\.QR05pSLQl7kGzhtQIEX3R0591pCjoDUsrKEVN__Msy0' \
  --replacement='[REDACTED_SUPABASE_ANON_KEY_2]'
echo "✅ Second key removed"
echo ""

# Summary
echo "════════════════════════════════════════════════════════════"
echo "✅ Git history cleanup complete!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "📊 Summary:"
echo "- Exposed keys have been replaced with [REDACTED] placeholders"
echo "- Backup branch created: $BACKUP_BRANCH"
echo "- If something went wrong, recover with: git reset --hard $BACKUP_BRANCH"
echo ""
echo "🚀 Next step: Force push to GitHub"
echo ""
echo "⚠️  WARNING: This will rewrite git history. Make sure:"
echo "1. All team members know about this change"
echo "2. Everyone rebases their local branches after the push"
echo ""
echo "Command to force push:"
echo "  git push --force-with-lease origin main"
echo ""
echo "════════════════════════════════════════════════════════════"
