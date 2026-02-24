import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, Droplets, Sun, Moon, Footprints, Apple } from "lucide-react";

const tips = [
  {
    icon: Sun,
    title: "Morning Stretches",
    desc: "Start each day with 5 minutes of gentle stretching to ease morning stiffness.",
    detail: `Morning stretches are a gentle awakening for the body, specifically targeting joint stiffness that accumulates overnight. Starting each day with 5 minutes of these can ease discomfort, improve flexibility, and set a vibrant tone.

Why morning? During sleep, joints are immobile and fluids settle, causing stiffness. Stretching promotes blood flow and oxygenates tissues.

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

Studies show regular stretching decreases arthritis symptoms and improves quality of life.`,
  },
  {
    icon: Droplets,
    title: "Stay Hydrated",
    desc: "Aim for 6-8 glasses of water daily — dehydration can worsen joint stiffness.",
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

Hydration is foundational to joint health and overall well-being.`,
  },
  {
    icon: Apple,
    title: "Anti-inflammatory Snacks",
    desc: "Keep walnuts, berries, and dark leafy greens handy for quick, joint-friendly snacking.",
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

Meal prep: Prepare snack portions at the start of each week so healthy options are always within reach.

Benefits: Sustained energy throughout the day, reduced pain and inflammation, and better weight management.

If you have allergies, substitute nuts with seeds like pumpkin or sunflower for similar anti-inflammatory benefits.`,
  },
  {
    icon: Footprints,
    title: "Walk 20 Minutes",
    desc: "A daily walk improves joint mobility, mood, and cardiovascular health.",
    detail: `A daily 20-minute walk is one of the most accessible and effective exercises for joint health, mood, and cardiovascular fitness.

Pace: Aim for brisk but comfortable — you should be able to hold a conversation.

Where to walk: Parks and green spaces offer additional mental health benefits from nature exposure.

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

Weather challenges: On cold or rainy days, try indoor alternatives like mall walking, treadmills, or marching in place at home.

Walking is truly accessible therapy — no equipment, no gym membership, just you and the open path.`,
  },
  {
    icon: Moon,
    title: "Prioritise Sleep",
    desc: "Quality sleep reduces inflammation — aim for 7-9 hours with a consistent schedule.",
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

Restorative sleep is one of the most powerful — and free — tools for managing arthritis.`,
  },
  {
    icon: Lightbulb,
    title: "Pace Yourself",
    desc: "Balance activity with rest. Break tasks into smaller chunks to protect your joints.",
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

Pacing sustains your energy and protects your joints for the long term.`,
  },
];

const introContent = `Daily living encompasses the routines, habits, and choices that shape our everyday existence, particularly when managing conditions like joint stiffness or arthritis. It's about integrating health-conscious practices into the fabric of our lives to promote overall well-being, mobility, and quality of life.

Joints are the pivotal points where bones meet, cushioned by cartilage and lubricated by synovial fluid. Over time, wear and tear, poor nutrition, sedentary lifestyles, or autoimmune conditions can lead to stiffness, pain, and reduced mobility. Effective daily living strategies aim to mitigate these issues through a holistic approach: physical activity, nutrition, rest, and mindfulness.

Key pillars of daily living for joint health:

Movement: Incorporating gentle exercises throughout the day prevents joints from becoming rigid. Standing desks, short walks, or simple ankle rotations while seated maintain circulation and flexibility.

Nutrition: An anti-inflammatory diet rich in omega-3 fatty acids, antioxidants, and vitamins supports joint repair. Foods like fatty fish, nuts, fruits, and vegetables should be staples.

Hydration: Water helps maintain the viscosity of synovial fluid, ensuring smooth joint movement. Dehydration can lead to increased friction and discomfort.

Sleep: Quality rest allows the body to repair tissues and reduce inflammatory markers. Poor sleep can heighten pain perception.

Environment: Ergonomic furniture, tools with larger handles, and bathroom grab bars reduce strain during daily tasks.

Mindset: Mindfulness practices like meditation lower stress, which often amplifies pain. Social connections provide emotional support and encourage healthy habits.

By weaving these elements into your routine, you cultivate resilience and joy — small adjustments that accumulate into significant improvements over time.`;

const DailyTipsSection = memo(() => {
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(false);

  return (
    <section className="py-24 lg:py-32 bg-accent/30 section-divider">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-label text-primary mb-4 block">Daily Living</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-5">
            Tips for every <span className="text-primary italic">day</span>
          </h2>
          <button
            onClick={() => setShowIntro(true)}
            className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
          >
            Learn more about daily living for joint health →
          </button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card
                  className="p-6 rounded-3xl border-border/20 card-hover group flex gap-5 cursor-pointer"
                  onClick={() => setSelectedTip(i)}
                >
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">{tip.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tip detail modal */}
      <Dialog open={selectedTip !== null} onOpenChange={() => setSelectedTip(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          {selectedTip !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl">
                  {(() => { const Icon = tips[selectedTip].icon; return <Icon className="w-6 h-6 text-gold" />; })()}
                  {tips[selectedTip].title}
                </DialogTitle>
                <DialogDescription>{tips[selectedTip].desc}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
                  {tips[selectedTip].detail}
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Intro modal */}
      <Dialog open={showIntro} onOpenChange={setShowIntro}>
        <DialogContent className="max-w-2xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">Daily Living for Joint Health</DialogTitle>
            <DialogDescription>A holistic approach to managing joint stiffness and arthritis through everyday habits.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
              {introContent}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
});

DailyTipsSection.displayName = "DailyTipsSection";
export default DailyTipsSection;
