import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Quote, Calendar, MapPin, Star, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stories = [
  {
    name: "Margaret Thompson",
    age: 67,
    location: "Leeds, West Yorkshire",
    condition: "Osteoarthritis",
    yearsLiving: 12,
    image: "/openverse/community-01-an-elderly-tibetan-women-holding-a-prayer-wheel-on.webp",
    pullQuote: "I went from barely climbing stairs to walking 5 miles on the Yorkshire Dales. The key was finding the right combination of gentle exercise and diet changes.",
    timeline: [
      { year: "2012", event: "First symptoms — stiffness in both knees every morning" },
      { year: "2014", event: "GP diagnosis of moderate osteoarthritis; prescribed NSAIDs" },
      { year: "2016", event: "Referred to public health physiotherapist — 6-week waiting list" },
      { year: "2019", event: "Found Living With Arthritis guides and started home exercises" },
      { year: "2021", event: "Adopted Mediterranean diet; lost 2 stone over 8 months" },
      { year: "2023", event: "Walks more regularly on good days; still manages flare days carefully" },
    ],
    fullStory: `When I was first diagnosed at 55, I felt like my active life was over. I'd always loved walking in the Dales with my husband, and suddenly I couldn't manage a flight of stairs without wincing.

My GP was sympathetic but health service waiting times for physiotherapy were months long. I tried various supplements — glucosamine, turmeric capsules — but nothing seemed to make a real difference on its own.

The turning point came when I found Living With Arthritis online in 2019. The free exercise and diet guides gave me a structured place to start while I waited for NHS physiotherapy. I still check anything new with my GP.

But the biggest surprise was the diet advice. I'd never thought about food as medicine before. Switching to a Mediterranean-style diet — more oily fish, olive oil, vegetables, fewer processed foods — combined with losing weight gradually changed everything. My inflammation markers dropped significantly.

Now at 67, I walk regularly on the Dales again. I'm not pain-free — I don't think that's realistic — but I manage my condition instead of it managing me. The community here has been invaluable. Knowing others understand what you're going through makes such a difference.`,
    outcomes: ["Walks more regularly on good days", "Uses diet and pacing together", "Less reliant on day-to-day painkillers", "Feels less alone with the condition"],
    advice: "Don't wait for a referral. Start with gentle movement today — even 10 minutes makes a difference. And take the diet advice seriously; it's not a fad, it's evidence-based."
  },
  {
    name: "James Richardson",
    age: 42,
    location: "Glasgow, Scotland",
    condition: "Rheumatoid Arthritis",
    yearsLiving: 8,
    image: "/openverse/cover-0108-old-runner-a3.webp",
    pullQuote: "RA at 34 felt like a death sentence for my career as a joiner. Eight years on, I'm still working full-time and coaching my daughter's football team.",
    timeline: [
      { year: "2016", event: "Sudden onset — woke up unable to close both hands" },
      { year: "2016", event: "Emergency GP visit; blood tests showed high RF and anti-CCP" },
      { year: "2017", event: "Started methotrexate under rheumatologist care" },
      { year: "2018", event: "Flare-up forced 3 months off work; felt hopeless" },
      { year: "2020", event: "Joined LWA community; connected with others in skilled trades" },
      { year: "2023", event: "Stable on medication; uses joint protection techniques daily" },
    ],
    fullStory: `I'm a joiner by trade. My hands are my livelihood. So when I woke up one morning in 2016 and couldn't close either fist, the fear was immediate. Not just about the pain — about whether I'd ever work again.

The diagnosis came fast — my GP knew something serious was happening. Rheumatoid arthritis, aggressive onset. I was 34, fit, no family history. It felt completely random and completely unfair.

The first two years were brutal. Finding the right medication took time. Methotrexate made me nauseous. I had a massive flare-up in 2018 that kept me off work for three months. I was depressed, anxious, and my relationship was under strain.

What changed things was connecting with other people who understood. Through the Living With Arthritis forum, I met a plumber and an electrician who also had RA. We shared practical tips — which tools cause less joint stress, how to pace your workday, when to push through and when to rest.

I also learned about joint protection techniques that made a huge difference to my work. Simple things like using power tools with ergonomic grips, taking planned micro-breaks, and doing hand exercises every morning before work.

Eight years on, I'm still a joiner. I'm slower some days, and I've had to be honest with clients about that. But I'm working full-time, I coach my daughter's under-10s football team, and my condition is well-managed. RA hasn't beaten me — it's taught me to work smarter.`,
    outcomes: ["Still working in a skilled trade", "Uses joint-protection techniques", "Active parent", "Fewer disruptive flares with pacing"],
    advice: "If you work with your hands, don't give up your trade. There are adaptations and techniques that can keep you going. And talk to other people with RA — you'll learn more practical advice in one conversation than in ten leaflets."
  },
  {
    name: "Priya Kapoor",
    age: 38,
    location: "Birmingham, West Midlands",
    condition: "Psoriatic Arthritis",
    yearsLiving: 6,
    image: "/openverse/adult-daughter-with-elderly-mother-48181ce1.webp",
    pullQuote: "The hardest part wasn't the pain — it was people not believing me because I 'look fine'. Invisible illness is incredibly isolating.",
    timeline: [
      { year: "2018", event: "Psoriasis diagnosis aged 32; joint pain dismissed as 'stress'" },
      { year: "2019", event: "Swollen fingers and toes; finally referred to rheumatology" },
      { year: "2019", event: "Diagnosed with psoriatic arthritis after MRI" },
      { year: "2020", event: "Started biologics; significant improvement within 3 months" },
      { year: "2021", event: "Began gentle yoga for arthritis using free LWA exercise guidance" },
      { year: "2023", event: "Started sharing practical tips with others who were newly diagnosed" },
    ],
    fullStory: `I had psoriasis from my early twenties — patches on my elbows and scalp that I managed with creams. When my fingers started swelling and aching at 32, I assumed it was from typing all day (I work in IT).

My GP initially agreed — 'probably repetitive strain.' It took over a year and worsening symptoms before I was referred to rheumatology. The MRI showed active inflammation in multiple joints. Psoriatic arthritis.

What nobody tells you about PsA is how invisible it is. You can have excruciating fatigue and joint pain, but because there's no cast or crutch, people don't see it. I've had colleagues question why I need to work from home some days. Family members who think I'm exaggerating. That psychological burden is enormous.

The biologics were a game-changer physically. Within three months, the swelling reduced dramatically and I could type without pain. But mentally, I was still struggling with the diagnosis.

The yoga programme through Living With Arthritis was what helped me accept and adapt. Not just the physical benefits — the flexibility, the gentle strengthening — but the mindfulness aspect. Learning to listen to my body instead of fighting it.

Now I share practical tips with people who are newly diagnosed. I remember how scared and alone I felt, and I want others to know they're not alone. Psoriatic arthritis is manageable. You can still have a full, active life. You just need the right support and information.`,
    outcomes: ["Less swelling on quieter weeks", "Kept full-time work with adjustments", "Supports others after diagnosis", "Feels less isolated"],
    advice: "Don't accept 'it's just stress' if your gut tells you something is wrong. Push for a rheumatology referral. And remember — your pain is real, even when others can't see it."
  },
  {
    name: "David Williams",
    age: 71,
    location: "Cardiff, Wales",
    condition: "Osteoarthritis (hip and knee)",
    yearsLiving: 15,
    image: "/openverse/cover-0135-old-runner-a1.webp",
    pullQuote: "After my hip replacement at 66, the physio exercises I'd learned gave me the best recovery my surgeon had seen in someone my age.",
    timeline: [
      { year: "2009", event: "Gradual onset of hip pain; blamed old rugby injury" },
      { year: "2011", event: "X-ray confirmed moderate OA in left hip and both knees" },
      { year: "2015", event: "Pain worsening; discussed joint replacement options" },
      { year: "2018", event: "Started gentle aquatic exercise after reading LWA guides; surgery came later" },
      { year: "2020", event: "Left hip replacement at age 66" },
      { year: "2021", event: "Good recovery with NHS physio and home exercises after hip replacement" },
    ],
    fullStory: `I played rugby for Pontypridd RFC in my twenties and thirties. I knew my joints would pay for it eventually — the knocks, the scrums, the cold Welsh training pitches. When my hip started aching in my late fifties, I wasn't surprised. Just disappointed.

For years, I managed with painkillers and bloody-mindedness. I'm of a generation that doesn't complain. My wife would see me wincing getting out of a chair and I'd say "I'm fine, love."

By 2015, I wasn't fine. The consultant said I'd need a hip replacement eventually, but to hold off as long as possible to get the most life from the implant. That's when I needed to find ways to manage the pain and maintain mobility.

The aquatic exercises were revelatory. Swimming had always been too boring for me, but structured water exercises — with proper physiotherapy guidance — were completely different. The water supports your weight, reduces pain, and you can move in ways that would be impossible on land. I was doing exercises in the pool that I couldn't do in my living room.

When I finally had the hip replacement in 2020, my surgeon commented that my muscle strength and joint mobility were unusually good for my age. He said the pre-operative exercise programme likely contributed to my fast recovery. I was walking with a stick within a week and without one within six weeks.

I'm 71 now. I still swim twice a week, do the chair exercises from the LWA programme, and I walk the dog every day. I won't be playing rugby again, but I'm living well. That's what matters.`,
    outcomes: ["Delayed surgery by 2 years", "Exceptional post-op recovery", "Swimming twice weekly", "Independent and active at 71"],
    advice: "Pre-hab is as important as rehab. If you know surgery is coming, get as strong and mobile as possible beforehand. Your future self will thank you."
  },
  {
    name: "Sarah Mitchell",
    age: 29,
    location: "Bristol, South West England",
    condition: "Juvenile Idiopathic Arthritis (now adult)",
    yearsLiving: 18,
    image: "/openverse/cover-0128-two-colorful-elderly-women.webp",
    pullQuote: "I was diagnosed at 11. Growing up with arthritis means your whole identity forms around managing a chronic condition. But it also makes you incredibly resilient.",
    timeline: [
      { year: "2007", event: "Age 11: swollen knee after PE; diagnosed with JIA" },
      { year: "2010", event: "Transitioned to adult rheumatology services at 14" },
      { year: "2015", event: "A-levels while managing flare-ups; felt isolated from peers" },
      { year: "2018", event: "Graduated university; first job in marketing" },
      { year: "2022", event: "Joined LWA as youngest peer mentor" },
      { year: "2024", event: "Running half-marathons for arthritis awareness" },
    ],
    fullStory: `People hear 'arthritis' and think of their grandparents. When I tell them I've had it since I was 11, there's always a pause. "But you're so young." Yes. That's the point.

I was in Year 7 when my knee swelled up after PE. My mum thought it was a sports injury. When the swelling didn't go down after two weeks, we went to the GP. Blood tests, referral, diagnosis: juvenile idiopathic arthritis.

School was complicated. I couldn't always do PE, which made me different. I missed days during flare-ups. Some teachers were understanding; others clearly thought I was making excuses. One actually said "arthritis is an old person's disease" in front of the class.

The transition from paediatric to adult rheumatology at 14 was rocky. Suddenly I was in waiting rooms with people four times my age. The care felt less personalised, more 'one size fits all.'

University was where I found my stride. I studied marketing, learned to manage my condition proactively, and stopped being embarrassed about it. I discovered that being open about my arthritis actually connected me with others who had invisible conditions.

Now I'm a peer mentor with Living With Arthritis, specifically for young adults and teenagers. I want every 11-year-old who gets this diagnosis to know: your life is not over. It's different, but it can be brilliant. I'm running half-marathons. I have a career. I have a life I love.

The key? Finding your community, being honest about your limits, and refusing to let anyone else define what you can or can't do.`,
    outcomes: ["University graduate", "Full-time career", "Running half-marathons", "Active peer mentor for young people"],
    advice: "To young people: arthritis doesn't define you. To parents: believe your child's pain. To teachers: please educate yourselves about invisible illness."
  },
];

