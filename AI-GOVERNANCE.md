# AI Governance — Living With Arthritis UK

**Status:** First version. Written 2026-07-24 by auditing the actual deployed
code (not a template) — every fact below was verified against the real
implementation, not assumed. Structured around the NIST AI Risk Management
Framework's four functions (Govern / Map / Measure / Manage), since that's a
free, non-proprietary framework suited to an org this size.

## Scope: what AI systems does this charity actually run?

| System | File | Model | Purpose |
|---|---|---|---|
| **Chat assistant** ("Arthritis Support") | `supabase/functions/chat/index.ts` | `openai/gpt-5` via Lovable AI Gateway | Conversational arthritis guidance, diet/exercise info, UK care-pathway navigation |
| **Symptom ranker** | `supabase/functions/symptom-ranker/index.ts` | `google/gemini-2.5-flash` via Lovable AI Gateway | Structured JSON matching of user-described symptoms to likely conditions |

Both are third-party hosted LLMs accessed via API (Lovable's AI Gateway) —
this charity does not train or fine-tune its own models. That matters for
which governance tools are actually applicable (see Gaps section).

---

## GOVERN — policies, accountability, roles

**In place:**
- Hard-coded safety rules embedded directly in the system prompt (not just
  a policy document) — never diagnose, never give new prescription dosing,
  never paediatric dosing, never crisis counselling (signposts instead),
  explicit refusal instruction against jailbreak/role-play bypass attempts.
- Clinical accountability named: content reviewed by "Maxwell" (HCPC
  PH128483, Chartered Society of Physiotherapy member) — see
  `/about/ai-transparency`.

**Gap:** No named individual or role is documented as *accountable for the
AI system's behaviour specifically* (as opposed to the clinical content it
draws on). Recommend naming an AI governance owner — doesn't need to be a
new hire, just a documented point of accountability.

## MAP — context, risks, and who's affected

**Real risk surface, based on the actual code:**
1. **Medical misinformation / over-reliance** — highest-severity risk for a
   health charity chatbot. Mitigated by: mandatory "only a clinician can
   diagnose this" framing, mandatory GP-referral safety net on every
   substantive answer, explicit uncertainty disclosure instruction.
2. **Medical emergencies mishandled** — mitigated by `ai-safety.ts`'s
   regex-based red-flag detector (self-harm, cardiac, stroke, septic joint,
   anaphylaxis, severe bleeding) which routes to a hard-coded emergency
   response (999/111/Samaritans) instead of an LLM-generated answer. This
   is a real, working control — verified by reading the source, not assumed.
3. **Prompt injection / jailbreak** — mitigated by: explicit system-prompt
   refusal instruction, input allowlisting on structured profile fields
   (`arthritisType`, `ageRange`, `affectedJoints`, `severity` are all
   validated against fixed enums — free text is dropped, not passed
   through), and blocked-content pattern matching for jailbreak phrases.
4. **PII exposure in logs** — mitigated by `redactPII()`, which strips
   emails, UK phone numbers, NHS numbers, postcodes and DOBs before
   anything is logged.
5. **Abuse / cost exhaustion** — mitigated by a persistent, DB-backed,
   tiered rate limiter (per-IP *and* per-account, sliding window, growing
   backoff on repeat violations) — this survives server restarts, unlike a
   simple in-memory limiter.

**Not currently mapped:** demographic/equity risk — see Gaps.

## MEASURE — testing and evidence

**In place:**
- Automated tests exist: `ChatBot.test.tsx`, `ChatBot.a11y.test.tsx` (found
  in `src/components/__tests__/`).

**Gap — the honest part:** I found no evidence of:
- Red-team test cases specifically exercising the red-flag/blocked-content
  regex patterns (i.e., proof the patterns actually catch what they're
  designed to catch, beyond code review)
- Any fairness/bias evaluation across demographic groups. Tools like
  Fairlearn or AI Fairness 360 (from your image) are built for auditing
  labelled classifier outputs against protected attributes — they don't
  map cleanly onto a free-text LLM chat assistant without significant
  extra infrastructure (you'd need to log outcomes by demographic segment,
  which the current PII-redaction-by-design approach actively avoids
  retaining). This is a genuine tension worth a deliberate decision, not
  a default "just add the tool" — recommend discussing whether equity
  testing is worth the privacy trade-off before building it.
- A documented incident-response runbook for "the AI said something
  harmful" — who gets notified, how fast, what's the rollback.

## MANAGE — ongoing operation

**In place:** rate limiting, PII redaction, red-flag routing all run on
every request automatically — this is "manage" happening in production
code, which is stronger than a policy document alone.

**Gap:** no changelog/versioning convention for system-prompt changes found
— if the prompt is edited in a future PR, there's currently no structured
record of *why* (which matters if a safety rule is ever accidentally
weakened). Recommend: any future system-prompt edit gets a commit message
explicitly stating which safety rule (if any) it touches.

---

## Honest mapping to the 12-tool stack you shared

| # | Tool | Applicable here? | Status |
|---|---|---|---|
| 1 | NIST AI RMF | Yes — used as this doc's structure | ✅ Done (this document) |
| 2 | NIST AI Resource Center | Yes, as ongoing reference | Not integrated, just a resource to consult |
| 3 | OECD AI Policy Observatory | Low relevance — for tracking national policy, not a small charity's day-to-day | Not applicable now |
| 4 | MITRE ATLAS | Partially — informed the Map section's threat list above | ✅ Applied conceptually, not a software install |
| 5 | OWASP GenAI Security Project | Yes — prompt injection / jailbreak mitigations above align with its guidance | ✅ Already implemented in code (pre-existing) |
| 6 | OWASP Threat Defense COMPASS | Same threats as #5, already covered | ✅ Covered |
| 7 | Fairlearn | Needs labelled outcome data by demographic group — you don't currently collect this (by design, for privacy) | ⚠️ Genuine tension — flagged above, needs a decision |
| 8 | InterpretML | For explaining a trained model's decisions — doesn't apply to a third-party hosted LLM you call via API | Not applicable |
| 9 | AI Fairness 360 | Same constraint as Fairlearn | ⚠️ Same tension |
| 10 | Model Card Toolkit | Yes — this document *is* that artifact | ✅ Done |
| 11 | GitHub | Already your primary tool | ✅ This file lives there now |
| 12 | Microsoft Lists | Alternative to GitHub Issues for tracking governance actions | Optional — GitHub Issues can serve the same purpose since you're already there |

**Bottom line:** roughly half the stack was already implemented in your
actual code before I wrote a word of documentation — the safety engineering
here is genuinely good. The real gap wasn't tooling, it was that none of it
was written down anywhere. This document is that write-down. The fairness/
bias testing tools (7, 9) are the one area with a real, unresolved tension
between "test for equity" and "the privacy-by-design choice not to retain
demographic-linked outcomes" — that's a decision for you, not something I
should silently pick a side on.
