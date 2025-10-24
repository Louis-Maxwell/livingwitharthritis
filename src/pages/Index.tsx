import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesGrid from "@/components/ServicesGrid";
import ConditionsSection from "@/components/ConditionsSection";
import BodyMapSection from "@/components/BodyMapSection";
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
        <BodyMapSection />
      </main>
      <Footer />
      <DonationNotification />
    </div>
  );
};

export default Index;
