// City × service programmatic SEO content.
// 26 UK cities × 4 services = 104 unique pages at /uk/:city/:service
// Content is templated from ukCities.ts metadata to keep things
// consistent, locally-flavoured, and easy to maintain.

import { ukCities, type UKCity } from "./ukCities";

export const services = [
  "physiotherapy",
  "support-groups",
  "diet-support",
  "waiting-list-help",
] as const;

export type ServiceSlug = (typeof services)[number];

export const serviceLabel: Record<ServiceSlug, string> = {
  physiotherapy: "Physiotherapy",
  "support-groups": "Arthritis Support Groups",
  "diet-support": "Diet & Nutrition Support",
  "waiting-list-help": "Waiting-List Help",
};

export const serviceShortLabel: Record<ServiceSlug, string> = {
  physiotherapy: "Physiotherapy",
  "support-groups": "Support groups",
  "diet-support": "Diet support",
  "waiting-list-help": "Waiting-list help",
};

// First 26 cities (population-ranked) get service pages.
// Honours user spec: 26 × 4 = 104 pages.
export const CITY_SERVICE_SLUGS: string[] = [
  "london", "birmingham", "manchester", "leeds", "glasgow",
  "liverpool", "edinburgh", "bristol", "sheffield", "newcastle",
  "cardiff", "nottingham", "leicester", "coventry", "belfast",
  "brighton", "plymouth", "stoke-on-trent", "wolverhampton", "southampton",
  "derby", "swansea", "aberdeen", "oxford", "cambridge", "exeter",
];

export const cityServiceCities: UKCity[] = CITY_SERVICE_SLUGS
  .map((slug) => ukCities.find((c) => c.slug === slug))
  .filter((c): c is UKCity => !!c);

export const isService = (v: string | undefined): v is ServiceSlug =>
  !!v && (services as readonly string[]).includes(v);

export interface LocalResource {
  name: string;
  type: string;
  description: string;
}

export interface CityServiceContent {
  headline: string;
  intro: string;
  localResources: LocalResource[];
  tips: string[];
  localStats: string;
  ctaLabel: string;
  ctaPath: string;
  keywords: string;
}

// ---------- Service-specific templating ----------

function physiotherapy(city: UKCity): CityServiceContent {
  const hospital = city.localResources[0] ?? `${city.name} rheumatology services`;
  return {
    headline: `Arthritis Physiotherapy in ${city.name}`,
    intro:
      `Physiotherapy is the single most effective long-term treatment for arthritis pain — more reliable than any drug for most people with osteoarthritis, and a core part of managing inflammatory arthritis. In ${city.name} (population ${city.population}), you can access physiotherapy through Public Healthcare Services via a GP referral, or directly through a private practitioner. ` +
      `Local options range from hospital-based musculoskeletal teams at ${hospital} to community clinics across ${city.region}. Whichever route you take, a tailored exercise programme — usually 6 to 12 weeks — is what drives results, not the number of appointments.`,
    localResources: [
      {
        name: hospital,
        type: "Hospital rheumatology & MSK service",
        description: `The main Public Healthcare Services rheumatology pathway for ${city.name}. GP referral required.`,
      },
      {
        name: `${city.name} community musculoskeletal service`,
        type: "Community MSK clinic",
        description: `First-contact physiotherapy for joint pain, often available without a GP appointment in ${city.region}.`,
      },
      {
        name: `${city.name} private physiotherapy practices`,
        type: "Self-pay or insured private care",
        description: `Faster access (often within a week) for assessment and a home exercise plan. Look for HCPC-registered physiotherapists.`,
      },
      {
        name: `${city.name} hydrotherapy & warm-water pools`,
        type: "Specialist arthritis exercise",
        description: `Warm-water exercise reduces load on painful joints and is well-suited to inflammatory arthritis flares.`,
      },
    ],
    tips: [
      `Ask your GP for a musculoskeletal (MSK) referral — in many parts of ${city.region} you can self-refer directly to physio without seeing a GP first.`,
      `Bring a list of your most painful movements and your goals (e.g. "I want to walk the dog without stopping") — physios plan around function, not just pain.`,
      `Stick with the home exercises between sessions — 80% of the benefit comes from what you do daily, not in the clinic.`,
      `If Public Healthcare Services waits are long, a single private assessment (£50–£90) can give you a home programme to start straight away.`,
      `Check that any private physio is registered with the Health & Care Professions Council (HCPC) and a member of the Chartered Society of Physiotherapy (CSP).`,
    ],
    localStats: `${city.name} has a population of around ${city.population}. Based on UK prevalence data, roughly 1 in 6 adults locally live with a form of arthritis.`,
    ctaLabel: "Browse joint-by-joint exercise programmes",
    ctaPath: "/exercises",
    keywords: `${city.name.toLowerCase()} physiotherapy, arthritis physio ${city.name.toLowerCase()}, MSK ${city.name.toLowerCase()}, ${city.region.toLowerCase()} physiotherapy`,
  };
}

