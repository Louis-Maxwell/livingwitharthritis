/**
 * Tier 2 topical-authority scaffolds.
 *
 * 4 pillar pages + 40 cluster article outlines. Maxwell expands each outline
 * into full clinical copy (pillars ~1,200 words, clusters ~500 words). Used
 * by `PillarPage` / `BlogPost` templates to render section headers, FAQ schema
 * and internal-link rails before the body copy lands.
 */

export type PillarId =
  | 'osteoarthritis'
  | 'rheumatoid-arthritis'
  | 'juvenile-arthritis'
  | 'mental-health';

export interface PillarScaffold {
  id: PillarId;
  route: string;
  title: string;
  metaDescription: string;
  targetKeywords: string[];
  wordCountTarget: number;
  sections: string[];
}

export interface Tier2Outline {
  id: string;
  pillarId: PillarId;
  slug: string;
  title: string;
  targetKeywords: string[];
  wordCountTarget: number;
  sections: Array<{
    title: string;
    keyPoints: string[];
    wordCountTarget: number;
  }>;
  relatedArticles: Array<{ slug: string; title: string }>;
  internalLinkTargets: string[];
}

export const pillarScaffolds: PillarScaffold[] = [
  {
    id: 'osteoarthritis',
    route: '/conditions/osteoarthritis',
    title: 'Osteoarthritis: Complete UK Guide',
    metaDescription:
      'Evidence-based osteoarthritis guide — causes, symptoms, diagnosis, treatment, exercise and diet. Reviewed by HCPC physiotherapist.',
    targetKeywords: ['osteoarthritis', 'how to manage osteoarthritis', 'osteoarthritis treatment'],
    wordCountTarget: 1200,
    sections: [
      'What is osteoarthritis',
      'Causes & risk factors',
      'Symptoms',
      'Diagnosis',
      'Treatment options',
      'Exercise',
      'Diet',
      'Managing daily life',
      'When to see a doctor',
      'FAQs',
    ],
  },
  {
    id: 'rheumatoid-arthritis',
    route: '/conditions/rheumatoid-arthritis',
    title: 'Rheumatoid Arthritis: Complete UK Guide',
    metaDescription:
      'Evidence-based RA guide — autoimmune mechanism, early symptoms, DMARDs, biologics, exercise, work and pregnancy. HCPC-reviewed.',
    targetKeywords: ['rheumatoid arthritis', 'living with RA', 'RA treatment'],
    wordCountTarget: 1200,
    sections: [
      'What is rheumatoid arthritis',
      'The autoimmune mechanism',
      'Early symptoms',
      'Diagnosis',
      'Treatment (DMARDs, biologics)',
      'Exercise',
      'Work',
      'Pregnancy',
      'Mental health',
      'FAQs',
    ],
  },
  {
    id: 'juvenile-arthritis',
    route: '/conditions/juvenile-arthritis',
    title: 'Juvenile Arthritis: Complete Parent Guide',
    metaDescription:
      'Evidence-based juvenile arthritis guide for UK parents — types, symptoms, diagnosis, school, sports, treatment and family support.',
    targetKeywords: ['juvenile arthritis', 'arthritis in children', 'JA treatment'],
    wordCountTarget: 1200,
    sections: [
      'What is juvenile arthritis',
      'Types of JA',
      'Symptoms',
      'Diagnosis',
      'School & learning',
      'Sports & activities',
      'Social development',
      'Parent support',
      'Treatment',
      'FAQs',
    ],
  },
  {
    id: 'mental-health',
    route: '/arthritis-mental-health',
    title: 'Arthritis & Mental Health: Complete UK Guide',
    metaDescription:
      'Arthritis takes a toll on mental health. Evidence-based guide to depression, anxiety, coping and mindfulness for people living with arthritis.',
    targetKeywords: [
      'arthritis and depression',
      'arthritis and anxiety',
      'mental health with arthritis',
    ],
    wordCountTarget: 1200,
    sections: [
      'Mental health impact of arthritis',
      'Depression in arthritis',
      'Anxiety & pain',
      'Coping strategies',
      'Mindfulness & meditation',
      'Support resources',
      'When to seek help',
      'FAQs',
    ],
  },
];

// ---------- Cluster outline helper ----------

