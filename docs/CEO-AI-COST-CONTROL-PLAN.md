# How we spend AI money (plain English)

**For:** Louis Maxwell (CEO)
**Live site:** https://livingwitharthritis.org.uk
**Last updated:** 21 September 2026

## The rule

All thinking and writing for this charity site runs on **Cursor / Claude**. We
do **not** use Lovable's paid AI chat. That is how we stop two bills for the
same work.

Lovable may still **host** the live site. That is a hosting bill, not an AI
chat. I am **not certain** whether a GitHub-triggered publish uses Lovable AI
credits. Please check the Lovable billing page and keep or cancel that host
accordingly.

## Smaller brains first

Each job should start on a cheaper model and only step up if that model gets
it wrong. We never start on the most expensive setting. Short copy uses a
small model; a whole-site search job uses a mid model; security or a mystery
bug uses a larger one.

We also stop wasting tokens: search before reading piles of files, do not dump
whole error logs, and do not write a new "status" document after every small
change.

## What the public site already does

People can already visit the charity pages, read the blog, and donate on
https://livingwitharthritis.org.uk. Google login and a private database were
**removed on purpose**. They are not on the live site today.

This run did **not** interview you (automation has no clickable Q&A) and no
design screenshot was attached. Open decisions stay below rather than guessed.

## What this run changed

This run reviewed pull request #70, "SEO/AEO: visitor-job hubs — foot/ankle,
Access to Work, falls". The new content itself is good — a foot and ankle
arthritis hub, Access to Work answers and fall-prevention guidance. But it had
three faults that would have hurt us, and I fixed all three.

1. **The site would not have built at all.** A stray extra comma in the
   foot-and-ankle content file was a genuine typing error. Anything that tried
   to build the site would have stopped there. One character, fixed.

2. **The new foot and ankle page was invisible to Google in the worst way.**
   Every other joint page has a proper headline in search results — for
   example "Elbow Arthritis: Symptoms & Treatment | UK Guide". The new page was
   falling back to a placeholder, "Conditions — foot and ankle arthritis", with
   a placeholder description to match. The page looked fine to a human
   visitor; only the version Google and ChatGPT read was wrong, which is
   exactly the version that decides whether anyone finds us. It now reads
   "Foot & Ankle Arthritis UK: Symptoms, Footwear & Exercises", with a proper
   description and its five questions and answers attached.

3. **We were telling Google about three copies of the same page.** The new
   page can be reached at three web addresses. Only the main one should be
   submitted to Google; the other two were being submitted as well, which is
   the kind of duplicate-page signal that gets a site marked down. The site
   already had a list for exactly this purpose and the two new addresses were
   missing from it. They are on it now.

I also wrote the "adding a new page" checklist into the agent rules file so the
second and third faults do not happen again on the next new page. Our automatic
checks did not catch either one, and now the instructions do.

Everything passes: the site builds, all 372 automated tests pass, and the
search-data, link and structured-data checks are clean.

I deliberately did **not** touch the homepage. Pull request #70 does not change
it, so changing it here would be unrelated risk.

## Open decisions (you click these)

1. **Member accounts / Google login** — leave off (current), or ask to rebuild
   a private area. Rebuilding would be a new project, not a small tweak.
2. **Netlify** — no public Netlify link exists until you connect the GitHub
   repo in Netlify yourself. Live traffic stays on the current host until you
   switch.
3. **Lovable billing** — confirm whether publish-from-GitHub spends AI credits.
4. **Look-and-feel screenshot** — none was attached to this run. Send one if
   you want a visual match.
5. **Merging `AGENTS.md` / this page permanently** — consider merging one
   pull request that includes them so future branches stop starting without
   the cost rule. This is the eighth run in a row that has had to re-add them.

I did not invent a new live URL. The public link stays
**https://livingwitharthritis.org.uk**.
