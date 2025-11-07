import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesGrid from "@/components/ServicesGrid";
import ConditionsSection from "@/components/ConditionsSection";
import FundraisingSection from "@/components/FundraisingSection";
import DonationTiersSection from "@/components/DonationTiersSection";
import Footer from "@/components/Footer";
import DonationNotification from "@/components/DonationNotification";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesGrid />
        <ConditionsSection />
        <FundraisingSection />
        <DonationTiersSection />
      </main>
      <Footer />
      <DonationNotification />
    </div>
  );
};

export default Index;
