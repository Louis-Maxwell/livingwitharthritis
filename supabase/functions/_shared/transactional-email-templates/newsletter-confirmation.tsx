import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr, Button,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Living With Arthritis"

interface NewsletterConfirmationProps {
  confirmUrl?: string
}

const NewsletterConfirmationEmail = ({
  confirmUrl = 'https://livingwitharthritis.org.uk/newsletter/confirm',
}: NewsletterConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your Living With Arthritis newsletter subscription</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerBar}>
          <Heading style={headerText}>{SITE_NAME}</Heading>
        </Section>
        <Section style={content}>
          <Heading style={h1}>One quick step to confirm</Heading>
          <Text style={text}>
            Thanks for signing up. Please confirm your email address to start
            receiving arthritis updates, guides and patient stories from
            Living With Arthritis UK.
          </Text>

          <Section style={ctaSection}>
            <Button style={button} href={confirmUrl}>
              Confirm my subscription
            </Button>
          </Section>

          <Text style={smallText}>
            If the button doesn't work, copy and paste this link into your
            browser: {confirmUrl}
          </Text>

          <Hr style={divider} />

          <Text style={footer}>
            If you didn't request this, you can safely ignore this email —
            you won't be subscribed unless you click the link above.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewsletterConfirmationEmail,
  subject: 'Confirm your Living With Arthritis newsletter subscription',
  displayName: 'Newsletter confirmation to subscriber',
  previewData: {
    confirmUrl: 'https://livingwitharthritis.org.uk/newsletter/confirm?token=preview',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif" }
const container = { maxWidth: '580px', margin: '0 auto' }
const headerBar = { backgroundColor: '#dc2626', padding: '24px 30px', borderRadius: '8px 8px 0 0' }
const headerText = { fontSize: '20px', fontWeight: '700' as const, color: '#ffffff', margin: '0' }
const content = { padding: '30px 30px 20px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a1a2e', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#4a4a5a', lineHeight: '1.7', margin: '0 0 18px' }
const ctaSection = { textAlign: 'center' as const, margin: '24px 0' }
const button = {
  backgroundColor: '#dc2626',
  color: '#ffffff',
  padding: '14px 28px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: '600' as const,
  textDecoration: 'none',
}
const smallText = { fontSize: '12px', color: '#9ca3af', lineHeight: '1.6', margin: '0 0 18px', wordBreak: 'break-all' as const }
const divider = { borderColor: '#e5e7eb', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#6b7280', margin: '0', lineHeight: '1.6' }
