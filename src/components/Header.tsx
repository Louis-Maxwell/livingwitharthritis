import { Button } from "@/components/ui/button";
import { Phone, Mail, Search } from "lucide-react";
import DonationBanner from "@/components/DonationBanner";

const Header = () => {
  return (
    <>
      <DonationBanner />
      <header className="bg-background/95 border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-center py-3.5 text-sm">
            <div className="flex items-center space-x-10">
              <a href="#" className="hover:opacity-80 transition-opacity font-medium">Membership</a>
              <a href="#" className="hover:opacity-80 transition-opacity font-medium">News</a>
              <a href="#" className="hover:opacity-80 transition-opacity font-medium">Policy</a>
              <a href="#" className="hover:opacity-80 transition-opacity font-medium">About Us</a>
            </div>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2.5">
                <Phone size={15} />
                <span className="font-medium">Helpline 0800 5200 520 - Mon-Fri 9am-6pm</span>
              </div>
              <a href="#" className="hover:opacity-80 transition-opacity font-medium">Contact Us</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-background/98">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-foreground tracking-tight">
                Living With Arthritis
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-12">
              <a href="#" className="text-foreground/70 font-medium text-sm hover:text-primary transition-colors tracking-tight">About Arthritis</a>
              <a href="#" className="text-foreground/70 font-medium text-sm hover:text-primary transition-colors tracking-tight">Get Help</a>
              <a href="#" className="text-foreground/70 font-medium text-sm hover:text-primary transition-colors tracking-tight">Get Involved</a>
              <a href="#" className="text-foreground/70 font-medium text-sm hover:text-primary transition-colors tracking-tight">Shop</a>
              <a href="#" className="text-foreground/70 font-medium text-sm hover:text-primary transition-colors tracking-tight">Research</a>
              <a href="#" className="text-foreground/70 font-medium text-sm hover:text-primary transition-colors tracking-tight">In Your Area</a>
              <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                <Search size={17} />
              </Button>
            </nav>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-9 shadow-soft rounded-xl tracking-tight">
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