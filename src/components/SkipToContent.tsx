export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-3 z-[100] -translate-y-full focus-visible:translate-y-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-2 rounded-md shadow-lg transition-transform"
    >
      Skip to main content
    </a>
  );
}
