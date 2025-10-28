import { Button } from "@/components/ui/button";
import { Phone, Mail, Search } from "lucide-react";
import DonationBanner from "@/components/DonationBanner";

const Header = () => {
  return (
    <>
      <DonationBanner />
      <header className="bg-background border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center py-3 text-sm">
            <div className="flex items-center space-x-8">
              <a href="#" className="hover:opacity-80 transition-opacity">Membership</a>
              <a href="#" className="hover:opacity-80 transition-opacity">News</a>
              <a href="#" className="hover:opacity-80 transition-opacity">Policy</a>
              <a href="#" className="hover:opacity-80 transition-opacity">About Us</a>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>Helpline 0800 5200 520 - Mon-Fri 9am-6pm</span>
              </div>
              <a href="#" className="hover:opacity-80 transition-opacity">Contact Us</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-background/95">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-foreground tracking-tight">
                Living With Arthritis
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-10">
              <a href="#" className="text-foreground/80 font-medium text-sm hover:text-primary transition-colors">About Arthritis</a>
              <a href="#" className="text-foreground/80 font-medium text-sm hover:text-primary transition-colors">Get Help</a>
              <a href="#" className="text-foreground/80 font-medium text-sm hover:text-primary transition-colors">Get Involved</a>
              <a href="#" className="text-foreground/80 font-medium text-sm hover:text-primary transition-colors">Shop</a>
              <a href="#" className="text-foreground/80 font-medium text-sm hover:text-primary transition-colors">Research</a>
              <a href="#" className="text-foreground/80 font-medium text-sm hover:text-primary transition-colors">In Your Area</a>
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                <Search size={16} />
              </Button>
            </nav>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 shadow-soft rounded-lg">
              Donate
            </Button>
          </div>
        </div>
      </div>
      </header>
    </>
  );
};

export default Header;