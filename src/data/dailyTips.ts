import { tipDailyLiving, tipHealthTips, tipMorningStretches, tipStayHydrated, tipAntiInflammatory, tipWalk, tipSleep, tipPaceYourself } from "@/data/images";

export interface DailyTip {
  slug: string;
  icon: string; // lucide icon name
  title: string;
  metaTitle?: string; // CTR-optimized <title> tag (falls back to title)
  desc: string;
  image: string;
  detail: string;
}

export const dailyLivingIntro = {
  title: "Daily Living for Joint Health",
  subtitle: "Practical UK habits that ease stiffness and support everyday life with arthritis.",
  image: tipDailyLiving,
  overviewImage: tipHealthTips,
  content: `Living well with arthritis is less about perfect routines and more about small, repeatable habits that protect your joints day to day.

Joints need regular, gentle movement, steady hydration, and enough rest to recover. Long spells of sitting, skipping meals, or pushing through every good day often make stiffness and fatigue worse.

Focus on four building blocks:

• Movement — change position often; short walks and light stretches keep joints from locking up
• Food — favour oily fish, nuts, fruit, vegetables and whole foods; cut back on ultra-processed snacks where you can
• Hydration — water helps joints move more comfortably
• Rest — consistent sleep and pacing reduce next-day flares

At home, favour ergonomic tools (larger-handled cutlery, jar openers, perching stools) and plan tasks in short bursts. On tougher days, scale activity rather than stopping altogether — Versus Arthritis and NHS advice both emphasise staying as active as you safely can.

These habits will not replace prescribed treatment, but they make daily life more manageable alongside your care team.`,
  tipsOverview: `Everyday tips work best when they are short, realistic and easy to repeat. Use them as a menu, not a checklist to finish in one day.

1. Start the morning with a glass of water and a few gentle stretches before getting busy.
2. Stand or walk for a minute each hour if you sit for long periods.
3. Keep joint-friendly snacks ready — walnuts, berries, yoghurt, vegetable sticks.
4. Pace chores: one room or one task, then a short rest.
5. Warmth helps many people — layers, warm showers, or a heat pack before activity.
6. Note flares in a simple diary so you can spot patterns and discuss them with your GP or rheumatology team.
7. Ask about occupational therapy aids if dressing, cooking or bathing is becoming hard.
8. Protect sleep: a regular bedtime and a cool, dark room make a real difference to pain and mood.

Small changes, kept up, usually beat ambitious plans you cannot sustain.`,
};

