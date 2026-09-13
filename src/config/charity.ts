/**
 * Single source of truth for Living With Arthritis charity registration,
 * mission and focus areas. Imported by site trust, charity and SEO surfaces
 * so the organisation's identity stays consistent across the site.
 */
export const CHARITY = {
  number: '1218461',
  legalName: 'Living With Arthritis',
  shortName: 'Living With Arthritis UK',
  type: 'Charitable Incorporated Organisation (CIO)',
  jurisdiction: 'England and Wales',
  regulator: 'Charity Commission for England and Wales',
  regulatorUrl: 'https://www.gov.uk/government/organisations/charity-commission',
  charityCommissionUrl: 'https://www.gov.uk/find-charity-information',
  registerUrl:
    'https://register-of-charities.charitycommission.gov.uk/charity-details/?regId=1218461&subId=0',
  fundraisingCodeUrl: 'https://www.fundraisingregulator.org.uk/code',
  registrationDate: '2026-06-15',
  foundedYear: 2026,
  siteUrl: 'https://livingwitharthritis.org.uk',
  websiteDomain: 'livingwitharthritis.org.uk',
  contactEmail: 'info@livingwitharthritis.org.uk',
  mission:
    'To improve awareness and understanding of arthritis and frailty and help people stay informed, active, independent and supported through evidence-based information and practical resources.',
  focusAreas: [
    'Arthritis awareness',
    'Frailty awareness',
    'Frailty prevention',
    'Falls prevention',
    'Healthy ageing',
    'Mobility and independence',
    'Strength and muscle health',
    'Bone health',
    'Evidence-based arthritis information',
    'Practical self-management support',
  ],
  address: {
    name: '',
    street: '',
    locality: '',
    postalCode: '',
    region: '',
    country: 'GB',
  },
} as const;

export const hasCharityAddress = (): boolean =>
  Boolean(CHARITY.address.street && CHARITY.address.postalCode);

export const charityRegLine = (): string =>
  `Registered Charity in England & Wales No. ${CHARITY.number}`;

/** Alias — clearer intent when used as link text. */
export const charityRegisterLinkText = charityRegLine;

/** Typed shape of the charity record. */
export type CharityInfo = typeof CHARITY;

/** Single accessor — returns the frozen charity record. Use this in
 *  place of importing `CHARITY` directly so field access stays typed
 *  and consistent across surfaces. */
export const getCharity = (): CharityInfo => CHARITY;

/** Build an absolute site URL from a root-relative path. */
export const canonicalUrl = (path: string = '/'): string =>
  `${CHARITY.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

/** Inline phrasing: "registered charity 1218461". */
export const registeredCharityPhrase = (): string =>
  `registered charity ${CHARITY.number}`;

/** Footer/attribution line: "Living With Arthritis UK — Registered Charity 1218461". */
export const charityFooterLine = (): string =>
  `${CHARITY.shortName} — Registered Charity ${CHARITY.number}`;

/** Page-title helper: `${label} | Living With Arthritis UK`. */
export const pageTitle = (label: string): string =>
  `${label} | ${CHARITY.shortName}`;
