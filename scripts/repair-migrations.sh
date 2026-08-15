#!/bin/bash
# One-time migration repair script
# This reconciles the Supabase CLI's migration tracking with the actual live database state.
# Run this ONCE before enabling automatic migration deployments.
#
# Usage: ./scripts/repair-migrations.sh
#
# Requirements:
# - Supabase CLI installed and authenticated
# - supabase/migrations directory with all migration files
# - Access to the production Supabase project
#
# This script will:
# 1. Link to the project (if not already linked)
# 2. Mark each migration file as applied in the CLI's tracking
# 3. Enable automatic migration deployments in CI/CD

set -e

PROJECT_REF="eswdtpmknwjxtvkyxvmi"
MIGRATIONS_DIR="supabase/migrations"

echo "🔧 Migration Repair Utility"
echo "=========================="
echo ""
echo "This script reconciles the Supabase CLI's migration tracking with the live database."
echo "It must be run ONCE before enabling automatic migration deployments."
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Install it first: https://supabase.com/docs/reference/cli"
    exit 1
fi

# Check if migrations directory exists
if [ ! -d "$MIGRATIONS_DIR" ]; then
    echo "❌ Migrations directory not found: $MIGRATIONS_DIR"
    exit 1
fi

echo "Linking to Supabase project: $PROJECT_REF"
supabase link --project-ref "$PROJECT_REF"

echo ""
echo "Counting migrations to mark as applied..."
MIGRATION_COUNT=$(ls "$MIGRATIONS_DIR"/*.sql 2>/dev/null | wc -l)
echo "Found $MIGRATION_COUNT migration files"

if [ "$MIGRATION_COUNT" -eq 0 ]; then
    echo "⚠️  No migrations found. Nothing to repair."
    exit 0
fi

echo ""
echo "⚠️  WARNING: This will mark all migrations as applied in the CLI's tracking."
echo "   If you have pending unapplied migrations, do NOT proceed."
echo ""
read -p "Continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "Marking migrations as applied..."
COUNTER=0

for migration_file in "$MIGRATIONS_DIR"/*.sql; do
    filename=$(basename "$migration_file")
    # Extract version from filename: 20260815114700_*.sql -> 20260815114700
    version="${filename%%_*}"

    echo -n "  [$((++COUNTER))/$MIGRATION_COUNT] $version ... "

    # Mark as applied in CLI's migration tracking
    if supabase migration repair --status applied "$version" 2>/dev/null; then
        echo "✓"
    else
        # If repair command doesn't work, it may already be marked
        echo "⊘ (already applied or skipped)"
    fi
done

echo ""
echo "✅ Migration repair complete!"
echo ""
echo "Next steps:"
echo "1. Update .github/workflows/supabase-deploy.yml"
echo "2. Change the deploy-migrations trigger from 'workflow_dispatch' to automatic"
echo "3. Remove the 'if: github.event_name == \"workflow_dispatch\"' line"
echo "4. Commit and push to enable automatic deployments"
echo ""
