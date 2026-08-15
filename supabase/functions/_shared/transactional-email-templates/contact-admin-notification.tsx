/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Living With Arthritis"

interface ContactNotificationProps {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

const ContactAdminNotification = ({
  name = 'Unknown',
  email = 'Not provided',
  phone,
  subject = 'No subject',
  message = 'No message',
}: ContactNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerBar}>
          <Heading style={headerText}>New Contact Inquiry</Heading>
        </Section>
        <Section style={content}>
          <Text style={text}>
            A new contact form has been submitted on {SITE_NAME}.
          </Text>

          <Section style={detailsCard}>
            <Text style={detailsTitle}>Submission Details</Text>
            <Hr style={detailsDivider} />
            <Text style={detailRow}><strong>Name:</strong> {name}</Text>
            <Text style={detailRow}><strong>Email:</strong> {email}</Text>
            {phone && <Text style={detailRow}><strong>Phone:</strong> {phone}</Text>}
            <Text style={detailRow}><strong>Subject:</strong> {subject}</Text>
            <Hr style={detailsDivider} />
            <Text style={detailsTitle}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Text style={footer}>
            This is an automated notification from {SITE_NAME}. Please respond to the enquirer directly at their email address above.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactAdminNotification,
  subject: (data: Record<string, any>) => `New Contact: ${data.subject || 'Enquiry'} — ${data.name || 'Unknown'}`,
  displayName: 'Contact form admin notification',
  previewData: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '07700 900123',
    subject: 'Question about exercises',
    message: 'Hi, I wanted to ask about recommended exercises for knee osteoarthritis. Could someone get back to me?',
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
const messageText = { fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: '8px 0 0', whiteSpace: 'pre-wrap' as const }
const footer = { fontSize: '12px', color: '#9ca3af', margin: '0' }
