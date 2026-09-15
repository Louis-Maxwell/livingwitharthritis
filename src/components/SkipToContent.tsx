/**
 * First focusable control in the document — jumps past header/nav to #main-content.
 * Visible only on keyboard focus (WCAG 2.4.1 Bypass Blocks).
 */
export default function SkipToContent() {
  return (
    <a
      id="skip-to-content"
      href="#main-content"
      className="fixed top-0 left-3 z-[100] -translate-y-full focus:translate-y-2 focus-visible:translate-y-2 bg-primary text-primary-foreground font-semibold text-sm min-h-11 px-4 py-2.5 rounded-md shadow-lg transition-transform focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      data-skip-link
    >
      Skip to main content
    </a>
  );
}
