## Remove emojis from donation popup

### Target file
`src/components/DonationNotification.tsx`

### Changes
1. **Delete the emoji array** — remove `const emojis = ["🥳", "❤️", "🙏", "💚", "🌟", "✨", "💪", "🎉"];` and its import/usage.
2. **Remove emoji after donation amount** — delete `<span className="ml-1">{emoji}</span>` on line 120.
3. **Remove location pin emoji** — replace `<span>📍</span>` with a Lucide `MapPin` icon (or remove entirely if the icon isn't desired).

### Out of scope
No layout, spacing, or colour changes. No other files touched.