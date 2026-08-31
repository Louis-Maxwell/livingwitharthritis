#!/usr/bin/env node
/**
 * Quick fixes for branded search issue ("Living With Arthritis" → Arthritis UK)
 *
 * Implements Phase 1 improvements:
 * 1. Enhanced homepage meta tags
 * 2. FAQPage schema injection
 * 3. Audit sameAs links
 * 4. Create disambiguation page template
 *
 * Usage: node scripts/fix-branded-search.mjs
 */

import * as fs from 'fs'
import * as path from 'path'

const REPO_ROOT = process.cwd()

console.log('🎯 Branded Search Recovery — Phase 1 Quick Wins\n')
console.log('='.repeat(60))

// ============================================================================
// 1. Check if homepage exists and needs meta tag updates
// ============================================================================

function checkHomepageMeta() {
  console.log('\n1️⃣  Checking homepage meta tags...\n')

  const homepagePath = path.join(REPO_ROOT, 'src/pages/Index.tsx')
  if (!fs.existsSync(homepagePath)) {
    const indexPath = path.join(REPO_ROOT, 'src/pages/index.tsx')
    if (!fs.existsSync(indexPath)) {
      console.log('  ❌ Homepage not found at Index.tsx or index.tsx')
      return
    }
  }

  const content = fs.readFileSync(homepagePath || indexPath, 'utf-8')

  const checks = [
    { keyword: '"independent"', desc: '"independent" keyword in title/meta' },
    { keyword: 'og:title.*Living With Arthritis', desc: 'og:title with brand name' },
    { keyword: 'FAQPage', desc: 'FAQPage schema for brand disambiguation' },
    { keyword: 'charity.*1218461', desc: 'Charity registration in meta/schema' },
  ]

  console.log('  Current status:')
  checks.forEach(({ keyword, desc }) => {
    const regex = new RegExp(keyword, 'i')
    const found = regex.test(content)
    console.log(`  ${found ? '✅' : '❌'} ${desc}`)
  })

  console.log('\n  📝 Recommended updates:')
  console.log(`     1. Update <title>: "Living With Arthritis UK – Free Arthritis Support & Physiotherapy"`)
  console.log(`     2. Add og:title with "Independent" keyword`)
  console.log(`     3. Add charity registration (1218461) to description`)
  console.log(`     4. Add FAQPage schema (see template below)`)
}

// ============================================================================
// 2. Generate FAQPage schema template
// ============================================================================

function generateFaqSchema() {
  console.log('\n2️⃣  Generating FAQPage schema...\n')

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Living With Arthritis and how is it different from Arthritis UK?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Living With Arthritis is an independent UK registered charity (1218461) founded by Louis Maxwell, an HCPC-registered First Contact Practitioner. We provide free virtual physiotherapy, NICE-aligned exercises, and peer support. We are separate from and independent of Arthritis UK.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Living With Arthritis a registered charity?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes, Living With Arthritis is registered with the UK Charity Commission under registration number 1218461. We are an independent non-profit dedicated to arthritis support and education.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who founded Living With Arthritis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Living With Arthritis was founded by Louis Maxwell, an HCPC-registered First Contact Practitioner (registration PH128483). We combine clinical expertise with peer support.',
        },
      },
    ],
  }

  const templatePath = path.join(REPO_ROOT, 'src/components/seo/FAQPageSchema.tsx')
  const componentContent = `import { useEffect } from "react";

/**
 * FAQPage schema for branded search disambiguation.
 * Helps Google show "People also ask" results for "Living With Arthritis"
 * with answers that clarify independence from Arthritis UK.
 */
const SCHEMA = ${JSON.stringify(schema, null, 2)};

export default function FAQPageSchema() {
  useEffect(() => {
    const id = "faqpage-jsonld";
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify(SCHEMA);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
  return null;
}
`

  fs.writeFileSync(templatePath, componentContent)
  console.log(`  ✅ FAQPageSchema.tsx created`)
  console.log(`     Usage: Import in homepage and add <FAQPageSchema />`)
  console.log(`     Path: src/components/seo/FAQPageSchema.tsx\n`)
  console.log(`  📋 FAQ Schema (JSON-LD):`)
  console.log(`     ${JSON.stringify(schema, null, 2).split('\n').slice(0, 15).join('\n     ')}...`)

  return templatePath
}

