# Living With Arthritis UK - Charity Transformation Plan

## Executive Summary

Transform Living With Arthritis UK from social enterprise messaging to a UK-registered charity with inspirations from Arthritis Society Canada, Arthritis Foundation (US), and Versus Arthritis (UK). Target: 60 million impressions in 2 weeks.

---

## Part 1: Code Changes - Charity Branding

### 1.1 Add Contact Email Throughout Site

#### Update Header Component (`@/components/Header.tsx`)

```tsx
// Add contact email to header navigation
<header role="banner" className="...">
  {/* Skip link first */}
  <a href="#main-content" className="sr-only focus:not-sr-only...">
    Skip to main content
  </a>
  
  <div className="container mx-auto flex items-center justify-between">
    {/* Logo */}
    <div>...</div>
    
    {/* Navigation */}
    <nav role="navigation" aria-label="Main navigation">
      <ul className="flex items-center gap-6">
        <li><a href="/about">About</a></li>
        <li><a href="/plan">The Plan</a></li>
        <li><a href="/resources">Resources</a></li>
        <li><a href="/get-involved">Get Involved</a></li>
        <li>
          <a 
            href="mailto:info@livingwitharthritis.org.uk"
            className="flex items-center gap-2 hover:text-primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact
          </a>
        </li>
        <li>
          <a 
            href="/donate" 
            className="btn-primary px-6 py-2 rounded-md bg-primary text-white"
          >
            Donate
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>
```

#### Update Footer Component (`@/components/Footer.tsx`)

```tsx
<footer role="contentinfo" className="bg-slate-900 text-white py-12">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    
    {/* Column 1: About */}
    <div>
      <h3 className="font-bold text-lg mb-4">Living With Arthritis UK</h3>
      <p className="text-slate-300 text-sm mb-4">
        A UK registered charity providing free, clinically-reviewed osteoarthritis 
        management resources for everyone.
      </p>
      <p className="text-slate-400 text-xs">
        Charity No. [YOUR_CHARITY_NUMBER]
      </p>
    </div>
    
    {/* Column 2: Quick Links */}
    <div>
      <h4 className="font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="/plan" className="text-slate-300 hover:text-white">The Plan</a></li>
        <li><a href="/resources" className="text-slate-300 hover:text-white">Resources</a></li>
        <li><a href="/about" className="text-slate-300 hover:text-white">About Us</a></li>
        <li><a href="/get-involved" className="text-slate-300 hover:text-white">Get Involved</a></li>
        <li><a href="/donate" className="text-slate-300 hover:text-white">Donate</a></li>
      </ul>
    </div>
    
    {/* Column 3: Contact */}
    <div>
      <h4 className="font-semibold mb-4">Get In Touch</h4>
      <ul className="space-y-3 text-sm">
        <li className="flex items-start gap-2">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a 
            href="mailto:info@livingwitharthritis.org.uk"
            className="text-slate-300 hover:text-white break-all"
          >
            info@livingwitharthritis.org.uk
          </a>
        </li>
        <li className="flex items-start gap-2">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-slate-300">United Kingdom</span>
        </li>
      </ul>
      
      {/* Social Links */}
      <div className="flex gap-4 mt-6">
        <a href="https://twitter.com/livingwitharthritisuk" aria-label="Twitter" 
           className="text-slate-300 hover:text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
          </svg>
        </a>
        <a href="https://facebook.com/livingwitharthritisuk" aria-label="Facebook"
           className="text-slate-300 hover:text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
          </svg>
        </a>
        <a href="https://instagram.com/livingwitharthritisuk" aria-label="Instagram"
           className="text-slate-300 hover:text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="17.5" cy="6.5" r="1.5"/>
          </svg>
        </a>
      </div>
    </div>
    
    {/* Column 4: Legal */}
    <div>
      <h4 className="font-semibold mb-4">Legal</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="/privacy" className="text-slate-300 hover:text-white">Privacy Policy</a></li>
        <li><a href="/terms" className="text-slate-300 hover:text-white">Terms of Use</a></li>
        <li><a href="/accessibility" className="text-slate-300 hover:text-white">Accessibility</a></li>
        <li><a href="/complaints" className="text-slate-300 hover:text-white">Complaints Policy</a></li>
      </ul>
    </div>
  </div>
  
  {/* Bottom bar */}
  <div className="container mx-auto mt-12 pt-8 border-t border-slate-700">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
      <p>
        © {new Date().getFullYear()} Living With Arthritis UK. Registered Charity in England and Wales.
      </p>
      <p>
        Made with care for the OA community 🧡
      </p>
    </div>
  </div>
</footer>
```

