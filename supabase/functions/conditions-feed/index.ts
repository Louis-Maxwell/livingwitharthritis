/**
 * conditions-feed — public JSON feed of arthritis conditions, exercises,
 * and core guidance for AI crawlers (ChatGPT, Perplexity, Gemini, etc.).
 *
 * Served at: /functions/v1/conditions-feed
 * Cached for 1 hour at the edge.
 *
 * Listed in /llms.txt and /ai.txt so assistants can discover it without
 * scraping rendered HTML.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

const BASE = 'https://livingwitharthritis.org.uk';

interface ConditionEntry {
  slug: string;
  name: string;
  url: string;
  summary: string;
  keySymptoms: string[];
  firstLineCare: string[];
  whenToSeeGp: string;
}

const conditions: ConditionEntry[] = [
  {
    slug: 'osteoarthritis',
    name: 'Osteoarthritis',
    url: `${BASE}/conditions/osteoarthritis`,
    summary:
      'Osteoarthritis is the most common form of arthritis. Cartilage cushioning the ends of bones gradually wears down, most often in knees, hips, hands and spine. It causes pain, stiffness, swelling and reduced movement that build up slowly over years.',
    keySymptoms: [
      'Joint pain during or after activity',
      'Short morning stiffness, usually under 30 minutes',
      'Reduced range of motion and grating (crepitus)',
      'Mild swelling and tenderness',
    ],
    firstLineCare: [
      'Regular low-impact exercise (walking, cycling, swimming)',
      'Weight management — every pound off the body reduces knee load',
      'Strength work for the muscles around the joint',
      'Topical and oral NSAIDs as advised by a clinician',
    ],
    whenToSeeGp:
      'See a GP if pain disturbs sleep, you cannot weight-bear, the joint is hot and red, or symptoms worsen over weeks.',
  },
  {
    slug: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis',
    url: `${BASE}/conditions/rheumatoid-arthritis`,
    summary:
      'Rheumatoid arthritis is an autoimmune condition where the immune system attacks the lining of the joints, typically symmetrically. Early diagnosis and disease-modifying treatment (DMARDs) prevent long-term joint damage.',
    keySymptoms: [
      'Symmetrical joint pain and swelling (hands, wrists, feet)',
      'Morning stiffness lasting over an hour',
      'Fatigue and low-grade fever during flares',
      'Soft, warm joints rather than purely bony ones',
    ],
    firstLineCare: [
      'Early referral to a rheumatologist — within weeks of symptom onset',
      'DMARDs (e.g. methotrexate) as prescribed',
      'Daily gentle range-of-motion exercise',
      'Smoking cessation — smoking worsens RA',
    ],
    whenToSeeGp:
      'See a GP urgently if multiple joints are swollen and stiff for more than six weeks, especially with fatigue or symmetrical hand involvement.',
  },
  {
    slug: 'psoriatic-arthritis',
    name: 'Psoriatic Arthritis',
    url: `${BASE}/conditions/psoriatic-arthritis`,
    summary:
      'Psoriatic arthritis is an inflammatory arthritis linked to psoriasis. It can affect any joint and often the spine, fingers and toes (dactylitis), with nail changes a frequent clue.',
    keySymptoms: [
      'Swollen "sausage" fingers or toes',
      'Lower back stiffness that improves with movement',
      'Nail pitting or separation',
      'Pain at tendon insertions (enthesitis), often the heel',
    ],
    firstLineCare: [
      'Rheumatology assessment for DMARDs or biologics',
      'Skin treatment for psoriasis in parallel',
      'Low-impact strengthening exercise',
      'Weight management to reduce inflammation load',
    ],
    whenToSeeGp:
      'See a GP if you have psoriasis plus new joint pain, swollen fingers or toes, or persistent heel pain.',
  },
  {
    slug: 'gout',
    name: 'Gout',
    url: `${BASE}/conditions/gout`,
    summary:
      'Gout is caused by urate crystals forming in joints, typically the base of the big toe. Attacks come on suddenly with intense pain, redness and swelling, and can become chronic without urate-lowering treatment.',
    keySymptoms: [
      'Sudden severe pain, often overnight, in the big toe',
      'Hot, red, swollen joint that hurts to touch',
      'Attacks lasting days to a week',
      'Lumps (tophi) under the skin in long-standing disease',
    ],
    firstLineCare: [
      'NSAIDs or colchicine for an acute attack',
      'Urate-lowering therapy (allopurinol) for recurrent attacks',
      'Reduce alcohol, sugary drinks and high-purine foods',
      'Stay well hydrated',
    ],
    whenToSeeGp:
      'See a GP after a first attack to confirm diagnosis and discuss long-term urate management; seek urgent care if the joint is hot with fever (to rule out infection).',
  },
];

const exercises = [
  {
    slug: 'knee-strengthening',
    name: 'Knee strengthening for osteoarthritis',
    url: `${BASE}/exercises/knee-strengthening`,
    duration: 'PT15M',
    forConditions: ['osteoarthritis'],
    steps: [
      'Straight-leg raises — 2 sets of 10 each side',
      'Wall sits — hold 20 seconds, repeat 5 times',
      'Step-ups on a low step — 2 sets of 10',
      'Hamstring stretch — hold 30 seconds each side',
    ],
  },
  {
    slug: 'hand-mobility',
    name: 'Hand mobility for rheumatoid arthritis',
    url: `${BASE}/exercises/hand-mobility`,
    duration: 'PT10M',
    forConditions: ['rheumatoid-arthritis', 'osteoarthritis'],
    steps: [
      'Make a gentle fist, then spread fingers wide — 10 reps',
      'Thumb to each fingertip in turn — 2 sets',
      'Wrist circles in both directions — 10 reps',
      'Finger lifts on a flat surface — 10 each',
    ],
  },
];

Deno.serve((req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const body = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Living With Arthritis UK — conditions and exercises feed',
    description:
      'Machine-readable summary of arthritis conditions, first-line care, and exercise routines maintained by Living With Arthritis UK for use by AI assistants and search engines.',
    license: 'https://creativecommons.org/licenses/by/4.0/',
    url: `${BASE}/`,
    inLanguage: 'en-GB',
    generated: new Date().toISOString(),
    conditions,
    exercises,
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'all',
    },
  });
});
