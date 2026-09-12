import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const situations = [
  {
    title: "Knee osteoarthritis after years of walking",
    condition: "Osteoarthritis",
    text: "Morning stiffness, stairs that feel steeper, and a wait for NHS physio. We write knee-strength, chair and walking-pace guides for that gap — not a named recovery story.",
    href: "/conditions/knee-arthritis",
    links: ["Knee exercises", "Waiting-list help", "Diet hub"],
  },
  {
    title: "A new rheumatoid arthritis diagnosis",
    condition: "Rheumatoid arthritis",
    text: "A new diagnosis can feel lonely. Our RA pages, diet notes and help chat are general information. We will not invent a membership total or a named patient biography.",
    href: "/conditions/rheumatoid-arthritis",
    links: ["RA guide", "Help chat", "Newly diagnosed"],
  },
  {
    title: "Hands that have to keep working",
    condition: "Hand arthritis",
    text: "Teachers, joiners and anyone who uses their hands all day. Hand exercises, pacing and workplace notes — not a case study with a job title we made up.",
    href: "/conditions/hand-arthritis",
    links: ["Hand exercises", "Work & rights", "Self-help tool"],
  },
  {
    title: "Arthritis in your thirties or forties",
    condition: "Younger adults",
    text: "Work, childcare and sport can all collide with a flare. We publish pacing and exercise pages for that life, without inventing a young-adult peer-mentor programme.",
    href: "/guides/newly-diagnosed",
    links: ["Newly diagnosed", "Exercise hub", "Community"],
  },
];

export default function LivedExperiences() {
  return (
    <>
      <Helmet>
        <title>Living with arthritis — situations we write for | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Guides for common UK arthritis situations. Not named patients, not a membership total, and not audited outcomes. Charity 1218461, registered 15 June 2026."
        />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Situations we write about",
          "description": "Illustrative arthritis situations, not patient biographies or a count of people supported.",
          "url": "https://livingwitharthritis.org.uk/stories",
        })}</script>
        <meta property="og:title" content="Situations we write about | Living With Arthritis UK" />
        <meta property="og:description" content="Guides for common UK arthritis situations. Not named patients and not audited outcomes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/stories" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Living with arthritis | Living With Arthritis UK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Situations we write about | Living With Arthritis UK" />
        <meta name="twitter:description" content="Guides for common UK arthritis situations. Not named patients and not audited outcomes." />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content">
          <PageHero
            title="Stories about living with arthritis"
            subtitle="Guides for common situations. Not named patients, not a count of people this charity has supported."
          />

          <section className="bg-primary/5 border-y border-primary/10 py-6">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Living With Arthritis was registered on 15 June 2026 (charity 1218461). We do not publish invented biographies or a people-supported total. If you want to share a real experience, email info@livingwitharthritis.org.uk.
              </p>
            </div>
          </section>

          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-4xl space-y-8">
              {situations.map((s, i) => (
                <motion.article
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <Card className="border border-border/40">
                    <CardContent className="p-6 md:p-8 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{s.condition}</Badge>
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{s.title}</h2>
                      <p className="text-foreground/85 leading-relaxed">{s.text}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.links.map((label) => (
                          <Badge key={label} variant="secondary" className="text-[10px] font-medium">{label}</Badge>
                        ))}
                      </div>
                      <Button asChild>
                        <Link to={s.href}>Open the guide <ArrowRight className="w-4 h-4 ml-1" /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                  {i < situations.length - 1 ? null : null}
                </motion.article>
              ))}
            </div>
          </section>

          <section className="bg-primary/5 py-12">
            <div className="container mx-auto px-4 text-center max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Share a real story</h2>
              <p className="text-muted-foreground">
                We will only publish an account you send us and approve. We will not invent one.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link to="/community">Community pages <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/blog"><BookOpen className="w-4 h-4 mr-1" /> Read the blog</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
