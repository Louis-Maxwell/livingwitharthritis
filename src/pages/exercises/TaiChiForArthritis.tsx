import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Activity, Heart, Shield, Sparkles, MapPin, PlayCircle, Library } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TAI_CHI_ANIMATIONS, TAI_CHI_VIDEOS } from "@/components/exercises/TaiChiAnimations";
import ExerciseVideoModal from "@/components/exercises/ExerciseVideoModal";
import { Play } from "lucide-react";

const heroImage = "/openverse/wellness-02-tai-chi-young-and-old.jpg";

const benefits = [
  { icon: Shield, title: "NICE-recommended", text: "UK NICE guidelines (NG226) explicitly recommend tai chi as a therapeutic exercise option for osteoarthritis — one of only a handful of named non-drug interventions." },
  { icon: Activity, title: "Cuts knee & hip pain", text: "A 2019 BMJ meta-analysis showed tai chi matched standard NHS physiotherapy for knee OA pain and function at 12 weeks, and the gains held at 12 months." },
  { icon: Heart, title: "Lowers fall risk by ~20%", text: "A 2017 Cochrane review of 7,494 older adults found tai chi reduced fall rate by approximately 20% — a key concern when arthritis affects balance." },
  { icon: Sparkles, title: "Eases stiffness without flares", text: "Slow, weight-shifted movement gently mobilises joints without the impact that can trigger inflammatory flare-ups." },
];

const jointLinks = [
  { joint: "Knee", slug: "tai-chi-for-knee-arthritis", note: "Tai chi is the most evidence-backed exercise for knee OA in UK guidance." },
  { joint: "Hip", slug: "tai-chi-for-hip-arthritis", note: "Weight-shift drills strengthen hip stabilisers without loading the joint." },
  { joint: "Hand", slug: "tai-chi-for-hand-arthritis", note: "Slow, flowing wrist and finger movements ease morning stiffness." },
  { joint: "Shoulder", slug: "tai-chi-for-shoulder-arthritis", note: "Cloud Hands restores rotator-cuff range without overhead strain." },
  { joint: "Back", slug: "tai-chi-for-back-arthritis", note: "Encourages a tall spine and gentle rotation — ideal for spinal OA." },
  { joint: "Ankle", slug: "tai-chi-for-ankle-arthritis", note: "Builds proprioception and ankle confidence after a flare." },
  { joint: "Wrist", slug: "tai-chi-for-wrist-arthritis", note: "Soft, circular wrist movement preserves grip and reduces stiffness." },
  { joint: "Foot", slug: "tai-chi-for-foot-arthritis", note: "Slow stepping drills strengthen the foot arch and improve balance." },
];

const movementLibrary: { key: keyof typeof TAI_CHI_ANIMATIONS; name: string; brief: string; cue: string; bestFor: string }[] = [
  { key: "rooted-stance", name: "Rooted Stance (Wuji)", brief: "The starting posture every form returns to — feet hip-width, knees soft, spine tall.", cue: "Soft knees over toes. Crown lifts gently.", bestFor: "All joints · posture · breath" },
  { key: "weight-shift", name: "Weight Shift", brief: "Slow lateral transfer of body weight without lifting the feet — the engine of every tai chi form.", cue: "Side-to-side, feet flat. The engine of every move.", bestFor: "Knee · hip · ankle · balance" },
  { key: "cloud-hands", name: "Cloud Hands", brief: "Continuous waist-led arm circles that mobilise shoulders and rotate the spine gently.", cue: "Waist turns; arms follow, never force.", bestFor: "Shoulder · back · hand" },
  { key: "brush-knee", name: "Brush Knee", brief: "Step forward, brush past the knee with one hand and push with the other — coordination plus mobility.", cue: "Brush past the knee, push the other hand forward.", bestFor: "Knee · hip · whole-body" },
  { key: "closing-posture", name: "Closing Posture", brief: "The grounding sequence that ends every set — settles breath and joint warmth.", cue: "Lower the hands, settle the weight, exhale.", bestFor: "All joints · cool-down" },
];

const ukResources = [
  { name: "Tai Chi Union for Great Britain", url: "https://taichiunion.com/", desc: "UK governing body — searchable directory of accredited instructors." },
  { name: "Tai Chi for Health Institute (UK chapters)", url: "https://taichiforhealthinstitute.org/", desc: "Sun-style 'Tai Chi for Arthritis' programme — the form most often referenced in NICE-aligned trials." },
  { name: "Versus Arthritis — Exercise advice", url: "https://versusarthritis.org/about-arthritis/managing-symptoms/exercise/", desc: "Free UK charity guidance on safe arthritis exercise, including tai chi." },
  { name: "NHS — Tai chi", url: "https://www.nhs.uk/live-well/exercise/guide-to-tai-chi/", desc: "NHS overview, cautions and how to find a class on the NHS Live Well site." },
];

