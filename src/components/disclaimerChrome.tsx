import type { ReactNode } from "react";
import { DisclaimerStripShownContext } from "@/components/disclaimerContext";

export function DisclaimerStripShown({ children }: { children: ReactNode }) {
  return (
    <DisclaimerStripShownContext.Provider value={true}>
      {children}
    </DisclaimerStripShownContext.Provider>
  );
}
