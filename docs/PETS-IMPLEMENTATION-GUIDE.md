# Living With Arthritis: Pets Section Implementation Guide

## Executive Summary

This document provides a complete technical roadmap for integrating a dedicated **"Pets" section** into the Living With Arthritis platform. The expansion enables the charity to serve both human and animal arthritis communities with a unified, accessible, and scalable interface.

---

## 1. PROJECT OVERVIEW

### Mission & Goals
- **Unified Mission**: Support both humans and animals living with arthritis
- **Accessibility**: WCAG 2.1 AA compliant design
- **Scalability**: Component-based architecture to support future expansions
- **User Experience**: Intuitive navigation between human and pet content without cognitive overload

### Key Features
- ✅ Dedicated pet-focused article hub
- ✅ Pet-type filtering (dogs, cats, horses, rabbits, etc.)
- ✅ Category-based organization (exercise, nutrition, healthcare, support)
- ✅ Seamless navigation between human and pet sections
- ✅ Redesigned logo unifying both missions
- ✅ Warm red color palette (accessibility + emotional warmth)
- ✅ Responsive design (mobile-first)

---

## 2. ARCHITECTURE OVERVIEW

### Tech Stack
```
Frontend:
- React 18+ with TypeScript
- Next.js 13+ (App Router)
- Tailwind CSS 3.x
- Shadcn/UI components
- Lucide React icons

Backend:
- Node.js / Express (or existing API)
- RESTful endpoints (/api/articles, /api/pet-articles)
- Data validation & filtering

Database:
- PostgreSQL / MongoDB (article metadata)
- CDN for images & PDFs

Styling:
- Tailwind CSS with custom red palette
- CSS-in-JS for dynamic theming (optional)
```

### Component Tree
```
App
├── Layout
│   ├── MainNav (with Human/Pets toggle)
│   └── Footer
├── Pages
│   ├── / (Home - shows both sections)
│   ├── /learn (Human-focused hub)
│   │   ├── HumanHub
│   │   ├── /conditions, /exercise, /nutrition, /support
│   │   └── /[slug] (individual article)
│   └── /pets (Pet-focused hub)
│       ├── PetsHub (main grid with filters)
│       ├── /by-type, /exercise, /nutrition, /resources
│       └── /[slug] (individual pet article)
└── Components
    ├── ArticleCard (shared)
    ├── PetTypeTag
    ├── SearchAndFilter
    ├── ArticleGrid
    └── RelatedArticles
```

---

## 3. FRONTEND IMPLEMENTATION

### 3.1 Navigation Integration

**Update Main Navigation** (`src/components/Navigation/MainNav.tsx`):

```typescript
// Key Features:
- Sticky header with red color scheme
- Human/Pets toggle for section switching
- Mobile-responsive hamburger menu
- Current section indicator
- Logo with heart + paw symbolism
```

**Navigation Structure**:
```
Desktop:
├── Logo
├── Links (contextual: human OR pet links)
└── [❤️ Humans | 🐾 Pets] toggle

Mobile:
├── Logo
├── Menu icon
└── Mobile drawer with section tabs
```

### 3.2 Article Components

**ArticleCard.tsx** (Reusable for both human and pet articles):
- Thumbnail image with lazy loading
- Title, excerpt, read time
- Category tag + pet type tag
- Date, author, CTA button
- Hover effects (scale, shadow, text color)
- Accessibility attributes (alt text, ARIA labels)

**PetTypeTag.tsx** (Pet-specific):
- Emoji icons (🐕 🐱 🐴 🐰)
- Color-coded by pet type
- Configurable size (sm, md, lg)

### 3.3 Hub Pages

**PetsHub.tsx** (Main pet articles page):

**Features**:
1. **Hero Section**
   - Gradient red background
   - Compelling headline
   - Decorative paw print accents
   - Pet emoji quick links

2. **Filter & Search**
   - Search bar (title/excerpt)
   - Pet type filters (Dog, Cat, Horse, Rabbit, Other)
   - Category filters (Exercise, Nutrition, Healthcare, Support)
   - Real-time result counter

3. **Article Grid**
   - Responsive columns (1 mobile, 2 tablet, 3 desktop)
   - Loading skeletons
   - "No results" empty state with reset button
   - Smooth animations

4. **Call-to-Action**
   - "Suggest a topic" button
   - Links to human section
   - Social sharing

---

## 4. LOGO REDESIGN

### 4.1 Design Concept: "Heart & Paw"

