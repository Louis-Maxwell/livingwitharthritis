 
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Living With Arthritis"

interface DonationConfirmationProps {
  donorName?: string
  amount?: string
  currency?: string
  fundType?: string
  giftAid?: boolean
}

const DonationConfirmationEmail = ({
  donorName,
  amount,
  currency = 'GBP',
  fundType = 'General',
  giftAid = false,
}: DonationConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thank you for your generous donation to {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header bar */}
        <Section style={headerBar}>
          <Heading style={headerText}>{SITE_NAME}</Heading>
        </Section>

        <Section style={contentSection}>
          <Heading style={h1}>
            {donorName ? `Thank you, ${donorName}!` : 'Thank you for your donation!'}
          </Heading>

          <Text style={text}>
            Your generous contribution makes a real difference to people living with arthritis across the UK.
            We truly appreciate your support.
          </Text>

          {/* Donation summary card */}
          <Section style={summaryCard}>
            <Text style={summaryTitle}>Donation Summary</Text>
            <Hr style={summaryDivider} />
            <Text style={summaryRow}>
              <strong>Amount:</strong> {currency === 'GBP' ? '£' : currency + ' '}{amount || '—'}
            </Text>
            <Text style={summaryRow}>
              <strong>Fund:</strong> {fundType}
            </Text>
            {giftAid && (
              <>
                <Hr style={summaryDivider} />
                <Text style={giftAidText}>
                  ✅ <strong>Gift Aid</strong> — Thank you for ticking Gift Aid! HMRC will add 25% to your
                  donation at no extra cost to you, making your gift go even further.
                </Text>
              </>
            )}
          </Section>

          <Text style={text}>
            Every donation helps fund vital support services, research awareness campaigns,
            and community programmes for those affected by arthritis.
          </Text>

          <Text style={text}>
            If you have any questions about your donation, please don't hesitate to get in touch
            with us.
          </Text>

          <Hr style={divider} />

          <Text style={footer}>
            With heartfelt thanks,<br />
            The {SITE_NAME} Team
          </Text>

          <Text style={charityNote}>
            {SITE_NAME} is a Registered Charity in England &amp; Wales (No. 1218461),
            regulated by the Charity Commission for England and Wales. Verify our
            registration on the{' '}
            <a
              href="https://register-of-charities.charitycommission.gov.uk/charity-search?search=1218461"
              style={{ color: '#dc2626', textDecoration: 'underline' }}
            >
              Charity Commission register
            </a>
            . Your donation may be eligible for tax relief; if you ticked Gift Aid,
            your declaration applies to this and future donations until you tell us
            otherwise.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DonationConfirmationEmail,
  subject: 'Thank you for your donation!',
  displayName: 'Donation confirmation',
  previewData: {
    donorName: 'Sarah',
    amount: '25.00',
    currency: 'GBP',
    fundType: 'General',
    giftAid: true,
  },
} satisfies TemplateEntry

/* ── Styles ─────────────────────────────────────────── */

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif",
}

const container = {
  maxWidth: '580px',
  margin: '0 auto',
}

const headerBar = {
  backgroundColor: '#dc2626', // primary red
  padding: '24px 30px',
  borderRadius: '8px 8px 0 0',
}

const headerText = {
  fontSize: '20px',
  fontWeight: '700' as const,
  color: '#ffffff',
  margin: '0',
}

const contentSection = {
  padding: '30px 30px 20px',
}

const h1 = {
  fontSize: '24px',
  fontWeight: '700' as const,
  color: '#1a1a2e',
  margin: '0 0 20px',
}

const text = {
  fontSize: '15px',
  color: '#4a4a5a',
  lineHeight: '1.6',
  margin: '0 0 18px',
}

const summaryCard = {
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  padding: '20px 24px',
  margin: '0 0 24px',
}

const summaryTitle = {
  fontSize: '16px',
  fontWeight: '600' as const,
  color: '#dc2626',
  margin: '0 0 8px',
}

const summaryDivider = {
  borderColor: '#fecaca',
  margin: '10px 0',
}

const summaryRow = {
  fontSize: '15px',
  color: '#4a4a5a',
  margin: '4px 0',
  lineHeight: '1.5',
}

const giftAidText = {
  fontSize: '14px',
  color: '#15803d',
  lineHeight: '1.5',
  margin: '4px 0',
}

const divider = {
  borderColor: '#e5e7eb',
  margin: '24px 0',
}

const footer = {
  fontSize: '14px',
  color: '#6b7280',
  lineHeight: '1.5',
  margin: '0 0 16px',
}

const charityNote = {
  fontSize: '12px',
  color: '#9ca3af',
  lineHeight: '1.4',
  margin: '0',
}