---

### 1.2 Remove "Social Enterprise" References

#### Find and Replace Across All Files:

Search for these terms and replace:

```bash
# Find all occurrences
grep -r "social enterprise" src/
grep -r "Social Enterprise" src/
grep -r "social-enterprise" src/

# Replace with:
"UK registered charity"
"Registered Charity"
"charity"
```

#### Specific Component Updates:

**OAHero Component** (`@/components/landing/OAHero.tsx`):
```tsx
// BEFORE:
<p>A social enterprise unlocking evidence-based OA care</p>

// AFTER:
<p>A UK registered charity providing free, evidence-based OA care for everyone</p>
```

**About Section**:
```tsx
// BEFORE:
<p>Living With Arthritis UK is a social enterprise dedicated to...</p>

// AFTER:
<p>Living With Arthritis UK is a registered charity dedicated to making 
clinically-reviewed osteoarthritis care accessible to everyone, completely free.</p>
```

**Mission Statement**:
```tsx
// Update MissionStatementBand component
<div className="text-center max-w-3xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Charitable Mission</h2>
  <p className="text-lg md:text-xl text-muted-foreground mb-8">
    As a UK registered charity, we believe everyone living with osteoarthritis 
    deserves access to the best clinical guidance — regardless of their circumstances. 
    That's why everything we publish is free, evidence-based, and written in plain English.
  </p>
  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Charity No. [YOUR_NUMBER] | Registered in England and Wales</span>
  </div>
</div>
```

---

### 1.3 Add Charity Trust Signals

#### Add to Homepage (`pages/index.tsx`):

```tsx
// After OAHero section, add charity credentials strip
<section className="bg-slate-50 border-y border-slate-200 py-6">
  <div className="container mx-auto">
    <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-600">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="font-medium">UK Registered Charity</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">Clinically Reviewed</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span className="font-medium">Open Source</span>
      </div>
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
        <span className="font-medium">100% Free Forever</span>
      </div>
    </div>
  </div>
</section>
```

---

## Part 2: Charity Website Redesign Inspirations

### 2.1 Elements from Arthritis Society Canada

