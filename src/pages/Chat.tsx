import { Helmet } from "react-helmet-async";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Chat = () => {
  return (
    <>
      <Helmet>
        <title>Help & Support – Free Arthritis Chat | Living With Arthritis UK</title>
        <meta name="description" content="Get free arthritis support today. Chat on WhatsApp, call 07760 512 084, ask our help chat or request virtual physiotherapy. No waiting lists. HCPC-registered team ready to help." />
        <meta name="keywords" content="arthritis chat UK, virtual physiotherapy, arthritis help, joint pain advice UK, arthritis support, arthritis questions" />
        <meta property="og:title" content="Help & Support – Free Arthritis Chat | Living With Arthritis UK" />
        <meta property="og:description" content="Get free, instant arthritis advice from our help chat. Ask about joint pain, exercises, diet, standard treatments and more." />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/chat" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Help & Support – Free Arthritis Chat" />
        <meta name="twitter:description" content="Get free, instant arthritis advice from our help chat." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/chat" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/chat" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Help & Support",
          "description": "Free help chat for arthritis advice, exercises, diet and standard treatment guidance.",
          "url": "https://livingwitharthritis.org.uk/chat",
          "inLanguage": "en-GB",
          "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" },
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
      <div className="min-h-screen bg-background">
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
              <div className="flex items-center gap-3 justify-center mt-4">
                <Badge className="bg-primary/10 text-primary border-0 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Evidence-Based
                </Badge>
                <Badge className="bg-primary/10 text-primary border-0 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Free & Instant
                </Badge>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        <div className="container max-w-4xl mx-auto py-8 px-4">
          <ChatBot />
        </div>
      </div>
    </>
  );
};

export default Chat;
