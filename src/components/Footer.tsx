import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-medical-purple text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary-foreground">
              LIVING WITH<br />ARTHRITIS
            </h3>
            <p className="text-accent-foreground/80 leading-relaxed">
              Supporting 10 million people living with arthritis through 
              information, research, and community.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary-foreground">Get Help</h4>
            <ul className="space-y-2 text-accent-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Helpline</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Online Community</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Virtual Assistant</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Self Help Tool</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary-foreground">About Arthritis</h4>
            <ul className="space-y-2 text-accent-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Conditions A-Z</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Symptoms</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Treatments</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Research</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary-foreground">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <Facebook className="w-6 h-6 text-accent-foreground/80 hover:text-primary-foreground cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-accent-foreground/80 hover:text-primary-foreground cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-accent-foreground/80 hover:text-primary-foreground cursor-pointer transition-colors" />
              <Youtube className="w-6 h-6 text-accent-foreground/80 hover:text-primary-foreground cursor-pointer transition-colors" />
              <Linkedin className="w-6 h-6 text-accent-foreground/80 hover:text-primary-foreground cursor-pointer transition-colors" />
            </div>
            <p className="text-accent-foreground/80 text-sm">
              Phone: 0800 989 0031<br />
              Email: info@livingwitharthritis.org.uk
            </p>
          </div>
        </div>

        <div className="border-t border-accent-foreground/20 mt-8 pt-8 text-center text-accent-foreground/60 text-sm">
          <p>&copy; 2024 Living with Arthritis. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;