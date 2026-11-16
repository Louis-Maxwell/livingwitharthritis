// Product-specific UK pharmacy limits, verified against emc product101361 SmPC.
export function correctLibraryCopy(text: string): string {
  return text.replace("It is available on prescription and also over-the-counter (in lower doses) at pharmacies.", "Naproxen is prescribed for arthritis. Some UK pharmacy products have limited indications: Naprosyn Pain Relief 250 mg is for short-term muscle and joint pain in adults aged 18 to 50, for no more than 3 days; period-pain products have separate eligibility rules. Ask a pharmacist which product is suitable, and do not use a pharmacy product as ongoing arthritis treatment without medical advice.");
}
