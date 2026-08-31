# Blog Distribution Strategy
## Where & How to Publish Written Blogs for Maximum Reach

**Goal:** One blog post reaches 5-10 different platforms, 5-10x multiplier on your effort

---

## **Distribution Channels (Ranked by Priority)**

### **TIER 1: Primary Channel (MUST DO)**

#### **1.1 Your Own Website** — livingwitharthritis.org.uk/blog
**Why:** Owns SEO, builds your domain authority, captures all traffic, builds email list

**Where to publish:**
- Website: `https://livingwitharthritis.org.uk/blog/[post-slug]`
- File location: `src/pages/blog/[PostName].tsx` (already set up)
- Metadata: Optimized title, description, og:image, schema markup

**What to include on every post:**
```
✅ SEO title (60 chars) — "Arthritis Exercises: 7-Move Routine for Knee Pain (Video)"
✅ Meta description (160 chars) — "Step-by-step arthritis exercises for knee pain relief..."
✅ Featured image (1200x630px) — og:image optimized
✅ H1 with keyword — matches title
✅ 2000+ words (compete with Arthritis UK)
✅ FAQ section (8-10 Q&As) — appears in "People also ask"
✅ Internal links (3-5) — to other guides/resources
✅ CTA — "Join our community" / "Download free guide"
✅ Author bio — Louis Maxwell, HCPC registered
✅ Last updated date — shows freshness
```

**Setup instructions:**
1. Create file: `src/pages/blog/BlogPostName.tsx`
2. Use template structure (see below)
3. Add to blog index: `src/data/blog-posts.ts`
4. Deploy to Lovable
5. Submit to Google Search Console

---

### **TIER 2: Social Amplification (Reach Extension)**

#### **2.1 Instagram** — @livingwitharthritis
**Goal:** Funnel your 10k Instagram followers to blog posts

**Content strategy:**
- **Carousel post** (Day 1 of week): 5-7 slide carousel previewing blog topic
  - Slide 1: "5 Arthritis Myths Debunked 🦵"
  - Slide 2-5: Each myth + truth
  - Slide 6: "Full guide in bio → [link]"
  - Slide 7: "Save this for later"

- **Reel** (Day 2): 15-30 second video
  - Quick tip from blog
  - Text overlay with blog title
  - CTA: "Link in bio"

- **Story** (Daily): 3-5 stories
  - Quote from blog
  - "Tap to read full guide"
  - Link in bio bio

**Posting schedule:**
```
Monday: Carousel post + Reel (teaser)
Wednesday: Story series (5 stories)
Friday: Reel #2 (different angle)
Sunday: Story reminder + link to blog
```

**Expected reach:** 5-10% of followers per post = 500-1000 clicks/week to blog

---

#### **2.2 Facebook** — Living With Arthritis UK (10k followers)
**Goal:** Older demographic (40-75) = prime arthritis audience

**Content strategy:**
- **Post 1:** Carousel link post
  ```
  "New guide: 7 Arthritis Exercises for Knee Pain Relief
  
  Our founder Louis (HCPC physiotherapist) shows step-by-step 
  video demonstrations. Free, no signup required.
  
  [Link to blog post]"
  ```

- **Post 2:** Video post (if you have video)
  - 15-60 second clip from blog topic
  - "Click to read full guide"

- **Post 3:** Community post
  - "Which arthritis symptom is hardest for you?"
  - Link: "Read how others manage it → [blog post]"

**Posting schedule:**
```
Monday 10am: Link post (peak engagement time for older demographics)
Wednesday 7pm: Video post
Friday 2pm: Community post
```

**Expected reach:** 10-15% of followers per post = 1000-1500 clicks/week

---

### **TIER 3: Email Newsletter (Once Built)**

#### **2.3 Email List** — weekly newsletter
**Goal:** Owned audience, highest engagement, repeat traffic

**Email strategy:**

