import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Activity,
  BookMarked,
  Download,
  ExternalLink,
  FileText,
  HeartHandshake,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { WaveDivider } from "@/components/graphics/InfographicElements";
import {
  getLatestMagazineIssue,
  getPastMagazineIssues,
  type MagazineIssue,
} from "@/data/magazines";

const SITE_URL = "https://livingwitharthritis.org.uk";
const PAGE_PATH = "/magazine";
const PAGE_TITLE = "Monthly Magazine";
const PAGE_DESCRIPTION =
  "Download the free Living With Arthritis monthly magazine. Practical pain tips, home exercises, benefits and PIP guidance, and community stories — no sign-up.";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const issueContents = [
  {
    icon: Sparkles,
    title: "Pain-management tips",
    description: "Practical ways to ease everyday joint pain and get through a flare with more confidence.",
  },
  {
    icon: Activity,
    title: "Gentle exercises",
    description: "Chair-based and at-home movements you can try at your own pace, written in plain English.",
  },
  {
    icon: Wallet,
    title: "Benefits and PIP",
    description: "Clear notes on support you may be entitled to, including Personal Independence Payment.",
  },
  {
    icon: HeartHandshake,
    title: "Community stories",
    description: "Experiences from people living with arthritis and the carers who walk alongside them.",
  },
];

const faqs = [
  {
    question: "What is in each issue?",
    answer:
      "Each magazine gathers pain-management tips, gentle exercises you can do at home, plain-English guidance on benefits and PIP, and stories from our community.",
  },
  {
    question: "How do I read it?",
    answer:
      "Every issue is a free PDF. Use Download PDF to save a copy, or Read online to open the same file in your browser. You do not need an account.",
  },
  {
    question: "Who is the magazine for?",
    answer:
      "It is written first for people living with arthritis, and also for carers, family and friends who want practical, trustworthy information.",
  },
  {
    question: "Is this medical advice?",
    answer:
      "No. The magazine is educational information, not a diagnosis or a personal treatment plan. Speak to your GP or rheumatology team about your own care.",
  },
];

function MagazineCover({ issue, featured = false }: { issue: MagazineIssue; featured?: boolean }) {
  const label = `${issue.title} cover`;
  if (issue.coverImage) {
    return (
      <img
        src={issue.coverImage}
        alt={label}
        className="h-full w-full object-cover"
        width={featured ? 480 : 320}
        height={featured ? 640 : 427}
      />
    );
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-primary/25 via-primary/10 to-accent/20 px-6 text-center"
      role="img"
      aria-label={label}
    >
      <BookMarked className={`${featured ? "h-14 w-14" : "h-10 w-10"} text-primary mb-4`} aria-hidden="true" />
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Living With Arthritis</p>
      <p className={`${featured ? "text-2xl" : "text-lg"} mt-2 font-display font-bold text-foreground`}>{issue.month}</p>
      <p className="mt-3 text-sm text-muted-foreground">Monthly magazine</p>
    </div>
  );
}

function IssueActions({ issue }: { issue: MagazineIssue }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild size="lg" className="min-h-11 min-w-[11rem]">
        <a href={issue.pdfPath} download>
          <Download className="h-4 w-4" aria-hidden="true" />
          Download PDF
        </a>
      </Button>
      <Button asChild size="lg" variant="outline" className="min-h-11 min-w-[11rem]">
        <a href={issue.pdfPath} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Read online
        </a>
      </Button>
    </div>
  );
}

