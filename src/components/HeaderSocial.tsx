/**
 * Header Social Media Links
 * Compact social media links for header/navigation area
 */

import SocialLinks from '@/components/SocialLinks';

interface HeaderSocialProps {
  className?: string;
}

const HeaderSocial: React.FC<HeaderSocialProps> = ({ className = '' }) => {
  return (
    <div className={`hidden md:flex items-center gap-4 ml-auto ${className}`}>
      <div className="h-6 w-px bg-border/20"></div>
      <SocialLinks
        context="header"
        size="sm"
        orientation="horizontal"
        className="gap-3"
        linkClassName="text-foreground/60 hover:text-primary transition-colors duration-200"
      />
    </div>
  );
};

export default HeaderSocial;
