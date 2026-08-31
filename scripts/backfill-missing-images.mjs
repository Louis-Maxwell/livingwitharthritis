#!/usr/bin/env node
/**
 * Backfill missing blog post images
 *
 * Problem: ~123 blog_articles have image_url = null since May 2026
 * Solution: Either restore from backup or re-ingest missing data
 *
 * Usage: node scripts/backfill-missing-images.mjs [--check|--restore|--reprocess]
 */

import * as fs from 'fs'
import * as path from 'path'

const args = process.argv.slice(2)
const command = args[0] || '--check'

console.log('📸 Blog Image Backfill Utility\n')
console.log('='.repeat(60))

// ============================================================================
// STEP 1: Check for missing images in the codebase
// ============================================================================

function checkMissingImages() {
  console.log('\n1️⃣  Scanning blog posts for missing images...\n')

  const blogDir = path.join(process.cwd(), 'src/pages/conditions')
  const guideDir = path.join(process.cwd(), 'src/pages/guides')

  let missingCount = 0
  const missingFiles = []

  function scanDirectory(dir, category) {
    if (!fs.existsSync(dir)) {
      console.log(`   ⚠️  Directory not found: ${dir}`)
      return
    }

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'))

    files.forEach(file => {
      const filepath = path.join(dir, file)
      const content = fs.readFileSync(filepath, 'utf-8')

      // Look for image references or missing og:image meta
      const hasImage = content.includes('image_url') || content.includes('og:image')
      const missingOgImage = !content.includes('og:image') || content.includes('og:image"content=""')

      if (missingOgImage) {
        console.log(`   ❌ ${file} — missing or empty og:image`)
        missingCount++
        missingFiles.push({ file, category, path: filepath })
      }
    })
  }

  scanDirectory(blogDir, 'conditions')
  scanDirectory(guideDir, 'guides')

  console.log(`\n📊 Found ${missingCount} files with missing images`)

  if (missingFiles.length > 0) {
    console.log('\n   Files to fix:')
    missingFiles.slice(0, 10).forEach(({ file, category }) => {
      console.log(`   - ${category}/${file}`)
    })
    if (missingFiles.length > 10) {
      console.log(`   ... and ${missingFiles.length - 10} more`)
    }
  }

  return missingFiles
}

// ============================================================================
// STEP 2: Restore from source of truth
// ============================================================================

function restoreFromSourceOfTruth() {
  console.log('\n2️⃣  Restoring images from source of truth...\n')

  // Map of files to their correct image sources
  // These should come from your SEO audit or content strategy docs
  const imageMapping = {
    'Osteoarthritis.tsx': '/images/conditions/osteoarthritis.webp',
    'RheumatoidArthritis.tsx': '/images/conditions/rheumatoid-arthritis.webp',
    'Gout.tsx': '/images/conditions/gout.webp',
    // Add more mappings based on your audit
  }

  console.log('   ⚠️  Image mapping incomplete — requires manual audit data\n')
  console.log('   To complete this restoration:')
  console.log('   1. Run: PRERENDER=1 npm run seo:images')
  console.log('   2. Cross-reference image-audit-report.json with blog posts')
  console.log('   3. Use the mapping above to update og:image in each file')

  return imageMapping
}

// ============================================================================
// STEP 3: Generate template for restoration
// ============================================================================

function generateRestorationTemplate() {
  console.log('\n3️⃣  Generating restoration checklist...\n')

  const template = `
# Image Restoration Checklist

## Missing Images (Since May 2026)

| File | Category | Status | Image URL | Notes |
|------|----------|--------|-----------|-------|
${Array(10)
  .fill()
  .map(
    (_, i) =>
      `| article-${i + 1}.tsx | condition | ⏳ TODO | /images/... | Review from audit |`
  )
  .join('\n')}

## Process

### Option A: Restore from Git History
\`\`\`bash
# Find when images were last present
git log --oneline src/pages/conditions -- | head -20

# Restore a specific version
git show COMMIT_HASH:src/pages/conditions/Example.tsx
\`\`\`

### Option B: Re-ingest Missing Data
1. Identify the ingestion script that creates blog_articles
2. Check what changed in May 2026 that broke image assignment
3. Run restoration for articles created since May 1, 2026

### Option C: Manual Entry
For each missing image:
1. Open the file in your editor
2. Find the frontmatter or SEO section
3. Add/update the image URL
4. Commit with message: \`fix(images): restore [filename] image url\`

## Validation

After restoration, run:
\`\`\`bash
npm run seo:images   # Audit image presence
npm run build        # Verify no broken references
\`\`\`
`

  const checklistPath = path.join(process.cwd(), 'IMAGE-RESTORATION-CHECKLIST.md')
  fs.writeFileSync(checklistPath, template)

  console.log(`   ✅ Checklist created: IMAGE-RESTORATION-CHECKLIST.md`)
  console.log('\n   📝 Next steps:')
  console.log('      1. Open IMAGE-RESTORATION-CHECKLIST.md')
  console.log('      2. Review git history to find when images were removed')
  console.log('      3. Use git show to restore from that commit')
  console.log('      4. Test with: npm run build')

  return checklistPath
}

// ============================================================================
// STEP 4: Git history analysis
// ============================================================================

function analyzeGitHistory() {
  console.log('\n4️⃣  Analyzing git history for image removal...\n')

  console.log('   💡 Key commits to investigate:')
  console.log('      - refactor: remove supabase and vercel integration from codebase')
  console.log('      - Any commits between May 1 - May 31, 2026\n')

  console.log('   To find the issue:')
  console.log('   $ git log --oneline --all src/data/ | head -20')
  console.log('   $ git log --oneline --all src/pages/conditions | head -20\n')

  console.log('   Once you identify the commit that broke images:')
  console.log('   $ git show COMMIT_HASH -- src/pages/conditions/Example.tsx')
}

// ============================================================================
// Main dispatcher
// ============================================================================

switch (command) {
  case '--check':
    checkMissingImages()
    console.log('\n' + '='.repeat(60))
    console.log('\n📌 Next: Run with --restore to generate restoration plan')
    break

  case '--restore':
    checkMissingImages()
    restoreFromSourceOfTruth()
    generateRestorationTemplate()
    analyzeGitHistory()
    break

  case '--reprocess':
    console.log('\n⚠️  Reprocessing is not yet implemented.\n')
    console.log('To reprocess images from source:')
    console.log('1. Identify the image ingestion script')
    console.log('2. Add image URLs to blog_articles')
    console.log('3. Run: npx supabase functions invoke ingest-content')
    break

  default:
    console.log(`\n❌ Unknown command: ${command}\n`)
    console.log('Usage:')
    console.log('  npm run backfill-images --check     (scan & report)')
    console.log('  npm run backfill-images --restore   (create checklist & plan)')
    console.log('  npm run backfill-images --reprocess (re-ingest from source)\n')
}

console.log('\n' + '='.repeat(60) + '\n')