const faqs = [
  { q: "Is tai chi good for arthritis?", a: "Yes. UK NICE guidelines (NG226) recommend tai chi as a therapeutic exercise option for osteoarthritis. Multiple meta-analyses (BMJ 2019, Arthritis & Rheumatology 2018) show clinically meaningful pain and function improvements for knee and hip OA, comparable to standard physiotherapy." },
  { q: "Is tai chi safe for arthritis?", a: "For most people, yes. Tai chi is low-impact, slow, and weight-shifting rather than jarring — which is why NICE NG226 lists it as a safe therapeutic exercise for osteoarthritis. Pause practice during an acute flare, in the first 6 weeks after joint replacement surgery, or if you have severe balance issues without a chair or wall to support you. Otherwise, side effects are typically limited to mild post-session soreness that settles within 24 hours." },
  { q: "Is tai chi safe for knee arthritis?", a: "Yes, with sensible adaptations. Keep stances shallow (knees never travelling past your toes), shift weight slowly, and avoid deep squatting postures. The Sun and Yang short-form styles taught in most UK classes are well tolerated by knee OA patients. If you feel sharp pain (not the usual stiffness easing), reduce range of motion or switch to seated practice that day." },
  { q: "Is tai chi safe after a joint replacement?", a: "Generally yes, but timing matters. Most UK orthopaedic surgeons clear patients for low-impact movement at 6–12 weeks post-op. Start with seated tai chi, progress to standing with chair support, and only resume full standing forms once your surgeon confirms it's safe. Always tell your instructor about your replacement so they can offer modifications." },
  { q: "What are the side effects or risks of tai chi for arthritis?", a: "Tai chi has one of the cleanest safety profiles of any exercise studied for arthritis. The main risks are: mild muscle soreness in the first 1–2 weeks (normal — reduces with practice), and falls if you practise standing forms unsupported with severe balance impairment. Stop and seek advice if you experience sharp joint pain, swelling that lasts more than 48 hours, or dizziness during practice." },
  { q: "Is tai chi good for rheumatoid arthritis?", a: "Tai chi appears safe in rheumatoid arthritis and may improve mood, sleep and lower-limb function, though evidence for joint inflammation itself is weaker than for osteoarthritis. A 2019 Cochrane review found no harms and small-to-moderate benefit for quality of life. Avoid practice during acute flares — return when joints are calm." },
  { q: "Is yoga or tai chi better for arthritis?", a: "Both help, but tai chi has stronger UK guideline backing for osteoarthritis (NICE NG226) and a clearer fall-prevention evidence base. Yoga can offer more flexibility gains. The best choice is whichever you'll do consistently — try both and notice how your joints feel the next morning." },
  { q: "Can I get tai chi on the NHS?", a: "Some NHS social-prescribing schemes and community pain services refer patients to tai chi classes — ask your GP or rheumatology team. Most people start through community centres, leisure trusts, or the Tai Chi Union for Great Britain instructor directory. Many councils offer subsidised over-60s classes." },
  { q: "How often should I practise?", a: "Evidence suggests 2–3 sessions of 20–40 minutes per week for at least 8 weeks before judging benefit. Daily 10-minute mini-sessions also work and may be easier to fit into life with arthritis." },
  { q: "What if I can't stand for long?", a: "Use seated tai chi — same flowing principles, performed from a sturdy chair. Our seated routine guide is linked below. Many people alternate seated and standing days as energy and joint comfort allow." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Tai Chi for Arthritis: A UK Guide",
  about: { "@type": "MedicalCondition", name: "Arthritis" },
  audience: { "@type": "PeopleAudience", geographicArea: { "@type": "Country", name: "United Kingdom" } },
  publisher: { "@type": "Organization", name: "Living With Arthritis UK" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const SITE = "https://livingwitharthritis.org.uk";
const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tai Chi for Arthritis — Topic Hub",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Tai Chi for Beginners (7-Day Plan)", url: `${SITE}/exercises/tai-chi-for-beginners` },
    { "@type": "ListItem", position: 2, name: "Tai Chi for Balance", url: `${SITE}/exercises/tai-chi-for-balance` },
    { "@type": "ListItem", position: 3, name: "Seated Tai Chi for Arthritis", url: `${SITE}/exercises/seated-tai-chi-for-arthritis` },
    ...jointLinks.map((j, i) => ({
      "@type": "ListItem",
      position: 4 + i,
      name: `Tai Chi for ${j.joint} Arthritis`,
      url: `${SITE}/exercises/${j.slug}`,
    })),
  ],
};

