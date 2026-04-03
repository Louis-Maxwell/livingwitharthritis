import { Helmet } from "react-helmet-async";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import robotImg from "@/assets/robot-assistant.png";

const Chat = () => {
  return (
    <>
      <Helmet>
        <title>Virtual Arthritis Assistant – Free AI Chat | Living With Arthritis UK</title>
        <meta name="description" content="Get free arthritis support today. Chat on WhatsApp, call 07760 512 084, use our AI assistant or request virtual physiotherapy. No waiting lists. HCPC-registered team ready to help." />
        <meta name="keywords" content="arthritis chat UK, virtual physiotherapy, AI arthritis help, joint pain advice UK, NHS arthritis support, arthritis questions" />
        <meta property="og:title" content="Virtual Arthritis Assistant – Free AI Chat | Living With Arthritis UK" />
        <meta property="og:description" content="Get free, instant arthritis advice from our AI virtual assistant. Ask about joint pain, exercises, diet, NHS treatments and more." />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/chat" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Virtual Arthritis Assistant – Free AI Chat" />
        <meta name="twitter:description" content="Get free, instant arthritis advice from our AI virtual assistant." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/chat" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/chat" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Virtual Arthritis Assistant",
          "description": "Free AI-powered chat assistant for arthritis advice, exercises, diet and NHS treatment guidance.",
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
            { "@type": "ListItem", "position": 2, "name": "Virtual Assistant", "item": "https://livingwitharthritis.org.uk/chat" }
          ]
        })}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Decorative header */}
        <div className="relative bg-gradient-to-br from-primary/6 via-background to-emerald-500/4 border-b border-border/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />

          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20%" cy="40%" r="3" fill="hsl(var(--primary))" />
            <circle cx="75%" cy="25%" r="2.5" fill="hsl(var(--secondary))" />
            <circle cx="85%" cy="70%" r="2" fill="hsl(var(--primary))" />
          </svg>

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
              <div className="inline-flex items-center gap-3 mb-4">
                <RobotIcon size={64} />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wide">AI-Powered</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
                Virtual Arthritis <span className="text-primary">Assistant</span>
              </h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Ask questions and get instant AI-powered responses about arthritis management, exercises, diet and UK-specific support.
              </p>
              <div className="flex items-center gap-3 justify-center mt-4">
                <Badge className="bg-emerald-500/10 text-emerald-700 border-0 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Evidence-Based
                </Badge>
                <Badge className="bg-blue-500/10 text-blue-700 border-0 text-xs">
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