**Newsletter schedule:**
```
Every Monday: "Arthritis Tip Monday"
- Headline: New blog post title
- Preview: First 100 words
- CTA: "Read full guide"
- P.S. "Ask Louis": Quick health tip
```

**Expected reach:** 20-30% open rate = 20-30% of subscribers to blog (starting Month 2)

---

### **TIER 4: Medium/LinkedIn (Syndication)**

#### **3.1 Medium** — medium.com/@livingwitharthritis (setup account)
**Why:** 200M monthly readers, can drive 500-2000 visits/post

**Strategy:**
- Publish **full blog post** on Medium (word-for-word copy)
- Add at top: "Originally published on Living With Arthritis UK → [link to your blog]"
- Medium readers click through to your site
- Medium also brings direct traffic

**Setup:**
```
1. Create Medium account: @livingwitharthritis
2. Write in Medium editor OR paste from your blog
3. Set up "canonical URL" → link back to your blog
   (tells Medium: "This is the original, rank the other one")
4. Publish same day as blog, or 1 day after

Example canonical URL:
https://livingwitharthritis.org.uk/blog/arthritis-exercises-knee-pain
```

**Timing:**
- Publish on your blog first (gets indexed)
- Wait 24 hours
- Republish on Medium with canonical URL
- This ensures Google ranks YOUR site, not Medium

**Expected reach:** 100-500 visits/post from Medium readers

---

#### **3.2 LinkedIn** — linkedin.com/company/living-with-arthritis
**Why:** Health professionals, caregivers follow LinkedIn health posts

**Strategy:**
- **LinkedIn article** (not link post)
- Publish full blog post in LinkedIn's editor
- Link back to your blog at bottom
- Target: Health professionals, caregivers, patients

**Content:**
```
Title: "Why Your Arthritis Exercise Routine Might Be Making It Worse"

[Post content — 500-1000 words]

Read the full guide with video demonstrations:
https://livingwitharthritis.org.uk/blog/arthritis-exercises-knee-pain
```

**Expected reach:** 50-200 visits/post from LinkedIn professionals

---

### **TIER 5: Reddit (Community)**

#### **4.1 Reddit** — r/arthritis, r/rheumatism
**Why:** 1M+ users with arthritis, highly engaged, high trust

**Strategy:**
- **DON'T spam** — just "here's my blog"
- **DO answer questions** with relevant blog links

**Where to post:**
- r/arthritis (50k members)
- r/rheumatism (10k members)
- r/HealthyFood (for diet posts)
- r/fitness (for exercise posts)

**Example:**
```
User: "Does anyone have good knee arthritis exercises?"

You reply: "Our founder Louis (HCPC physio) created a guide with 
step-by-step videos for exactly this. Completely free:
[link to blog]

Happy to answer follow-up questions!"
```

**Rules:**
- Only post if relevant to discussion
- Max 1 post/day across all subreddits
- Build karma first (answer questions, comment genuinely)
- Disclose you're the author

**Expected reach:** 50-300 visits/post (low volume, HIGH quality)

---

### **TIER 6: Other Platforms (Lower Priority)**

#### **4.2 Dev.to, Hashnode, Substack** (if time allows)
**Only if:**
- Blog is health/wellness tech related
- You want to build secondary audience
- Have extra time after main channels

**Skip if:**
- Your audience isn't there
- You're time-constrained
- Your main blog needs optimization

---

## **Publishing Workflow (Template)**

### **Week 1: Blog Topic X — "Arthritis Exercises for Knee Pain"**

**Day 1 (Monday morning):**
- [ ] Publish on your blog: `livingwitharthritis.org.uk/blog/arthritis-exercises-knee-pain`
- [ ] Submit to Google Search Console
- [ ] Schedule social media posts

**Day 1 (Monday evening):**
- [ ] Instagram: Carousel post (5-7 slides)
- [ ] Facebook: Link post
- [ ] Twitter/X: Quote + link