function supportGroups(city: UKCity): CityServiceContent {
  return {
    headline: `Arthritis Support Groups in ${city.name}`,
    intro:
      `Living with arthritis can be isolating — but peer support is one of the most consistently helpful (and underused) parts of self-management. People who join a group report less pain catastrophising, better adherence to exercise, and lower rates of depression. ` +
      `In ${city.name}, support is available through community-based peer groups, hospital-led patient education programmes, and online communities open to everyone in ${city.region}. You don't need a formal diagnosis to join most groups — anyone affected by joint pain is welcome.`,
    localResources: [
      {
        name: `${city.name} peer support meet-ups`,
        type: "In-person peer group",
        description: `Informal monthly meet-ups across ${city.name} for anyone living with arthritis — bring a friend or family member.`,
      },
      {
        name: `${city.region} online support community`,
        type: "Online forum & video calls",
        description: `Weekday discussions, weekly video meet-ups, and a private message board. Useful during flares when leaving the house is hard.`,
      },
      {
        name: `${city.name} patient education groups`,
        type: "Hospital-led courses",
        description: `Short structured courses on living with rheumatoid arthritis, osteoarthritis, or fibromyalgia, usually offered through ${city.localTrust}.`,
      },
      {
        name: "Carers and family support",
        type: "Group for partners & relatives",
        description: `Dedicated space for people supporting a loved one with arthritis — practical advice and shared experience.`,
      },
    ],
    tips: [
      `Try two or three groups before settling — fit matters more than format. Some are practical, some are emotional.`,
      `If you can't get out, online groups give you the same benefit without the journey. Many are UK-wide and meet weekly.`,
      `Ask your GP or rheumatology nurse — they often know local groups that aren't well advertised online.`,
      `Bring a question or topic to your first meeting. It makes introductions easier and you'll leave with at least one new idea.`,
      `Look for groups linked to a specific condition (e.g. lupus, ankylosing spondylitis) if your situation feels niche — there's almost always one.`,
    ],
    localStats: `Around 17% of adults in ${city.region} report a long-term musculoskeletal condition. ${city.name}'s population of ${city.population} means thousands of potential peers near you.`,
    ctaLabel: "Talk to our help & support team",
    ctaPath: "/chat",
    keywords: `arthritis support group ${city.name.toLowerCase()}, ${city.name.toLowerCase()} arthritis community, peer support ${city.region.toLowerCase()}`,
  };
}

function dietSupport(city: UKCity): CityServiceContent {
  return {
    headline: `Diet & Nutrition Support for Arthritis in ${city.name}`,
    intro:
      `Diet won't cure arthritis, but a Mediterranean-style anti-inflammatory pattern reliably reduces pain scores, supports weight management, and protects against the cardiovascular risks that come with several arthritis types. ` +
      `In ${city.name} you can access dietitians through Public Healthcare Services referral (typically for higher-risk patients — diabetes, obesity, gout, or steroid treatment), or pay privately for a one-off plan. There's also a strong network of free community cooking and nutrition resources in ${city.region}.`,
    localResources: [
      {
        name: `${city.localTrust} dietetics service`,
        type: "Hospital dietitian (GP referral)",
        description: `Free with a GP or consultant referral, typically for gout, weight management, steroid-related risk, or coeliac coexistence.`,
      },
      {
        name: `${city.name} registered dietitians (private)`,
        type: "Self-pay 1:1 nutrition support",
        description: `One-off assessments (£80–£140) and follow-up plans. Look for dietitians registered with the HCPC, not just "nutritionists".`,
      },
      {
        name: `${city.name} community cooking groups`,
        type: "Free local cookery sessions",
        description: `Community kitchens and council-run cookery courses in ${city.name} regularly cover Mediterranean and budget anti-inflammatory cooking.`,
      },
      {
        name: `${city.name} food co-ops & markets`,
        type: "Affordable fresh produce",
        description: `Local fruit & veg co-ops make oily fish, pulses, and seasonal produce more affordable — the backbone of an anti-inflammatory diet.`,
      },
    ],
    tips: [
      `Aim for two portions of oily fish a week (salmon, sardines, mackerel) — the most-studied dietary change for joint inflammation.`,
      `Swap red and processed meat for pulses, eggs, or fish on at least four days a week.`,
      `Ask your GP for a dietitian referral if you have gout, are on long-term steroids, or have a BMI over 30 — these are usually accepted quickly.`,
      `Use a registered dietitian, not an unregulated "nutritionist" — only dietitians are HCPC-regulated in the UK.`,
      `Track changes over 8–12 weeks, not days — dietary effects on joint pain are real but slow.`,
    ],
    localStats: `${city.name} has around ${city.population} residents. UK data suggests roughly 25% of adults are obese — and excess weight is the largest modifiable risk factor for knee and hip osteoarthritis.`,
    ctaLabel: "Open our anti-inflammatory diet guide",
    ctaPath: "/diet",
    keywords: `arthritis dietitian ${city.name.toLowerCase()}, anti-inflammatory diet ${city.name.toLowerCase()}, nutrition support ${city.region.toLowerCase()}`,
  };
}

