/**
 * Map of legacy blog slugs â†’ current slugs.
 * Keeps inbound links and shared URLs working after the UK healthcare system-reference clean-up.
 */
export const BLOG_SLUG_REDIRECTS: Record<string, string> = {
  "nhs-arthritis-exercises": "arthritis-exercises-uk-clinical",
  "nhs-rheumatology-waiting-times-uk": "rheumatology-waiting-times-uk",
  // Knee-exercise content consolidated onto /guides/knee-exercises-for-osteoarthritis.
  // Legacy blog slugs still resolve via BlogPost; HTTP/_redirects + EXACT_SEO_REDIRECTS
  // send users directly to the guide (no soft intermediate hop).
  "knee-osteoarthritis-exercises": "knee-arthritis-exercises-uk",
  "knee-exercises-arthritis": "knee-arthritis-exercises-uk",
  // Batch content-generation duplicated these 15 topics into near-identical
  // pairs (matching titles, published days/weeks apart). Consolidated onto
  // whichever article was most recently updated in each pair.
  "food-supplements-for-joint-pain": "best-supplements-joint-pain",
  "arthritis-medication-uk": "arthritis-medication-guide",
  "arthritis-and-weight-management-uk": "weight-management-arthritis-evidence",
  "swimming-for-arthritis-uk": "swimming-for-arthritis",
  "turmeric-for-arthritis-uk": "turmeric-for-arthritis",
  "mindfulness-meditation-chronic-pain": "mindfulness-chronic-pain-arthritis-guide",
  "vitamin-d-arthritis-uk-risk": "vitamin-d-arthritis-uk",
  "arthritis-and-cold-weather-uk": "cold-weather-arthritis-uk-winter",
  "cold-weather-and-arthritis": "cold-weather-arthritis-uk-winter",
  "arthritis-and-sleep-uk": "how-to-sleep-with-arthritis-uk",
  "glucosamine-vs-collagen-arthritis": "glucosamine-vs-collagen",
  "hand-arthritis-exercises-uk": "hand-exercises-for-arthritis",
  "hand-exercises-arthritis": "hand-exercises-for-arthritis",
  "arthritis-and-mental-health": "arthritis-and-mental-health-uk",
  "arthritis-diet-myths-debunked": "arthritis-and-diet-myths-uk",
  "arthritis-fatigue-management": "arthritis-fatigue-management-uk",
  // Slugs that SiteSearch, the HTML sitemap and hub pages linked to but that
  // never existed as guides; mapped to the closest real guide.
  "arthritis-exercises": "arthritis-exercises-uk-clinical",
  "arthritis-supplements-uk": "best-supplements-arthritis-uk",
  "gardening-with-arthritis-uk": "arthritis-and-gardening-uk",
  "meal-planning-arthritis-uk": "arthritis-meal-planning-uk",
  "mindfulness-for-chronic-pain-uk": "mindfulness-chronic-pain-arthritis-guide",
  "natural-pain-relief-arthritis-uk": "arthritis-pain-relief-natural",
};
