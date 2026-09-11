# DPIA checklist — analytics, email, local chatbot

**Organisation:** Living With Arthritis (CIO 1218461)  
**Date:** 2026-09-11  
**Owner:** Louis Maxwell (data controller for the charity)

Screening: we process personal data for website analytics (with consent), email marketing (consent), and an on-site chatbot that should remain **local / non-LLM** for clinical risk control. This checklist is a working DPIA aid — instruct a DPO/solicitor if processing expands.

---

## 1. GA4 (measurement ID `G-ZLLSD3PXZ9`)

| Check | Status / action |
|---|---|
| Consent-gated before tags fire | Cookie banner must gate analytics cookies |
| IP anonymisation / Google signals reviewed | Confirm in GA4 Admin |
| Data retention set to minimum needed | Prefer 2–14 months unless justified |
| No PII in event params (emails, names, NHS numbers) | Code review ongoing |
| UK/EU data configuration understood | Document Google’s transfer tools |
| Legitimate interest **not** relied on for ads cookies | Use consent |
| DPIA reviewed when adding remarketing | Do before Ads remarketing |

## 2. Email

| Check | Status / action |
|---|---|
| Lawful basis = consent | Double opt-in before marketing |
| Purpose limited to education + optional fundraising | Stated at capture |
| Unsubscribe honoured promptly | Required by PECR |
| List host DPA / SCCs in place before go-live | Louis selects provider |
| No purchase of cold lists | Prohibited |
| Suppression list retained as needed for PECR defence | Yes |

## 3. Chatbot (local)

| Check | Status / action |
|---|---|
| No live LLM sending health chat to third parties by default | Keep local KB (`docs/CHATBOT-LOCAL.md`) |
| Clear educational disclaimer in UI | Present |
| No storage of chat transcripts with identifiers unless justified | Prefer ephemeral |
| Escalation to human/phone for emergencies | 111/999 messaging |
| Future LLM = new DPIA + AI policy | Month 5+ item |

## 4. Residual risks & mitigations

- **Health-adjacent YMYL content + analytics:** minimise identifiers; no medical form uploads in GA.
- **Email compromise:** 2FA on charity inbox; least-privilege list admins.
- **Function creep:** board approval before adding CRM fields beyond email + consent timestamp.

## 5. Sign-off

| Role | Name | Date | Notes |
|---|---|---|---|
| Charity lead | Louis Maxwell | _TBD_ | Complete after GA4/GSC Year 0 export |
| Technical implementer | GTM / engineering | 2026-09-11 | Checklist drafted with Month 1 ship |
