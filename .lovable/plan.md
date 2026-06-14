Add GA4 event tracking to every interactive element in StartHereBand and JointPicker.

1. Add helpers to `src/lib/ga-events.ts`
   - `trackStartHereCard(label: string, href: string)` — fires `start_here_click` with `card_label`, `destination_path`, and `is_donation` (false).
   - `trackJointPicker(joint: string, path: string)` — fires `joint_picker_click` with `joint_label` and `destination_path`.

2. Wire `StartHereBand.tsx`
   - For the 3 cards (diagnosed, joint hurts, exercises & diet), attach `onClick` handlers that call `trackStartHereCard` with the card’s label and destination before navigation.
   - Keep the existing scroll/hash link behaviour for the anchor card.

3. Wire `JointPicker.tsx`
   - For each of the 6 joint buttons, attach an `onClick` handler that calls `trackJointPicker` with the joint name and route before `navigate(to)`.

4. No new dependencies, no UI changes, no layout shifts — only analytics instrumentation.

Files touched:
- `src/lib/ga-events.ts`
- `src/components/landing/StartHereBand.tsx`
- `src/components/landing/JointPicker.tsx`