**Symbolism**:
- **Red Heart**: Human care, warmth, compassion, health focus
- **Paw Print**: Animal care, trust, companionship, veterinary expertise
- **Overlap**: Unity of mission, holistic care approach

**Visual Principles**:
- Clean, modern lines
- Accessible color contrast (WCAG AA+)
- Scalable (works at favicon size to billboard)
- Emotive but professional
- Warm red palette (not clinical)

### 4.2 Color Palette

```
Primary Red:
- #DC2626 (main logo, buttons, links)
- #B91C1C (hover states, dark accents)
- #991B1B (deep accents, dark mode)

Supporting:
- #FCA5A5 (light red, subtle accents)
- #FEE2E2 (very light red, backgrounds)

Neutrals:
- #1F2937 (text, dark gray)
- #6B7280 (secondary text)
- #F3F4F6 (backgrounds)
```

### 4.3 Logo Files

Provide in multiple formats:
```
assets/logos/
├── logo-heart-paw.svg         (full logo with wordmark)
├── logo-mark-minimal.svg      (icon mark only)
├── logo-dark.svg              (dark background version)
├── logo-favicon.ico           (32x32 favicon)
└── logo-color-guide.pdf       (brand guidelines)
```

---

## 5. BACKEND API SPECIFICATION

### Endpoints

**GET /api/articles**
```json
Query Parameters:
- category (exercise, nutrition, benefits, healthcare, conditions)
- keyword (search query)
- author (filter by author)
- limit (max results, default 20)
- offset (pagination)

Response:
{
  "success": true,
  "articles": [
    {
      "id": "uuid",
      "slug": "string",
      "title": "string",
      "excerpt": "string",
      "thumbnail": "url",
      "readTime": 5,
      "date": "2026-07-25",
      "category": "exercise",
      "keyword": "knee pain exercises",
      "author": "Living With Arthritis UK",
      "reviewed_by": "Dr. Jane Smith"
    }
  ],
  "total": 100,
  "page": 1,
  "pageSize": 20
}
```

**GET /api/pet-articles**
```json
Query Parameters:
- petType (dog, cat, equine, rabbit, other, or all)
- category (exercise, nutrition, healthcare, support)
- condition (osteoarthritis, rheumatoid, hip-dysplasia, etc.)
- limit (default 20)
- offset (pagination)

Response:
{
  "success": true,
  "articles": [
    {
      "id": "uuid",
      "slug": "string",
      "title": "string",
      "petType": "dog",
      "petCondition": "osteoarthritis",
      "excerpt": "string",
      "thumbnail": "url",
      "readTime": 8,
      "date": "2026-07-25",
      "category": "exercise",
      "author": "Vet Advisor",
      "reviewed_by": "Dr. Sarah Johnson, DVM"
    }
  ],
  "total": 45,
  "page": 1,
  "pageSize": 20
}
```

**GET /api/articles/:slug**
```json
Response:
{
  "success": true,
  "article": {
    "id": "uuid",
    "slug": "knee-exercises-dogs",
    "title": "Best Exercises for Dogs with Knee Arthritis",
    "content": "<html>...",
    "petType": "dog",
    "category": "exercise",
    "relatedArticles": ["uuid1", "uuid2"],
    ...
  }
}
```

---

## 6. DATA FETCHING STRATEGY

### 6.1 Hooks

**useArticles(filters?, limit?)** - Fetch human articles
```typescript
const { articles, isLoading, error, refetch } = useArticles({
  category: 'exercise',
  keyword: 'knee pain'
}, 20);
```

**usePetArticles(petType?, filters?, limit?)** - Fetch pet articles
```typescript
const { articles, isLoading, error, refetch } = usePetArticles(
  'dog',
  { category: 'nutrition' },
  20
);
```

**useArticleBySlug(slug, isPet?)** - Fetch single article
```typescript
const { article, isLoading, error } = useArticleBySlug('knee-exercises-dogs', true);
```

### 6.2 Caching Strategy

**Implement SWR or React Query**:
```typescript
// Example with SWR
import useSWR from 'swr';

const { data, error, isLoading } = useSWR('/api/pet-articles?petType=dog', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000, // 1 minute
  focusThrottleInterval: 5 * 60 * 1000, // 5 minute refocus
});
```

---

## 7. STYLING & ACCESSIBILITY

### 7.1 Color Palette Usage

