/**
 * Map of legacy blog slugs → current slugs.
 * Keeps inbound links and shared URLs working after the NHS-reference clean-up.
 */
export const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  "nhs-arthritis-exercises": "arthritis-exercises-uk-clinical",
  "nhs-rheumatology-waiting-times-uk": "rheumatology-waiting-times-uk",
};
