import { tipDailyLiving, tipHealthTips, tipMorningStretches, tipStayHydrated, tipAntiInflammatory, tipWalk, tipSleep, tipPaceYourself } from "@/data/images";

export interface DailyTip {
  slug: string;
  icon: string; // lucide icon name
  title: string;
  desc: string;
  image: string;
  detail: string;
}

export const dailyLivingIntro = {
  title: "Daily Living for Joint Health",
  subtitle: "A holistic approach to managing joint stiffness and arthritis through everyday habits.",
  image: tipDailyLiving,
  overviewImage: tipHealthTips,
  content: `Daily living encompasses the myriad routines, habits, and choices that shape our everyday existence, particularly when managing conditions like joint stiffness or arthritis. It's about integrating health-conscious practices into the fabric of our lives to promote overall well-being, mobility, and quality of life.

First, let's understand the foundational aspects of daily living for joint health. Joints are the pivotal points where bones meet, cushioned by cartilage and lubricated by synovial fluid. Over time, wear and tear, poor nutrition, sedentary lifestyles, or autoimmune conditions can lead to stiffness, pain, and reduced mobility. Effective daily living strategies aim to mitigate these issues through a holistic approach: physical activity, nutrition, rest, and mindfulness. Research from organisations like the Arthritis Foundation emphasises that consistent, low-impact habits can slow disease progression and improve symptoms without relying solely on medication.

One key pillar is movement. Incorporating gentle exercises throughout the day prevents joints from becoming rigid. For instance, instead of prolonged sitting, which can exacerbate stiffness, aim for frequent position changes. Standing desks, short walks around the house, or even simple ankle rotations while seated can maintain circulation and joint flexibility. Nutrition plays an equally vital role. An anti-inflammatory diet rich in omega-3 fatty acids, antioxidants, and vitamins supports joint repair. Foods like fatty fish, nuts, fruits, and vegetables should be staples, while processed sugars and trans fats are minimised to avoid triggering inflammation.

Hydration is often overlooked but crucial. Water helps maintain the viscosity of synovial fluid, ensuring smooth joint movement. Dehydration can lead to increased friction and discomfort, so tracking intake is essential. Sleep, another cornerstone, allows the body to repair tissues and reduce inflammatory markers. Poor sleep cycles can heighten pain perception, making a consistent bedtime routine non-negotiable.

Now, let's explore practical implementations. Start with your environment: ergonomic furniture reduces strain on joints during daily tasks. For kitchen work, use tools with larger handles to ease grip. In the bathroom, install grab bars for safety. Clothing choices matter too — opt for easy-to-wear items with zippers or Velcro to avoid joint stress.

Mentally, daily living involves mindset shifts. Mindfulness practices like meditation can lower stress, which often amplifies pain. Journaling daily achievements fosters positivity. Social connections provide emotional support, encouraging adherence to healthy habits.

Diving deeper into nutrition, consider meal planning. Breakfast could include oatmeal with berries and walnuts for anti-inflammatory benefits. Lunch might feature salads with leafy greens and salmon. Snacks like yogurt with turmeric can curb mid-day cravings while supporting joints. Dinner should be light, perhaps grilled chicken with vegetables, to aid digestion and sleep.

Physical routines: Beyond walks, try swimming or cycling for low-impact cardio. Strength training with light weights builds supporting muscles. Flexibility exercises like yoga enhance range of motion.

Rest and recovery: Pacing prevents overexertion. Use timers for tasks, interspersing breaks. Evening wind-downs with reading or baths prepare for restorative sleep.

Potential challenges: Weather changes can worsen symptoms; counter with indoor alternatives. Motivation dips — set small goals and track progress.

In conclusion, daily living for joint health is a symphony of balanced actions. By weaving these elements into your routine, you cultivate resilience and joy.`,
  tipsOverview: `Tips for every day are actionable nuggets of wisdom that, when applied consistently, transform ordinary routines into powerful health boosters, especially for joint management. These aren't grand overhauls but subtle tweaks that accumulate over time to alleviate stiffness, boost energy, and foster longevity.

1. Mindset — Adopt a proactive stance. Each day, affirm your commitment to health. This psychological tip sets a positive tone, reducing perceived pain as per cognitive behavioural therapy principles.

2. Morning Rituals — Upon waking, hydrate immediately. A glass of water kickstarts metabolism and lubricates joints. Follow with light stretches.

3. Nutritional Tips — Infuse meals with anti-inflammatory spices like ginger and turmeric. Snack smartly; prepare grab-and-go options to avoid unhealthy choices.

4. Activity Integration — Stand every hour, do desk exercises. Use apps for reminders.

5. Hydration Hacks — Flavour water with lemon for appeal. Carry a reusable bottle.

6. Stress Management — Daily deep breathing reduces cortisol, which can inflame joints.

7. Evening Routines — Reflect on the day, plan tomorrow to minimise anxiety.

8. Tech Tips — Use wearables to track steps, ensuring 10,000 daily.

9. Social Tips — Share meals with loved ones for emotional nourishment.

10. Seasonal Adjustments — In winter, layer clothing to keep joints warm.

11. Long-term Tips — Annual check-ups monitor progress.

12. Challenges — Forgetfulness — use checklists. Boredom — vary routines.

Ultimately, these tips empower sustainable change.`,
};