```css
/* Primary Actions */
button.btn-primary { @apply bg-red-600 hover:bg-red-700 text-white; }

/* Secondary Actions */
button.btn-secondary { @apply bg-red-100 hover:bg-red-200 text-red-900; }

/* Backgrounds */
section.hero { @apply bg-gradient-to-r from-red-700 via-red-600 to-red-500; }

/* Accents & Borders */
hr { @apply border-red-200; }
.tag { @apply bg-red-100 text-red-900; }

/* Focus States (keyboard navigation) */
a:focus, button:focus { @apply outline-none ring-2 ring-red-600 ring-offset-2; }
```

### 7.2 Accessibility Checklist

- [ ] **WCAG 2.1 AA** compliant
- [ ] **Color contrast** minimum 4.5:1 for text
- [ ] **Semantic HTML** (`<article>`, `<nav>`, `<button>`, etc.)
- [ ] **ARIA labels** for filter buttons, pet type tags
- [ ] **Keyboard navigation** fully functional
- [ ] **Screen reader** friendly (alt text for all images)
- [ ] **Focus indicators** visible and clear
- [ ] **Mobile touch targets** minimum 48x48px
- [ ] **Reduced motion** support (@prefers-reduced-motion)
- [ ] **Dark mode** optional (red palette works in both)

### 7.3 Responsive Design

```
Mobile (< 768px):
- Single column article grid
- Full-width filters
- Hamburger navigation

Tablet (768px - 1024px):
- Two column article grid
- Sidebar filters (optional)
- Horizontal navigation

Desktop (> 1024px):
- Three column article grid
- Sidebar filters
- Full horizontal navigation
```

---

## 8. CONTENT STRUCTURE FOR PET ARTICLES

### 8.1 Article Frontmatter

```yaml
---
id: uuid
slug: best-exercises-dogs-with-hip-dysplasia
title: Best Exercises for Dogs with Hip Dysplasia
excerpt: Low-impact exercises to strengthen muscles around the hips and reduce pain in dogs with hip dysplasia.
thumbnail: /images/dog-exercise.jpg
readTime: 7
date: 2026-07-25
category: exercise
petType: dog
petCondition: hip-dysplasia
author: Dr. Sarah Johnson
author_title: Veterinary Physical Therapist
reviewer: Dr. Emma Wilson
reviewer_title: DVM, Veterinary Surgeon
---
```

### 8.2 Recommended Article Structure

1. **Quick Answer** (50-70 words) - summary for AI citation
2. **Introduction** - context and importance
3. **H2 Sections** (4-6):
   - Understanding the condition
   - Exercise benefits
   - Safe exercise techniques
   - Frequency & duration
   - When to avoid exercise
4. **Q&A Section** - common questions
5. **Related Resources** - links to vet services, support groups
6. **Disclaimer** - "consult your vet"

---

## 9. DEPLOYMENT CHECKLIST

### Pre-Launch
- [ ] All components render correctly (visual testing)
- [ ] Lighthouse audit (Performance > 90, Accessibility > 95)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness tested on real devices
- [ ] API endpoints stress tested
- [ ] Database backup & recovery plan
- [ ] CDN configured for images & assets
- [ ] Analytics setup (Google Analytics 4)
- [ ] Error tracking (Sentry or similar)
- [ ] Favicon & logo assets deployed

