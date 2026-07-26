/**
 * Map of legacy blog slugs → current slugs.
 * Keeps inbound links and shared URLs working after the NHS-reference clean-up.
 */
export const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  "nhs-arthritis-exercises": "arthritis-exercises-uk-clinical",
  "nhs-rheumatology-waiting-times-uk": "rheumatology-waiting-times-uk",
  // Knee-exercise content was split across three near-duplicate pages,
  // splitting ranking signal for the same search intent. Consolidated onto
  // /blog/knee-osteoarthritis-exercises (the dedicated page with a named,
  // HCPC-credentialed reviewer and HowTo/FAQ schema).
  "knee-arthritis-exercises-uk": "knee-osteoarthritis-exercises",
  "knee-exercises-arthritis": "knee-osteoarthritis-exercises",
};
