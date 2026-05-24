import { memo, useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface PageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const PageModal = memo(({ isOpen, onClose, title, children }: PageModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-primary/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="bg-background w-full max-w-4xl h-full overflow-y-auto shadow-2xl mt-0 sm:mt-10 sm:mb-10 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-accent transition text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close dialog"
            autoFocus
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 sm:p-10 prose prose-lg max-w-none">{children}</div>
      </div>
    </div>
  );
});

PageModal.displayName = "PageModal";
export default PageModal;