### Launch Day
- [ ] Sitemap updated (new /pets/* routes)
- [ ] Robots.txt updated for search engines
- [ ] Meta tags & OG tags for social sharing
- [ ] Email announcement to existing users
- [ ] Blog post launching new section
- [ ] Social media announcement (Twitter, LinkedIn, Facebook)
- [ ] Monitor error logs & user behavior

### Post-Launch (Week 1)
- [ ] Monitor article engagement metrics
- [ ] Check for bugs reported by users
- [ ] Verify mobile experience on various devices
- [ ] Check search engine indexing
- [ ] Review user feedback / survey

---

## 10. FUTURE ENHANCEMENTS

### Phase 2 Features
- Pet condition tracker app
- Owner discussion forums
- Vet consultation booking integration
- Pet health records export (PDF)
- Email newsletter (pet health tips)
- Multilingual support (French, German, Spanish)

### Phase 3 Features
- AI chatbot for pet health Q&A
- Video exercise demonstrations
- Printable exercise plans
- Integration with veterinary practices
- Pet community social features

---

## 11. MONITORING & ANALYTICS

### Key Metrics to Track

**Engagement**:
- Page views (human vs. pets)
- Scroll depth
- Time on page
- Click-through rate (article to detail page)

**User Behavior**:
- Filter usage patterns
- Search queries
- Pet type distribution
- Device/browser breakdown

**Performance**:
- Page load time (target: < 2s)
- Lighthouse scores
- Error rates
- API response times

### Analytics Setup Example

```typescript
// src/lib/analytics.ts
export const trackEvent = (category: string, action: string, label?: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

// Usage:
trackEvent('pets', 'filter_by_type', 'dog');
trackEvent('article', 'read_full', 'best-exercises-dogs');
```

---

## 12. TESTING STRATEGY

### Unit Tests
```typescript
// ArticleCard.test.tsx
describe('ArticleCard', () => {
  it('renders title and excerpt', () => {
    const { getByText } = render(<ArticleCard {...mockProps} />);
    expect(getByText('Title')).toBeInTheDocument();
  });
  
  it('displays pet type tag when isPet=true', () => {
    const { getByText } = render(<ArticleCard {...mockProps} isPet={true} />);
    expect(getByText('Dogs')).toBeInTheDocument();
  });
});
```

### Integration Tests
```typescript
// PetsHub.test.tsx
describe('PetsHub', () => {
  it('filters articles by pet type', async () => {
    render(<PetsHub articles={mockArticles} />);
    const dogButton = screen.getByRole('button', { name: /dogs/i });
    fireEvent.click(dogButton);
    expect(screen.getByText('3 of 10 articles')).toBeInTheDocument();
  });
});
```

### E2E Tests
```typescript
// pets.spec.ts (Cypress)
describe('Pets Section', () => {
  beforeEach(() => {
    cy.visit('/pets');
  });

  it('loads and displays pet articles', () => {
    cy.get('[data-testid="article-card"]').should('have.length', 12);
  });

  it('filters articles by pet type', () => {
    cy.contains('button', 'Dogs').click();
    cy.get('[data-testid="article-card"]').should('have.length.lessThan', 12);
  });
});
```

---

## 13. SECURITY CONSIDERATIONS

- [ ] **Input Validation**: Sanitize search queries, filter parameters
- [ ] **CORS**: Restrict API endpoints to approved origins
- [ ] **Rate Limiting**: Prevent abuse of search/filter endpoints
- [ ] **CSP Headers**: Content Security Policy to prevent XSS
- [ ] **HTTPS**: All traffic encrypted
- [ ] **Authentication**: If admin editing needed, use JWT tokens
- [ ] **Data Privacy**: GDPR compliant (no user tracking without consent)

---

## 14. QUICK START GUIDE

### 1. Clone and Setup
```bash
git clone <repo>
cd livingwitharthritis
npm install
npm run dev
```

### 2. Create Article Component
```bash
cp /src/components/ArticleCard.tsx.template src/components/ArticleCard.tsx
```

### 3. Update Navigation
```typescript
// src/app/layout.tsx
import MainNav from '@/components/Navigation/MainNav';
import LogoHeartPaw from '@/assets/logos/logo-heart-paw.svg';

export default function RootLayout() {
  return (
    <>
      <MainNav logo={<LogoHeartPaw />} />
      {/* ... */}
    </>
  );
}
```

### 4. Add Pet Routes
```typescript
// src/app/(pets)/pets/page.tsx
import PetsHub from '@/components/PetsHub';
import { usePetArticles } from '@/hooks/useArticles';

export default function PetsPage() {
  const { articles } = usePetArticles('all');
  return <PetsHub articles={articles} />;
}
```

### 5. Run Tests
```bash
npm run test
npm run test:e2e
```

---

## 15. SUPPORT & RESOURCES

- **Documentation**: `/docs`
- **Component Storybook**: `npm run storybook`
- **Design System**: See `tailwind.config.js`
- **Accessibility Guide**: See `/docs/a11y.md`
- **Deployment Guide**: See `/docs/deployment.md`

---

## Summary

This implementation provides a **scalable, accessible, and user-friendly** expansion of Living With Arthritis to serve both human and pet communities. The red-centered design conveys warmth and care, while the component-based architecture ensures maintainability and future extensibility.

**Next Steps**:
1. Review design with stakeholders
2. Set up development environment
3. Begin component implementation
4. Create seed data for pet articles
5. Schedule accessibility audit
6. Plan launch timeline

---

*Document Version: 1.0*  
*Last Updated: July 25, 2026*  
*Prepared for: Living With Arthritis UK*
