## Goal

Strip every visible trace of "AI" from Living with Arthritis — branding, badges, disclosures, dedicated AI pages, robot iconography, and AI-flavoured prose — while keeping the underlying chat feature working (silently rebranded as **Help**). Cover both frontend (React) and backend (edge functions, sitemap, llms.txt, meta tags).

## Scope summary

~64 files reference "AI". Work splits into 4 buckets:

1. **Remove AI-only surfaces** (pages, components, routes, footer links)
2. **Unbrand the chatbot** (rename to Help/Support, swap robot icon, drop disclosure badge)
3. **Rewrite AI-sounding copy** in a human editorial voice (no em-dash overuse, no "delve/leverage/in today's world", no listicle-robot phrasing, no "AI-powered"/"AI assistant" wording)
4. **Backend & metadata** (edge function strings, llms.txt, sitemap, robots, index.html meta/JSON-LD)

---

## 1 — Remove AI-only surfaces

**Delete (or gut) these files:**
- `src/pages/AISafety.tsx` — delete page
- `src/components/AITrustSafetyModal.tsx` — delete
- `src/components/ai/AiDisclosureBadge.tsx` — delete (and remove all imports/usages)
- `src/components/ai/AiConsentModal.tsx` — delete
- `src/components/landing/AITrustSection.tsx` — delete
- `src/components/landing/AISafetyExtras.tsx` — delete
- `src/components/icons/RobotIcon.tsx` — delete

**Routing / nav cleanup:**
- `src/App.tsx` — remove `AISafety` lazy import and `/ai-safety` route
- `src/components/Footer.tsx` — remove the two "AI Safety" links and `<AITrustSafetyModal />` mount + import
- `src/components/Header.tsx` — remove any AI nav entries
- `src/pages/Sitemap.tsx` — remove AI Safety entry
- Landing page (`src/pages/Index.tsx` or composing file) — remove `<AITrustSection />` and `<AISafetyExtras />` slots

---

## 2 — Unbrand the chatbot (keep functionality)

- `src/components/ChatBotWidget.tsx`
  - Rename UI labels: "Chat with us" → **"Help"**, aria-label → **"Open help"** / **"Close help"**
  - Swap `RobotIcon` for a neutral `MessageCircle` (lucide) icon
  - Remove robot pulse aesthetics; keep the bubble
- `src/components/ChatBot.tsx`
  - Drop "AI", "AI-powered", "AI-generated" labels in header/footer of the panel
  - Remove the `AiDisclosureBadge` usage
  - Generic intro: "Hi — how can we help with your arthritis today?"
- `src/pages/Chat.tsx`
  - Rename page title/H1 to **"Help & Support"**
  - Strip "AI-Powered" badge and any "AI" language; remove JSON-LD description mentioning AI
  - Keep the streaming chat UI
- `src/hooks/useStreamingChat.ts` — no functional change, only comment cleanup
- `supabase/functions/chat/index.ts` — keep the function (Lovable AI gateway) but adjust system prompt + any user-visible strings (refusal/red-flag messages) to remove "AI assistant" framing. Use voice: *"You are the Living with Arthritis support helper…"*
- `supabase/functions/_shared/ai-safety.ts` — keep safety logic; rename file to `_shared/safety.ts`, update `MEDICAL_DISCLAIMER` text to drop "AI assistant" wording (becomes "general information — not medical advice…"). Update the one importer (`chat/index.ts`).

---

## 3 — Rewrite AI-sounding copy (frontend)

Targeted find-and-replace + human rewrites in these pages (every occurrence of "AI Assistant / AI-powered / AI chatbot / AI symptom checker / Talk to our AI" etc.):