const outline = (
  pillarId: PillarId,
  slug: string,
  title: string,
  targetKeywords: string[],
  sections: Array<{ title: string; keyPoints: string[]; wordCountTarget?: number }>,
  related: Array<{ slug: string; title: string }>,
  internalLinkTargets: string[],
): Tier2Outline => ({
  id: `${pillarId}-${slug}`,
  pillarId,
  slug,
  title,
  targetKeywords,
  wordCountTarget: 500,
  sections: sections.map((s) => ({
    title: s.title,
    keyPoints: s.keyPoints,
    wordCountTarget: s.wordCountTarget ?? 120,
  })),
  relatedArticles: related,
  internalLinkTargets,
});

// ---------- Osteoarthritis cluster (10) ----------

const osteoarthritis: Tier2Outline[] = [
  outline(
    'osteoarthritis',
    'knee-osteoarthritis-complete-guide',
    'Knee Osteoarthritis: Complete Guide',
    ['knee osteoarthritis', 'osteoarthritis of the knee'],
    [
      { title: 'Knee joint anatomy', keyPoints: ['Cartilage', 'Menisci', 'Synovial fluid'] },
      { title: 'How OA progresses', keyPoints: ['Cartilage loss', 'Bone changes', 'Stages'] },
      { title: 'Symptoms', keyPoints: ['Pain pattern', 'Stiffness', 'Crepitus', 'Swelling'] },
      { title: 'Treatment', keyPoints: ['Conservative care', 'Injections', 'Surgery'] },
      { title: 'Best exercises', keyPoints: ['Quad strengthening', 'Cycling', 'Aquatic'] },
    ],
    [
      { slug: 'osteoarthritis-pain-management', title: 'Osteoarthritis Pain Management' },
      { slug: 'weight-management-osteoarthritis', title: 'Weight Management & OA' },
    ],
    ['/conditions/osteoarthritis', '/exercises', '/conditions/knee-arthritis'],
  ),
  outline(
    'osteoarthritis',
    'hip-osteoarthritis-management-exercise',
    'Hip Osteoarthritis: Management & Exercise',
    ['hip osteoarthritis', 'arthritis in hip'],
    [
      { title: 'Hip joint anatomy', keyPoints: ['Ball-and-socket', 'Cartilage', 'Labrum'] },
      { title: 'Why OA develops', keyPoints: ['Wear', 'Genetics', 'Previous injury'] },
      { title: 'Impact on mobility', keyPoints: ['Walking', 'Stairs', 'Sleep'] },
      { title: 'Exercises', keyPoints: ['Glute bridges', 'Clamshells', 'Pool walking'] },
      { title: 'When surgery is needed', keyPoints: ['Failed conservative care', 'THR criteria'] },
    ],
    [
      { slug: 'living-well-with-osteoarthritis', title: 'Living Well With Osteoarthritis' },
      { slug: 'osteoarthritis-pain-management', title: 'Osteoarthritis Pain Management' },
    ],
    ['/conditions/osteoarthritis', '/exercises', '/self-help'],
  ),
  outline(
    'osteoarthritis',
    'hand-osteoarthritis-keeping-hands-functional',
    'Hand Osteoarthritis: Keeping Hands Functional',
    ['osteoarthritis hands', 'arthritis in fingers'],
    [
      { title: 'Hand & finger anatomy', keyPoints: ['DIP/PIP joints', 'Thumb base'] },
      { title: 'Daily challenges', keyPoints: ['Grip', 'Buttons', 'Typing'] },
      { title: 'Assistive devices', keyPoints: ['Jar openers', 'Thumb splints'] },
      { title: 'Hand exercises', keyPoints: ['Tendon glides', 'Putty', 'Range of motion'] },
      { title: 'Work adaptations', keyPoints: ['Ergonomics', 'Voice dictation'] },
    ],
    [
      { slug: 'living-well-with-osteoarthritis', title: 'Living Well With Osteoarthritis' },
      { slug: 'osteoarthritis-treatment-options', title: 'Osteoarthritis Treatment Options' },
    ],
    ['/conditions/hand-arthritis', '/exercises', '/conditions/osteoarthritis'],
  ),
  outline(
    'osteoarthritis',
    'weight-management-osteoarthritis',
    'Weight Management & Osteoarthritis',
    ['weight loss osteoarthritis', 'obesity and arthritis'],
    [
      { title: 'How weight affects joints', keyPoints: ['4Ã— load on knees', 'Inflammation'] },
      { title: 'Safe weight loss', keyPoints: ['Sustainable pace', 'Avoiding crash diets'] },
      { title: 'Nutrition', keyPoints: ['Mediterranean pattern', 'Protein'] },
      { title: 'Exercise', keyPoints: ['Low-impact options', 'Strength training'] },
      { title: 'Medical support', keyPoints: ['UK healthcare Tier 2/3', 'GP referral'] },
    ],
    [
      { slug: 'knee-osteoarthritis-complete-guide', title: 'Knee Osteoarthritis Guide' },
      { slug: 'living-well-with-osteoarthritis', title: 'Living Well With Osteoarthritis' },
    ],
    ['/diet', '/guides/diet', '/conditions/osteoarthritis'],
  ),
  outline(
    'osteoarthritis',
    'osteoarthritis-pain-management',
    'Osteoarthritis Pain Management',
    ['osteoarthritis pain relief', 'OA pain management'],
    [
      { title: 'Medication options', keyPoints: ['Paracetamol', 'Topical NSAIDs', 'Oral NSAIDs'] },
      { title: 'Heat & cold therapy', keyPoints: ['When to use heat', 'When to use ice'] },
      { title: 'TENS', keyPoints: ['How it works', 'Evidence'] },
      { title: 'Injections', keyPoints: ['Steroid', 'Hyaluronic acid'] },
      { title: 'Lifestyle strategies', keyPoints: ['Pacing', 'Sleep', 'Movement'] },
    ],
    [
      { slug: 'osteoarthritis-flares-what-to-do', title: 'Osteoarthritis Flares' },
      { slug: 'osteoarthritis-treatment-options', title: 'Treatment Options Explained' },
    ],
    ['/conditions/osteoarthritis', '/arthritis-flare-ups'],
  ),
  outline(
    'osteoarthritis',
    'osteoarthritis-and-aging',
    'Osteoarthritis & Aging',
    ['arthritis and aging', 'osteoarthritis in older adults'],
    [
      { title: 'Age-related joint changes', keyPoints: ['Cartilage thinning', 'Muscle loss'] },
      { title: 'Prevention strategies', keyPoints: ['Activity', 'Weight', 'Falls prevention'] },
      { title: 'Staying active safely', keyPoints: ['Tai chi', 'Walking', 'Strength'] },
      { title: 'Social engagement', keyPoints: ['Community', 'Isolation risk'] },
    ],
    [{ slug: 'living-well-with-osteoarthritis', title: 'Living Well With OA' }],
    ['/conditions/osteoarthritis', '/exercises/tai-chi-for-arthritis'],
  ),
  outline(
    'osteoarthritis',
    'preventing-osteoarthritis',
    'Preventing Osteoarthritis',
    ['prevent osteoarthritis', 'osteoarthritis prevention'],
    [
      { title: 'Known risk factors', keyPoints: ['Weight', 'Injury', 'Occupation'] },
      { title: 'Lifestyle modifications', keyPoints: ['Active commuting', 'Sleep'] },
      { title: 'Exercise', keyPoints: ['Strength', 'Mobility', 'Cross-training'] },
      { title: 'Joint protection', keyPoints: ['Technique', 'Footwear', 'Load management'] },
    ],
    [{ slug: 'weight-management-osteoarthritis', title: 'Weight Management & OA' }],
    ['/conditions/osteoarthritis', '/exercises'],
  ),
  outline(
    'osteoarthritis',
    'osteoarthritis-flares-what-to-do',
    'Osteoarthritis Flares: What to Do',
    ['osteoarthritis flare', 'managing OA flares'],
    [
      { title: 'Common flare triggers', keyPoints: ['Overuse', 'Weather', 'Sleep loss'] },
      { title: 'Acute pain management', keyPoints: ['Ice', 'Relative rest', 'Topicals'] },
      { title: 'When to see a doctor', keyPoints: ['Red-flag symptoms'] },
      { title: 'Recovery', keyPoints: ['Reintroducing activity', 'Pacing'] },
    ],
    [{ slug: 'osteoarthritis-pain-management', title: 'OA Pain Management' }],
    ['/conditions/osteoarthritis', '/arthritis-flare-ups'],
  ),
  outline(
    'osteoarthritis',
    'living-well-with-osteoarthritis',
    'Living Well With Osteoarthritis',
    ['living with osteoarthritis', 'quality of life OA'],
    [
      { title: 'Daily strategies', keyPoints: ['Pacing', 'Energy conservation'] },
      { title: 'Work adaptations', keyPoints: ['DSE assessment', 'Disclosure'] },
      { title: 'Social life', keyPoints: ['Planning', 'Saying no'] },
      { title: 'Goal-setting', keyPoints: ['SMART goals', 'Tracking wins'] },
    ],
    [{ slug: 'knee-osteoarthritis-complete-guide', title: 'Knee OA Guide' }],
    ['/conditions/osteoarthritis', '/self-help'],
  ),
  outline(
    'osteoarthritis',
    'osteoarthritis-treatment-options',
    'Osteoarthritis Treatment Options Explained',
    ['osteoarthritis treatment', 'OA medication options'],
    [
      { title: 'Conservative treatment', keyPoints: ['Exercise', 'Weight', 'Education'] },
      { title: 'Medications', keyPoints: ['Topical', 'Oral', 'Adjuncts'] },
      { title: 'Injections', keyPoints: ['Steroid', 'Hyaluronic acid', 'PRP'] },
      { title: 'Surgery', keyPoints: ['When to refer', 'Joint replacement'] },
      { title: 'Shared decision-making', keyPoints: ['Risks vs benefits', 'Personal goals'] },
    ],
    [{ slug: 'osteoarthritis-pain-management', title: 'OA Pain Management' }],
    ['/conditions/osteoarthritis'],
  ),
];