**What to Adopt:**
1. **Impact Stats Prominently** (like their 121.4M impressions)
2. **Personal Stories with Photos** (like Gilbert's testimonial)
3. **Clear Program Sections** (camps, education, support)
4. **Donation Impact Calculator**
5. **Annual Report Highlights**

**Implementation:**

```tsx
// Create ImpactStatsSection.tsx
export default function ImpactStatsSection() {
  return (
    <section className="bg-primary text-white py-16 md:py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Our Impact in 2024
        </h2>
        <p className="text-center text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Together, we're changing lives across the UK
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold mb-2">
              8.75M
            </div>
            <div className="text-xl text-white/90">
              People living with OA in the UK
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold mb-2">
              57,000+
            </div>
            <div className="text-xl text-white/90">
              People reached with free resources
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold mb-2">
              100%
            </div>
            <div className="text-xl text-white/90">
              Free for everyone, always
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 2.2 Elements from Arthritis Foundation (US)

**What to Adopt:**
1. **Research Funding Highlights**
2. **Advocacy & Policy Work**
3. **Community Events Calendar**
4. **Volunteer Opportunities**
5. **Corporate Partnership Section**

**Implementation:**

```tsx
// Create WaysToGiveSection.tsx
export default function WaysToGiveSection() {
  const ways = [
    {
      icon: "💰",
      title: "One-Time Donation",
      description: "Make an immediate impact with a single gift",
      cta: "Donate Now"
    },
    {
      icon: "🔄",
      title: "Monthly Giving",
      description: "Provide sustained support as a regular donor",
      cta: "Give Monthly"
    },
    {
      icon: "🎂",
      title: "Celebration Giving",
      description: "Honor a loved one or milestone",
      cta: "Start a Fundraiser"
    },
    {
      icon: "🏢",
      title: "Corporate Partnerships",
      description: "Partner with us to support your community",
      cta: "Learn More"
    },
    {
      icon: "📜",
      title: "Legacy Giving",
      description: "Leave a lasting impact through your will",
      cta: "Plan Your Legacy"
    },
    {
      icon: "🎁",
      title: "Gifts in Kind",
      description: "Donate goods or services to support our work",
      cta: "Contact Us"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Ways to Support Our Mission
        </h2>
        <p className="text-center text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Every contribution helps us provide free, evidence-based OA care to more people
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ways.map((way, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{way.icon}</div>
              <h3 className="text-xl font-bold mb-2">{way.title}</h3>
              <p className="text-muted-foreground mb-4">{way.description}</p>
              <a href={`/donate?type=${way.title.toLowerCase().replace(/\s+/g, '-')}`} 
                 className="text-primary font-semibold hover:underline">
                {way.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 2.3 Elements from Versus Arthritis (UK)

**What to Adopt:**
1. **Research Breakthroughs Section**
2. **Helpline Promotion**
3. **Local Support Groups Map**
4. **Expert Information Hub**
5. **NHS Integration Messaging**

**Implementation:**

```tsx
// Create SupportServicesSection.tsx
export default function SupportServicesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          How We Support You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Resources */}
          <div className="bg-blue-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Free Clinical Resources</h3>
            <p className="text-lg text-slate-700 mb-4">
              Access our complete open-source OA management plan — written in plain English, 
              reviewed by clinicians, free forever.
            </p>
            <a href="/plan" className="text-blue-600 font-semibold hover:underline">
              Explore the plan →
            </a>
          </div>
          
          {/* Email Support */}
          <div className="bg-green-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Get in Touch</h3>
            <p className="text-lg text-slate-700 mb-4">
              Have questions about managing your OA? Our team is here to help point you 
              to the right resources.
            </p>
            <a href="mailto:info@livingwitharthritis.org.uk" 
               className="text-green-600 font-semibold hover:underline">
              info@livingwitharthritis.org.uk →
            </a>
          </div>
          
          {/* Community */}
          <div className="bg-purple-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Join Our Community</h3>
            <p className="text-lg text-slate-700 mb-4">
              Connect with others living with OA, share experiences, and support each other 
              on the journey.
            </p>
            <a href="/community" className="text-purple-600 font-semibold hover:underline">
              Find your community →
            </a>
          </div>
          
          {/* Volunteer */}
          <div className="bg-orange-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-orange-600 text-white rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Volunteer With Us</h3>
            <p className="text-lg text-slate-700 mb-4">
              Share your skills, lived experience, or time to help us reach more people 
              living with OA across the UK.
            </p>
            <a href="/volunteer" className="text-orange-600 font-semibold hover:underline">
              Get involved →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Part 3: 60 Million Impressions in 2 Weeks - Strategic Plan

### 3.1 Digital Marketing Blitz

#### A. Paid Social Media Campaigns

**Facebook & Instagram Ads**
- Budget: £5,000-£10,000
- Target: UK adults 45-75 with arthritis interests
- Creative: Gilbert-style testimonials (from Canada reference)
- Landing: Homepage with immediate value (free guide download)

```javascript
// Example ad copy
{
  "headline": "Free OA Management Plan — Clinically Reviewed",
  "body": "8.75M people in the UK live with osteoarthritis. Access evidence-based guidance written in plain English, completely free.",
  "cta": "Get Your Free Plan",
  "targeting": {
    "age": "45-75",
    "interests": ["Arthritis", "Chronic pain", "NHS", "Health & wellness"],
    "locations": ["United Kingdom"],
    "placements": ["Facebook Feed", "Instagram Feed", "Instagram Stories"]
  }
}
```

**Twitter/X Campaigns**
- Partner with health influencers
- Thread series on "10 things your GP won't tell you about OA"
- Hashtags: #ArthritisAwareness #OAManagement #ChronicPain #NHS

**LinkedIn Campaigns**
- Target: Healthcare professionals, charity sector
- Content: Research findings, clinical evidence
- Position as thought leader in open-source healthcare

#### B. Content Marketing Surge

**Blog Posts (Publish 2-3 daily)**
1. "The Complete Guide to Managing Osteoarthritis Without Surgery"
2. "Anti-Inflammatory Foods: What Science Says About Diet and OA"
3. "How to Talk to Your GP About Osteoarthritis Treatment Options"
4. "10 Evidence-Based Exercises for Knee Osteoarthritis"
5. "The Truth About Glucosamine and Chondroitin Supplements"
6. "Managing OA Pain: Beyond Paracetamol"
7. "Can Weight Loss Really Help Osteoarthritis? The Evidence"
8. "Physiotherapy vs. Pain Pills: What Works Better for OA?"
9. "The Hidden Costs of Osteoarthritis in the UK"
10. "Young People with OA: Breaking the Age Stereotype"

**Video Content (YouTube & TikTok)**
- 60-second OA myths debunked
- Patient story series
- "Day in the life living with OA"
- Exercise demonstrations
- Doctor Q&A sessions

#### C. PR & Media Outreach

**Press Release Distribution**
```
FOR IMMEDIATE RELEASE

UK Charity Launches Free Open-Source Osteoarthritis Management Plan

Living With Arthritis UK Provides Clinically-Reviewed Guidance to 8.75 Million 
People Affected by OA — Completely Free

WOLVERHAMPTON, UK — [Date] — Living With Arthritis UK, a registered charity, 
today announced the launch of a comprehensive, clinically-reviewed osteoarthritis 
management plan available free of charge to all UK residents...

[Include stats: 8.75M affected, £10bn NHS cost, 1 in 6 adults]
[Quote from founder]
[Quote from clinical reviewer]
[Link to website]

Contact: info@livingwitharthritis.org.uk
```

**Media Targets:**
- BBC Health
- The Guardian Health section
- Daily Mail Health
- ITV This Morning
- Local BBC Radio stations
- Arthritis & health podcasts

#### D. Partnership Activations

**NHS Trusts**
- Share resources with rheumatology departments
- Offer free workshops at hospitals
- Create co-branded materials

**GP Surgeries**
- Provide printable resource sheets
- QR codes in waiting rooms
- Training sessions for practice nurses

**Pharmacy Chains (Boots, Lloyds)**
- In-store displays
- Pharmacy bag stuffers
- Counter cards with QR codes

**Fitness & Wellness**
- Partnership with NHS Couch to 5K
- Collaboration with Age UK fitness programs
- Gym poster campaigns

### 3.2 SEO Optimization Sprint

**Technical SEO Quick Wins:**
```
✅ Fix canonical tags (already done)
✅ Improve page speed to 90+ (see previous doc)
✅ Add schema markup for charity
✅ Create XML sitemap
✅ Submit to Google Search Console
✅ Fix broken links
✅ Add alt text to all images
✅ Implement breadcrumbs
```

**Content SEO:**
- Target 50+ long-tail keywords
- Create pillar pages for each OA topic
- Internal linking strategy
- FAQ schema for common questions

**Local SEO:**
- Google Business Profile
- Local directories (Charity Commission, FindACharity.co.uk)
- Local media outreach in Wolverhampton

### 3.3 Email Marketing Campaign

**Build Email List Fast:**
1. Lead magnet: "7-Day OA Pain Relief Plan" PDF
2. Homepage popup (exit-intent)
3. Blog sidebar signup
4. Social media bio links

**Email Sequence:**
```
Day 1: Welcome + Free Guide
Day 3: Success story
Day 5: Diet tips
Day 7: Exercise video
Day 10: Invitation to community
Day 14: Donation ask (soft)
```

### 3.4 Community & Influencer Outreach

**Micro-Influencer Campaign:**
- Identify 50-100 UK health/wellness influencers
- Offer free resources in exchange for post
- Hashtag: #LivingWithArthritisUK

**Reddit & Forums:**
- r/Arthritis
- r/ChronicPain
- HealthUnlocked OA forums
- Patient.info forums
- Provide value, not spam

**Facebook Groups:**
- Join 20-30 UK arthritis support groups
- Offer expertise and resources
- Build trust before promoting

### 3.5 Event Marketing

**Virtual Events (2 weeks):**
1. Week 1: "Understanding OA: Live Q&A with Clinician"
2. Week 2: "Anti-Inflammatory Cooking Demo with Nutritionist"
3. Daily: Instagram Live "5-Minute OA Exercise"

**Partnerships:**
- Arthritis Action UK
- Versus Arthritis
- Age UK
- NHS England (if possible)

---

## Part 4: Measurement & Analytics

### KPIs to Track:

```javascript
const kpis = {
  impressions: {
    target: 60000000,
    current: 0,
    platforms: {
      facebook: 0,
      instagram: 0,
      twitter: 0,
      linkedin: 0,
      google: 0,
      youtube: 0,
      tiktok: 0,
      email: 0,
      pr: 0
    }
  },
  engagement: {
    websiteVisits: 0,
    downloadedGuide: 0,
    emailSignups: 0,
    videoViews: 0,
    socialFollowers: 0
  },
  conversions: {
    donors: 0,
    volunteers: 0,
    communityMembers: 0
  }
}
```

### Tools to Implement:

1. **Google Analytics 4**
2. **Facebook Pixel**
3. **Hotjar** (heatmaps & recordings)
4. **Mailchimp** or **ConvertKit** (email)
5. **Buffer** or **Hootsuite** (social scheduling)
6. **SEMrush** or **Ahrefs** (SEO tracking)

---

## Part 5: Budget Allocation (£15,000 - 2 weeks)

```
Paid Social Ads:           £6,000 (40%)
PR & Media Distribution:   £2,000 (13%)
Content Creation:          £3,000 (20%)
Influencer Partnerships:   £1,500 (10%)
Email Marketing Tools:     £500  (3%)
SEO Tools & Optimization:  £1,000 (7%)
Event Hosting (virtual):   £500  (3%)
Contingency:              £500  (4%)
────────────────────────────────────
TOTAL:                    £15,000
```

---

## Part 6: Daily Action Plan

### Week 1

**Monday:**
- Launch Facebook/Instagram ads
- Publish 3 blog posts
- Send press release to 50 outlets
- Post to 10 Reddit communities

**Tuesday:**
- Launch Twitter campaign
- Post 5 TikTok videos
- Email outreach to 20 influencers
- Contact NHS trusts

**Wednesday:**
- Host Live Q&A event
- Publish 3 more blog posts
- LinkedIn thought leadership post
- Partner outreach

**Thursday:**
- YouTube video launch
- Instagram Stories series
- Email newsletter to list
- Media follow-ups

**Friday:**
- Facebook Live cooking demo
- Post blog content roundup
- Influencer check-ins
- Analytics review

**Weekend:**
- Social engagement responses
- Community building
- Content scheduling for Week 2

### Week 2

Repeat and scale based on what's working from Week 1 analytics.

---

## Part 7: Code Implementation Summary

### Files to Create:

1. `@/components/landing/ImpactStatsSection.tsx`
2. `@/components/landing/WaysToGiveSection.tsx`
3. `@/components/landing/SupportServicesSection.tsx`
4. `@/components/landing/CharityCredentialsStrip.tsx`
5. `@/components/landing/DonationImpactCalculator.tsx`

### Files to Modify:

1. `@/components/Header.tsx` - Add email, skip link, semantic HTML
2. `@/components/Footer.tsx` - Add charity info, email, legal links
3. `@/components/landing/OAHero.tsx` - Remove "social enterprise"
4. `@/components/landing/MissionStatementBand.tsx` - Update to charity language
5. `pages/index.tsx` - Add new charity sections
6. `globals.css` - Add accessibility improvements
7. All component files - Find/replace "social enterprise" → "charity"

---

## Part 8: Post-Campaign Analysis

### After 2 Weeks:

1. **Calculate actual impressions** across all platforms
2. **Conversion rates**: Impressions → Visits → Actions
3. **Cost per impression** (should be under £0.00025)
4. **ROI on donation** asks
5. **Content performance** (which posts got traction)
6. **Partnership wins** (media coverage, collaborations)
7. **Email list growth**
8. **SEO ranking improvements**

### Scaling for Long-Term:

- **Monthly giving program**
- **Annual fundraising events**
- **Research grants program**
- **Volunteer ambassador network**
- **Corporate partnership tier**
- **Legacy giving program**

---

## Conclusion

This plan transforms your website into a charity-focused platform while executing an aggressive 2-week campaign to reach 60M impressions. Success requires:

✅ Immediate code changes (charity branding, email integration)
✅ Multi-channel paid advertising
✅ Aggressive content production
✅ Strategic partnerships
✅ PR & media outreach
✅ Community building
✅ Daily execution and optimization

**Contact for implementation support:**
info@livingwitharthritis.org.uk

---

**Next Steps:**
1. Review and approve plan
2. Set up analytics tracking
3. Launch code changes
4. Activate ad campaigns
5. Begin content production
6. Execute daily tasks

Let's change lives together! 🧡

