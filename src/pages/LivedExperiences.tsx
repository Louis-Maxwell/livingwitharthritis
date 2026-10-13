import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT_EMAILS } from "@/config/contact";

/**
 * /stories — "Share your story" (content batch 6, topic 98, Oct 2026).
 * Consent-based submission page. No stories are published yet and none are
 * invented: the "Stories coming soon" section stays until a real, consented
 * account has been edited, approved by its author and reviewed.
 * Pending clinical and editorial review.
 */

const PAGE_URL = "https://livingwitharthritis.org.uk/stories";
const TITLE = "Share Your Arthritis Story | Living With Arthritis";
const DESCRIPTION =
  "Share your experience of living with arthritis in the UK. How to send your story, how consent works, our editorial and safeguarding rules, and what to expect.";

const STORY_SUBJECT = "Share my story";
const STORY_BODY = [
  "Your name (or how you would like to be named: first name, initials or anonymous):",
  "Your age range and nation (England, Scotland, Wales or Northern Ireland), if you are happy to share:",
  "Type of arthritis, if you know it:",
  "Your story (what happened, what helped, what you wish you had known):",
  "Can we contact you by email to talk about editing? (yes/no):",
  "Are you 18 or over? (yes/no):",
].join("\n\n");
const STORY_MAILTO = `mailto:${CONTACT_EMAILS.info}?subject=${encodeURIComponent(STORY_SUBJECT)}&body=${encodeURIComponent(STORY_BODY)}`;

const situations = [
  {
    title: "Knee osteoarthritis after years of walking",
    condition: "Osteoarthritis",
    text: "Morning stiffness, stairs that feel steeper, and a wait for NHS physio. Our knee-strength, chair and walking-pace guides are written for that gap.",
    href: "/conditions/knee-arthritis",
  },
  {
    title: "A new rheumatoid arthritis diagnosis",
    condition: "Rheumatoid arthritis",
    text: "A new diagnosis can feel lonely. Our rheumatoid arthritis and newly diagnosed guides explain the first months in plain English.",
    href: "/conditions/rheumatoid-arthritis",
  },
  {
    title: "Hands that have to keep working",
    condition: "Hand arthritis",
    text: "For anyone who uses their hands all day: hand exercises, pacing and workplace adjustments.",
    href: "/conditions/hand-arthritis",
  },
  {
    title: "Arthritis in your thirties or forties",
    condition: "Younger adults",
    text: "Work, childcare and sport can all collide with a flare. Start with our newly diagnosed guide and exercise pages.",
    href: "/guides/newly-diagnosed",
  },
];