export const dailyTips: DailyTip[] = [
  {
    slug: "morning-stretches",
    icon: "Sun",
    title: "Morning Stretches",
    desc: "Start each day with 5 minutes of gentle stretching to ease morning stiffness.",
    image: tipMorningStretches,
    detail: `Overnight rest often leaves joints stiff. Five minutes of gentle stretching before you rush into the day can ease that "gel" feeling and get blood flowing.

Try a simple sequence, moving only within a comfortable range:
• Slow neck turns
• Shoulder shrugs and rolls
• Gentle arm circles
• Seated or standing torso twists
• Hamstring or calf stretches
• Ankle circles and flexes

Breathe steadily and avoid bouncing. If a movement sharp-pains a joint, skip it and ask a physiotherapist for arthritis-friendly alternatives. Bed-based stretches are fine on harder mornings.

Pair stretches with your first drink of water, then ease into the day rather than leaping straight into chores.`,
  },
  {
    slug: "stay-hydrated",
    icon: "Droplets",
    title: "Stay Hydrated",
    desc: "Aim for 6-8 glasses of water daily — dehydration can worsen joint stiffness.",
    image: tipStayHydrated,
    detail: `Aim for about 6–8 glasses of fluid a day (more if you are active or it is hot). Dehydration can leave you more fatigued and joints feeling stiffer.

Practical ways to keep up:
• Drink a glass of water on waking
• Keep a reusable bottle with you
• Include hydrating foods such as cucumber, melon and soup
• Flavour water with lemon, mint or berries if plain water puts you off
• Count tea and coffee towards fluids, but balance with water

Dark urine, dry mouth and an afternoon slump can be early signs you need more fluid. Steady sipping through the day beats large gulps only when you remember.`,
  },
  {
    slug: "anti-inflammatory-snacks",
    icon: "Apple",
    title: "Anti-inflammatory Snacks",
    desc: "Keep walnuts, berries, and dark leafy greens handy for quick, joint-friendly snacking.",
    image: tipAntiInflammatory,
    detail: `Handy snacks help you avoid long gaps that leave energy crashing — especially useful when cooking feels hard on a flare day.

Good everyday options:
• A small handful of walnuts or mixed nuts
• Fresh or frozen berries
• Greek yoghurt with fruit
• Vegetable sticks with hummus
• Apple slices with nut butter
• A spinach and berry smoothie when chewing is tiring

Oily fish, nuts and colourful plants are linked with lower inflammation as part of a balanced diet; they are not a cure on their own. Keep portions modest if you are watching weight — less load on weight-bearing joints often helps pain.

Prep a few options when you have energy so they are ready on tougher days.`,
  },
  {
    slug: "walk-20-minutes",
    icon: "Footprints",
    title: "Walk 20 Minutes",
    metaTitle: "20-Minute Daily Walk for Arthritis: Simple Pain Relief Routine",
    desc: "A steady 20-minute walk can ease stiffness, lift mood and support joint health — start gently.",
    image: tipWalk,
    detail: `A daily 20-minute walk is one of the simplest ways to keep joints moving, support heart health and lift mood. NHS and Versus Arthritis guidance both encourage regular, low-impact activity for arthritis.

Keep the pace comfortable — you should still be able to talk. Choose flat routes when joints are sore; parks and quiet streets often feel easier than busy pavements.

Build up gradually:
• Start with shorter walks if 20 minutes is too much
• Use supportive shoes
• On wet or cold days, try a shopping centre, treadmill or marching on the spot at home
• Walking poles can steady balance and share load through the arms

Consistency matters more than speed. If pain spikes sharply during or after walking (beyond normal muscle ache), shorten the next session and check with a physiotherapist or your clinical team.`,
  },
  {
    slug: "prioritise-sleep",
    icon: "Moon",
    title: "Prioritise Sleep",
    desc: "Quality sleep reduces inflammation — aim for 7-9 hours with a consistent schedule.",
    image: tipSleep,
    detail: `Aim for 7–9 hours with a regular bedtime and wake time. Poor sleep often heightens pain sensitivity and next-day fatigue.

Sleep habits that help many people with arthritis:
• Cool, dark, quiet bedroom
• Screens off around 30 minutes before bed
• Same routine on weekdays and weekends where possible
• Side sleeping with a pillow between the knees, or back sleeping with a pillow under the knees

A warm shower or heat pack before bed can ease stiff joints. If pain regularly wakes you, talk to your GP about timing of pain relief, mattress support or a sleep referral — do not struggle alone for months.`,
  },
  {
    slug: "pace-yourself",
    icon: "Lightbulb",
    title: "Pace Yourself",
    desc: "Balance activity with rest. Break tasks into smaller chunks to protect your joints.",
    image: tipPaceYourself,
    detail: `Pacing means spreading activity so you stay involved in life without crashing the next day. Boom-and-bust cycles — overdoing it on good days — are a common trigger for flares.

Practical pacing:
• Break housework into one room or one task at a time
• Use short work/rest cycles (for example 20–25 minutes on, 5 minutes off)
• Sit for food prep; use kitchen aids where helpful
• Split shopping across days or use online delivery when needed
• Plan rest after demanding appointments

Pacing is not giving up. It is choosing a sustainable pace so you can keep doing what matters — family, work, hobbies — more often. Occupational therapists can help tailor this to your condition and home.`,
  },
];
