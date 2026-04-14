import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr, Button,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Living With Arthritis"
const SITE_URL = "https://livingwitharthritis.lovable.app"

interface ContactConfirmationProps {
  name?: string
  subject?: string
}

const ContactConfirmationEmail = ({
  name,
  subject,
}: ContactConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We've received your message — {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerBar}>
          <Heading style={headerText}>{SITE_NAME}</Heading>
        </Section>
        <Section style={content}>
          <Heading style={h1}>
            {name ? `Thank you, ${name}!` : 'Thank you for reaching out!'}
          </Heading>
          <Text style={text}>
            We've received your enquiry{subject ? ` regarding "${subject}"` : ''} and
            a member of our team will get back to you as soon as possible — usually
            within 24–48 hours.
          </Text>
          <Text style={text}>
            In the meantime, you might find helpful information on our website:
          </Text>

          <Section style={ctaSection}>
            <Button style={button} href={`${SITE_URL}/guides`}>
              Browse Expert Guides
            </Button>
          </Section>

          <Hr style={divider} />

          <Text style={text}>
            If your matter is urgent, you can also reach us directly:
          </Text>
          <Text style={contactInfo}>
            📞 <strong>Phone:</strong> 07760 512 084{'\n'}
            💬 <strong>WhatsApp:</strong> 07760 512 084{'\n'}
            ✉️ <strong>Email:</strong> info@livingwitharthritis.org.uk
          </Text>

          <Hr style={divider} />

          <Text style={footer}>
            Warm regards,{'\n'}
            The {SITE_NAME} Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: "We've received your message — Living With Arthritis",
  displayName: 'Contact confirmation to visitor',
  previewData: {
    name: 'Sarah',
    subject: 'Question about knee exercises',
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
const divider = { borderColor: '#e5e7eb', margin: '24px 0' }
const contactInfo = { fontSize: '14px', color: '#374151', lineHeight: '2', margin: '0 0 18px', whiteSpace: 'pre-wrap' as const }
const footer = { fontSize: '14px', color: '#6b7280', margin: '0', whiteSpace: 'pre-wrap' as const }
