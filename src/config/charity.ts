/**
 * Single source of truth for Living With Arthritis charity registration
 * details. Imported by Footer, About, Trust, Governance, Donate, JSON-LD
 * schema, and donation email templates so the number/address can never
 * drift between surfaces.
 */
export const CHARITY = {
  number: '1218461',
  legalName: 'Living With Arthritis',
  shortName: 'Living With Arthritis UK',
  type: 'Charitable Incorporated Organisation (CIO)',
  jurisdiction: 'England and Wales',
  regulator: 'Charity Commission for England and Wales',
  regulatorUrl: 'https://www.gov.uk/government/organisations/charity-commission',
  registerUrl:
    'https://register-of-charities.charitycommission.gov.uk/charity-search?search=1218461',
  registrationDate: '2020-03-15',
  address: {
    name: 'Oswestry Health Centre',
    street: 'Thomas Savin Road, Off Gobowen Road',
    locality: 'Oswestry',
    postalCode: 'SY11 1GA',
    region: 'England',
    country: 'GB',
  },
} as const;

export const charityRegLine = (): string =>
  `Registered Charity in England & Wales No. ${CHARITY.number}`;
