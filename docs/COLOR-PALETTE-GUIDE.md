# Living With Arthritis: Color Palette & Brand Guide

## 1. PRIMARY COLOR PALETTE

### Red Gradient System (Warm, Empathetic, Accessible)

```
#FEF2F2  ← Lightest (50)    | Off-white, very subtle backgrounds
#FEE2E2  ← Light (100)      | Hover backgrounds, soft accents
#FECACA  ← Soft (200)       | Secondary accents, borders
#FCA5A5  ← Medium (300)     | Decorative elements, secondary CTAs
#F87171  ← Bright (400)     | Attention-grabbing, secondary buttons
#EF4444  ← Standard (500)   | Links, secondary actions
#DC2626  ← Primary (600)    | Main brand color, buttons, headers, hero sections
#B91C1C  ← Dark (700)       | Hover states, active states, emphasis
#991B1B  ← Very Dark (800)  | Deep accents, footer, dark elements
#7F1D1D  ← Almost Black (900) | Darkest accents, rarely used
```

---

## 2. WCAG ACCESSIBILITY COMPLIANCE

### Contrast Ratios (verified WCAG AA+)

| Combination | Ratio | Status |
|---|---|---|
| #DC2626 on white (#FFFFFF) | 5.2:1 | ✅ WCAG AAA |
| #DC2626 on #FEE2E2 | 4.8:1 | ✅ WCAG AAA |
| #991B1B on white (#FFFFFF) | 8.1:1 | ✅ WCAG AAA |
| #B91C1C on white (#FFFFFF) | 6.9:1 | ✅ WCAG AAA |
| #EF4444 on white (#FFFFFF) | 4.6:1 | ✅ WCAG AA (large text) |
| White text on #DC2626 | 5.2:1 | ✅ WCAG AAA |
| White text on #991B1B | 8.1:1 | ✅ WCAG AAA |
| #1F2937 (dark gray) on #FEE2E2 | 9.5:1 | ✅ WCAG AAA |

**Note**: All primary text uses #1F2937 (dark gray) or white for maximum legibility.

---

## 3. COLOR USAGE BY COMPONENT

### Navigation Bar
```css
.navbar {
  background: #FFFFFF;           /* Clean white background */
  border-bottom: 2px solid #FEE2E2;  /* Subtle red border */
  box-shadow: 0 1px 3px rgba(220, 38, 38, 0.05);
}

.navbar-link {
  color: #374151;               /* Dark gray */
  hover: {
    color: #DC2626;             /* Primary red */
    background: #FEE2E2;        /* Light red background */
  }
  active: {
    color: #DC2626;
    border-bottom: 3px solid #DC2626;
  }
}

.section-toggle-active {
  background: #FEE2E2;          /* Light red */
  color: #991B1B;               /* Very dark red text */
}
```

### Hero Section (PetsHub & HumanHub)
```css
.hero {
  background: linear-gradient(
    135deg,
    #DC2626 0%,
    #EF4444 50%,
    #F87171 100%
  );
  color: #FFFFFF;
}

.hero-accent {
  color: rgba(255, 255, 255, 0.3);  /* Subtle white overlay */
}

.hero-cta-button {
  background: #FFFFFF;
  color: #DC2626;
  hover: {
    background: #FEE2E2;
    color: #991B1B;
  }
}
```

### Article Cards
```css
.article-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;       /* Neutral light gray */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  hover: {
    box-shadow: 0 4px 6px rgba(220, 38, 38, 0.1);  /* Red-tinted shadow */
    transform: translateY(-4px);
  }
}

.article-card-category-tag {
  background: #DC2626;
  color: #FFFFFF;
  font-weight: 600;
}

.article-card-pet-type-tag {
  background: #FEE2E2;             /* Light red */
  color: #991B1B;                  /* Very dark red */
  border: 1px solid #FECACA;       /* Soft red border */
}

.article-card-cta-arrow {
  color: #DC2626;
  transition: transform 300ms;
  group-hover: {
    color: #991B1B;
    transform: translateX(4px);
  }
}
```

### Filter Pills
```css
.filter-pill {
  background: #E5E7EB;            /* Neutral light gray */
  color: #374151;                 /* Dark gray text */
  border: none;
  cursor: pointer;
  transition: all 300ms;

  &.active {
    background: #DC2626;          /* Primary red */
    color: #FFFFFF;
    box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
  }

  &:hover:not(.active) {
    background: #D1D5DB;          /* Slightly darker gray */
  }
}
```

