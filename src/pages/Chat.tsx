import { Helmet } from "react-helmet-async";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import MedicalDisclaimerStrip from "@/components/MedicalDisclaimerStrip";
import ErrorBoundary from "@/components/ErrorBoundary";

const Chat = () => {
  return (
    <>
      <Helmet>
        <title>Arthritis Help & Support Chat | Living With Arthritis</title>
        <meta name="description" content="Free arthritis help & support: chat on WhatsApp, call 07760 512 084, or ask our online help chat for guidance and information." />
        <meta name="keywords" content="arthritis chat UK, virtual physiotherapy, arthritis help, joint pain advice UK, arthritis support, arthritis questions" />
        <meta property="og:title" content="Arthritis Help & Support Chat | Living With Arthritis" />
        <meta property="og:description" content="Educational arthritis help chat for UK readers. Ask about joint pain, exercises, diet and support — not a diagnosis." />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/chat" />
        <meta property="og:site_name" content="Living With Arthritis" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Arthritis Help & Support Chat | Living With Arthritis" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Help & Support – Free Arthritis Chat" />
        <meta name="twitter:description" content="Educational arthritis help chat — not a diagnosis. Seek NHS care when needed." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/chat" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Help & Support",
          "description": "Free help chat for arthritis advice, exercises, diet and standard treatment guidance.",
          "url": "https://livingwitharthritis.org.uk/chat",
          "inLanguage": "en-GB",
          "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis", "url": "https://livingwitharthritis.org.uk" },
          "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", "position": 2, "name": "Help & Support", "item": "https://livingwitharthritis.org.uk/chat" }
          ]
        })}</script>
      </Helmet>
      <div className="min-h-dvh bg-background">
        <div className="relative bg-gradient-to-br from-primary/6 via-background to-primary/4 border-b border-border/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />

          <div className="container max-w-4xl mx-auto py-10 px-4 relative z-10">
            <div className="mb-6">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="text-center mb-2">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
                Help & <span className="text-primary">Support</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Ask about arthritis management, exercises, diet and UK-specific support. Our team and resources are here for you.
              </p>
              <div className="mt-6 max-w-xl mx-auto text-left">
                <MedicalDisclaimerStrip variant="chat" />
              </div>
              <div className="flex items-center gap-3 justify-center mt-4">
                <Badge className="bg-background text-primary border-0 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Evidence-Based
                </Badge>
                <Badge className="bg-background text-primary border-0 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Free & Instant
                </Badge>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        <div className="container max-w-4xl mx-auto py-8 px-4">
          <p className="mb-4 text-sm">
            <a href="#chat-resource-guide" className="text-primary underline underline-offset-4">Prefer to browse? Find guides and resources.</a>
          </p>
          <ErrorBoundary>
            <ChatBot />
          </ErrorBoundary>

          <section aria-labelledby="chat-resource-guide" className="mt-10 rounded-2xl border border-border bg-card p-5 sm:p-8">
            <h2 id="chat-resource-guide" tabIndex={-1} className="scroll-mt-28 text-xl font-bold text-foreground mb-3">
              Find information that fits your question
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You can read our guides without using the chat. Choose a starting point below if you would rather browse, or if you want a resource to return to after asking a question.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Everyday living with arthritis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Browse the exercise library to find routines by joint or activity. Read the guidance for the routine you choose rather than treating a chat answer as a personal exercise prescription. The symptom and flare tracker offers a way to organise notes about how you feel and what you want to discuss at an appointment.
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li><Link to="/exercises" className="text-primary underline underline-offset-4">Browse exercise guides</Link></li>
              <li><Link to="/resources/symptom-flare-tracker" className="text-primary underline underline-offset-4">Open the symptom and flare tracker</Link></li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">UK benefits and support</h3>
            <p className="text-muted-foreground leading-relaxed">
              Start with the benefits guide for information about PIP and describing the effect of arthritis on daily activities. Check the official sources linked from the guide before making an application. Benefits rules and services depend on where you live. UK benefits and NHS information should not be treated as guidance for another country.
            </p>
            <p className="mt-3"><Link to="/guides/benefits-pip" className="text-primary underline underline-offset-4">Read the PIP and benefits guide</Link></p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Ask a focused question</h3>
            <p className="text-muted-foreground leading-relaxed">
              Try one question at a time, such as where to find a guide or how to prepare questions for your healthcare team. Do not share identifying medical records, passwords or contact details. This chat cannot examine you or provide a diagnosis or personal treatment plan. Do not wait for a chat reply if you need medical attention; follow the medical disclaimer and urgent-care guidance above.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Chat;
