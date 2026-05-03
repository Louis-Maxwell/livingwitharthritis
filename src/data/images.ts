// Centralised open-source image URLs (Unsplash — free to use)
// All images served via Unsplash CDN with size parameters for performance

/**
 * Generate a responsive srcSet string for any Unsplash image URL.
 * Strips existing w= and q= params and produces multiple widths.
 */
export function unsplashSrcSet(
  url: string,
  widths = [400, 640, 800, 1080, 1400],
  quality = 80,
): string {
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
export const heroLifestyle = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"; // older couple walking outdoors
export const heroLifestyleSrcSet = [
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=75 640w",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80 800w",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1080&q=80 1080w",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80 1400w",
].join(", ");
export const photoBreakCommunity = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=75&fm=webp"; // group of people together
export const photoBreakActive = "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=75&fm=webp"; // person jogging outdoors
export const videoCtaExercise = "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=75&fm=webp"; // physiotherapy session
export const mobileAppMockup = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"; // phone mockup
export const zakatAppealHero = "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80"; // helping hands

// ── Founder / About ─────────────────────────────────────────
export const founderPortrait = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"; // professional woman doctor

// ── Avatars ─────────────────────────────────────────────────
export const avatarMargaret = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80"; // woman portrait
export const avatarPriya = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"; // woman portrait 2
export const avatarJames = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"; // man portrait

// ── Chat suggestions ────────────────────────────────────────
export const chatRheumatoid = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"; // medical consultation
export const chatFoods = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"; // healthy food bowl
export const chatExercise = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80"; // stretching exercise
export const chatDoctor = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"; // doctor with stethoscope

// ── Physio myths ────────────────────────────────────────────
export const physioMyth1 = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"; // older person exercising
export const physioMyth2 = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"; // yoga stretching
export const physioMyth3 = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80"; // professional woman
export const physioMyth4 = "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80"; // physiotherapy

// ── Nutrition ───────────────────────────────────────────────
export const nutritionBerries = "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80"; // berries
export const nutritionMackerel = "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=600&q=80"; // grilled fish
export const nutritionMediterranean = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80"; // mediterranean spread
export const nutritionNutsSeeds = "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&q=80"; // nuts and seeds
export const nutritionSalmonKale = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80"; // salmon dish

// ── Blog batch 2 ────────────────────────────────────────────
export const blogColdWeather = "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=800&q=80"; // winter walk
export const blogSwimming = "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80"; // swimming pool
export const blogHandExercises = "https://images.unsplash.com/photo-1586104195538-050b9f74f58e?w=800&q=80"; // hands close up
export const blogTurmeric = "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=80"; // turmeric spice
export const blogSleep = "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80"; // peaceful sleep
export const blogYoga = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"; // yoga pose
export const blogCycling = "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80"; // cycling outdoors
export const blogOmega3 = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80"; // salmon/fish

// ── Blog batch 3 ────────────────────────────────────────────
export const blogWork = "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80"; // office ergonomic
export const blogKneeExercises = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"; // knee exercise
export const blogGardening = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"; // gardening
export const blogNaturalPainRelief = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"; // natural remedies

// ── Blog batch 4 ────────────────────────────────────────────
export const blogShoulderExercises = "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"; // shoulder physio
export const blogFootArthritis = "https://images.unsplash.com/photo-1515775356672-e24fdd685e79?w=800&q=80"; // feet/walking
export const blogTaiChi = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"; // tai chi / yoga
export const blogSpicesInflammation = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80"; // spices
export const blogStayingActiveWinter = "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&q=80"; // winter activity
export const blogTensMachine = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"; // medical device
export const blogBackArthritis = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"; // back stretching
export const blogGutHealth = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"; // healthy food
export const blogHydrotherapy = "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80"; // pool therapy
export const blogMealPlanning = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"; // meal prep
export const blogMindfulness = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"; // meditation
export const blogTravel = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"; // travel

// ── Daily tips ──────────────────────────────────────────────
export const tipDailyLiving = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"; // active living
export const tipHealthTips = "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600&q=80"; // healthy lifestyle
export const tipMorningStretches = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80"; // stretching
export const tipStayHydrated = "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&q=80"; // water glass
export const tipAntiInflammatory = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"; // healthy snacks
export const tipWalk = "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80"; // walking
export const tipSleep = "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80"; // sleeping
export const tipPaceYourself = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80"; // relaxation

// ── Body / Exercise diagram ─────────────────────────────────
export const bodyMannequin = "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80"; // anatomy/body

// ── Inspired landing portraits (warm, documentary, diverse) ─
// Wide, cinematic portrait — used in InspiredHeroBand
export const portraitHeroWomenOutdoors = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80"; // two women outdoors, warm light
// Square portraits — used in PortraitGrid
export const portraitOlderWomanSmiling = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80"; // older woman, soft smile, candid
export const portraitOlderManThoughtful = "https://images.unsplash.com/photo-1559963110-71b394e7494d?w=900&q=80"; // older man, candid
export const portraitMultigenFamily = "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=900&q=80"; // multi-generational hands

