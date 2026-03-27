import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { lazy, Suspense } from "react";
import { Heart, Users, Trophy, Building2, ScrollText, ArrowRight, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";

const Footer = lazy(() => import("@/components/Footer"));

const WAYS = [
  {
    icon: Heart,
    title: "Make a Donation",
    description: "Your gift directly funds physiotherapy sessions, exercise programmes and community support for people living with arthritis across the UK. Every pound makes a difference.",
    cta: "Donate Now",
    href: "/zakat-appeal",
    color: "bg-[hsl(0,72%,51%)]/10 text-[hsl(0,72%,51%)]",
    highlight: true,
  },
  {
    icon: Users,
    title: "Volunteer With Us",
    description: "Share your time and skills to support our community. From peer mentoring to event support, there are many ways to get involved and make an impact.",
    cta: "Get Involved",
    href: "/community",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Trophy,
    title: "Fundraise for Us",
    description: "Run a marathon, host a bake sale, or organise a sponsored event. We'll provide everything you need to raise funds and awareness for arthritis support.",
    cta: "Start Fundraising",
    href: "/corporate-giving",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Building2,
    title: "Corporate Partnerships",
    description: "Partner with us to make a lasting impact. We offer sponsorship opportunities, employee engagement programmes and cause-related marketing partnerships.",
    cta: "Partner With Us",
    href: "/corporate-giving",
    color: "bg-sky-500/10 text-sky-600",
  },
  {
    icon: ScrollText,
    title: "Leave a Legacy",
    description: "A gift in your will can help ensure that future generations of people living with arthritis receive the support they need. Your legacy lives on through our work.",
    cta: "Learn More",
    href: "/about",
    color: "bg-violet-500/10 text-violet-600",
  },
];

export default function WaysToHelp() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Ways to Help | Living With Arthritis UK</title>
        <meta name="description" content="Discover how you can support people living with arthritis across the UK. Donate, volunteer, fundraise, partner with us or leave a legacy." />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/ways-to-help" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content">
          <PageHero
            title="Ways to Help"
            subtitle="Every action — big or small — helps someone living with arthritis lead a fuller life."
          />

          <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
              <div className="grid gap-6 md:gap-8">
                {WAYS.map((way) => {
                  const Icon = way.icon;
                  return (
                    <div
                      key={way.title}
                      className={`bg-card border rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 sm:gap-6 transition-all hover:shadow-lg ${
                        way.highlight ? "border-[hsl(0,72%,51%)]/20 shadow-md" : "border-border/30"
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${way.color}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{way.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{way.description}</p>
                        <Button
                          onClick={() => navigate(way.href)}
                          variant={way.highlight ? "default" : "outline"}
                          className={`rounded-full text-sm font-semibold group ${
                            way.highlight ? "bg-[hsl(0,72%,51%)] hover:bg-[hsl(0,72%,45%)] text-white" : ""
                          }`}
                        >
                          {way.cta}
                          <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