// ---------- Rheumatoid arthritis cluster (10) ----------

const rheumatoid: Tier2Outline[] = [
  outline(
    'rheumatoid-arthritis',
    'understanding-rheumatoid-arthritis-autoimmunity',
    'Understanding Rheumatoid Arthritis: Autoimmunity Explained',
    ['what is rheumatoid arthritis', 'RA autoimmune'],
    [
      { title: 'Autoimmune mechanism', keyPoints: ['Immune dysregulation', 'Synovitis'] },
      { title: 'Inflammation pathway', keyPoints: ['Cytokines', 'TNF', 'IL-6'] },
      { title: 'Joint damage', keyPoints: ['Pannus', 'Erosion'] },
      { title: 'Early symptoms', keyPoints: ['Symmetrical', 'Morning stiffness'] },
      { title: 'Why early treatment matters', keyPoints: ['Window of opportunity'] },
    ],
    [{ slug: 'early-ra-importance-of-quick-action', title: 'Early RA' }],
    ['/conditions/rheumatoid-arthritis'],
  ),
  outline(
    'rheumatoid-arthritis',
    'ra-medications-dmards-biologics',
    'RA Medications: DMARDs & Biologics',
    ['RA medication', 'DMARD treatment', 'biologic therapy rheumatoid arthritis'],
    [
      { title: 'How DMARDs work', keyPoints: ['Disease modification', 'Slow onset'] },
      { title: 'DMARD classes', keyPoints: ['Methotrexate', 'Sulfasalazine', 'Hydroxychloroquine'] },
      { title: 'Biologic agents', keyPoints: ['TNF inhibitors', 'IL-6', 'JAK inhibitors'] },
      { title: 'Side effects', keyPoints: ['Common', 'Serious'] },
      { title: 'Monitoring', keyPoints: ['Bloods', 'Infections'] },
    ],
    [{ slug: 'ra-remission-is-it-possible', title: 'RA Remission' }],
    ['/conditions/rheumatoid-arthritis'],
  ),
  outline(
    'rheumatoid-arthritis',
    'fatigue-and-rheumatoid-arthritis',
    'Fatigue & Rheumatoid Arthritis',
    ['rheumatoid arthritis fatigue', 'RA exhaustion'],
    [
      { title: 'Why fatigue occurs', keyPoints: ['Inflammation', 'Pain', 'Sleep'] },
      { title: 'Managing energy', keyPoints: ['Pacing', 'Prioritising'] },
      { title: 'Pacing techniques', keyPoints: ['4 Ps', 'Activity diary'] },
      { title: 'Sleep', keyPoints: ['Hygiene', 'Pain at night'] },
      { title: 'When to see a doctor', keyPoints: ['Anaemia', 'Thyroid', 'Depression'] },
    ],
    [{ slug: 'sleep-problems-arthritis-breaking-the-cycle', title: 'Sleep Problems' }],
    ['/conditions/rheumatoid-arthritis', '/arthritis-mental-health'],
  ),
  outline(
    'rheumatoid-arthritis',
    'ra-and-work-employment-rights',
    'RA & Work: Employment Rights & Strategies',
    ['rheumatoid arthritis work', 'RA employment'],
    [
      { title: 'Employment rights (Equality Act)', keyPoints: ['Disability definition'] },
      { title: 'Reasonable adjustments', keyPoints: ['Flexible hours', 'Equipment'] },
      { title: 'Managing flares at work', keyPoints: ['Communication', 'Sick leave'] },
      { title: 'Disclosure', keyPoints: ['When to tell', 'How to frame it'] },
    ],
    [{ slug: 'fatigue-and-rheumatoid-arthritis', title: 'Fatigue & RA' }],
    ['/conditions/rheumatoid-arthritis'],
  ),
  outline(
    'rheumatoid-arthritis',
    'pregnancy-and-rheumatoid-arthritis',
    'Pregnancy & Rheumatoid Arthritis',
    ['rheumatoid arthritis pregnancy', 'RA and conception'],
    [
      { title: 'Planning pregnancy', keyPoints: ['Preconception clinic'] },
      { title: 'Medication safety', keyPoints: ['Compatible drugs', 'Stop list'] },
      { title: 'Flares', keyPoints: ['Pregnancy improvement', 'Postpartum flares'] },
      { title: 'Delivery & postpartum', keyPoints: ['Breastfeeding', 'Resuming meds'] },
    ],
    [],
    ['/conditions/rheumatoid-arthritis'],
  ),
  outline(
    'rheumatoid-arthritis',
    'ra-remission-is-it-possible',
    'RA Remission: Is It Possible?',
    ['rheumatoid arthritis remission', 'RA low disease activity'],
    [
      { title: 'What remission means', keyPoints: ['DAS28', 'Boolean criteria'] },
      { title: 'How to achieve it', keyPoints: ['Treat-to-target', 'Tight control'] },
      { title: 'Maintaining it', keyPoints: ['Adherence', 'Lifestyle'] },
      { title: 'Quality of life', keyPoints: ['Function', 'Work'] },
    ],
    [{ slug: 'ra-medications-dmards-biologics', title: 'RA Medications' }],
    ['/conditions/rheumatoid-arthritis'],
  ),
  outline(
    'rheumatoid-arthritis',
    'early-ra-importance-of-quick-action',
    'Early RA: Importance of Quick Action',
    ['early rheumatoid arthritis', 'early RA treatment'],
    [
      { title: 'Window of opportunity', keyPoints: ['First 12 weeks'] },
      { title: 'Diagnosis', keyPoints: ['Anti-CCP', 'Rheumatoid factor', 'Imaging'] },
      { title: 'Starting medication', keyPoints: ['DMARD-first', 'Steroid bridge'] },
      { title: 'What to expect', keyPoints: ['Time to effect', 'Side-effect plan'] },
    ],
    [{ slug: 'understanding-rheumatoid-arthritis-autoimmunity', title: 'Understanding RA' }],
    ['/conditions/rheumatoid-arthritis'],
  ),
  outline(
    'rheumatoid-arthritis',
    'ra-and-diet-foods-that-may-help',
    'RA & Diet: Foods That May Help',
    ['rheumatoid arthritis diet', 'anti-inflammatory foods RA'],
    [
      { title: 'Anti-inflammatory foods', keyPoints: ['Oily fish', 'Olive oil', 'Veg'] },
      { title: 'What to avoid', keyPoints: ['Ultra-processed', 'Excess alcohol'] },
      { title: 'Mediterranean pattern', keyPoints: ['Evidence', 'Practical swaps'] },
      { title: 'Supplements', keyPoints: ['Omega-3', 'Vitamin D'] },
    ],
    [],
    ['/diet', '/guides/diet'],
  ),
  outline(
    'rheumatoid-arthritis',
    'exercise-for-rheumatoid-arthritis',
    'Exercise for Rheumatoid Arthritis',
    ['rheumatoid arthritis exercise', 'RA workout'],
    [
      { title: 'Why exercise helps', keyPoints: ['Inflammation', 'Function'] },
      { title: 'Types of exercise', keyPoints: ['Aerobic', 'Strength', 'Mobility'] },
      { title: 'Pacing', keyPoints: ['Two-day rule', 'Activity diary'] },
      { title: 'Flares & exercise', keyPoints: ['Modify, don\'t stop'] },
      { title: 'Physiotherapy', keyPoints: ['Referral pathway'] },
    ],
    [],
    ['/exercises', '/conditions/rheumatoid-arthritis'],
  ),
  outline(
    'rheumatoid-arthritis',
    'ra-support-and-community',
    'RA Support & Community',
    ['rheumatoid arthritis support groups', 'RA community'],
    [
      { title: 'Finding support', keyPoints: ['Peer groups', 'Online forums'] },
      { title: 'Emotional impact', keyPoints: ['Isolation', 'Identity'] },
      { title: 'Coping strategies', keyPoints: ['CBT', 'Acceptance'] },
      { title: 'Resources', keyPoints: ['Helplines', 'Charities'] },
    ],
    [],
    ['/community', '/arthritis-mental-health'],
  ),
];

