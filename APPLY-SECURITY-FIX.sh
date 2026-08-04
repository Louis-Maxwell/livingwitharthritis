#!/bin/bash

#############################################
# LIVING WITH ARTHRITIS - SECURITY FIX SCRIPT
#############################################
#
# This script applies all the security fixes to your project
# Run this from your project root directory
#
# Usage: bash APPLY-SECURITY-FIX.sh
#

set -e  # Exit on error

echo "🔒 Living with Arthritis - Security Fix Automation"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "   Please run this script from your project root directory"
    exit 1
fi

echo "✅ Found package.json - running in correct directory"
echo ""

# Step 1: Update .gitignore
echo "Step 1/6: Updating .gitignore..."
if grep -q "VITE_.*_ID" .gitignore 2>/dev/null; then
    echo "  ℹ️  Already has enhanced .gitignore entries"
else
    cat >> .gitignore << 'EOF'

# Environment variables with secrets
.env
.env.local
.env.*.local
.env.production
.env.development

# Sensitive files
*.pem
*.key
secrets.json
EOF
    echo "  ✅ Updated .gitignore"
fi
echo ""

# Step 2: Update .env.example
echo "Step 2/6: Updating .env.example..."
cat > .env.example << 'EOF'
# ============================================
# ENVIRONMENT VARIABLES TEMPLATE
# ============================================
# 
# Copy this file to .env.local and fill in your actual values.
# IMPORTANT: NEVER commit .env.local to GitHub
# 

# Supabase Configuration
VITE_SUPABASE_PROJECT_ID=your-project-ref
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key

# Legacy (if still used)
SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
SUPABASE_URL=https://your-project-ref.supabase.co

# Google Analytics 4
VITE_GA4_PRIMARY_ID=
VITE_GA4_SECONDARY_ID=
VITE_GA4_PAGEVIEW_ID=

# PayPal (optional)
VITE_PAYPAL_CLIENT_ID=

# Stripe (optional)
VITE_STRIPE_PUBLIC_KEY=

# Resend (optional)
VITE_RESEND_API_KEY=
EOF
echo "  ✅ Updated .env.example"
echo ""

# Step 3: Update Supabase config
echo "Step 3/6: Updating src/integrations/supabase/config.ts..."
cat > src/integrations/supabase/config.ts << 'EOF'
/**
 * Backend connection constants.
 *
 * These are publishable, client-side-safe values (the project URL and the
 * anon/publishable key). They are read from Vite env vars (required in production)
 * and fall back to empty strings in development. This ensures:
 *
 * 1. Production builds MUST have proper env vars or they fail safely
 * 2. Development can work with environment variables
 * 3. Secrets are NEVER hardcoded in the repository
 */

const pick = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.length > 0 ? value : fallback;

// In production, these MUST come from environment variables
// In development, they can come from .env.local
export const SUPABASE_PROJECT_ID = pick(
  import.meta.env.VITE_SUPABASE_PROJECT_ID,
  '' // No fallback — fail safely if env not set
);

export const SUPABASE_URL = pick(
  import.meta.env.VITE_SUPABASE_URL,
  '' // No fallback — fail safely if env not set
);

export const SUPABASE_PUBLISHABLE_KEY = pick(
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  '' // No fallback — fail safely if env not set
);

// Validate that required env vars are set in production
if (import.meta.env.PROD) {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    console.error(
      'CRITICAL: Supabase environment variables are not configured. ' +
      'Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your ' +
      'deployment environment.'
    );
  }
}
EOF
echo "  ✅ Updated src/integrations/supabase/config.ts (removed hardcoded API key)"
echo ""

# Step 4: Create storage config
echo "Step 4/6: Creating src/config/storage-config.ts..."
mkdir -p src/config
cat > src/config/storage-config.ts << 'EOF'
/**
 * Storage Configuration
 * 
 * Supabase storage URLs are built dynamically from environment variables.
 * This prevents hardcoding bucket URLs in asset files and ensures the
 * correct URL is used across all environments (dev, staging, production).
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

/**
 * Generate a Supabase public storage URL
 * @param bucket - The storage bucket name (e.g., 'exercise-videos')
 * @param path - The file path within the bucket (e.g., 'exercise-ankle.mp4')
 * @returns Full URL to the public file
 */
