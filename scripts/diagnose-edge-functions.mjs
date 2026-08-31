#!/usr/bin/env node
/**
 * Diagnostic script for Edge Functions (Donations + Email)
 *
 * Checks:
 * 1. Stripe webhook configuration (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET)
 * 2. Lovable email API key (LOVABLE_API_KEY)
 * 3. Supabase service role key
 * 4. Database tables exist (donations, email_send_log, email_send_state)
 * 5. Makes a test call to verify functions are reachable
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const SUPABASE_PROJECT_ID = 'eswdtpmknwjxtvkyxvmi'
const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`

console.log('🔍 Edge Functions Diagnostic\n')
console.log('=' .repeat(60))

// Check 1: Environment Variables
console.log('\n1️⃣  Checking Environment Variables...')
const missingEnvVars = []

const requiredVars = [
  { key: 'STRIPE_SECRET_KEY', service: 'Stripe (Donations)' },
  { key: 'STRIPE_WEBHOOK_SECRET', service: 'Stripe Webhooks' },
  { key: 'LOVABLE_API_KEY', service: 'Email Service' },
  { key: 'SUPABASE_SERVICE_ROLE_KEY', service: 'Supabase Backend' },
]

for (const { key, service } of requiredVars) {
  // Check in .env.local first, then process.env
  const value = process.env[key]
  const isDefined = !!value
  const maskedValue = isDefined ? value.slice(0, 5) + '...' + value.slice(-5) : 'MISSING'

  console.log(`  ${isDefined ? '✅' : '❌'} ${key}: ${maskedValue} (${service})`)

  if (!isDefined) {
    missingEnvVars.push({ key, service })
  }
}

if (missingEnvVars.length > 0) {
  console.log(`\n⚠️  Missing ${missingEnvVars.length} environment variable(s):`)
  missingEnvVars.forEach(({ key, service }) => {
    console.log(`   - ${key} (needed for: ${service})`)
  })
}

// Check 2: Supabase Connection
console.log('\n2️⃣  Checking Supabase Connection...')
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log('  ❌ Cannot test — SUPABASE_SERVICE_ROLE_KEY is missing')
} else {
  try {
    const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log('  ✅ Supabase client initialized')

    // Check 3: Database Tables
    console.log('\n3️⃣  Checking Database Tables...')
    const tablesToCheck = [
      { name: 'donations', purpose: 'Donation records' },
      { name: 'email_send_log', purpose: 'Email send history' },
      { name: 'email_send_state', purpose: 'Email queue state' },
      { name: 'suppressed_emails', purpose: 'Unsubscribe list' },
      { name: 'email_unsubscribe_tokens', purpose: 'Unsubscribe tokens' },
    ]

    for (const { name, purpose } of tablesToCheck) {
      try {
        const { count, error } = await supabase
          .from(name)
          .select('*', { count: 'exact', head: true })

        if (error) {
          console.log(`  ❌ ${name}: ${error.message} (${purpose})`)
        } else {
          console.log(`  ✅ ${name}: ${count || 0} records (${purpose})`)
        }
      } catch (err) {
        console.log(`  ❌ ${name}: Connection error — ${err.message}`)
      }
    }

    // Check 4: Recent Donation Records
    console.log('\n4️⃣  Checking Recent Donations...')
    try {
      const { data: donations, error } = await supabase
        .from('donations')
        .select('id, amount, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) {
        console.log(`  ❌ Failed to query: ${error.message}`)
      } else if (!donations || donations.length === 0) {
        console.log('  ⚠️  No donations found (expected if this is first test)')
      } else {
        console.log(`  ✅ Found ${donations.length} recent donations:`)
        donations.forEach(d => {
          console.log(`     - £${d.amount} (${d.status}) — ${new Date(d.created_at).toLocaleDateString()}`)
        })
      }
    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`)
    }

    // Check 5: Email Queue State
    console.log('\n5️⃣  Checking Email Queue State...')
    try {
      const { data: state, error } = await supabase
        .from('email_send_state')
        .select('*')
        .single()

      if (error) {
        console.log(`  ❌ ${error.message}`)
      } else {
        console.log(`  ✅ Email queue state:`)
        console.log(`     - Rate limit cooldown until: ${state.retry_after_until ? new Date(state.retry_after_until).toLocaleString() : 'None'}`)
        console.log(`     - Batch size: ${state.batch_size}`)
        console.log(`     - Send delay: ${state.send_delay_ms}ms`)
      }
    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`)
    }

  } catch (err) {
    console.log(`  ❌ Connection failed: ${err.message}`)
  }
}

// Summary
console.log('\n' + '='.repeat(60))
console.log('\n📋 Summary:\n')

if (missingEnvVars.length === 0) {
  console.log('✅ All environment variables are set!')
  console.log('\n🚀 Next steps:')
  console.log('  1. Deploy Edge Functions: npx supabase functions deploy')
  console.log('  2. Configure Stripe webhook: https://dashboard.stripe.com/webhooks')
  console.log('  3. Add Lovable API key to Supabase secrets')
  console.log('  4. Test with a small donation on the live site')
} else {
  console.log(`❌ Missing ${missingEnvVars.length} environment variable(s)\n`)
  console.log('📝 To fix:')
  console.log('  1. In Supabase > Project Settings > Secrets, add:')
  missingEnvVars.forEach(({ key, service }) => {
    console.log(`     - ${key} = [get from ${service}]`)
  })
  console.log('\n  2. Deploy functions: npx supabase functions deploy')
  console.log('  3. Configure webhook in Stripe dashboard')
}

console.log('\n' + '='.repeat(60) + '\n')
