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
  // Unpublished duplicate/draft slugs that Google had found: their URLs served the
  // homepage shell then a client-side "not found" (GSC soft 404). Send them to the
  // closest published guide. Remove an entry if that draft is ever published.
  "how-to-claim-pip-for-arthritis": "pip-for-arthritis-uk",
  "is-turmeric-good-for-knee-pain": "turmeric-curcumin-arthritis-evidence",
  "is-arthritis-a-disability-uk": "disability-rights-workplace-arthritis",
  "fibro-fog-what-helps-concentration-problems": "fibromyalgia-flare-ups-without-medication",
  "good-exercises-for-knee-arthritis": "knee-exercises-for-arthritis",
  "biologics-for-rheumatoid-arthritis-in-the-uk": "nhs-access-to-biologics-how-the-approval-pathway-works",
  "how-is-fibromyalgia-diagnosed": "fibromyalgia-flare-ups-without-medication",
  "arthritis-in-the-shoulder-symptoms-and-treatment": "shoulder-arthritis-exercises-uk",
  "dmard-blood-tests-why-monitoring-matters": "dmards-explained-how-methotrexate-slows-rheumatoid-arthritis",
  "turmeric-for-fibromyalgia-pain-what-is-known": "turmeric-curcumin-arthritis-evidence",
  "what-causes-gout": "early-signs-gout-big-toe",
  "pip-for-arthritis-eligibility": "pip-for-arthritis-uk",
  "anti-inflammatory-diet-for-knee-and-hip-arthritis": "anti-inflammatory-diet",
  "ankylosing-spondylitis-meaning-and-symptoms": "yoga-ankylosing-spondylitis-stiffness",
  "ankylosing-spondylitis-in-men-signs-and-age-of-onset": "yoga-ankylosing-spondylitis-stiffness",
  "ankylosing-spondylitis-stages-is-there-a-stage-4": "yoga-ankylosing-spondylitis-stiffness",
  "spondylitis-and-lower-back-pain-recognising-inflammation": "yoga-ankylosing-spondylitis-stiffness",
  "weight-training-with-arthritis": "strength-training-arthritis-beginners",
  "water-aerobics-for-arthritis-benefits-and-safety": "aquatic-therapy-arthritis-guide",
  "can-you-work-with-osteoarthritis-practical-uk-advice": "managing-arthritis-at-work",
  "shoulder-pain-causes-treatment": "shoulder-pain-reaching-ra-vs-oa",
  "psoriatic-arthritis-in-the-uk-symptoms-and-support": "psoriatic-vs-rheumatoid-arthritis",
  "turmeric-for-arthritis-pain-inflammation": "turmeric-for-arthritis",
  "tens-machine-for-joint-muscle-pain": "tens-machines-arthritis-uk",
  "tens-machine-cancer-safety": "tens-machines-arthritis-uk",
  "protein-and-joint-pain-what-you-need-to-know": "protein-requirements-arthritis-uk",
  "living-with-gout": "gout-flare-up-diet-foods-avoid",
  "hand-exercises-for-arthritis-imported-batch8": "hand-exercises-for-arthritis",
  "living-with-osteoarthritis-everyday-ways-to-stay-active": "joint-protection-easier-everyday-tasks",
  "early-signs-of-arthritis": "osteoarthritis-symptoms-uk",
  "polymyalgia-rheumatica-alternatives-and-safe-treatment": "pmr-frailty-morning-stiffness-uk",
  "anxiety-and-joint-pain-understanding-the-connection": "anxiety-and-arthritis-management",
  "ginger-root-for-arthritis-pain-evidence-and-precautions": "ginger-root-natural-anti-inflammatory",
  "dmards-vs-biologics-arthritis-treatment-explained": "dmards-explained-how-methotrexate-slows-rheumatoid-arthritis",
  "pregnancy-and-arthritis": "arthritis-and-pregnancy-uk",
  "dla-for-arthritis-uk": "attendance-allowance-arthritis-frailty-uk",
  "medical-management-of-arthritis": "arthritis-medication-guide",
};
