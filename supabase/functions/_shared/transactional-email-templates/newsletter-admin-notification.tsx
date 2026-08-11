import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Living With Arthritis"

interface NewsletterAdminNotificationProps {
  email?: string
  categories?: string[]
  source?: string
}

const NewsletterAdminNotification = ({
  email = 'Unknown',
  categories = [],
  source = 'site',
}: NewsletterAdminNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New newsletter signup: {email}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerBar}>
          <Heading style={headerText}>New Newsletter Signup</Heading>
        </Section>
        <Section style={content}>
          <Text style={text}>
            Someone new has signed up for the {SITE_NAME} newsletter.
          </Text>

          <Section style={detailsCard}>
            <Text style={detailsTitle}>Signup Details</Text>
            <Hr style={detailsDivider} />
            <Text style={detailRow}><strong>Email:</strong> {email}</Text>
            <Text style={detailRow}><strong>Interests:</strong> {categories.length ? categories.join(', ') : 'None selected'}</Text>
            <Text style={detailRow}><strong>Source:</strong> {source}</Text>
          </Section>

          <Text style={footer}>
            This subscriber will only start receiving emails once they confirm
            via the link in their own confirmation email. You can see all
            subscribers (confirmed and pending) in the admin dashboard at
            /admin/newsletter.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewsletterAdminNotification,
  subject: (data: Record<string, any>) => `New newsletter signup: ${data.email || 'Unknown'}`,
  displayName: 'Newsletter signup admin notification',
  previewData: {
    email: 'jane@example.com',
    categories: ['osteoarthritis', 'exercise'],
    source: 'landing_page',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif" }
const container = { maxWidth: '580px', margin: '0 auto' }
const headerBar = { backgroundColor: '#dc2626', padding: '24px 30px', borderRadius: '8px 8px 0 0' }
const headerText = { fontSize: '20px', fontWeight: '700' as const, color: '#ffffff', margin: '0' }
const content = { padding: '30px 30px 20px' }
const text = { fontSize: '15px', color: '#4a4a5a', lineHeight: '1.6', margin: '0 0 18px' }
const detailsCard = { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px 24px', margin: '0 0 24px' }
const detailsTitle = { fontSize: '16px', fontWeight: '600' as const, color: '#1a1a2e', margin: '0 0 8px' }
const detailsDivider = { borderColor: '#e5e7eb', margin: '10px 0' }
const detailRow = { fontSize: '14px', color: '#4a4a5a', margin: '4px 0', lineHeight: '1.5' }
const footer = { fontSize: '12px', color: '#9ca3af', margin: '0', lineHeight: '1.6' }