- `src/pages/ExerciseHub.tsx` (3 CTAs + body copy)
- `src/pages/DietHub.tsx` (2 CTAs)
- `src/pages/CommunityHub.tsx` (4 references incl. 24/7 stat, emoji card, step list)
- `src/pages/SelfHelpTool.tsx` ("AI-Powered" pill + feature card)
- `src/pages/ArthritisFlareUps.tsx` (3 CTAs)
- `src/pages/WaitingListHelp.tsx` (FAQ answer + quick link)
- `src/pages/ResourceDirectory.tsx` (helper card)
- `src/pages/DailyTipDetail.tsx`
- `src/pages/ImpactStories.tsx`
- `src/pages/Finances.tsx` (line-item description + impact paragraph)
- `src/pages/Press.tsx`
- `src/pages/AboutUs.tsx` (team bio)
- `src/pages/Accessibility.tsx`
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/Donate.tsx`, `src/pages/DonationSuccess.tsx`, `src/pages/Safeguarding.tsx`, `src/pages/Services.tsx`, `src/pages/TrustCredibility.tsx`
- `src/pages/conditions/*.tsx` (Knee, Hand, Shoulder, RA, PsA, Osteo)
- `src/components/CrossLinkBanner.tsx`, `src/components/InternalLinks.tsx`, `src/components/landing/{FAQSection,HowItWorksSection,QuickAccessSection,ColourMosaic,ParticleNetworkSection}.tsx`

**Replacement vocabulary:**
| Before | After |
|---|---|
| "AI Assistant" / "AI-powered chatbot" | "Help chat" or "Ask our team" |
| "Talk to our AI Assistant" | "Ask a question" / "Start a chat" |
| "AI-powered symptom guidance" | "Guided self-assessment" |
| "AI-generated" | (remove) |
| "24/7 AI availability" | "Always-on support" |
| "Our AI creates personalised meal suggestions" | "Get personalised meal ideas tailored to your condition" |
| Robot emoji 🤖 | 💬 |

Also sweep the copy for AI-tell phrases and rewrite where found:
- "In today's world…", "Delve into…", "Navigate the complexities of…", "It's important to note…", "Whether you're a…or a…", "harness the power of…", "leverage", over-used em-dashes in body paragraphs, repetitive tricolons.

---

## 4 — Backend & metadata

- `index.html`
  - Meta description (line 76, 130, 140) — drop "and an AI assistant"
  - JSON-LD description (line 154) — drop "AI assistant" clause
- `public/llms.txt` — remove `/ai-safety` entry and any "AI-powered" wording in site summary
- `public/sitemap.xml` — remove `/ai-safety` URL entry
- `public/robots.txt` — remove any AI-safety reference (if present)
- `public/_headers` — verify no AI-only rule, leave intact otherwise
- `src/lib/arthritisChatFallback.ts` — strip "AI" mentions in fallback strings
- `scripts/generate-sitemap.ts` — add `/ai-safety` to `STATIC_EXCLUDE` (or remove if listed)

---

## Out of scope

- No DB schema changes
- No removal of the chat functionality, edge function, or Lovable AI gateway call
- No design overhaul beyond icon/label swaps in the chat widget
- No copy changes in legal pages beyond the single AI-mention sentences

---

## Technical notes

- After deletes, run a `rg "AISafety|AiDisclosureBadge|AITrustSection|AISafetyExtras|AITrustSafetyModal|RobotIcon|/ai-safety|AI[- ]powered|AI assistant|AI[- ]generated"` sweep to catch stragglers before declaring done.
- Memory update: add a new `mem://constraints/no-ai-branding.md` rule — *"Do not use 'AI', 'AI-powered', 'AI assistant', 'AI-generated', or robot iconography in user-facing copy. The chat widget is branded as 'Help'. Safety/disclosure pages are removed."* — and reference it from `mem://index.md` Core.
- Update `src/pages/Sitemap.tsx` A–Z index to drop the AI Safety entry.

---

## Acceptance check

```text
rg -i "\bAI\b|AI[- ]powered|AI assistant|AI[- ]generated|ai-safety|RobotIcon" src/ public/ supabase/functions/ index.html
```
should return **0 user-visible hits** (only internal code comments, model identifiers like `google/gemini-...`, and the Lovable AI gateway URL inside `chat/index.ts` may remain).
