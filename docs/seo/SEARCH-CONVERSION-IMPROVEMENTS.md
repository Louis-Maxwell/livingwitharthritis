# Search and supporter-conversion improvements

## Google Search Console baseline

Property: `https://livingwitharthritis.org.uk/`, Web search, 28 days ending 16 October 2026.

- Total impressions: 35.5K
- Total clicks: 330
- Average CTR: 0.9%
- Average position: 16.8
- `/guides/benefits-pip`: 3,361 impressions, 39 clicks
- `/blog/pip-for-arthritis-uk`: 2,379 impressions, 10 clicks
- `/blog/best-supplement-for-knee-joint`: 1,051 impressions, 10 clicks
- `/blog/tens-machines-arthritis-uk`: 1,542 impressions, 8 clicks
- `/blog/anti-inflammatory-diet-rheumatoid-arthritis`: 650 impressions, 9 clicks

The query report included “can you claim for arthritis while working” and “best joint supplement for knees”. The query and page tables are separate; this report does not prove exact query-to-page attribution.

## Google Analytics 4 overview baseline

Property: Living With Arthritis, last 30 days.

- Active users: 1.5K, up 62.8%
- Key events: 639, down 13.9%
- Event count: 22K, up 243.6%
- Sessions: 1.9K, up 89.2%

The overview does not expose the event-name breakdown or confirm completed donations. Do not interpret outbound donation clicks or opened email drafts as completed gifts or submitted enquiries.

## Changes in this branch

- Improve the high-impression PIP guide search title and description around “claim PIP for arthritis while working”.
- Add contextual paths from the PIP guide to donation, volunteering, fundraising and partnership options.
- Clarify the external GoFundMe handoff. The selected amount/frequency on the site is planning context; GoFundMe handles the actual gift.
- Correct GA4 donation method from a Stripe default to an external fundraising platform, and record selected amount/frequency as intent.
- Add separate fundraiser-interest engagement tracking.
- Remove unsupported volunteer, fundraising and partner counts from Ways to Help.
- Update the donation-flow E2E assertion to match the accurate handoff text.

## Measurement plan

Review GA4 event rows by name for `donation_click`, `volunteer_enquiry_draft_open`, `fundraiser_interest`, `contact_form_submit`, and `file_download`. A donation-completion key event requires a verified payment-success signal.

After Google recrawls the edited PIP page, compare its Search Console CTR, clicks, impressions and position across the same 28-day window and the previous period. Metadata changes do not guarantee a CTR increase.

No payment settings or live site configuration were changed by this branch.
