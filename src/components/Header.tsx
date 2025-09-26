import { Button } from "@/components/ui/button";
import { Phone, Mail, Search } from "lucide-react";
import DonationBanner from "@/components/DonationBanner";

const Header = () => {
  return (
    <>
      <DonationBanner />
      <header className="bg-background border-b border-border">
      {/* Top bar */}
      <div className="bg-medical-purple text-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <span>Membership</span>
              <span>News</span>
              <span>Policy</span>
              <span>About us</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone size={14} />
                <span>Helpline 0800 5200 520 - Mon-Friday 9am-6pm</span>
              </div>
              <span>Contact us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-accent">
                LIVING WITH<br />
                <span className="text-primary">ARTHRITIS</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">ABOUT ARTHRITIS</a>
              <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">GET HELP</a>
              <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">GET INVOLVED</a>
              <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">SHOP</a>
              <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">RESEARCH</a>
              <a href="#" className="text-foreground font-medium hover:text-primary transition-colors">IN YOUR AREA</a>
              <Button variant="outline" size="sm">
                <Search size={16} />
              </Button>
            </nav>

            <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold px-6">
              DONATE
            </Button>
          </div>
        </div>
      </div>
      </header>
    </>
  );
};

export default Header;