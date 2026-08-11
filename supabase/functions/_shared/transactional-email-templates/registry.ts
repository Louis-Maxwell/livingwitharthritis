/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as donationConfirmation } from './donation-confirmation.tsx'
import { template as contactAdminNotification } from './contact-admin-notification.tsx'
import { template as contactConfirmation } from './contact-confirmation.tsx'
import { template as fundraisingAdminNotification } from './fundraising-admin-notification.tsx'
import { template as newsletterConfirmation } from './newsletter-confirmation.tsx'
import { template as newsletterAdminNotification } from './newsletter-admin-notification.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'donation-confirmation': donationConfirmation,
  'contact-admin-notification': contactAdminNotification,
  'contact-confirmation': contactConfirmation,
  'fundraising-admin-notification': fundraisingAdminNotification,
  'newsletter-confirmation': newsletterConfirmation,
  'newsletter-admin-notification': newsletterAdminNotification,
}
