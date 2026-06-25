import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope, Flame, Dumbbell, Sparkles } from "lucide-react";
import SymptomQuiz from "@/components/tools/SymptomQuiz";
import InflammationCalculator from "@/components/tools/InflammationCalculator";
import ExercisePlanGenerator from "@/components/tools/ExercisePlanGenerator";

const tools = [
  { id: "quiz", label: "Symptom Quiz", icon: Stethoscope, desc: "Identify your arthritis type" },
  { id: "inflammation", label: "Inflammation Score", icon: Flame, desc: "Calculate your risk level" },
  { id: "plan", label: "Exercise Plan", icon: Dumbbell, desc: "Get a personalised routine" },
] as const;

export default function HealthTools() {
  const [activeTab, setActiveTab] = useState("quiz");

  return (
    <>
      <Helmet>
        <title>Interactive Health Tools | Living With Arthritis UK</title>
        <meta name="description" content="Free interactive arthritis health tools: symptom quiz, inflammation risk calculator, and personalised exercise plan generator. Evidence-based tools for UK patients." />
        <meta property="og:title" content="Interactive Health Tools | Living With Arthritis UK" />
        <meta property="og:description" content="Free interactive arthritis health tools: symptom quiz, inflammation risk calculator, and personalised exercise plan generator." />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/health-tools" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Interactive Health Tools",
          "description": "Free interactive arthritis health tools for UK patients.",
          "url": "https://livingwitharthritis.org.uk/health-tools",
          "inLanguage": "en-GB",
          "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } }
        })}</script>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Interactive Health Tools | Living With Arthritis UK" />
      <meta name="twitter:description" content="Free interactive arthritis health tools: symptom quiz, inflammation risk calculator, and personalised exercise plan generator. Evidence-based tools for UK patients." />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
    </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb segments={[{ label: "Health Tools" }]} />

        <PageHero
          badge={
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Interactive Tools
            </Badge>
          }
          title={<>Your Arthritis <span className="text-primary">Health Toolkit</span></>}
          subtitle="Three free, evidence-based interactive tools to help you understand your symptoms, assess your inflammation risk, and build a personalised exercise plan."
        />

        <main id="main-content" className="container mx-auto px-5 md:px-8 py-8 md:py-12 max-w-3xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full h-auto p-1.5 bg-muted/30 rounded-xl grid grid-cols-3 gap-1">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <TabsTrigger
                    key={tool.id}
                    value={tool.id}
                    className="flex flex-col items-center gap-1 py-3 px-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs sm:text-sm"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold leading-tight">{tool.label}</span>
                    <span className="text-[10px] text-muted-foreground hidden sm:block">{tool.desc}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="mt-8">
              <TabsContent value="quiz" className="mt-0">
                <SymptomQuiz />
              </TabsContent>
              <TabsContent value="inflammation" className="mt-0">
                <InflammationCalculator />
              </TabsContent>
              <TabsContent value="plan" className="mt-0">
                <ExercisePlanGenerator />
              </TabsContent>
            </div>
          </Tabs>
        </main>

        <Footer />
      </div>
    </>
  );
}
