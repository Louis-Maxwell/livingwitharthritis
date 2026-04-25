#!/usr/bin/env bash
# Preflight TypeScript check for all Supabase edge functions.
# Runs `deno check` on every function's index.ts before deployment.
# Exits non-zero on the first failure so deploys are blocked.

set -uo pipefail

FUNCTIONS_DIR="$(cd "$(dirname "$0")/.." && pwd)/supabase/functions"

if ! command -v deno >/dev/null 2>&1; then
  echo "❌ deno is not installed. Install from https://deno.land/ to run preflight." >&2
  exit 127
fi

if [ ! -d "$FUNCTIONS_DIR" ]; then
  echo "❌ Functions directory not found: $FUNCTIONS_DIR" >&2
  exit 1
fi

echo "🔎 Preflight: type-checking Supabase edge functions in $FUNCTIONS_DIR"

failed=()
checked=0

for dir in "$FUNCTIONS_DIR"/*/; do
  name="$(basename "$dir")"
  # Skip shared (no entrypoint), helper dirs, and the local node_modules cache.
  if [[ "$name" == _* || "$name" == "node_modules" ]]; then
    continue
  fi
  entry="${dir}index.ts"
  if [ ! -f "$entry" ]; then
    echo "⚠️  Skipping $name (no index.ts)"
    continue
  fi
  echo ""
  echo "▶ deno check $name"
  # Run from the functions directory so the shared deno.json (nodeModulesDir: auto) applies.
  if ! ( cd "$FUNCTIONS_DIR" && deno check --allow-import "$name/index.ts" ); then
    failed+=("$name")
  fi
  checked=$((checked + 1))
done

echo ""
echo "──────────────────────────────────────────"
echo "Checked: $checked function(s)"
if [ ${#failed[@]} -gt 0 ]; then
  echo "❌ Type-check failed for: ${failed[*]}"
  echo "Aborting deploy."
  exit 1
fi
echo "✅ All edge functions passed type-check."