export const dailyTips: DailyTip[] = [
  {
    slug: "morning-stretches",
    icon: "Sun",
    title: "Morning Stretches",
    desc: "Start each day with 5 minutes of gentle stretching to ease morning stiffness.",
    image: tipMorningStretches,
    detail: `Morning stretches are a gentle awakening for the body, specifically targeting joint stiffness that accumulates overnight. Starting each day with 5 minutes of these can ease discomfort, improve flexibility, and set a vibrant tone.

Why morning? During sleep, joints are immobile and fluids settle, causing stiffness. Stretching promotes blood flow, oxygenating tissues.

Basic routine:
• Neck rolls — gently circle your head
• Shoulder shrugs — lift and release
• Arm circles — forward and back
• Torso twists — seated or standing
• Leg stretches — hamstring reaches
• Ankle flexes

Benefits: Reduces inflammation, enhances mood via endorphins, and improves posture.

Variations: For beginners, try bed-based stretches. For advanced practitioners, incorporate yoga poses like cat-cow.

Safety: Breathe deeply and avoid bouncing. Consult your doctor if pain persists.

Integration: Pair with music or meditation for an uplifting start to your day.

Studies show regular stretching decreases arthritis symptoms and improves quality of life. Morning stretches are truly transformative.`,
  },
  {
    slug: "stay-hydrated",
    icon: "Droplets",
    title: "Stay Hydrated",
    desc: "Aim for 6-8 glasses of water daily — dehydration can worsen joint stiffness.",
    image: tipStayHydrated,
    detail: `Stay hydrated by aiming for 6-8 glasses of water daily, as dehydration worsens joint stiffness by thinning synovial fluid.

Water's importance: It comprises 60% of your body and is essential for joint lubrication.

How much? Aim for roughly half your body weight in ounces, adjusting for activity level and climate.

Tips:
• Start your day with a glass of water
• Eat hydrating foods like cucumbers, watermelon, and celery
• Carry a reusable bottle everywhere
• Flavour water with lemon, mint, or berries for appeal
• Set reminders on your phone

Signs of dehydration: Dry mouth, fatigue, dark urine, and stiff joints.

Benefits: Better joint mobility, reduced inflammation, improved energy, and clearer skin.

Variations: Herbal teas, infused waters, and broths all count toward your daily intake.

Challenges: Forgetting — set alarms. Taste — add fruits.

Hydration is foundational to joint health and overall well-being.`,
  },
  {
    slug: "anti-inflammatory-snacks",
    icon: "Apple",
    title: "Anti-inflammatory Snacks",
    desc: "Keep walnuts, berries, and dark leafy greens handy for quick, joint-friendly snacking.",
    image: tipAntiInflammatory,
    detail: `Anti-inflammatory snacks like walnuts, berries, and dark leafy greens provide quick, joint-friendly nourishment throughout the day.

Walnuts: Rich in omega-3 fatty acids that help reduce joint swelling and inflammation.

Berries: Packed with antioxidants that combat free radicals and protect cartilage from oxidative damage.

Dark leafy greens: Provide essential vitamins (K, C, E) and minerals that support cartilage repair and maintenance.

Quick snack ideas:
• Trail mix with walnuts, almonds, and dried berries
• Smoothies with spinach, blueberries, and ginger
• Veggie sticks with hummus
• Greek yogurt topped with mixed berries and a drizzle of honey
• Apple slices with almond butter

Shopping tips: Choose fresh, seasonal produce when possible. Organic options reduce exposure to pesticides.

Benefits: Sustained energy throughout the day, reduced pain and inflammation, and better weight management.

Challenges: Allergies — use seeds like pumpkin or sunflower as substitutes for similar anti-inflammatory benefits.

Snacks fuel health.`,
  },
  {
    slug: "walk-20-minutes",
    icon: "Footprints",
    title: "Walk 20 Minutes",
    desc: "A daily walk improves joint mobility, mood, and cardiovascular health.",
    image: tipWalk,
    detail: `A daily 20-minute walk is one of the most accessible and effective exercises for joint health, mood, and cardiovascular fitness.

Pace: Aim for brisk but comfortable — you should be able to hold a conversation.

Routes: Parks and green spaces offer additional mental health benefits from nature exposure.

Benefits:
• Improved joint mobility and flexibility
• Weight management (reducing load on joints)
• Endorphin release for natural pain relief
• Better cardiovascular health
• Enhanced sleep quality

Variations:
• Interval walking — alternate fast and slow segments
• Walking with light hand weights
• Nordic walking with poles for upper body engagement
• Walking meditation for combined mindfulness

Tracking: Use apps or wearables to monitor steps and set daily goals. Aim for consistency over intensity.

Challenges: Weather — on cold or rainy days, try indoor alternatives like mall walking, treadmills, or marching in place at home.

Walking is truly accessible therapy — no equipment, no gym membership, just you and the open path.`,
  },
  {
    slug: "prioritise-sleep",
    icon: "Moon",
    title: "Prioritise Sleep",
    desc: "Quality sleep reduces inflammation — aim for 7-9 hours with a consistent schedule.",
    image: tipSleep,
    detail: `Quality sleep is essential for reducing inflammation and managing joint pain. Aim for 7-9 hours with a consistent schedule every night.

Why sleep matters: During deep sleep cycles (especially REM), your body repairs tissues, reduces inflammatory markers, and resets pain sensitivity.

Sleep hygiene tips:
• Keep your bedroom dark, cool, and quiet
• Avoid screens for at least 30 minutes before bed
• Maintain a consistent bedtime and wake time, even on weekends
• Use relaxation techniques like deep breathing or progressive muscle relaxation

Joint-friendly sleep positions:
• Side sleeping with a pillow between the knees reduces hip and knee strain
• Back sleeping with a pillow under the knees supports spinal alignment
• Avoid sleeping on your stomach, which can stress the neck and back

Benefits: Lower levels of inflammatory cytokines, better pain tolerance, improved mood, and enhanced cognitive function.

Natural sleep aids: Chamomile tea, lavender aromatherapy, magnesium supplements, and warm baths before bed.

Challenges: If insomnia persists despite good sleep hygiene, consult your healthcare provider for personalised guidance.

Sleep restores.`,
  },
  {
    slug: "pace-yourself",
    icon: "Lightbulb",
    title: "Pace Yourself",
    desc: "Balance activity with rest. Break tasks into smaller chunks to protect your joints.",
    image: tipPaceYourself,
    detail: `Pacing yourself means balancing activity with rest by breaking tasks into smaller, manageable chunks to protect your joints from overexertion.

Why pace? Doing too much at once can trigger flare-ups and fatigue, setting back your progress. Pacing helps you stay active without paying for it the next day.

Techniques:
• The Pomodoro method — work for 25 minutes, rest for 5
• Alternate heavy and light tasks throughout the day
• Use timers as reminders to take breaks
• Prioritise tasks and tackle the most important ones when energy is highest

Daily applications:
• Housework: Clean one room at a time, not the whole house
• Cooking: Prep ingredients while seated, use ergonomic tools
• Gardening: Use raised beds and take frequent breaks
• Shopping: Use online ordering or split errands across days

Benefits: Sustained productivity without crashes, fewer flare-ups, better energy management, and improved long-term joint health.

Mindset shift: Pacing is not about doing less — it's about doing things smarter. Setting boundaries is an act of self-care, not weakness.

Challenges: It can be tempting to "push through" on good days. Resist the urge and maintain your rhythm for consistent results.

Pacing sustains energy.`,
  },
];
