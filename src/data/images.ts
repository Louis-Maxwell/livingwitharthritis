// Centralised local image paths (Openverse + branded OG under /public)
// Prefer /openverse and /og assets already on disk — no Unsplash hotlinks.

/**
 * Responsive srcSet helper. For legacy Unsplash URLs only.
 * Local paths (/openverse, /og, /images) return undefined — browsers use `src`.
 */
export function unsplashSrcSet(
  url: string,
  widths = [400, 640, 800, 1080, 1400],
  quality = 80,
): string | undefined {
  if (!url || !url.startsWith("http")) return undefined;
  const base = url.split("?")[0];
  return widths
    .map((w) => `${base}?w=${w}&q=${quality}&fm=webp&auto=format ${w}w`)
    .join(", ");
}

/** Common sizes attribute for typical content images */
export const defaultSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
export const heroSizes = "(min-width: 1024px) 50vw, 100vw";
export const fullWidthSizes = "100vw";

// ── Hero & general ──────────────────────────────────────────
export const heroLifestyle = "/images/hero-walking-group-1600.webp"; // walking group outdoors
export const heroLifestyleSrcSet = [
  "/images/hero-walking-group-800.webp 800w",
  "/images/hero-walking-group-1200.webp 1200w",
  "/images/hero-walking-group-1600.webp 1600w",
].join(", ");
export const photoBreakCommunity = "/openverse/community-02-wolf-creek-nfh-2022-13th-annual-catch-a-smile-seni.webp"; // group of people together
export const photoBreakActive = "/openverse/cover-0108-old-runner-a3.webp"; // person active outdoors
export const videoCtaExercise = "/openverse/cover-0290-female-physiotherapist-with-elderly-female-pa.webp"; // physiotherapy session
export const mobileAppMockup = "/og/home.png"; // branded placeholder (no phone mockup on disk)
export const zakatAppealHero = "/openverse/cover-0332-holding-hands-10-10-10.webp"; // helping hands
// ── Palestine & Gaza rehabilitation appeal ──────────────────
export const gazaAppealHero = "/openverse/cover-0322-close-elderly-person-hand-holding.webp"; // hands held together in solidarity
export const gazaRehabStory = "/openverse/community-08-physical-therapy-teaching-lab-at-cu-anschutz-octob.webp"; // physiotherapist supporting a patient

// ── Founder / About ─────────────────────────────────────────
export const founderPortrait = "/openverse/community-09-us-navy-100306-n-5319a-020-occupational-therapist-.webp"; // clinician / therapist (not a claimed founder photo)

// ── Avatars (generic local people photos — not claimed patients) ─
export const avatarMargaret = "/openverse/community-01-an-elderly-tibetan-women-holding-a-prayer-wheel-on.webp";
export const avatarPriya = "/openverse/cover-0128-two-colorful-elderly-women.webp";
export const avatarJames = "/openverse/cover-0108-old-runner-a3.webp";

// ── Chat suggestions ────────────────────────────────────────
export const chatRheumatoid = "/og/conditions-rheumatoid-arthritis.png"; // medical / RA
export const chatFoods = "/openverse/nutrition-06-fruit-salad-or-fruit-bowl.webp"; // healthy food bowl
export const chatExercise = "/openverse/cover-0269-stretching-exercises.webp"; // stretching exercise
export const chatDoctor = "/openverse/community-09-us-navy-100306-n-5319a-020-occupational-therapist-.webp"; // clinician

// ── Physio myths ────────────────────────────────────────────
export const physioMyth1 = "/images/hero-walking-group-1600.webp"; // older person exercising / walking
export const physioMyth2 = "/openverse/cover-0310-senior-woman-practicing-yoga-indoors-while-tr.webp"; // yoga stretching
export const physioMyth3 = "/openverse/adult-daughter-with-elderly-mother-48181ce1.webp"; // people / carers
export const physioMyth4 = "/openverse/cover-0291-female-physiotherapist-with-elderly-female-pa.webp"; // physiotherapy

// ── Nutrition ───────────────────────────────────────────────
export const nutritionBerries = "/openverse/nutrition-03-colorful-assortment-of-fresh-fruits-arranged-in-a-.webp"; // berries / fruit
export const nutritionMackerel = "/openverse/cover-0466-virgie-s-peruvian-seafood-ceviche.webp"; // fish / seafood
export const nutritionMediterranean = "/openverse/cover-0469-organic-olive-oil-salad.webp"; // mediterranean spread
export const nutritionNutsSeeds = "/openverse/nutrition-01-oliven-v1.webp"; // olives / mediterranean staples
export const nutritionSalmonKale = "/openverse/cover-0450-glory-foods-skillet-steamed-vegetables.webp"; // healthy plate

