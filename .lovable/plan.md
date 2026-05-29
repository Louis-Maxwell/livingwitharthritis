Remove the third trust ribbon item "NICE-aligned guidance" from the hero section.

```
src/components/landing/OAHero.tsx
  ├─ Lines 87-90: delete the <li> element containing
  │   "NICE-aligned guidance" and its child <span> dot.
  │   Remaining two items (HCPC-registered physiotherapists,
  │   CSP members) stay untouched.
```