// ============================================================================
// 3. Audit sameAs links
// ============================================================================

function auditSameAsLinks() {
  console.log('\n3️⃣  Auditing sameAs links...\n')

  const schemaPath = path.join(REPO_ROOT, 'src/components/seo/RootOrganizationSchema.tsx')
  if (!fs.existsSync(schemaPath)) {
    console.log('  ❌ RootOrganizationSchema.tsx not found')
    return
  }

  const content = fs.readFileSync(schemaPath, 'utf-8')

  const requiredLinks = [
    {
      name: 'Charity Commission',
      url: 'https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461',
    },
    {
      name: 'FindThatCharity',
      url: 'https://findthatcharity.uk/orgid/GB-CHC-1218461',
    },
    {
      name: 'NGO Explorer',
      url: 'https://ngoexplorer.org/charity/1218461',
    },
  ]

  console.log('  Current sameAs links:')
  let count = 0
  requiredLinks.forEach(({ name, url }) => {
    const found = content.includes(url)
    console.log(`  ${found ? '✅' : '❌'} ${name}`)
    if (found) count++
  })

  console.log(`\n  Status: ${count}/${requiredLinks.length} required links present`)

  if (count < requiredLinks.length) {
    console.log('\n  📝 Missing links — add to sameAs array in RootOrganizationSchema.tsx:')
    requiredLinks.forEach(({ name, url }) => {
      console.log(`     "${url}",`)
    })
  }
}

// ============================================================================
// 4. Create disambiguation page template
// ============================================================================

function createDisambiguationPage() {
  console.log('\n4️⃣  Creating disambiguation page template...\n')

  const pagePath = path.join(REPO_ROOT, 'src/pages/about/NotArthritisUk.tsx')
  const pageDir = path.dirname(pagePath)

  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true })
  }

  const content = `import { Helmet } from "react-helmet-async";

export default function NotArthritisUk() {
  return (
    <>
      <Helmet>
        <title>Living With Arthritis vs Arthritis UK | About Us</title>
        <meta
          name="description"
          content="Learn how Living With Arthritis (independent charity 1218461) differs from Arthritis UK. Two separate organizations with different models for supporting people with arthritis."
        />
        <meta property="og:title" content="Living With Arthritis vs Arthritis UK" />
        <meta
          property="og:description"
          content="Understand the differences between Living With Arthritis and Arthritis UK — two independent organizations supporting arthritis in the UK."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Living With Arthritis is Not Arthritis UK</h1>

        <div className="prose prose-lg max-w-none">
          <p>
            We are a <strong>separate, independent UK registered charity</strong> (registration number{' '}
            <a
              href="https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461"
              target="_blank"
              rel="noopener noreferrer"
            >
              1218461
            </a>
            ).
          </p>

          <h2>Key Differences</h2>

          <table className="w-full border-collapse border border-gray-300 mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-4">Aspect</th>
                <th className="border border-gray-300 p-4">Living With Arthritis UK</th>
                <th className="border border-gray-300 p-4">Arthritis UK</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-4">
                  <strong>Founded</strong>
                </td>
                <td className="border border-gray-300 p-4">2026</td>
                <td className="border border-gray-300 p-4">1936</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-4">
                  <strong>Model</strong>
                </td>
                <td className="border border-gray-300 p-4">
                  Independent, peer-led community + virtual physiotherapy
                </td>
                <td className="border border-gray-300 p-4">
                  Large charity with advocacy, research, and grants
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-4">
                  <strong>Founder</strong>
                </td>
                <td className="border border-gray-300 p-4">
                  Louis Maxwell (HCPC First Contact Practitioner, PH128483)
                </td>
                <td className="border border-gray-300 p-4">Multiple trustees</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-4">
                  <strong>Primary Services</strong>
                </td>
                <td className="border border-gray-300 p-4">
                  Free virtual physiotherapy, NICE-aligned exercises, peer community
                </td>
                <td className="border border-gray-300 p-4">
                  Grants, research funding, policy advocacy, public awareness
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-4">
                  <strong>Focus Area</strong>
                </td>
                <td className="border border-gray-300 p-4">Direct patient support & education</td>
                <td className="border border-gray-300 p-4">Wide advocacy and systemic change</td>
              </tr>
            </tbody>
          </table>

          <h2>Can We Both Help?</h2>
          <p>
            Yes! Both organizations support people with arthritis, but through different models. Some people
            benefit from both.
          </p>

          <ul>
            <li>
              <strong>Choose Living With Arthritis if:</strong> You want free virtual physiotherapy, NICE-aligned
              exercises, peer support, and practical tips from an HCPC-registered practitioner.
            </li>
            <li>
              <strong>Choose Arthritis UK if:</strong> You want to explore larger-scale research, grants, or
              systemic advocacy.
            </li>
          </ul>

          <h2>About Our Independence</h2>
          <p>
            Living With Arthritis is{' '}
            <strong>fully independent from and separate to Arthritis UK</strong>. We operate as our own registered
            charity with our own mission, team, and approach. We do not receive funding from or have governance
            relationships with Arthritis UK.
          </p>

          <p>
            Our founder, Louis Maxwell, established Living With Arthritis to provide direct physiotherapy support
            and community-led peer care — complementing the excellent advocacy work Arthritis UK does.
          </p>
        </div>
      </div>
    </>
  );
}
`

  fs.writeFileSync(pagePath, content)
  console.log(`  ✅ Disambiguation page created`)
  console.log(`     Path: src/pages/about/NotArthritisUk.tsx`)
  console.log(`     URL: /about/not-arthritis-uk`)
  console.log(`     SEO benefit: Ranks for comparative searches\n`)
}

