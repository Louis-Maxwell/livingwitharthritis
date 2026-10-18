# Search and support conversion improvements

## Baseline observed in Google reports

Search Console property: `https://livingwitharthritis.org.uk/`, Web search, 28 days ending 16 October 2026.

- 35.5K impressions, 330 clicks, 0.9% average CTR, average position 16.8.
- `/guides/benefits-pip`: 3,361 impressions, 39 clicks.
- `/blog/pip-for-arthritis-uk`: 2,379 impressions, 10 clicks.
- `/blog/best-supplement-for-knee-joint`: 1,051 impressions, 10 clicks.
- `/blog/tens-machines-arthritis-uk`: 1,542 impressions, 8 clicks.
- `/blog/anti-inflammatory-diet-rheumatoid-arthritis`: 650 impressions, 9 clicks.
- The leading query list includes “can you claim for arthritis while working”, “best joint supplement for knees”, “best pain relief for arthritis” and “arthritis uk back exercises”. Query and page tables are separate; these rows do not prove exact query-to-URL attribution.

GA4 property: Living With Arthritis, overview, last 30 days.

- 1.5K active users, up 62.8%.
- 639 key events, down 13.9%.
- The Home overview card does not reveal which event names are included or whether donations/enquiries completed. Treat this as a prompt to inspect event-level reports, not proof of successful donations.

## Implemented on the review branch

- Refined the PIP, TENS, knee supplement and rheumatoid arthritis diet search snippets to answer likely queries directly and accurately.
- Added a contextual support path on the PIP article to the volunteer/fundraising and donation pages.
- Made the donation handoff explicit: amount/frequency controls are for planning; GoFundMe handles actual amount and recurring choices.
- Added selected amount and frequency to the outbound donation click event. This remains a click event and must not be counted as a completed donation.
- Kept volunteer email-draft opens classified as engagement; opening a mail draft is not a submitted enquiry.
- The existing PR also updates donation and ways-to-help page metadata and event attribution.

## Follow-up measurement

1. In GA4, review Events and Key events by exact event name: `donation_click`, `volunteer_enquiry_draft_open`, `contact_form_submit`, and `file_download`. Mark only actions that reflect meaningful supporter intent as key events; do not label outbound clicks or opened email drafts as confirmed donations/enquiries.
2. If GoFundMe can return a confirmed payment status or provide a supported conversion integration, add a separate donation-completion event only after verifying that signal. Do not infer completion from a click.
3. Compare GSC page-level impressions, clicks, CTR and average position for the four edited URLs after Google recrawls, using the same 28-day window and a prior-period comparison.
4. Review conversions and engagement alongside channel and landing page in GA4; prioritize donation and volunteer path changes only when the event data confirms where visitors drop off.

## Guardrails

- Search snippets can be rewritten by Google; metadata changes do not guarantee higher CTR.
- The analytics overview is an account dashboard snapshot. It does not establish causal effects or completed gift totals.
- No indexing request, live deployment, donation-system change, or clinical-review status change is included in this branch.
