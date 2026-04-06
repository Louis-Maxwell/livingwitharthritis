
## Plan: Interactive Health Tools Hub

Build a dedicated **Health Tools** page (`/health-tools`) with three interactive, client-side tools — no backend required.

### Tools

**1. Arthritis Symptom Quiz**
- 6–8 multiple-choice questions (joint pain location, duration, morning stiffness, family history, swelling patterns, age of onset)
- Scoring algorithm suggests likely arthritis type (OA, RA, PsA, Gout) with confidence level
- Personalised next-step recommendations and links to relevant condition pages
- Clear medical disclaimer

**2. Inflammation Risk Calculator**
- Sliders and toggles for: diet quality, exercise frequency, BMI range, stress level, sleep quality, smoking status
- Real-time score (0–100) with colour-coded risk band (Low / Moderate / High)
- Actionable tips tailored to the user's weakest areas
- Links to diet hub, exercise hub, and blog articles

**3. Personalised Exercise Plan Generator**
- Select affected joints (multi-select: knee, hip, shoulder, hand, back, ankle)
- Choose fitness level (beginner / intermediate / active)
- Choose goal (pain relief / mobility / strength)
- Generates a 7-day weekly plan pulling from the existing `exerciseJointMatrix` data
- Option to download plan as PDF

### Files

| File | Action |
|------|--------|
| `src/pages/HealthTools.tsx` | Create — hub page with tabs for each tool |
| `src/components/tools/SymptomQuiz.tsx` | Create — multi-step quiz component |
| `src/components/tools/InflammationCalculator.tsx` | Create — calculator with sliders |
| `src/components/tools/ExercisePlanGenerator.tsx` | Create — plan builder using joint matrix |
| `src/App.tsx` | Add `/health-tools` route |
| `src/components/Header.tsx` | Add "Health Tools" link under Track & Manage |

All client-side only. No database changes needed.
