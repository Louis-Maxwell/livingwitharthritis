# UTM Conventions

Standardised campaign tagging for every outbound link that points back to
`livingwitharthritis.org.uk`. GA4 parses UTMs automatically — the only
requirement is that we use consistent, lowercase values.

## Parameters

| Param          | Required | Values (lowercase, hyphen-separated)                                   |
| -------------- | -------- | ---------------------------------------------------------------------- |
| `utm_source`   | yes      | The specific platform: `mailchimp`, `facebook`, `twitter`, `linkedin`, `justgiving`, `partner-<name>` |
| `utm_medium`   | yes      | The channel: `email`, `social`, `cpc`, `referral`, `qr`, `print`       |
| `utm_campaign` | yes      | The initiative: `spring-appeal-2026`, `zakat-2026`, `newsletter-weekly` |
| `utm_content`  | no       | The creative or placement: `hero-cta`, `footer-link`, `variant-a`      |
| `utm_term`     | no       | Paid-search keyword only                                               |

Rules:
- Always lowercase, hyphen-separated. No spaces, no camelCase.
- Never tag internal (same-domain) links — inflates session counts.
- Never tag organic-social bio links you can't reasonably attribute.

## Worked examples

**Weekly newsletter → diet hub**
```
https://livingwitharthritis.org.uk/diet?utm_source=mailchimp&utm_medium=email&utm_campaign=newsletter-weekly&utm_content=hero-cta
```

**Facebook post → Zakat appeal**
```
https://livingwitharthritis.org.uk/zakat?utm_source=facebook&utm_medium=social&utm_campaign=zakat-2026&utm_content=carousel-1
```

**JustGiving partner banner → donate page**
```
https://livingwitharthritis.org.uk/donate?utm_source=justgiving&utm_medium=referral&utm_campaign=spring-appeal-2026&utm_content=banner-728x90
```

**Printed leaflet QR code → home**
```
https://livingwitharthritis.org.uk/?utm_source=leaflet-gp-surgeries&utm_medium=qr&utm_campaign=community-outreach-2026
```

## Where to view the data in GA4

Reports → Acquisition → Traffic acquisition → group by
`Session source / medium` or `Session campaign`. Cross-filter with the
`generate_lead` and `donation_click` events (see `GA4-CONVERSIONS.md`) to
measure conversion per campaign.