const faqs = [
  {
    q: "Do you publish stories from real patients?",
    a: "Only real accounts sent to us by the person themselves, edited with them and approved by them in writing before publication. We have not published any yet. We never invent stories, names or quotes.",
  },
  {
    q: "Can I share my story anonymously?",
    a: "Yes. You can choose your full name, first name only, initials or no name at all. We will remove details that could identify you if you ask.",
  },
  {
    q: "Can I change my mind after my story is published?",
    a: "Yes. Email us and we will take it down or change it as soon as we can. We cannot control copies made by others before removal, which is one reason to think carefully about identifying details.",
  },
  {
    q: "Will you pay me for my story?",
    a: "No. We do not pay for stories and we do not accept payment to publish them.",
  },
  {
    q: "Can I mention the treatment or products that helped me?",
    a: "You can describe your treatment. We will not publish recommendations of specific products, private practitioners or unproven treatments, and we may add a note pointing to NHS or NICE information.",
  },
  {
    q: "Can young people share their story?",
    a: "Yes, with the written agreement of a parent or guardian if they are under 18. We take extra care with identifying details for under-18s.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  url: PAGE_URL,
  inLanguage: "en-GB",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const h2 = "text-2xl font-bold text-foreground mb-4";
const p = "text-foreground/85 leading-relaxed mb-4";
const ul = "list-disc pl-6 space-y-2 text-foreground/85 leading-relaxed mb-4";

export default function LivedExperiences() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="Living With Arthritis" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Share your arthritis story | Living With Arthritis" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Share your arthritis story",
          description: DESCRIPTION,
          url: PAGE_URL,
          inLanguage: "en-GB",
        })}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb segments={[{ label: "Community", href: "/community" }, { label: "Share your story" }]} />
        <main id="main-content">
          <PageHero
            title="Share your story"
            subtitle="Real experiences of living with arthritis in the UK, shared with consent and in your own words."
          />

          <div className="container mx-auto px-4 max-w-3xl py-10 md:py-14">
            <aside className="speakable-intro mb-10 pl-5 border-l-4 border-primary bg-card/50 py-3 pr-3 rounded-r-lg" aria-label="Summary">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                To share your experience, email <a className="text-primary underline" href={STORY_MAILTO}>{CONTACT_EMAILS.info}</a> with
                the subject "Share my story", or use our <Link className="text-primary underline" to="/contact">contact form</Link>.
                We will only publish an account you send us, after you have seen and approved the final version. You can stay
                anonymous and you can ask us to remove it at any time.
              </p>
            </aside>

            <section aria-labelledby="coming-soon" className="mb-12 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-6 md:p-8 text-center">
              <h2 id="coming-soon" className={h2}>Stories coming soon</h2>
              <p className={p}>
                We have not published any stories yet. When we do, they will appear here. Every story on this page will be a
                real account, sent by the person it is about, edited with them and approved by them. We do not invent stories,
                names, photos or quotes, and we do not publish "composite" patients.
              </p>
              <Button asChild>
                <a href={STORY_MAILTO}><Mail className="w-4 h-4 mr-2" aria-hidden /> Email us your story</a>
              </Button>
            </section>

            <section aria-labelledby="why" className="mb-10">
              <h2 id="why" className={h2}>Why share your story?</h2>
              <p className={p}>
                Hearing from someone who has been through something similar can help people feel less alone, know what questions
                to ask, and spot practical ideas they had not thought of. Your experience of waiting for a diagnosis, working
                with arthritis, starting a new medicine, caring for someone, or simply getting through a bad week could help
                someone else. Sharing can also be helpful for you. It is entirely your choice, and there is no pressure to take part.
              </p>
            </section>

            <section aria-labelledby="what" className="mb-10">
              <h2 id="what" className={h2}>What we are looking for</h2>
              <p className={p}>Any honest experience of living with any type of arthritis in the UK. For example:</p>
              <ul className={ul}>
                <li>getting a diagnosis, or waiting for one</li>
                <li>your first year with a new diagnosis</li>
                <li>working, studying, parenting or caring with arthritis</li>
                <li>waiting for treatment or surgery, and recovering afterwards</li>
                <li>exercise and staying active, including what did not work</li>
                <li>money, benefits and practical support</li>
                <li>mental health, relationships and confidence</li>
                <li>supporting someone with arthritis</li>
              </ul>
              <p className={p}>
                Stories do not need to be inspiring or have a happy ending. Difficult experiences matter too. Around 300 to
                1,000 words is a good length, but a few paragraphs is fine, and we can help you shape it.
              </p>
            </section>

            <section aria-labelledby="how" className="mb-10">
              <h2 id="how" className={h2}>How to share your story</h2>
              <ol className="list-decimal pl-6 space-y-2 text-foreground/85 leading-relaxed mb-4">
                <li>
                  <strong>Send it to us.</strong> Email <a className="text-primary underline" href={STORY_MAILTO}>{CONTACT_EMAILS.info}</a> with
                  the subject "Share my story". The link opens an email with a few prompts. Or use the <Link className="text-primary underline" to="/contact">contact form</Link>.
                  You can send a written account or ask us to arrange a chat instead.
                </li>
                <li><strong>Tell us how you want to be named:</strong> full name, first name, initials or anonymous.</li>
                <li><strong>We reply</strong> to confirm we have received it and to ask any questions.</li>
                <li><strong>We edit with you.</strong> We may shorten it or make it clearer, but we will not change what it means.</li>
                <li><strong>You approve the final version in writing</strong> before anything is published.</li>
                <li><strong>We publish it</strong> with a note that it is a personal experience, not medical advice.</li>
                <li><strong>You stay in control.</strong> Email us at any time to change or remove it.</li>
              </ol>
              <p className={p}>
                Please do not send photos of other people, or details of other people, without their permission. Photos of
                yourself are optional.
              </p>
            </section>

            <section aria-labelledby="consent" className="mb-10">
              <h2 id="consent" className={h2}>Consent and your information</h2>
              <ul className={ul}>
                <li>We will never publish anything without your written approval of the final version.</li>
                <li>You can withdraw consent at any time, before or after publication. We will remove it as soon as we can.</li>
                <li>Under-18s need the written agreement of a parent or guardian.</li>
                <li>We only use your contact details to talk to you about your story.</li>
                <li>We do not pay for stories and we do not share your details with companies.</li>
                <li>
                  Read our <Link className="text-primary underline" to="/privacy">privacy policy</Link> for how we handle personal information.
                </li>
              </ul>
              <p className={p}>
                Think carefully before sharing health details, your employer's name, or anything that could identify you or
                others. Once something is online, copies can be made, even after we remove it.
              </p>
            </section>

            <section aria-labelledby="editorial" className="mb-10">
              <h2 id="editorial" className={h2}>Our editorial guidelines</h2>
              <ul className={ul}>
                <li>Stories are personal experiences. We publish them alongside a short reminder that they are not medical advice.</li>
                <li>We check any medical facts against NHS and NICE information and may add a note or link where needed.</li>
                <li>We do not publish recommendations of specific products, brands, private clinics or practitioners.</li>
                <li>We do not publish stories that encourage stopping prescribed treatment or using unproven "cures".</li>
                <li>We do not name health professionals or employers without their consent, and we remove complaints about named individuals.</li>
                <li>We do not publish fundraising appeals, advertising or links to commercial sites.</li>
                <li>
                  We follow our <Link className="text-primary underline" to="/editorial-standards">editorial standards</Link>. We may decide not to
                  publish a story, and will tell you why.
                </li>
              </ul>
            </section>

            <section aria-labelledby="safeguarding" className="mb-10">
              <h2 id="safeguarding" className={h2}>Safeguarding</h2>
              <p className={p}>
                We read every story with care. If something you send suggests that you or someone else may be at risk of harm,
                we may contact you to check you are safe and point you to support. Where we believe someone is at serious risk,
                we may need to share information with the right services, following our{" "}
                <Link className="text-primary underline" to="/safeguarding">safeguarding policy</Link>. You can raise a safeguarding
                concern by emailing <a className="text-primary underline" href={`mailto:${CONTACT_EMAILS.safeguarding}`}>{CONTACT_EMAILS.safeguarding}</a>.
              </p>
              <p className={p}>
                We are not a crisis service and may not read emails straight away. If you are struggling now, you can call
                Samaritans free, any time, on <strong>116 123</strong>. For urgent medical help, contact <strong>NHS 111</strong>. In an
                emergency, or if you are in danger, call <strong>999</strong>.
              </p>
            </section>

            <section aria-labelledby="meantime" className="mb-10">
              <h2 id="meantime" className={h2}>In the meantime: guides for common situations</h2>
              <p className={p}>These are guides, not personal stories.</p>
              <div className="space-y-6">
                {situations.map((s) => (
                  <Card key={s.title} className="border border-border/40">
                    <CardContent className="p-6 space-y-3">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{s.condition}</Badge>
                      <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
                      <p className="text-foreground/85 leading-relaxed">{s.text}</p>
                      <Button asChild variant="outline">
                        <Link to={s.href}>Open the guide <ArrowRight className="w-4 h-4 ml-1" /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="faq-heading" className="mb-10">
              <h2 id="faq-heading" className={h2}>Frequently asked questions</h2>
              <div className="space-y-5">
                {faqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-semibold text-foreground mb-1">{f.q}</h3>
                    <p className="text-foreground/85 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Living With Arthritis is a registered charity (no. 1218461). Personal stories are not medical advice. Speak to your
              GP, pharmacist or specialist team about your own situation. This page is pending editorial review.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
