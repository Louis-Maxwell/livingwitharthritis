import SocialLinks from "@/components/SocialLinks";

export default function FooterConnect() {
  return (
    <nav aria-labelledby="footer-connect-heading" className="footer-connect sm:col-span-2 md:col-span-3 lg:col-span-5">
      <div className="mb-5">
        <h3 id="footer-connect-heading" className="text-lg font-semibold text-foreground">Connect with us</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Updates, practical ideas and ways to keep in touch. Social links open in a new tab.</p>
      </div>
      <SocialLinks
        context="footer"
        size="md"
        orientation="horizontal"
        className="footer-connect__links"
        linkClassName="footer-connect__link"
        showLabels
        cardStyle
      />
    </nav>
  );
}