const Magazine = () => {
  const latest = getLatestMagazineIssue();
  const pastIssues = getPastMagazineIssues();

  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${PAGE_TITLE} | Living With Arthritis`,
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}${PAGE_PATH}`,
      inLanguage: "en-GB",
      isPartOf: {
        "@type": "WebSite",
        name: "Living With Arthritis",
        url: `${SITE_URL}/`,
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    };

    const id = "magazine-webpage-jsonld";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  return (
    <>
      <SeoHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} path={PAGE_PATH} />
      <Header />
      <main id="main-content" className="min-h-screen bg-background">
        <div className="container mx-auto px-4 pt-6 max-w-6xl">
          <PageBreadcrumb segments={[{ label: "Monthly magazine" }]} />
        </div>

        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookMarked className="h-4 w-4" aria-hidden="true" />
                Monthly magazine
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Monthly magazine
              </h1>
              <p className="speakable-intro text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A free magazine from Living With Arthritis for people living with arthritis and the people who care for them. Each issue is a downloadable PDF — no account and no paywall.
              </p>
            </motion.div>
          </div>
        </section>

        <WaveDivider />

        {latest ? (
          <section className="py-16 md:py-20" aria-labelledby="latest-issue-heading">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Badge className="mb-3">Latest issue</Badge>
                  <h2 id="latest-issue-heading" className="text-3xl font-bold text-foreground">
                    Featured magazine
                  </h2>
                </div>
              </div>
              <Card className="overflow-hidden border-none shadow-xl bg-card">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-[minmax(0,18rem)_1fr] lg:grid-cols-[minmax(0,22rem)_1fr] gap-0">
                    <div className="aspect-[3/4] md:aspect-auto md:min-h-[28rem]">
                      <MagazineCover issue={latest} featured />
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-12">
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{latest.month}</p>
                      <h3 className="mt-3 text-3xl font-bold text-foreground">{latest.title}</h3>
                      <p className="mt-4 text-muted-foreground leading-relaxed">{latest.description}</p>
                      {latest.highlights && latest.highlights.length > 0 && (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {latest.highlights.map((item) => (
                            <li key={item}>
                              <Badge variant="secondary">{item}</Badge>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-8">
                        <IssueActions issue={latest} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        ) : (
          <section className="py-16 md:py-20" aria-labelledby="coming-soon-heading">
            <div className="container mx-auto px-4 max-w-5xl">
              <Card className="overflow-hidden border-none shadow-xl bg-card">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-[minmax(0,18rem)_1fr] gap-0">
                    <div
                      className="flex min-h-[22rem] aspect-[3/4] md:aspect-auto flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-primary/5 to-accent/20 px-6 text-center"
                      aria-hidden="true"
                    >
                      <div className="relative">
                        <div className="absolute -left-6 top-4 h-48 w-36 rotate-[-8deg] rounded-md bg-primary/15 shadow-sm" />
                        <div className="absolute -right-5 top-2 h-48 w-36 rotate-[7deg] rounded-md bg-accent/30 shadow-sm" />
                        <div className="relative flex h-56 w-40 flex-col items-center justify-center rounded-md bg-background shadow-lg ring-1 ring-border/60">
                          <BookMarked className="h-10 w-10 text-primary" />
                          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Coming soon</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-12">
                      <Badge className="mb-4 w-fit">First edition</Badge>
                      <h2 id="coming-soon-heading" className="text-3xl font-bold text-foreground">
                        Our first issue is coming soon
                      </h2>
                      <p className="mt-4 text-muted-foreground leading-relaxed">
                        We are preparing the first edition now. When it is ready you will find it here, free to download. Until then, this page is the home for every future issue.
                      </p>
                      <p className="mt-4 text-muted-foreground leading-relaxed">
                        Each magazine will cover practical ways to ease joint pain, gentle exercises you can try at home, clear notes on benefits and PIP, and stories from our community. Please check back soon.
                      </p>
                      <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                        <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                        New PDFs will appear here as soon as they are published.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {pastIssues.length > 0 && (
          <section className="py-16 bg-muted/30" aria-labelledby="past-issues-heading">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 id="past-issues-heading" className="text-3xl font-bold text-foreground mb-3">
                Previous issues
              </h2>
              <p className="text-muted-foreground mb-10 max-w-2xl">
                Browse earlier editions of the Living With Arthritis monthly magazine and download any PDF to keep.
              </p>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastIssues.map((issue) => (
                  <li key={issue.id}>
                    <Card className="h-full overflow-hidden border-none shadow-md bg-card">
                      <div className="aspect-[3/4] overflow-hidden">
                        <MagazineCover issue={issue} />
                      </div>
                      <CardContent className="p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{issue.month}</p>
                        <h3 className="mt-2 text-xl font-semibold text-foreground">{issue.title}</h3>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{issue.description}</p>
                        <div className="mt-6">
                          <Button asChild className="w-full min-h-11">
                            <a href={issue.pdfPath} download>
                              <Download className="h-4 w-4" aria-hidden="true" />
                              Download PDF
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="py-16 md:py-20" aria-labelledby="whats-inside-heading">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-2xl mb-10">
              <h2 id="whats-inside-heading" className="text-3xl font-bold text-foreground mb-3">
                What is in each issue?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Every edition is written for real life with arthritis — short, useful pieces you can come back to, not filler.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {issueContents.map((item) => (
                <Card key={item.title} className="border-none shadow-md bg-card h-full">
                  <CardContent className="pt-8 pb-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30" aria-labelledby="magazine-faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" aria-hidden="true" />
              <h2 id="magazine-faq-heading" className="text-3xl font-bold text-foreground">
                Common questions
              </h2>
            </div>
            <dl className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg bg-card p-6 shadow-sm">
                  <dt className="font-semibold text-foreground">{faq.question}</dt>
                  <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 flex items-start gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              Educational information only, not a diagnosis or individual treatment plan.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Magazine;