**Day 2-3 (Tuesday-Wednesday):**
- [ ] Instagram: Reel + Stories
- [ ] Facebook: Video/community post
- [ ] Reddit: Answer relevant questions with link

**Day 4 (Thursday):**
- [ ] Medium: Publish with canonical URL
- [ ] LinkedIn: Publish article

**Day 5 (Friday):**
- [ ] Email newsletter: Feature blog post (if list exists)
- [ ] Final social push (reminder post)

**Day 6-7 (Weekend):**
- [ ] Monitor traffic in Google Analytics
- [ ] Respond to comments/questions
- [ ] Plan next week's blog

---

## **Content Calendar Template** (Copy This)

```
MONTH: September 2026

WEEK 1-2:
Blog 1: "Arthritis Exercises: 7-Move Routine for Knee Pain" 
- Keywords: arthritis exercises, knee pain relief
- Channels: Your blog → Instagram carousel → Facebook → Medium → Reddit

Blog 2: "Anti-Inflammatory Diet for Arthritis: What to Eat & Avoid"
- Keywords: arthritis diet, anti-inflammatory
- Channels: Your blog → Instagram reel → Facebook → LinkedIn

WEEK 3-4:
Blog 3: "Is It Osteoarthritis or Rheumatoid Arthritis? Key Differences"
Blog 4: "Arthritis and Sleep: 5 Tips for Better Rest"

WEEK 5+: (Continue pattern)
```

---

## **Expected Traffic Multiplier**

**One blog post published across all channels:**

| Channel | Clicks | Notes |
|---------|--------|-------|
| Your blog (SEO) | 200-500 | Organic search over 3-6 months |
| Your blog (direct) | 50-100 | Social clicks, email, direct |
| Instagram | 500-1000 | Carousel + Reel + Stories |
| Facebook | 1000-1500 | Your active audience |
| Email | 500-1000 | Once list exists |
| Medium | 100-500 | Syndication reach |
| LinkedIn | 50-200 | Professional audience |
| Reddit | 50-300 | High-intent users |
| **TOTAL** | **2500-5600 clicks** | Per blog post |

**With 3 posts/week: 7,500 - 16,800 clicks/week to your site**

---

## **Step-by-Step: Publishing Your First Blog Post**

### **Phase 1: Create Blog Post (Your or Louis's Work)**

1. Choose topic: "Arthritis Exercises for Knee Pain"
2. Write 2000+ words (or outline for AI to draft)
3. Include:
   - H1 with keyword
   - H2s for sections
   - FAQ section (8-10 Q&As)
   - Internal links (3-5)
   - Video embeds (if available)
   - CTA at bottom

### **Phase 2: Create File on Website**

Create new file: `src/pages/blog/ArthritisExercisesKnee.tsx`

**Use this template:**

```tsx
import { Helmet } from "react-helmet-async";
import MedicalPageSchema from "@/components/seo/MedicalPageSchema";
import LastReviewed from "@/components/LastReviewed";

export default function ArthritisExercisesKneeBlog() {
  return (
    <>
      <Helmet>
        <title>Arthritis Exercises for Knee Pain: 7-Move Routine (2026)</title>
        <meta
          name="description"
          content="Step-by-step arthritis exercises for knee pain relief. NICE-aligned routine by HCPC physiotherapist. Free video demonstrations. No equipment needed."
        />
        <meta property="og:title" content="Arthritis Exercises for Knee Pain" />
        <meta property="og:image" content="/images/blog/arthritis-exercises-knee.webp" />
        <meta name="article:published_time" content="2026-09-01" />
        <meta name="article:author" content="Louis Maxwell" />
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 py-12">
        <h1>Arthritis Exercises for Knee Pain: 7-Move Routine (Video Guide)</h1>
        
        <div className="prose prose-lg max-w-none">
          {/* Your blog content here */}
          <p>Introduction...</p>
          <h2>Why Exercise Matters for Knee Arthritis</h2>
          {/* Continue... */}
        </div>

        <LastReviewed date="2026-09-01" by="Louis Maxwell" />
        <MedicalPageSchema />
      </article>
    </>
  );
}
```