// ---------- Juvenile arthritis cluster (10) ----------

const juvenile: Tier2Outline[] = [
  outline(
    'juvenile-arthritis',
    'juvenile-arthritis-explained-for-parents',
    'Juvenile Arthritis Explained for Parents',
    ['juvenile arthritis', 'arthritis in children'],
    [
      { title: 'What JA is', keyPoints: ['Definition', 'Onset before 16'] },
      { title: 'Types', keyPoints: ['Polyarticular', 'Oligoarticular', 'Systemic'] },
      { title: 'Symptoms', keyPoints: ['Swelling', 'Limping', 'Morning stiffness'] },
      { title: 'Diagnosis', keyPoints: ['Paediatric rheumatology', 'Bloods', 'Imaging'] },
    ],
    [],
    ['/conditions/juvenile-arthritis'],
  ),
  outline(
    'juvenile-arthritis',
    'ja-and-school-supporting-education',
    'JA & School: Supporting Your Child\'s Education',
    ['juvenile arthritis school', 'JA and education'],
    [
      { title: 'School accommodations', keyPoints: ['EHCP', 'Healthcare plan'] },
      { title: 'Pain management at school', keyPoints: ['Medication times', 'Rest breaks'] },
      { title: 'Social inclusion', keyPoints: ['PE alternatives', 'Lunch routine'] },
      { title: 'Teacher communication', keyPoints: ['What to share', 'Meeting templates'] },
    ],
    [],
    ['/conditions/juvenile-arthritis'],
  ),
  outline(
    'juvenile-arthritis',
    'ja-and-sports-staying-active',
    'JA & Sports: Staying Active',
    ['juvenile arthritis sports', 'can children with JA play sports'],
    [
      { title: 'Safe sports', keyPoints: ['Swimming', 'Cycling', 'Modified team sports'] },
      { title: 'Pain management', keyPoints: ['Warm-up', 'Pacing'] },
      { title: 'Physiotherapy', keyPoints: ['Paediatric physio'] },
      { title: 'Building confidence', keyPoints: ['Small wins', 'Peer support'] },
    ],
    [],
    ['/conditions/juvenile-arthritis', '/exercises'],
  ),
  outline(
    'juvenile-arthritis',
    'eye-health-in-juvenile-arthritis',
    'Eye Health in Juvenile Arthritis',
    ['juvenile arthritis eye problems', 'uveitis JA'],
    [
      { title: 'Eye complications', keyPoints: ['Uveitis', 'Asymptomatic risk'] },
      { title: 'Screening', keyPoints: ['Slit-lamp', 'Frequency by subtype'] },
      { title: 'Treatment', keyPoints: ['Steroid drops', 'Systemic therapy'] },
      { title: 'Importance of regular eye exams', keyPoints: ['Preventing vision loss'] },
    ],
    [],
    ['/conditions/juvenile-arthritis'],
  ),
  outline(
    'juvenile-arthritis',
    'social-development-peer-relationships-ja',
    'Social Development & Peer Relationships with JA',
    ['juvenile arthritis social', 'JA peer relationships'],
    [
      { title: 'Social impact', keyPoints: ['Visibility', 'Missed school'] },
      { title: 'Peer support', keyPoints: ['Camps', 'Online communities'] },
      { title: 'Managing limitations', keyPoints: ['Honest framing'] },
      { title: 'Building confidence', keyPoints: ['Strengths-based'] },
    ],
    [],
    ['/conditions/juvenile-arthritis', '/arthritis-mental-health'],
  ),
  outline(
    'juvenile-arthritis',
    'ja-treatment-options-medication-to-surgery',
    'JA Treatment Options: From Medication to Surgery',
    ['juvenile arthritis treatment', 'JA medication'],
    [
      { title: 'NSAIDs', keyPoints: ['First-line symptom relief'] },
      { title: 'DMARDs', keyPoints: ['Methotrexate', 'Sulfasalazine'] },
      { title: 'Biologics', keyPoints: ['TNF inhibitors', 'IL-6'] },
      { title: 'Physical therapy', keyPoints: ['Range of motion', 'Strength'] },
      { title: 'When surgery is needed', keyPoints: ['Rare', 'Joint preservation'] },
    ],
    [],
    ['/conditions/juvenile-arthritis'],
  ),
  outline(
    'juvenile-arthritis',
    'ja-transition-to-adult-care',
    'JA Transition to Adult Care',
    ['juvenile arthritis transitioning to adult', 'JA to adult rheumatology'],
    [
      { title: 'Timing', keyPoints: ['Ready, Steady, Go framework'] },
      { title: 'Preparing your child', keyPoints: ['Self-management skills'] },
      { title: 'Finding adult providers', keyPoints: ['Referral', 'GP role'] },
      { title: 'Continuity of care', keyPoints: ['Records', 'Medication continuity'] },
    ],
    [],
    ['/conditions/juvenile-arthritis'],
  ),
  outline(
    'juvenile-arthritis',
    'managing-pain-in-children-with-ja',
    'Managing Pain in Children with JA',
    ['juvenile arthritis pain management', 'child arthritis pain relief'],
    [
      { title: 'Pain assessment in children', keyPoints: ['Faces scale', 'Behavioural cues'] },
      { title: 'Medication', keyPoints: ['Paediatric dosing'] },
      { title: 'Non-pharmacological strategies', keyPoints: ['Heat', 'Distraction', 'Play'] },
      { title: 'Emotional support', keyPoints: ['Validating pain'] },
    ],
    [],
    ['/conditions/juvenile-arthritis'],
  ),
  outline(
    'juvenile-arthritis',
    'family-life-with-juvenile-arthritis',
    'Family Life with Juvenile Arthritis',
    ['family and juvenile arthritis', 'raising child with JA'],
    [
      { title: 'Family dynamics', keyPoints: ['Routine', 'Roles'] },
      { title: 'Sibling impact', keyPoints: ['Attention', 'Inclusion'] },
      { title: 'Parental support', keyPoints: ['Parent peer groups', 'Respite'] },
      { title: 'Financial resources', keyPoints: ['DLA', 'Carers allowance'] },
    ],
    [],
    ['/conditions/juvenile-arthritis'],
  ),
  outline(
    'juvenile-arthritis',
    'prognosis-long-term-outlook-ja',
    'Prognosis & Long-term Outlook for JA',
    ['juvenile arthritis prognosis', 'JA long-term outcome'],
    [
      { title: 'Disease progression', keyPoints: ['By subtype'] },
      { title: 'Remission rates', keyPoints: ['Modern treatment era'] },
      { title: 'Long-term quality of life', keyPoints: ['Function', 'Education', 'Work'] },
      { title: 'Adult outcomes', keyPoints: ['Ongoing review'] },
    ],
    [],
    ['/conditions/juvenile-arthritis'],
  ),
];