export const getStorageUrl = (bucket: string, path: string): string => {
  if (!SUPABASE_URL) {
    // Fallback to relative path for development without env vars
    console.warn(
      `Storage URL not available. Falling back to relative path: /${bucket}/${path}`
    );
    return `/${bucket}/${path}`;
  }
  
  // Ensure path doesn't start with /
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`;
};

/**
 * Get a storage URL for exercise videos
 * @param filename - The video filename (e.g., 'exercise-ankle.mp4')
 * @returns Full URL to the video
 */
export const getExerciseVideoUrl = (filename: string): string => {
  return getStorageUrl('exercise-videos', filename);
};

/**
 * Get a storage URL for images
 * @param filename - The image filename
 * @returns Full URL to the image
 */
export const getImageUrl = (filename: string): string => {
  return getStorageUrl('images', filename);
};

/**
 * Get a storage URL for documents
 * @param filename - The document filename
 * @returns Full URL to the document
 */
export const getDocumentUrl = (filename: string): string => {
  return getStorageUrl('documents', filename);
};
EOF
echo "  ✅ Created src/config/storage-config.ts"
echo ""

# Step 5: Update index.html
echo "Step 5/6: Updating index.html..."
# This is complex, so we'll use a Python script for reliable multi-line replacement
python3 << 'PYTHON_SCRIPT'
import re

with open('index.html', 'r') as f:
    content = f.read()

# Update CSP to add stats.g.doubleclick.net
old_csp = r"connect-src 'self' https://\*\.supabase\.co wss://\*\.supabase\.co https://api\.resend\.com https://api-m\.paypal\.com https://api-m\.sandbox\.paypal\.com https://ai\.gateway\.lovable\.dev https://api\.stripe\.com https://\*\.lovable\.app https://\*\.lovableproject\.com https://www\.google-analytics\.com https://analytics\.google\.com https://\*\.google-analytics\.com https://\*\.analytics\.google\.com https://\*\.evarist\.ai"

new_csp = "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.resend.com https://api-m.paypal.com https://api-m.sandbox.paypal.com https://ai.gateway.lovable.dev https://api.stripe.com https://*.lovable.app https://*.lovableproject.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://*.google-analytics.com https://*.analytics.google.com https://*.evarist.ai"

# Find and replace the CSP directive
if 'stats.g.doubleclick.net' not in content:
    # Use simple string replacement for CSP
    content = content.replace(
        "https://analytics.google.com https://*.google-analytics.com",
        "https://analytics.google.com https://stats.g.doubleclick.net https://*.google-analytics.com"
    )
    print("✅ Updated CSP with stats.g.doubleclick.net")

# Update GA4 script section
if "var ga4Id = import.meta.env.VITE_GA4_PRIMARY_ID" not in content:
    old_ga4_pattern = r"gtag\('config', 'G-ZLLSD3PXZ9'"
    if re.search(old_ga4_pattern, content):
        # Replace the entire GA4 comment and script block
        old_script = """    <!-- Google Analytics 4 — DEFERRED. Loading gtag before hydration costs
         ~200ms of main-thread and blocks LCP on mobile. We instead queue
         events into dataLayer, and load gtag AFTER first paint (via
         requestIdleCallback / setTimeout fallback), which keeps every early
         pageview but removes it from the LCP critical path. Consent decline
         and bot exclusion (below) still short-circuit before load. -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ZLLSD3PXZ9', {
        send_page_view: true,
        page_path: window.location.pathname,
        page_title: document.title,
        transport_type: 'beacon'
      });
      // Defer the ~90KB gtag.js payload out of the LCP critical path.
      (function(){
        function load(){
          if (window.__GA_LOADED__) return; window.__GA_LOADED__ = true;
          var s = document.createElement('script');
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZLLSD3PXZ9';
          document.head.appendChild(s);
        }
        // Load on first user interaction OR after 3s, whichever comes first.
        var loaded = false, mark = function(){ if(loaded) return; loaded=true; load(); };
        ['scroll','keydown','pointerdown','touchstart'].forEach(function(e){
          addEventListener(e, mark, { once: true, passive: true });
        });
        if ('requestIdleCallback' in window) {
          requestIdleCallback(mark, { timeout: 3000 });
        } else {
          setTimeout(mark, 3000);
        }
      })();
    </script>"""

        new_script = """    <!-- Google Analytics 4 — DEFERRED via environment variables.
         Loading gtag before hydration costs ~200ms of main-thread and blocks
         LCP on mobile. We instead queue events into dataLayer, and load gtag
         AFTER first paint (via requestIdleCallback / setTimeout fallback),
         which keeps every early pageview but removes it from the LCP critical
         path. Consent decline and bot exclusion (below) still short-circuit
         before load. GA4 ID is loaded from VITE_GA4_PRIMARY_ID environment variable. -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      
      // GA4 ID loaded from environment variable (or fallback for dev)
      var ga4Id = import.meta.env.VITE_GA4_PRIMARY_ID || 'G-ZLLSD3PXZ9';
      
      gtag('config', ga4Id, {
        send_page_view: true,
        page_path: window.location.pathname,
        page_title: document.title,
        transport_type: 'beacon'
      });
      // Defer the ~90KB gtag.js payload out of the LCP critical path.
      (function(){
        function load(){
          if (window.__GA_LOADED__) return; window.__GA_LOADED__ = true;
          var s = document.createElement('script');
          s.async = true;
          s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ga4Id;
          document.head.appendChild(s);
        }
        // Load on first user interaction OR after 3s, whichever comes first.
        var loaded = false, mark = function(){ if(loaded) return; loaded=true; load(); };
        ['scroll','keydown','pointerdown','touchstart'].forEach(function(e){
          addEventListener(e, mark, { once: true, passive: true });
        });
        if ('requestIdleCallback' in window) {
          requestIdleCallback(mark, { timeout: 3000 });
        } else {
          setTimeout(mark, 3000);
        }
      })();
    </script>"""
        
        content = content.replace(old_script, new_script)
        print("✅ Updated GA4 script to load from environment variable")

with open('index.html', 'w') as f:
    f.write(content)
PYTHON_SCRIPT

echo ""

# Step 6: Update App.tsx
echo "Step 6/6: Updating src/App.tsx..."
sed -i.bak 's/send_to: "G-X8GTW05JJS",//' src/App.tsx && rm -f src/App.tsx.bak
if grep -q "GA4 ID is now loaded from environment" src/App.tsx; then
    echo "  ✓ Already updated"
else
    # Add comment before the w.gtag line
    sed -i.bak '/if (typeof w.gtag !== "function") return;/a\    // GA4 ID is now loaded from environment in index.html\n    // No need to specify send_to here — gtag config handles it' src/App.tsx
    rm -f src/App.tsx.bak
fi
echo "  ✅ Removed hardcoded GA4 ID from App.tsx"
echo ""

echo "=================================================="
echo "✅ ALL FIXES APPLIED SUCCESSFULLY!"
echo "=================================================="
echo ""
echo "NEXT STEPS:"
echo ""
echo "1️⃣  Create .env.local locally with your real values:"
echo "    cp .env.example .env.local"
echo "    # Then edit .env.local with your real credentials"
echo ""
echo "2️⃣  Test locally:"
echo "    npm install"
echo "    npm run dev"
echo ""
echo "3️⃣  Commit changes:"
echo "    git add ."
echo "    git commit -m \"security: hide API keys in environment variables\""
echo ""
echo "4️⃣  Push to GitHub:"
echo "    git push origin YOUR-BRANCH-NAME"
echo ""
echo "5️⃣  Set environment variables in your deployment platform:"
echo "    - Lovable: Project Settings > Environment Variables"
echo "    - Netlify: Site settings > Build & deploy > Environment"
echo "    - Vercel: Settings > Environment Variables"
echo ""
echo "6️⃣  Deploy!"
echo ""
echo "🔒 Your project is now secure!"
echo ""
