import { Helmet } from "react-helmet-async";
import { ChatBot } from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Chat = () => {
  return (
    <>
      <Helmet>
        <title>Virtual Arthritis Assistant – Free AI Chat | Living With Arthritis UK</title>
        <meta name="description" content="Get free, instant arthritis advice from our AI virtual assistant. Ask about joint pain, exercises, diet, NHS treatments and more – tailored for UK residents." />
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
        <link rel="alternate" hreflang="en-GB" href="https://livingwitharthritis.org.uk/chat" />
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
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <div className="mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Chat Assistant</h1>
            <p className="text-muted-foreground">
              Ask questions and get instant AI-powered responses
            </p>
          </div>

          <ChatBot />
        </div>
      </div>
    </>
  );
};

export default Chat;
