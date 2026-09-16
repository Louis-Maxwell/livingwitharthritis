import { createContext, useContext, type ReactNode } from "react";

/**
 * Set by layout chrome after the first MedicalDisclaimerStrip.
 * Nested strips return null; EducationalDisclaimerBox drops duplicate short copy.
 */
const DisclaimerStripShownContext = createContext(false);

export function DisclaimerStripShown({ children }: { children: ReactNode }) {
  return (
    <DisclaimerStripShownContext.Provider value={true}>
      {children}
    </DisclaimerStripShownContext.Provider>
  );
}

export function useDisclaimerStripShown(): boolean {
  return useContext(DisclaimerStripShownContext);
}