function waitingListHelp(city: UKCity): CityServiceContent {
  return {
    headline: `Help While You Wait for Rheumatology in ${city.name}`,
    intro:
      `Waits for Public Healthcare Services rheumatology and orthopaedic appointments in ${city.name} can run from a few weeks to well over a year. The good news: most of the early gains in arthritis management — exercise, weight, diet, pain pacing — don't need a specialist to start. ` +
      `This page brings together the practical options for staying well in ${city.region} while you wait, and the situations where you should push for an earlier review.`,
    localResources: [
      {
        name: `${city.localTrust} patient liaison (PALS)`,
        type: "Wait-list advocacy",
        description: `If your wait is excessive or your condition is worsening, PALS can escalate and request a clinical priority review.`,
      },
      {
        name: `${city.name} community MSK first-contact service`,
        type: "Same-week MSK assessment",
        description: `A first-contact physiotherapist can assess and start treatment for most joint problems without waiting for the rheumatology clinic.`,
      },
      {
        name: `${city.name} private rheumatology (one-off consult)`,
        type: "Self-pay bridge appointment",
        description: `A single private consultation (£200–£300) for a diagnosis, scan request, or medication plan — then continue care via Public Healthcare Services.`,
      },
      {
        name: `${city.region} pain self-management programmes`,
        type: "Group education & coping",
        description: `Structured 6–8 week courses on pacing, exercise, and pain coping. Often more useful in the medium term than a single specialist appointment.`,
      },
    ],
    tips: [
      `Start the basics now: daily gentle exercise, weight management, sleep, and pacing. These work whether or not you've seen a specialist yet.`,
      `Ask your GP for a "while waiting" plan — pain relief, a physio referral, and bloods can usually all start before the rheumatology appointment.`,
      `Keep a simple symptom diary (pain, swelling, function, sleep). It speeds up your eventual appointment and supports any priority-review request.`,
      `Red flags — new severe headache or vision changes (possible giant cell arteritis), hot swollen joint with fever, or sudden weakness — go to A&E or 111, not the waiting list.`,
      `If your wait is over the local target, contact PALS at ${city.localTrust} and ask about clinical-priority review or treatment at another centre.`,
    ],
    localStats: `${city.name} (population ${city.population}) is served primarily by ${city.localTrust}. Waiting times vary by trust and specialty — check the latest figures on gov.uk/health.`,
    ctaLabel: "Use our self-help plan",
    ctaPath: "/self-help",
    keywords: `${city.name.toLowerCase()} rheumatology waiting list, arthritis waiting list ${city.name.toLowerCase()}, ${city.region.toLowerCase()} MSK wait`,
  };
}

const builders: Record<ServiceSlug, (city: UKCity) => CityServiceContent> = {
  physiotherapy,
  "support-groups": supportGroups,
  "diet-support": dietSupport,
  "waiting-list-help": waitingListHelp,
};

export function getCityService(
  citySlug: string,
  serviceSlug: string,
): { city: UKCity; service: ServiceSlug; content: CityServiceContent } | null {
  if (!CITY_SERVICE_SLUGS.includes(citySlug)) return null;
  if (!isService(serviceSlug)) return null;
  const city = ukCities.find((c) => c.slug === citySlug);
  if (!city) return null;
  return { city, service: serviceSlug, content: builders[serviceSlug](city) };
}
