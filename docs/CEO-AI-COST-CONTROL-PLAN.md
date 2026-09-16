# How we spend AI money on this website

Plain English for the CEO. Technical detail for agents lives in `AGENTS.md`.

## 1. What you asked for

You want Living With Arthritis to stay a high-quality public site: charity pages, blogs, donate. You want work done with **Claude / Cursor credits**, not **Lovable credits**. You want cheaper models used first so we do not burn tokens on easy jobs.

This run was triggered by pull request 36 (hip and elbow treatment pages that were showing the homepage instead of a real guide). There was no clickable interview, no design screenshot, and no hosting login in this session — so nothing below is a guess presented as a live fact.

## 2. The credit split

- **Use Cursor / Claude** for writing pages, fixing search problems, and checking the site in this GitHub repo.
- **Do not use Lovable credits** to “build the site again”, expand blogs through Lovable’s AI box, or ask Lovable’s agent to redo work we can do here.
- A blog-lengthening playbook in the repo still points at Lovable’s AI. We will not run that until it is switched to Cursor.

I am not certain whether the existing “deploy to Lovable” GitHub action bills Lovable when code is already written here. That is a billing-page check for you, not something this run can see.

## 3. Which model to use (fewer tokens)

Think of models like staff:

- **Small / fast model** — fix wording, FAQs, titles, one broken character on a page.
- **Normal model** — one new page, wiring buttons, sitemap links.
- **Stronger model** — only if the cheaper pass left a real bug.

We never open on the most expensive setting. We do one piece of the site at a time.

## 4. What this run is building (and what it is not)

**Building now (visitors can see or Google can crawl):**

- Real hip and elbow guides for symptoms, treatment, and diet (exercises for hip still send people to the existing hip-exercise guide).
- Buttons on the elbow hub so people can open those guides.
- The on-site sitemap listing those new addresses so they are not orphan pages.
- Unique questions and answers on those pages so search and AI overviews can quote UK-specific guidance.
- The cost-control plan you asked for, so every future run starts cheaper.

**Not building in this run (would waste credits or undo past decisions):**

- A brand-new site from scratch. The live site already exists.
- Google login and a private database. Those were removed on purpose. Putting them back is a board decision, not a silent rebuild.
- A new Netlify link invented in chat. A public URL only exists after you connect the repo in Netlify (or keep the current host). I will not make one up.
- Matching a screenshot that was not attached.
- Rewriting every blog post to 1,400 words via Lovable.

## 5. How we check work without asking you to read code

After a piece ships, you should be able to:

1. Open https://livingwitharthritis.org.uk/conditions/hip-arthritis and tap **Treatment**, **Symptoms**, and **Diet** — you should see a hip guide, not the homepage.
2. Open https://livingwitharthritis.org.uk/conditions/elbow-arthritis and tap the same kinds of buttons — elbow guide, not the homepage.
3. Open https://livingwitharthritis.org.uk/conditions/hip-arthritis/exercises — you should land on the existing hip-exercise guide.
4. Use Donate and Blog from the usual menu. Those paths were not rebuilt here.

Phone check: those pages should still read as one column, with large tap targets, after deploy.

## 6. Open decisions (need you, not an AI guess)

1. **Hosting:** Keep the current live host, or connect GitHub to Netlify yourself. I cannot publish a Netlify URL from this automation.
2. **Member login:** Stay public-only (current), or later add sign-in. If you want sign-in, say so in a later brief; do not assume Google login is already live.
3. **Look and feel:** Send one screenshot of the homepage you want matched. Without it, we keep the current UK charity look.
4. **Lovable billing:** Check whether GitHub deploys still spend Lovable credits even when writing happens in Cursor.
5. **Interview:** When you are in the editor, we can ask one look-and-feel question at a time. Automations cannot click answers for you.

## 7. SEO / AEO / GEO in one paragraph

- **SEO:** Every important URL must return its own title and body, sit in the sitemap, and link from the parent condition page.
- **AEO:** Pages should open with a direct answer and a short FAQ people (and answer engines) can quote.
- **GEO:** UK English, GP / NHS / NICE pathways, no invented clinic names or statistics.

If a number is not already on the page from a past reviewed pass, we do not invent a new one.
