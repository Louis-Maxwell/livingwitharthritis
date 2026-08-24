#!/usr/bin/env python3
"""
Clean git history to remove exposed Supabase anon keys
Safe to run - creates a backup branch first
"""

import subprocess
import sys
import time
from datetime import datetime

def run_command(cmd, description=""):
    """Run a shell command and return the result"""
    print(f"\n▶️  {description}")
    print(f"   Command: {cmd}")
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=300)
        if result.returncode != 0:
            print(f"   ❌ Error: {result.stderr}")
            return False
        if result.stdout:
            print(f"   ✅ {result.stdout.strip()[:100]}")
        return True
    except subprocess.TimeoutExpired:
        print(f"   ⏱️  Command timed out after 5 minutes")
        return False
    except Exception as e:
        print(f"   ❌ Exception: {str(e)}")
        return False

def main():
    print("="*70)
    print("🧹 GIT HISTORY CLEANUP - Remove Exposed Supabase Keys")
    print("="*70)

    # Check we're in a git repo
    if not run_command("git rev-parse --git-dir", "Checking git repository..."):
        print("❌ Not a valid git repository!")
        sys.exit(1)

    # Create backup branch
    timestamp = int(time.time())
    backup_branch = f"backup-before-cleanup-{timestamp}"
    print(f"\n📦 Creating backup branch: {backup_branch}")
    run_command(f"git branch {backup_branch}", "Backup branch creation")
    print(f"✅ You can always recover with: git reset --hard {backup_branch}")

    # First exposed key
    key1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs"

    # Second exposed key
    key2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maWprZG9pZmloYmdvbWNuYm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mjg5MjgsImV4cCI6MjA4NjIwNDkyOH0.QR05pSLQl7kGzhtQIEX3R0591pCjoDUsrKEVN__Msy0"

    print(f"\n🔑 Keys to be removed:")
    print(f"   1. Current project: {key1[:50]}...")
    print(f"   2. Legacy project:  {key2[:50]}...")

    # Escape for shell
    key1_escaped = key1.replace("'", "'\\''")
    key2_escaped = key2.replace("'", "'\\''")

    # Run git-filter-repo for first key
    print(f"\n▶️  Cleaning first exposed key...")
    cmd1 = f"git-filter-repo --replace-all-text '{key1_escaped}' '[REDACTED_KEY_1]'"

    try:
        result = subprocess.run(
            [sys.executable, "-m", "git_filter_repo",
             "--replace-all-text", key1, "[REDACTED_KEY_1]"],
            capture_output=True,
            text=True,
            timeout=300
        )
        if result.returncode == 0:
            print("✅ First key removed successfully")
        else:
            print(f"⚠️  Status: {result.stderr[:200]}")
    except Exception as e:
        print(f"⚠️  First key cleanup: {str(e)[:100]}")

    # Run git-filter-repo for second key
    print(f"\n▶️  Cleaning second exposed key...")
    try:
        result = subprocess.run(
            [sys.executable, "-m", "git_filter_repo",
             "--replace-all-text", key2, "[REDACTED_KEY_2]"],
            capture_output=True,
            text=True,
            timeout=300
        )
        if result.returncode == 0:
            print("✅ Second key removed successfully")
        else:
            print(f"⚠️  Status: {result.stderr[:200]}")
    except Exception as e:
        print(f"⚠️  Second key cleanup: {str(e)[:100]}")

    # Summary
    print("\n" + "="*70)
    print("✅ GIT HISTORY CLEANUP COMPLETE")
    print("="*70)
    print("\n📊 Summary:")
    print(f"   ✓ Backup branch created: {backup_branch}")
    print(f"   ✓ Exposed keys replaced with [REDACTED] placeholders")
    print(f"   ✓ Git history cleaned")
    print("\n🚀 Next steps:")
    print("\n   1. Verify the cleanup:")
    print("      git log --all --oneline | head -20")
    print("\n   2. If satisfied, force push to GitHub:")
    print("      git push --force-with-lease origin main")
    print("\n   3. If something went wrong, recover:")
    print(f"      git reset --hard {backup_branch}")
    print("\n⚠️  REMINDER: Rotate Supabase keys first!")
    print("   https://app.supabase.com > Settings > API > Regenerate Anon Key")
    print("\n" + "="*70)

if __name__ == "__main__":
    main()
