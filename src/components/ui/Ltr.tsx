import { ReactNode } from "react";

/**
 * Wraps inline English (Latin-script) text so punctuation like "." and "?"
 * renders at the correct end of the sentence when the surrounding page
 * direction is RTL (e.g. Urdu). Uses bidi isolation so the text behaves
 * as a self-contained LTR run.
 */
export const Ltr = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span dir="ltr" style={{ unicodeBidi: "isolate" }} className={className}>
    {children}
  </span>
);

export default Ltr;
