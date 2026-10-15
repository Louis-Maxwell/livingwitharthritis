# Customer-first principle

**Date:** 20 September 2026  
**Owner:** Louis Maxwell  

## North star

Obsessive customer focus is the **main** aim of livingwitharthritis.org.uk.

**Customer** = people living with arthritis in the UK, plus carers.

Not donors-first. Not SEO-first. Not engineering vanity.

## Visitor jobs (homepage router, directly under the hero)

The hero has **one primary action** (pain relief — the most urgent job) and
**one secondary action** (jump to the router). The router
(`HomeJobRouter`) then gives one card per real job, each linking to an
existing route or published post (guarded by
`src/components/landing/__tests__/HomeJobRouter.test.tsx`):

1. **I'm in pain right now** → pain-relief guide, flare-up help
2. **I've just been diagnosed** → newly-diagnosed checklist, condition guides
3. **Exercises — Motion is Lotion** → exercise hub, knee routine, seated tai chi
4. **Money, benefits & work** → benefits/PIP hub, Access to Work, work guide
5. **I care for someone** → carer guides
6. **Can I trust this?** → editorial standards, clinical reviewer, trust page
7. **Talk to someone** → community, helpline, connect groups
8. **I'd like to help** (last, never louder) → donate, GoFundMe research fund

Donate lives in the header, the last router card and the closing bands —
never as a hero button.

## Trust (always visible near the top)

- Charity **1218461**
- Louis Maxwell HCPC **PH128483**
- Educational information — not a diagnosis
- Independent of Arthritis UK

## What we refuse

- Vanity CTAs above help (mega “Donate now” hero buttons, sticky urgent appeals competing with relief)
- Invented testimonials, traffic numbers, or social-proof metrics
- Gift Aid reclaim claims before HMRC registration is live
- Publishing an Oswestry (or any) registered address on the homepage
- Framing donors, SEO keywords, or engineering experiments as more important than people in pain

## Facebook

Keep the Page URL via `SOCIAL_LINKS` / `FACEBOOK_PAGE_URL`:  
`https://www.facebook.com/profile.php?id=61583723925315`

## Related

- `docs/strategy/03-HOMEPAGE-REDESIGN.md` — section IA  
- Homepage components: `OAHero`, `HomeTrustStrip`, `HomeJobRouter`
