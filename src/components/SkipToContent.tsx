export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-3 z-[100] -translate-y-full focus-visible:translate-y-2 bg-primary text-primary-foreground font-semibold text-sm min-h-11 px-4 py-2.5 rounded-md shadow-lg transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
    >
      Skip to main content
    </a>
  );
}
