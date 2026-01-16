import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesGrid from "@/components/ServicesGrid";
import ConditionsSection from "@/components/ConditionsSection";
import FundraisingSection from "@/components/FundraisingSection";
import DonationTiersSection from "@/components/DonationTiersSection";
import VirtualPhysioSection from "@/components/VirtualPhysioSection";
import ZohoInvoiceSection from "@/components/ZohoInvoiceSection";
import Footer from "@/components/Footer";
import DonationNotification from "@/components/DonationNotification";
import { FloatingChatButton } from "@/components/FloatingChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesGrid />
        <VirtualPhysioSection />
        <ZohoInvoiceSection />
        <ConditionsSection />
        <FundraisingSection />
        <DonationTiersSection />
      </main>
      <Footer />
      <DonationNotification />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
