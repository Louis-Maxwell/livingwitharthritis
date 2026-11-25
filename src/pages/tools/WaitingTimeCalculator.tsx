import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { ArrowRight, Clock } from "lucide-react";

const BASE = "https://livingwitharthritis.org.uk";

// Referral steps reused from waitingListHelpContent.ts. No numerical estimate:
// the previous regional constants had no supporting source or method.
const WaitingTimeCalculator = () => (
  <>
    <Helmet>
      <title>Arthritis Referral and Waiting Time Information</title>
      <meta name="description" content="Check your referral, find out who to contact about your appointment and keep a symptom record while you wait for rheumatology." />
      <meta property="og:title" content="Arthritis Referral and Waiting Time Information" />
      <meta property="og:description" content="Check your referral and find out who to contact while you wait for rheumatology." />
      <meta property="og:url" content={`${BASE}/tools/waiting-time`} />
      <meta property="og:image" content={`${BASE}/images/hero-walking-group-1600.webp`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Arthritis Referral and Waiting Time Information" />
      <meta name="twitter:description" content="Check your referral and find out who to contact while you wait for rheumatology." />
      <meta name="twitter:image" content={`${BASE}/images/hero-walking-group-1600.webp`} />
    </Helmet>
    <Header />
    <PageBreadcrumb segments={[{ label: "Tools" }, { label: "Referral and Waiting Time Information" }]} />
    <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 max-w-3xl">
      <div className="flex items-center gap-2 text-foreground mb-3">
        <Clock className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium uppercase tracking-wide">Referral information</span>
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Arthritis Referral and Waiting Time Information</h1>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">This page does not calculate or predict your appointment date. Ask your GP surgery or the hospital's booking team about your referral and expected wait.</p>
      <section className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-5">Check your referral</h2>
        <ol className="list-decimal pl-6 space-y-5 text-muted-foreground leading-relaxed">
          <li><strong className="text-foreground">Make sure the referral has actually been made.</strong> Ask your GP surgery which service you were referred to, whether it was marked routine or urgent, and when it was sent.</li>
          <li><strong className="text-foreground">Book or confirm the appointment.</strong> In England, many first appointments are booked through the NHS e-Referral Service using the details in your appointment request letter. If you have not heard anything within a few weeks, contact the hospital's booking or appointments team.</li>
          <li><strong className="text-foreground">Start a simple symptom record</strong> so you can show how things change while you wait.</li>
        </ol>
      </section>
      <section className="bg-muted/40 border border-border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">If symptoms get worse</h2>
        <p className="text-muted-foreground leading-relaxed">Contact your GP if symptoms get worse so the referral can be reviewed.</p>
      </section>
      <section className="p-6 bg-card border border-border rounded-2xl">
        <h2 className="text-xl font-semibold mb-3">More information while you wait</h2>
        <p className="text-muted-foreground mb-4">Read about referral steps, symptom records and who to contact in our waiting list guide.</p>
        <Link to="/arthritis-waiting-list-help" className="text-foreground underline inline-flex items-center gap-1.5">Read our rheumatology waiting list guide <ArrowRight className="w-4 h-4 text-primary" /></Link>
        <p className="text-muted-foreground mt-5">Our automated chat can help you find educational guides and prepare questions for your clinician. It does not provide a personal treatment plan.</p>
        <Link to="/chat" className="text-foreground underline inline-flex items-center gap-1.5 mt-3">Open the educational chat <ArrowRight className="w-4 h-4 text-primary" /></Link>
      </section>
    </main>
    <Footer />
  </>
);

export default WaitingTimeCalculator;
