# 11 — AI innovation specs

**Start from:** local canned chatbot (`docs/CHATBOT-LOCAL.md`) — knowledge base + scoring, **no live LLM**, educational answers, red-flag signposting to NHS 111 / 999 / Samaritans.

---

## Product principles

1. Educational information only — **not diagnosis, not prescribing, not triage replacing clinicians**.  
2. UK pathway language (GP, FCP, MSK, rheumatology, NHS 111).  
3. Low confidence → clarifying chips + hub links, never fabricated certainty.  
4. Transparency: `/about/ai-transparency`, `/ai-guidelines`.  
5. Human escalation paths (helpline/contact) always visible.

---

## Spec A — Assistant v1.5 (Phase 1, still local)

| Item | Spec |
|---|---|
| Scope | Expand KB topics aligned to Champions (pain, exercise, PIP, flares) |
| UX | `/chat` + floating help; streaming UX may remain simulated |
| Safety | Urgent keyword pack reviewed by Louis quarterly |
| Analytics | `chat_start` already defined in GA4 helpers |
| Out of scope | LLM API, memory across sessions, medical record ingest |

---

## Spec B — Assistant v2 (Phase 3 / funded)

| Item | Spec |
|---|---|
| Architecture | Retrieval over approved LWA corpus + cited snippets; LLM for phrasing only |
| Grounding | Refuse if no retrieved source; show citations |
| System policy | Hard blocks: doses, “you have RA”, controlled drug advice, suicide handling → crisis resources only |
| Evaluation | Golden-question set; clinical spot-check; jailbreak tests |
| Hosting | Prefer UK/EU data processing where feasible; DPIA update |
| Human review | Weekly sample of transcripts (consent/notice in UI) |

### UK clinical safety caveats

- LWA is **not** a regulated medical device manufacturer by default; avoid presenting the assistant as a medical device or diagnostic CE/UKCA product.  
- If future features look like clinical decision support, obtain appropriate regulatory advice **before** launch.  
- Align with MHRA/NICE digital guidance at the time of build; document intended use as **general health information**.  
- Keep founder HCPC accountability for clinical content policy; AI does not replace reviewer sign-off on source articles.

---

## Spec C — Authoring assist (internal)

| Item | Spec |
|---|---|
| Use | Draft outlines, alt text suggestions, internal link ideas |
| Ban | Auto-publish; invented citations; fake stories |
| Gate | Human clinical edit before ship |

---

## Spec D — Non-goals (12 months)

- Symptom checker that names a definitive diagnosis.  
- Image diagnosis from joint photos.  
- Autonomous prescription or flare medication changes.  
- Training on private patient identifiable data without lawful basis.

*Next: [12-CONVERSION-ANALYTICS.md](./12-CONVERSION-ANALYTICS.md)*
