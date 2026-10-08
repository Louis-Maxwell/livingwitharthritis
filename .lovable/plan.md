# Remove emoji from the website

Emoji appear in about 30 places that visitors can see. They will be removed or replaced with the site's existing simple line icons, so the site looks calmer and more professional.

## What changes

- **Condition pages** (osteoarthritis, knee, hip, hand, shoulder, elbow, foot and ankle): emoji in tips and section labels are removed.
- **Diet, Exercise and Community pages**: emoji in headings, cards and tips are replaced with the matching line icons or removed.
- **Step counter and exercise tracker**: emoji badges (trophy, flame, shoe, crown and so on) are replaced with line icons. Messages like "Goal reached! 🎉" become plain text.
- **Exercise plan download**: the calendar emoji is removed from the downloadable plan.
- **Comparison graphics**: the green tick and red cross emoji become line icons.
- **Article feedback**: "Glad this helped! 💚" becomes "Glad this helped."
- **Old logo file**: the heart and paw emoji are removed from the tagline. This logo is not shown on the site.
- **Articles**: one database article and one built-in guide that contain emoji are cleaned. Only the emoji are removed; the wording stays the same.

## What stays

- Plain text symbols such as the tick, the close cross and the separator dot stay where they are used.
- Older articles that type an emoji before callout labels such as "Helpful tip" will still show the styled tip box.
- Internal notes, guides and comments that visitors never see are not changed.

## Check

- Open the home, condition, diet, exercise, community, step counter and blog pages in the preview. Confirm no emoji remain, the layout is unchanged and there are no errors.
- Run a final search to confirm no emoji remain in the pages and articles visitors see.

## Technical notes

- Visitor-facing files to change: src/pages/{DietHub, CommunityHub, ExerciseHub, ExerciseJointPage}.tsx, src/pages/conditions/*.tsx, src/components/{JointExerciseSection, BlogHelpfulness, ExerciseProgressTracker, Pedometer}.tsx, src/components/pedometer/PedometerApp.tsx, src/components/tools/ExercisePlanGenerator.tsx, src/components/graphics/InfographicElements.tsx, src/lib/generatePdf.ts, src/lib/analytics-monitor.ts (only messages visitors can see), the best-plantar-fasciitis-shoes-women-uk post JSON and public/assets/logos/logo-heart-paw.svg.
- Replace emoji with lucide-react icons (aria-hidden) using existing colour tokens.
- Callouts.tsx keeps its optional-emoji regex.
- Clean the one blog_articles row with emoji using privileged SQL. Update only content and updated_at.
- Markdown docs are left unchanged.