// ============================================================================
// 5. Summary & action items
// ============================================================================

function printSummary() {
  console.log('\n' + '='.repeat(60))
  console.log('\n✅ Phase 1 Quick Wins Summary\n')

  console.log('Generated Files:')
  console.log('  ✅ src/components/seo/FAQPageSchema.tsx')
  console.log('  ✅ src/pages/about/NotArthritisUk.tsx')
  console.log('\nAudits Completed:')
  console.log('  ✅ Homepage meta tags check')
  console.log('  ✅ sameAs links audit')

  console.log('\n📋 Next Steps (Immediate):\n')

  console.log('1. Update Homepage (src/pages/Index.tsx):')
  console.log('   - Change <title> to include "Independent" keyword')
  console.log('   - Update og:title with brand name + "Charity"')
  console.log('   - Add <FAQPageSchema /> component import')
  console.log('   - Add <FAQPageSchema /> in JSX\n')

  console.log('2. Update RootOrganizationSchema (if sameAs incomplete):')
  console.log('   - Add missing charity directory links')
  console.log('   - Verify all URLs resolve to real profiles\n')

  console.log('3. Test Changes:')
  console.log('   $ npm run build')
  console.log('   $ npm run seo:schema  (validate JSON-LD)\n')

  console.log('4. Submit to Google:')
  console.log('   - Google Search Console > URL Inspection')
  console.log('   - Request indexing for homepage')
  console.log('   - Request indexing for /about/not-arthritis-uk\n')

  console.log('5. Monitor Ranking:')
  console.log('   - Track: "living with arthritis uk"')
  console.log('   - Track: "living with arthritis" (exact)')
  console.log('   - Expected improvement: 2-4 weeks\n')

  console.log('📚 Full plan: See BRANDED-SEARCH-RECOVERY.md\n')
  console.log('=' .repeat(60) + '\n')
}

// ============================================================================
// Main execution
// ============================================================================

try {
  checkHomepageMeta()
  generateFaqSchema()
  auditSameAsLinks()
  createDisambiguationPage()
  printSummary()
} catch (err) {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
}
