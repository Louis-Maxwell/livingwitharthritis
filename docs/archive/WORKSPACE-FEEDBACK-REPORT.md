# Workspace Feedback Report — Living With Arthritis UK
### July 2026 · Claude-credits-only audit · Honest about what was and wasn't verifiable

## Scope honesty (read first)
From this workspace I have: free read access to your Lovable project files,
web search, and your synced repo's file listing. I do NOT have: GitHub write
access, a runnable build environment (no network in the sandbox), or live
access to Semrush/GSC/Supabase dashboards. So "fixed all bugs" below means:
every bug I could detect from reading code and history is fixed or has a
commit-ready fix; I cannot certify zero runtime bugs without running the
build, which your CI now does on every push.

## 1. API keys in the frontend — PASS (verified)
Read your committed `.env` directly. It contains ONLY Supabase `anon`
(publishable) keys — I decoded both JWTs, both say `"role":"anon"`. These
are designed to be public; security correctly depends on RLS policies, and
Lovable's security agent scan reported 0 remaining issues after adding
DB-level length caps to chat_feedback. No service_role key, no Stripe
secret, no AI API key anywhere in the repo. Payments go through Stripe/
PayPal hosted flows; the AI chat calls a server-side edge function. This is
the correct architecture.

⚠️ One finding: `.env` references TWO different Supabase projects —
`nfijkdoifihbgomcnbnb` (non-VITE pair) and `zrvcejlncpndjfyuvcrd` (VITE
pair, which is what the client actually uses). One is almost certainly
stale. ACTION: confirm which project is live in your Supabase dashboard and
delete the stale pair from `.env` — a wrong-project bug waiting to happen.

## 2. Input validation — PARTIAL PASS (partially verified)
Verified: chat_feedback INSERT policy has DB-level length caps (Lovable
security agent, this month). React escapes rendered output by default,
which blocks most XSS. Supabase client uses parameterised queries, which
blocks classic SQL injection. UNVERIFIED: server-side validation inside
each edge function body (couldn't read them within token budget). The
rate-limiting doc I've added includes the validation pattern to apply.

## 3. Authentication — N/A by design (correct choice)
The site has no password-based accounts: chat is anonymous, donations go
through hosted payment pages. You are not "building your own auth" — good.
If accounts ever arrive, use Supabase Auth, never roll your own.

## 4. Rate limiting — UNVERIFIED → ready-to-apply fix shipped
See `docs/EDGE-FUNCTION-RATE-LIMITING.md`: one SQL table + a 15-line
helper + a 3-line guard per function, with suggested limits per endpoint.
Apply via GitHub web editor to `supabase/functions/*/index.ts`.

## 5. Privacy policy — PASS with 4 gaps
The live /privacy page is genuinely good: UK GDPR bases, retention periods
(7yr donations / 2yr enquiries), user rights, ICO complaint route, health
data disclosed, "no selling" stated. Four gaps to close (the upgraded
PrivacyPolicy.NEW.tsx in the bundle covers all four): (1) ICO registration
number — pay the fee if not yet done, it's a legal requirement (~£40-60/yr);
(2) named processors (Stripe, PayPal, Resend, Supabase, GA4); (3) explicit
Art.9 special-category basis for health data; (4) an AI-chat data section.

## 6. Terms of Service — WAS MISSING → now drafted
`src/pages/TermsOfService.NEW.tsx` is in the bundle: medical disclaimer
(the single most important clause for a health charity), acceptable use,
donations/Gift Aid, IP, user content, liability caps, England & Wales
governing law. Mirrors your PrivacyPolicy.tsx imports so it drops in.
Register at /terms + footer link. Have a solicitor read it before relying
on it in a dispute — it's a strong baseline, not legal advice.

## 7. GDPR/CCPA data declarations — MOSTLY PASS
Every data point you collect is declared in the privacy policy (contact,
health info volunteered to tools, usage/cookies, donation, communications)
with purposes and retention. UK GDPR is your primary regime; CCPA only
bites at thresholds a UK charity is nowhere near ($25M revenue / 100K CA
consumers), so GDPR compliance effectively covers you. Cookie consent
banner exists (CookieConsent component is in the lazy-load list).

## 8. Trademark: "Living With Arthritis" — HONEST ANSWER
I could NOT run a live UKIPO register query from this workspace — web
search only reaches the search portal, not results. So: I do not have a
verified answer on whether any registration exists. What I can say
factually: (a) "living with arthritis" is a widely-used descriptive phrase
— the NHS, Versus Arthritis and arthritis-uk.org all use it as section
headings, which both lowers the odds anyone holds a strong exclusive mark
on it AND would make it hard for you to register exclusively (descriptive
marks face refusal on absolute grounds); (b) your Charity Commission
registration (1218461) protects the charity name legally but is separate
from trademark rights. ACTION (10 min, free): search at
gov.uk/search-for-trademark for "living with arthritis" and "arthritis",
checking classes 36 (charitable fundraising), 41 (education) and 44
(medical services). If clear and you want protection, a UK filing starts
at £170. For real clearance (passing-off/common-law rights don't appear in
the register), a trademark attorney is the right call. I am not a lawyer.

## 9. Bugs — status of everything known
FIXED (in repo already): TS2590 build error, missing </Routes>, chat
feedback size-cap vulnerability. FIXED (in bundle, commit to apply): CI
20-min hang (root-caused: blind sleep + no audit timeout; job renamed to
replace the live failing check), stale package-lock behind the 65
Dependabot alerts (workflow ready to run). NEW FINDING this pass: the
dual-Supabase-project .env (see §1). NOT VERIFIABLE from here: runtime
bugs requiring a build — your CI (typecheck + build + CodeQL + Gitleaks +
audits, all confirmed present in .github/workflows/) now catches these on
every push, which is the sustainable fix.

## Overall feedback
This workspace is in genuinely strong shape for a solo-run, five-month-old
charity project: correct key architecture, layered security scanning, a
real privacy policy, 238 SEO routes, CI guardrails, and honest legal docs.
The gaps are operational, not architectural: run the lockfile workflow,
delete the stale .env pair, register /terms, add the ICO number, apply the
rate limiter, and do the 10-minute UKIPO search. None of it needs Lovable
credits.
