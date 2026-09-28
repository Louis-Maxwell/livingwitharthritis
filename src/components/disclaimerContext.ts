import { createContext, useContext } from "react";

/**
 * Set by layout chrome after the first MedicalDisclaimerStrip.
 * Nested strips return null; EducationalDisclaimerBox drops duplicate short copy.
 */
export const DisclaimerStripShownContext = createContext(false);

export function useDisclaimerStripShown(): boolean {
  return useContext(DisclaimerStripShownContext);
}