// ── Blog batch 2 ────────────────────────────────────────────
export const blogColdWeather = "/openverse/cover-0059-elderly-walking.webp"; // winter / outdoor walk
export const blogSwimming = "/openverse/cover-0402-swimming-for-the-elderly.webp"; // swimming
export const blogHandExercises = "/openverse/arthritis-01-arthritic-hands-in-pain.webp"; // hands close up
export const blogTurmeric = "/openverse/cover-0439-watermelon-mint-raspberry-salad.webp"; // colourful food / spices stand-in
export const blogSleep = "/openverse/bedroom-bed-pillows-morning-light-4a482059.webp"; // peaceful sleep / bedroom
export const blogYoga = "/openverse/cover-0306-yoga-class.webp"; // yoga
export const blogCycling = "/openverse/cover-0135-old-runner-a1.webp"; // outdoor activity (no bike asset)
export const blogOmega3 = "/openverse/cover-0466-virgie-s-peruvian-seafood-ceviche.webp"; // fish / omega-3

// ── Blog batch 3 ────────────────────────────────────────────
export const blogWork = "/openverse/cover-0073-he-used-to-walk-to-his-office-every-day.webp"; // work / commute
export const blogKneeExercises = "/openverse/arthritis-06-osteoarthritis-left-knee.webp"; // knee
export const blogGardening = "/openverse/cover-0483-perfect-garden.webp"; // gardening
export const blogNaturalPainRelief = "/openverse/cover-0298-senior-woman-practicing-self-care-and-stretch.webp"; // self-care

// ── Blog batch 4 ────────────────────────────────────────────
export const blogShoulderExercises = "/openverse/cover-0290-female-physiotherapist-with-elderly-female-pa.webp"; // shoulder physio
export const blogFootArthritis = "/openverse/cover-0119-out-for-morning-walk.webp"; // walking / feet
export const blogTaiChi = "/openverse/cover-0316-senior-members-of-morning-yoga-group-rc-mohan.webp"; // tai chi / gentle movement
export const blogSpicesInflammation = "/openverse/nutrition-01-oliven-v1.webp"; // mediterranean / spices stand-in
export const blogStayingActiveWinter = "/openverse/cover-0141-senior-citizen-walking-club-at-alki-playgroun.webp"; // winter activity / walking club
export const blogTensMachine = "/openverse/community-12-physical-therapy-session-aboard-the-uss-george-was.webp"; // therapy / medical device stand-in
export const blogBackArthritis = "/openverse/cover-0209-at-full-stretch.webp"; // back stretching
export const blogGutHealth = "/openverse/nutrition-04-healthy-meal-prep-with-fresh-salad-fruits-and-plan.webp"; // healthy food
export const blogHydrotherapy = "/openverse/cover-0368-water-exercise-class-a-reflection.webp"; // pool therapy
export const blogMealPlanning = "/openverse/nutrition-02-healthy-meal-planning-with-fresh-fruits-and-vegeta.webp"; // meal prep
export const blogMindfulness = "/openverse/cover-0310-senior-woman-practicing-yoga-indoors-while-tr.webp"; // meditation / calm practice
export const blogTravel = "/openverse/cover-0334-older-couple-walking-the-aquila-loop-trail.webp"; // travel / outdoor walk

// ── Daily tips ──────────────────────────────────────────────
export const tipDailyLiving = "/images/hero-walking-group-1600.webp"; // active living
export const tipHealthTips = "/openverse/nutrition-11-bowl-of-fresh-fruit-unsplash.webp"; // healthy lifestyle
export const tipMorningStretches = "/openverse/cover-0270-stretching-exercises.webp"; // stretching
export const tipStayHydrated = "/openverse/cover-0196-water-aerobics.webp"; // water (closest local)
export const tipAntiInflammatory = "/openverse/nutrition-06-fruit-salad-or-fruit-bowl.webp"; // healthy snacks
export const tipWalk = "/openverse/cover-0119-out-for-morning-walk.webp"; // walking
export const tipSleep = "/openverse/bedroom-bed-pillows-morning-light-4a482059.webp"; // sleeping
export const tipPaceYourself = "/openverse/cover-0298-senior-woman-practicing-self-care-and-stretch.webp"; // relaxation

// ── Body / Exercise diagram ─────────────────────────────────
export const bodyMannequin = "/og/exercise-hub.png"; // anatomy/body stand-in (branded exercise OG)

// ── Inspired landing portraits (warm, documentary, diverse) ─
// Wide, cinematic portrait — used in InspiredHeroBand
export const portraitHeroWomenOutdoors = "/openverse/hero-friends-800.webp"; // friends outdoors (local hero)
export const portraitHeroWomenOutdoorsSrcSet = "/openverse/hero-friends-400.webp 400w, /openverse/hero-friends-800.webp 800w";
// Square portraits — used in PortraitGrid (generic licensed Openverse people — not claimed patients)
export const portraitOlderWomanSmiling = "/openverse/community-01-an-elderly-tibetan-women-holding-a-prayer-wheel-on.webp";
export const portraitOlderManThoughtful = "/openverse/cover-0108-old-runner-a3.webp";
export const portraitMultigenFamily = "/openverse/cover-0103-grandpa-and-granddaughter.webp";