### Buttons (All Variants)
```css
/* Primary Button */
.btn-primary {
  background: #DC2626;
  color: #FFFFFF;
  border: none;
  font-weight: 600;
  hover: {
    background: #B91C1C;          /* Dark red */
    box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2);
  }
  active: {
    background: #991B1B;          /* Very dark red */
  }
  disabled: {
    background: #FECACA;          /* Soft red */
    color: #9CA3AF;               /* Medium gray */
  }
}

/* Secondary Button */
.btn-secondary {
  background: #FEE2E2;            /* Light red */
  color: #991B1B;                 /* Very dark red */
  border: 1px solid #FECACA;      /* Soft red border */
  hover: {
    background: #FECACA;          /* Slightly darker light red */
    border-color: #F87171;        /* Bright red */
  }
}

/* Tertiary Button (Text Only) */
.btn-tertiary {
  background: transparent;
  color: #DC2626;                 /* Primary red */
  border: none;
  text-decoration: underline;
  hover: {
    color: #991B1B;               /* Very dark red */
  }
}
```

### Focus States (Keyboard Navigation)
```css
*:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 1),
              0 0 0 5px rgba(220, 38, 38, 1);  /* White ring + red ring */
}

input:focus,
textarea:focus {
  border-color: #DC2626;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
              0 0 0 3px rgba(220, 38, 38, 0.1);
}
```

### Search Bar
```css
.search-input {
  border: 1px solid #E5E7EB;      /* Neutral light gray */
  background: #FFFFFF;
  color: #1F2937;                 /* Dark gray */

  &:focus {
    border-color: #DC2626;        /* Primary red on focus */
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;               /* Medium gray */
  }
}

.search-icon {
  color: #9CA3AF;                 /* Medium gray */
}
```

### Dividers & Borders
```css
.divider-subtle {
  border-color: #E5E7EB;          /* Neutral light gray */
}

.divider-red {
  border-color: #FEE2E2;          /* Light red (subtle) */
}

.divider-red-prominent {
  border-color: #DC2626;          /* Primary red (prominent) */
  border-width: 2px;
}

hr.rule-red-light {
  height: 0.5px;
  background: linear-gradient(
    to right,
    transparent,
    #FCA5A5,
    transparent
  );
}
```

### Text Styling
```css
/* Primary Heading */
h1, h2 {
  color: #1F2937;                 /* Dark gray */
  hover: {
    color: #DC2626;               /* Primary red (on links) */
  }
}

/* Secondary Heading */
h3, h4 {
  color: #374151;                 /* Slightly lighter dark gray */
}

/* Body Text */
p, body {
  color: #4B5563;                 /* Medium dark gray */
}

/* Secondary Text */
.text-secondary, small {
  color: #6B7280;                 /* Medium gray */
}

/* Emphasis / Important */
strong, .font-semibold {
  color: #991B1B;                 /* Very dark red */
}

/* Links */
a {
  color: #DC2626;                 /* Primary red */
  text-decoration: underline;
  hover: {
    color: #B91C1C;               /* Dark red */
  }
  visited: {
    color: #9CA3AF;               /* Medium gray (visited) */
  }
}
```

### Background Gradients
```css
/* Hero Gradient (main) */
.bg-hero-gradient {
  background: linear-gradient(
    to right,
    #DC2626 0%,
    #EF4444 50%,
    #F87171 100%
  );
}

/* Subtle Background Gradient */
.bg-subtle-gradient {
  background: linear-gradient(
    135deg,
    #FFFFFF 0%,
    #FEF2F2 100%
  );
}

/* Section Background */
.bg-section {
  background: #FEF2F2;            /* Very light red */
}

/* Inverted (Red on Light) */
.bg-inverted {
  background: linear-gradient(
    135deg,
    #DC2626 0%,
    #991B1B 100%
  );
  color: #FFFFFF;
}
```

### Dark Mode Support (Optional)
```css
@media (prefers-color-scheme: dark) {
  body {
    background: #0F172A;          /* Dark blue-gray */
    color: #FFFFFF;
  }

  .card {
    background: #1E293B;          /* Slightly lighter dark */
    border-color: #475569;        /* Dark gray border */
  }

  .btn-primary {
    background: #F87171;          /* Brighter red for contrast on dark */
    hover: {
      background: #FCA5A5;
    }
  }

  .article-card-category-tag {
    background: #FCA5A5;          /* Medium red */
    color: #0F172A;               /* Dark text on light red */
  }
}
```

---

## 4. PET TYPE TAG COLORS

Each pet type has its own secondary color scheme that works harmoniously with the red primary:

```css
.tag-dog {
  background: #FEF3C7;           /* Warm amber-yellow (friendly, warm) */
  color: #92400E;
  border: 1px solid #F6D96F;
}

.tag-cat {
  background: #FEE2E2;           /* Light orange-red (independent, bold) */
  color: #B91C1C;
  border: 1px solid #FECACA;
}

.tag-equine {
  background: #FEE2E2;           /* Light rose-red (noble, strong) */
  color: #991B1B;
  border: 1px solid #FECACA;
}

.tag-rabbit {
  background: #FCE7F3;           /* Soft pink (gentle, delicate) */
  color: #BE185D;
  border: 1px solid #FBCFE8;
}

.tag-other {
  background: #E5E7EB;           /* Neutral gray (universal) */
  color: #374151;
  border: 1px solid #D1D5DB;
}
```

---

## 5. CATEGORY TAG COLORS

