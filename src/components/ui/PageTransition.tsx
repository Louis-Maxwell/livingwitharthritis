import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Lightweight CSS-only page transition wrapper.
 * Replaces the previous framer-motion AnimatePresence transition
 * to reduce JS weight on every route change.
 */
export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <div className={`page-transition-enter ${className}`}>
      {children}
    </div>
  );
}