### **Phase 3: Deploy**

1. Push to GitHub
2. Pull into Lovable
3. Deploy to livingwitharthritis.org.uk
4. Wait 2 hours for site to rebuild

### **Phase 4: Amplify**

**Day 1:**
- Submit to Google Search Console
- Post on Instagram (carousel)
- Post on Facebook (link)

**Day 2:**
- Instagram Reel
- Reddit answer

**Day 3:**
- Medium republish
- LinkedIn article

**Day 7:**
- Email newsletter

---

## **Blog Post Checklist** (Before Publishing)

**Content:**
- [ ] 2000+ words
- [ ] H1 matches keyword
- [ ] 3-5 H2s (clear sections)
- [ ] 8-10 FAQ questions
- [ ] 3-5 internal links
- [ ] Video or infographic
- [ ] Author bio (Louis Maxwell, HCPC)
- [ ] Last reviewed date
- [ ] CTA to join community/email

**SEO:**
- [ ] Title (60 chars, includes keyword)
- [ ] Meta description (160 chars)
- [ ] og:title, og:description, og:image
- [ ] Schema markup (MedicalPageSchema)
- [ ] Image alt text
- [ ] URL slug (lowercase, hyphens)

**Quality:**
- [ ] Run `npm run lint` (no errors)
- [ ] Run `npm run seo:schema` (valid JSON-LD)
- [ ] Proofread (spell check, grammar)
- [ ] Test links (all work?)
- [ ] Test on mobile (responsive?)

---

## **Monthly Publishing Goals**

**Month 1 (Sept):**
- 12 blog posts (3/week)
- All channels: Instagram, Facebook, Reddit
- No email yet (building list)
- Expected traffic: 30,000-70,000 visits

**Month 2 (Oct):**
- 12 blog posts (3/week)
- Add Medium + LinkedIn
- Start email newsletter (1000 subscribers by end of month)
- Expected traffic: 40,000-80,000 visits

**Month 3 (Nov):**
- 12 blog posts (3/week)
- All channels firing
- Email list: 2000+ subscribers
- Expected traffic: 60,000-120,000 visits

**By Month 4:** Traffic compounds as older posts get found in search

---

## **Success Metrics (Track Weekly)**

| Metric | Month 1 Target | Month 3 Target |
|--------|----------------|----------------|
| Blog posts published | 12 | 36 |
| Total traffic to blog | 30-50k | 60-100k |
| Average post views | 2500-4000 | 1500-2500 (better distribution) |
| Email subscribers | 0 (building) | 2000+ |
| Social engagement | Growing | 10-20% engagement rate |
| Google rankings | 100+ keywords | 200+ keywords |

---

## **Tools You'll Need**

**Free/Low-Cost:**
- Google Search Console (free) — submit blogs
- Google Analytics (free) — track traffic
- Canva (free tier) — design featured images (1200x630px)
- Buffer/Later (free tier) — schedule social posts
- Medium/LinkedIn (free) — syndication

**Optional (Paid):**
- Semrush (£99/month) — keyword research for blog topics
- Grammarly (£10/month) — spell check
- Adobe Express (£10/month) — nicer images

---

## **Your Role vs. Louis's Role**

| Task | Who? |
|------|------|
| Write blog posts | Louis (or hire writer) |
| SEO optimization | You (or I help) |
| Design images | You (Canva free) |
| Social posts | You or VA |
| Email newsletter | You or VA (automation) |
| Publish to website | You |
| Reddit/community | Louis (authenticity) |
| Media pitching | Louis (founder) |

---

**Ready to publish your first blog?** 

Let me know:
1. What's your first blog topic?
2. Will Louis write it or do you want AI draft?
3. Can you create/find a featured image (1200x630px)?
4. When should we target publication (next week)?

Once I know, I'll create the exact file + social schedule for you. 🚀