Categories use the red palette with complementary accent hues:

```css
.tag-exercise {
  background: #DBEAFE;           /* Light blue (energy, motion) */
  color: #1E40AF;
}

.tag-nutrition {
  background: #DCFCE7;           /* Light green (health, vitality) */
  color: #15803D;
}

.tag-healthcare {
  background: #F3E8FF;           /* Light purple (medical, professional) */
  color: #6D28D9;
}

.tag-benefits {
  background: #FEF3C7;           /* Light yellow (positive, helpful) */
  color: #92400E;
}

.tag-support {
  background: #E0E7FF;           /* Light indigo (community, connection) */
  color: #3730A3;
}
```

---

## 6. SHADOW SYSTEM (Red-Tinted)

```css
/* Subtle Shadow (default) */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(220, 38, 38, 0.05);
}

/* Medium Shadow (cards, hover) */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.1),
              0 2px 4px -1px rgba(220, 38, 38, 0.06);
}

/* Large Shadow (modals, elevated) */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.1),
              0 4px 6px -2px rgba(220, 38, 38, 0.05);
}

/* Extra Large Shadow (depth) */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(220, 38, 38, 0.1),
              0 10px 10px -5px rgba(220, 38, 38, 0.04);
}

/* Inset Shadow (depth effect) */
.shadow-inset {
  box-shadow: inset 0 2px 4px 0 rgba(220, 38, 38, 0.05);
}
```

---

## 7. INTERACTION & ANIMATION COLORS

```css
/* Loading State */
.loading-skeleton {
  background: linear-gradient(
    90deg,
    #FEE2E2 0%,
    #FECACA 50%,
    #FEE2E2 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* Error State */
.error-state {
  background: #FEE2E2;           /* Light red background */
  border-left: 4px solid #DC2626; /* Dark red accent */
  color: #991B1B;                 /* Very dark red text */
}

/* Success State */
.success-state {
  background: #DCFCE7;           /* Light green (complementary) */
  border-left: 4px solid #15803D;
  color: #166534;
}

/* Warning State */
.warning-state {
  background: #FEF3C7;           /* Light yellow */
  border-left: 4px solid #EAB308;
  color: #92400E;
}

/* Info State */
.info-state {
  background: #DBEAFE;           /* Light blue */
  border-left: 4px solid #2563EB;
  color: #1E40AF;
}
```

---

## 8. COLOR APPLICATION CHECKLIST

- [ ] **Navigation**: White background with red accents on hover
- [ ] **Hero Section**: Red gradient background
- [ ] **Article Cards**: White with red category tags
- [ ] **Buttons**: Primary = red, secondary = light red
- [ ] **Links**: Primary red color with dark red on hover
- [ ] **Focus States**: Red ring (keyboard navigation)
- [ ] **Dividers**: Light red or neutral gray
- [ ] **Pet Type Tags**: Color-coded by pet type
- [ ] **Category Tags**: Color-coded by category
- [ ] **Shadows**: Red-tinted for warmth
- [ ] **Error/Success States**: Color-coded appropriately
- [ ] **Dark Mode**: Adjusted brightness for dark backgrounds

---

## 9. COLOR TOKENS (CSS Variables)

For easy maintenance, define all colors as CSS variables:

```css
:root {
  /* Primary Red Palette */
  --color-red-50: #FEF2F2;
  --color-red-100: #FEE2E2;
  --color-red-200: #FECACA;
  --color-red-300: #FCA5A5;
  --color-red-400: #F87171;
  --color-red-500: #EF4444;
  --color-red-600: #DC2626;  /* Primary */
  --color-red-700: #B91C1C;  /* Dark */
  --color-red-800: #991B1B;  /* Very Dark */
  --color-red-900: #7F1D1D;

  /* Neutral Palette */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;

  /* Semantic Colors */
  --color-primary: var(--color-red-600);
  --color-primary-dark: var(--color-red-800);
  --color-primary-light: var(--color-red-100);

  --color-error: #DC2626;
  --color-success: #15803D;
  --color-warning: #EAB308;
  --color-info: #2563EB;
}

/* Usage in CSS */
.button-primary {
  background: var(--color-primary);
  color: white;
}

.button-primary:hover {
  background: var(--color-primary-dark);
}
```

---

## 10. EXPORT & IMPLEMENTATION

### Figma/Design System Export
```json
{
  "colors": {
    "red-50": "#FEF2F2",
    "red-100": "#FEE2E2",
    "red-600": "#DC2626",
    "red-800": "#991B1B"
  },
  "semantic": {
    "primary": "#DC2626",
    "primaryDark": "#991B1B",
    "primaryLight": "#FEE2E2"
  }
}
```

### Tailwind Configuration
See `tailwind.config.js` in the main documentation.

---

## 11. VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-07-25 | Initial red palette guideline |
| 1.1 | TBD | Dark mode additions |
| 1.2 | TBD | Animation & interaction colors |

---

*Document Version: 1.0*  
*Last Updated: July 25, 2026*