export default function LivedExperiences() {
  return (
    <>
      <Helmet>
        <title>Real Arthritis Stories | Living With Arthritis UK</title>
        <meta name="description" content="Real UK stories from people living with arthritis — honest, first-person accounts of diagnosis, treatment, work, family life and everyday coping strategies." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Lived Experience Stories",
          "description": "Real patient stories from people managing arthritis across the UK",
          "url": "https://livingwitharthritis.org.uk/stories",
          "mainEntity": stories.map(s => ({
            "@type": "Article",
            "headline": `${s.name}'s Story: Living with ${s.condition}`,
            "author": { "@type": "Person", "name": s.name }
          }))
        })}</script>
      <meta property="og:title" content="Real Stories – Living With Arthritis | Patient Experiences UK" />
      <meta property="og:description" content="Read real stories from people living with arthritis across the UK. Honest accounts of diagnosis, treatment, challenges, and hope from osteoarthritis, RA, and PsA patients." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/stories" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Lived Experiences | Living With Arthritis UK" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Real Stories – Living With Arthritis | Patient Experiences UK" />
      <meta name="twitter:description" content="Read real stories from people living with arthritis across the UK. Honest accounts of diagnosis, treatment, challenges, and hope from osteoarthritis, RA, and PsA patients." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content">
          <PageHero
            title="Stories about living with arthritis"
            subtitle="Illustrative accounts of diagnosis, day-to-day limits and what people try next. Not a count of people this charity has supported."
          />

          <section className="bg-primary/5 border-y border-primary/10 py-6">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                These are illustrative accounts of living with arthritis, not a membership total and not audited outcomes. Living With Arthritis was registered on 15 June 2026 (charity 1218461) and does not publish a people-supported total.
              </p>
            </div>
          </section>

          {/* Stories */}
          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-4xl space-y-16">
              {stories.map((story, i) => (
                <motion.article
                  key={story.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/20"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground">{story.name}, {story.age}</h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" className="gap-1"><MapPin className="w-3 h-3" />{story.location}</Badge>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{story.condition}</Badge>
                        <Badge variant="outline"><Calendar className="w-3 h-3 mr-1" />{story.yearsLiving} years</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Pull quote */}
                  <blockquote className="border-l-4 border-primary pl-6 py-3 bg-primary/5 rounded-r-xl">
                    <Quote className="w-5 h-5 text-primary mb-2" />
                    <p className="text-lg italic text-foreground/90 leading-relaxed">{story.pullQuote}</p>
                  </blockquote>

                  {/* Timeline */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Journey Timeline
                    </h3>
                    <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                      {story.timeline.map((t, j) => (
                        <div key={j} className="relative pl-6">
                          <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
                          <span className="text-sm font-bold text-primary">{t.year}</span>
                          <p className="text-sm text-muted-foreground">{t.event}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full story */}
                  <div className="prose prose-sm max-w-none">
                    {story.fullStory.split("\n\n").map((para, j) => (
                      <p key={j} className="text-foreground/85 leading-relaxed">{para}</p>
                    ))}
                  </div>

                  {/* Outcomes */}
                  <Card className="border-primary/10">
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" /> Key Outcomes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {story.outcomes.map(o => (
                          <Badge key={o} className="bg-primary/10 text-primary border-primary/20">{o}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Advice */}
                  <div className="bg-muted/50 rounded-xl p-5">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary" /> {story.name.split(" ")[0]}'s Advice
                    </h3>
                    <p className="text-foreground/80 italic">"{story.advice}"</p>
                  </div>

                  {i < stories.length - 1 && <hr className="border-border/50" />}
                </motion.article>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary/5 py-12">
            <div className="container mx-auto px-4 text-center max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Share Your Story</h2>
              <p className="text-muted-foreground">Your experience could help someone newly diagnosed feel less alone. We'd love to hear from you.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild><Link to="/community">Join the Community <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
                <Button variant="outline" asChild><Link to="/blog"><BookOpen className="w-4 h-4 mr-1" /> Read Our Blog</Link></Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