export default function TaiChiForArthritis() {
  useEffect(() => {
    const a = document.createElement("script");
    a.type = "application/ld+json";
    a.text = JSON.stringify(jsonLd);
    const b = document.createElement("script");
    b.type = "application/ld+json";
    b.text = JSON.stringify(faqJsonLd);
    const c = document.createElement("script");
    c.type = "application/ld+json";
    c.text = JSON.stringify(itemListJsonLd);
    document.head.appendChild(a);
    document.head.appendChild(b);
    document.head.appendChild(c);
    return () => {
      document.head.removeChild(a);
      document.head.removeChild(b);
      document.head.removeChild(c);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Tai Chi for Arthritis (UK Guide)"
        description="UK guide to tai chi for arthritis. NICE-recommended, evidence-based routines for knee, hip, hand and back pain — plus free NHS and Versus Arthritis resources."
        path="/exercises/tai-chi-for-arthritis"
        type="article"
        keywords="tai chi for arthritis, tai chi arthritis UK, NICE tai chi osteoarthritis, tai chi knee arthritis, tai chi hip arthritis, seated tai chi arthritis"
      />
      <Header />

      <PageBreadcrumb segments={[{ label: "Exercises", href: "/exercises" }, { label: "Tai Chi for Arthritis" }]} />

      <PageHero
        badge={<Badge variant="secondary" className="bg-primary/10 text-primary border-0">UK Guide · NICE-recommended</Badge>}
        title="Tai Chi for Arthritis"
        subtitle="The UK's evidence-based guide to tai chi for arthritis. Recommended by NICE, used in NHS pain services, and matched to NHS physiotherapy in BMJ trials for knee and hip OA."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg"><Link to="/exercises/tai-chi-for-beginners">New to tai chi? Start the 7-day plan <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          <Button asChild variant="outline" size="lg"><a href="#joints">Find your joint</a></Button>
          <Button asChild variant="outline" size="lg"><Link to="/exercises/seated-tai-chi-for-arthritis">Try seated tai chi</Link></Button>
        </div>
      </PageHero>

      {/* Hero image */}
      <section className="bg-secondary/30 border-b border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] py-10">
          <figure className="rounded-xl overflow-hidden shadow-lg">
            <img src={heroImage} alt="Older and younger person practising tai chi together outdoors in a UK park" className="w-full h-auto object-cover" loading="eager" decoding="async" width={1600} height={900} />
          </figure>
        </div>
      </section>

      {/* Why tai chi */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">Why tai chi works for arthritis</h2>
            <p className="text-muted-foreground leading-relaxed">Tai chi is one of only a handful of exercises NICE explicitly names for osteoarthritis. Four mechanisms make it unusually well-suited to arthritic joints.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} className="p-6 border border-border/40 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 shrink-0"><b.icon className="h-6 w-6 text-primary" /></div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Joint-specific links */}
      <section id="joints" className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">By joint</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">Tai chi for your joint</h2>
            <p className="text-muted-foreground leading-relaxed">Each guide focuses on the movements and adaptations most useful for that joint.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jointLinks.map((j) => (
              <Link key={j.slug} to={`/exercises/${j.slug}`} className="group">
                <Card className="p-6 h-full border border-border/40 group-hover:border-primary/40 group-hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-xl font-semibold">{j.joint}</h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{j.note}</p>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild><Link to="/exercises/tai-chi-for-beginners">7-day beginner plan</Link></Button>
            <Button asChild variant="outline"><Link to="/exercises/seated-tai-chi-for-arthritis">Seated tai chi (chair-based)</Link></Button>
            <Button asChild variant="outline"><Link to="/exercises/tai-chi-for-balance">Tai chi for balance & falls</Link></Button>
          </div>
        </div>
      </section>

      {/* How to start in the UK */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0"><MapPin className="h-3 w-3 mr-1 inline" />UK resources</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">How to start in the UK</h2>
            <p className="text-muted-foreground leading-relaxed">Free and low-cost ways to begin — no equipment, no membership.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {ukResources.map((r) => (
              <Card key={r.name} className="p-6 border border-border/40">
                <h3 className="font-display text-lg font-semibold mb-2">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{r.name}</a>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" />A simple first month</h3>
            <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
              <li><strong className="text-foreground">Week 1–2:</strong> 10 minutes a day of standing rooted + weight-shift drills. Follow our <Link to="/exercises/tai-chi-for-balance" className="text-primary hover:underline">15-minute beginner routine</Link>.</li>
              <li><strong className="text-foreground">Week 3:</strong> Add Cloud Hands and Brush Knee. Try a free YouTube class from the Tai Chi for Health Institute.</li>
              <li><strong className="text-foreground">Week 4:</strong> Find a local class through the Tai Chi Union for Great Britain directory, or ask your GP about social-prescribing options.</li>
            </ol>
          </Card>
        </div>
      </section>

      {/* Movement video library */}
      <section id="library" className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0"><Library className="h-3 w-3 mr-1 inline" />Video library</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">Tai chi movement library</h2>
            <p className="text-muted-foreground leading-relaxed">Five core movements every NICE-aligned tai chi programme builds on. Watch the slow demo, then try it in our Balance or Seated routine.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {movementLibrary.map((m) => {
              const Anim = TAI_CHI_ANIMATIONS[m.key];
              const video = TAI_CHI_VIDEOS[m.key];
              return (
                <Card key={m.key} className="overflow-hidden border border-border/40 flex flex-col">
                  <ExerciseVideoModal src={video.src} title={m.name} description={m.brief}>
                    <button
                      type="button"
                      aria-label={`Play ${m.name}`}
                      className="group relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <div className="aspect-video bg-muted/40 overflow-hidden">
                        <Anim className="w-full h-full object-cover" />
                      </div>
                      <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 group-focus-visible:bg-black/40 transition-colors">
                        <span className="h-14 w-14 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                          <Play className="h-6 w-6 text-primary fill-primary ml-0.5" />
                        </span>
                      </span>
                    </button>
                  </ExerciseVideoModal>
                  <p className="px-5 py-2.5 text-xs italic leading-snug text-foreground/80 bg-muted/40 border-b border-border/40 flex items-start gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{m.cue}</span>
                  </p>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-start gap-2">
                      <PlayCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <h3 className="font-display text-lg font-semibold leading-snug">{m.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.brief}</p>
                    <p className="text-xs uppercase tracking-wider text-primary/80 font-semibold mt-auto">{m.bestFor}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild><Link to="/exercises/tai-chi-for-balance">See moves in the 15-min routine</Link></Button>
            <Button asChild variant="outline"><Link to="/exercises/seated-tai-chi-for-arthritis">Seated adaptations</Link></Button>
          </div>
        </div>
      </section>

      {/* Related Tai Chi guides */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="max-w-2xl mb-10">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-0">Related guides</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">Pick the routine that fits today</h2>
            <p className="text-muted-foreground leading-relaxed">Two doors into the same practice — choose by how your joints feel right now.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/exercises/tai-chi-for-balance" className="group">
              <Card className="p-7 h-full border border-border/40 group-hover:border-primary/40 group-hover:shadow-lg transition-all">
                <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-0">Standing · 15 min</Badge>
                <h3 className="font-display text-2xl font-semibold mb-3">Tai Chi for Balance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">Best for anyone who can stand safely with light support. The 15-minute routine focused on fall prevention and knee/hip pain reduction.</p>
                <span className="inline-flex items-center text-primary font-semibold text-sm">Start the routine <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
              </Card>
            </Link>
            <Link to="/exercises/seated-tai-chi-for-arthritis" className="group">
              <Card className="p-7 h-full border border-border/40 group-hover:border-primary/40 group-hover:shadow-lg transition-all">
                <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-0">Seated · 13 min</Badge>
                <h3 className="font-display text-2xl font-semibold mb-3">Seated Tai Chi</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">Best for severe OA, post-surgery weeks, fall risk, or low-energy days. Same flowing principles from a sturdy chair.</p>
                <span className="inline-flex items-center text-primary font-semibold text-sm">Try seated routine <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
              </Card>
            </Link>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            Looking for a specific joint? <a href="#joints" className="text-primary hover:underline">Jump to the joint guides above</a> or browse all <Link to="/exercises" className="text-primary hover:underline">arthritis exercises</Link>.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border/15">
        <div className="container mx-auto px-6 md:px-12 max-w-[900px]">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-8">Tai Chi for Arthritis: FAQs</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-background rounded-lg border border-border/40 p-5">
                <summary className="cursor-pointer flex items-center justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold m-0">{f.q}</h3>
                  <ArrowRight className="h-4 w-4 shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