// ---------- Mental health cluster (10) ----------

const mentalHealth: Tier2Outline[] = [
  outline(
    'mental-health',
    'depression-and-arthritis-recognition-treatment',
    'Depression & Arthritis: Recognition & Treatment',
    ['arthritis depression', 'depression with chronic pain'],
    [
      { title: 'Prevalence', keyPoints: ['Up to 1 in 3 with chronic arthritis'] },
      { title: 'Why it happens', keyPoints: ['Pain', 'Loss', 'Inflammation'] },
      { title: 'Symptoms', keyPoints: ['Low mood', 'Anhedonia', 'Sleep'] },
      { title: 'Treatment options', keyPoints: ['Talking therapy', 'Medication'] },
      { title: 'When to seek help', keyPoints: ['Crisis resources'] },
    ],
    [],
    ['/arthritis-mental-health'],
  ),
  outline(
    'mental-health',
    'anxiety-and-arthritis-coping-strategies',
    'Anxiety & Arthritis: Coping Strategies',
    ['arthritis anxiety', 'anxiety with chronic illness'],
    [
      { title: 'Anxiety triggers', keyPoints: ['Flares', 'Uncertainty'] },
      { title: 'Symptoms', keyPoints: ['Physical', 'Cognitive'] },
      { title: 'CBT strategies', keyPoints: ['Thought records', 'Behavioural experiments'] },
      { title: 'Medication', keyPoints: ['When indicated'] },
      { title: 'Relaxation', keyPoints: ['Breathing', 'Progressive relaxation'] },
    ],
    [],
    ['/arthritis-mental-health'],
  ),
  outline(
    'mental-health',
    'pain-psychology-how-your-mind-affects-pain',
    'Pain Psychology: How Your Mind Affects Pain',
    ['pain psychology arthritis', 'mind-body pain'],
    [
      { title: 'Thoughts, emotions & pain', keyPoints: ['Gate control'] },
      { title: 'Neuroplasticity', keyPoints: ['Pain rewiring'] },
      { title: 'Pain catastrophising', keyPoints: ['Recognising', 'Reframing'] },
      { title: 'Mindfulness', keyPoints: ['Evidence base'] },
    ],
    [],
    ['/arthritis-mental-health'],
  ),
  outline(
    'mental-health',
    'mindfulness-and-meditation-for-arthritis',
    'Mindfulness & Meditation for Arthritis',
    ['mindfulness arthritis', 'meditation chronic pain'],
    [
      { title: 'Mindfulness techniques', keyPoints: ['Body scan', 'Breath'] },
      { title: 'Meditation practices', keyPoints: ['Guided', 'Silent'] },
      { title: 'Scientific evidence', keyPoints: ['MBSR trials'] },
      { title: 'Getting started', keyPoints: ['Apps', '5-minute starts'] },
    ],
    [],
    ['/arthritis-mental-health'],
  ),
  outline(
    'mental-health',
    'identity-and-grief-with-chronic-arthritis',
    'Identity & Grief with Chronic Arthritis',
    ['arthritis identity loss', 'grieving lifestyle changes'],
    [
      { title: 'Identity shifts', keyPoints: ['Role changes', 'Body changes'] },
      { title: 'Grieving former self', keyPoints: ['Stages', 'Validating loss'] },
      { title: 'Rebuilding identity', keyPoints: ['Values', 'New roles'] },
      { title: 'Acceptance', keyPoints: ['ACT framework'] },
    ],
    [],
    ['/arthritis-mental-health'],
  ),
  outline(
    'mental-health',
    'relationships-and-arthritis-communication',
    'Relationships & Arthritis: Communication & Support',
    ['arthritis relationships', 'communication with family about pain'],
    [
      { title: 'Partner impact', keyPoints: ['Caregiver burden'] },
      { title: 'Communication strategies', keyPoints: ['Pain scales', 'Daily check-ins'] },
      { title: 'Sexual health', keyPoints: ['Positioning', 'Pacing'] },
      { title: 'Maintaining intimacy', keyPoints: ['Emotional closeness'] },
    ],
    [],
    ['/arthritis-mental-health'],
  ),
  outline(
    'mental-health',
    'sleep-problems-arthritis-breaking-the-cycle',
    'Sleep Problems & Arthritis: Breaking the Cycle',
    ['arthritis sleep problems', 'insomnia chronic pain'],
    [
      { title: 'Why arthritis disrupts sleep', keyPoints: ['Pain', 'Inflammation'] },
      { title: 'Sleep hygiene', keyPoints: ['Routine', 'Environment'] },
      { title: 'Pain at night', keyPoints: ['Positioning', 'Medication timing'] },
      { title: 'When to seek help', keyPoints: ['CBT-i referral'] },
    ],
    [],
    ['/arthritis-mental-health'],
  ),
  outline(
    'mental-health',
    'finding-a-therapist-for-arthritis-mental-health',
    'Finding a Therapist for Arthritis-Related Mental Health',
    ['therapist arthritis', 'counseling chronic illness'],
    [
      { title: 'Types of therapy', keyPoints: ['CBT', 'ACT', 'Counselling'] },
      { title: 'Finding providers', keyPoints: ['UK healthcare Talking Therapies', 'BABCP'] },
      { title: 'What to expect', keyPoints: ['First session', 'Goals'] },
      { title: 'Working with mental health professionals', keyPoints: ['Sharing pain context'] },
    ],
    [],
    ['/arthritis-mental-health'],
  ),
  outline(
    'mental-health',
    'self-compassion-arthritis-overcoming-self-blame',
    'Self-Compassion & Arthritis: Overcoming Self-Blame',
    ['self-compassion chronic illness', 'arthritis guilt'],
    [
      { title: 'Self-blame patterns', keyPoints: ['Why me', 'I should be better'] },
      { title: 'Self-compassion techniques', keyPoints: ['Common humanity'] },
      { title: 'Reframing', keyPoints: ['Friend test'] },
      { title: 'Acceptance', keyPoints: ['Limits as data, not failure'] },
    ],
    [],
    ['/arthritis-mental-health'],
  ),
  outline(
    'mental-health',
    'building-resilience-living-with-arthritis',
    'Building Resilience Living with Arthritis',
    ['resilience chronic illness', 'coping with arthritis long-term'],
    [
      { title: 'Resilience factors', keyPoints: ['Support', 'Purpose', 'Flexibility'] },
      { title: 'Building strength', keyPoints: ['Routines', 'Skills'] },
      { title: 'Finding meaning', keyPoints: ['Values', 'Service'] },
      { title: 'Thriving, not just surviving', keyPoints: ['Realistic optimism'] },
    ],
    [],
    ['/arthritis-mental-health'],
  ),
];

export const tier2Outlines: Tier2Outline[] = [
  ...osteoarthritis,
  ...rheumatoid,
  ...juvenile,
  ...mentalHealth,
];

export const tier2OutlinesByPillar = (id: PillarId): Tier2Outline[] =>
  tier2Outlines.filter((o) => o.pillarId === id);
