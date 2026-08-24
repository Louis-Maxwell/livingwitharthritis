 
/**
 * Admin-only endpoint to seed / refresh the content_embeddings table.
 * Chunks a curated arthritis knowledge corpus, embeds each chunk with
 * openai/text-embedding-3-small (matches vector(1536) column), and upserts.
 *
 * POST /functions/v1/ingest-content
 * Requires: signed-in admin user.
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { preflight, getCorsHeaders, newRequestId, errJson } from "../_shared/http.ts";
import { checkRateLimit, getClientIp, rateLimitResponse } from "../_shared/rate-limiter-v2.ts";

interface CorpusItem {
  source_type: "condition" | "guide" | "exercise" | "diet" | "article";
  source_slug: string;
  url: string;
  title: string;
  content: string;
}

const CORPUS: CorpusItem[] = [
  // ─── Conditions ─────────────────────────────────────────────────────
  {
    source_type: "condition",
    source_slug: "osteoarthritis",
    url: "/conditions/osteoarthritis",
    title: "Osteoarthritis (OA)",
    content:
      "Osteoarthritis is the most common form of arthritis in the UK, affecting around 8.5 million adults (Versus Arthritis). It develops as protective cartilage wears down, most often in the knees, hips, hands, and spine. Common symptoms: joint pain that worsens with activity, morning stiffness lasting under 30 minutes, reduced range of motion, and grating sensations (crepitus). Evidence-based management: weight management to reduce joint load, low-impact exercise (walking, swimming, cycling), physiotherapy and strengthening programmes, pain relief medication and topical NSAIDs. NICE NG226 recommends exercise and weight loss as first-line treatments. See your GP if joint pain persists for more than a few weeks or limits daily activities.",
  },
  {
    source_type: "condition",
    source_slug: "rheumatoid-arthritis",
    url: "/conditions/rheumatoid-arthritis",
    title: "Rheumatoid Arthritis (RA)",
    content:
      "Rheumatoid arthritis affects approximately 450,000 adults in the UK. It is an autoimmune condition where the immune system attacks the lining of joints, causing inflammation. Hallmark symptoms: symmetrical joint pain (both hands, both feet), morning stiffness lasting over an hour, warm swollen tender joints, fatigue, and general unwellness. Early diagnosis and DMARD treatment (typically methotrexate) are critical to prevent joint damage. Biologic and targeted therapies are used for moderate-to-severe RA. See your GP urgently if you have persistent swelling in small joints of hands or feet — early rheumatology referral improves long-term outcomes. NICE NG100 covers RA management.",
  },
  {
    source_type: "condition",
    source_slug: "psoriatic-arthritis",
    url: "/conditions/psoriatic-arthritis",
    title: "Psoriatic Arthritis (PsA)",
    content:
      "Psoriatic arthritis affects around 150,000 people in the UK and is linked to psoriasis. It can affect any joint and often causes nail changes, dactylitis (sausage-like swelling of fingers or toes), and lower back pain. Symptoms are often asymmetrical. Management combines DMARDs and biologics targeting inflammation, coordinated dermatology and rheumatology care, and regular low-impact exercise. If you have psoriasis and develop joint pain or stiffness, ask your GP for rheumatology screening.",
  },
  {
    source_type: "condition",
    source_slug: "gout",
    url: "/conditions/gout",
    title: "Gout",
    content:
      "Gout is caused by uric acid crystals depositing in joints, most classically the base of the big toe. Attacks are sudden, extremely painful, with a hot red swollen joint often at night. Management: acute attacks with NSAIDs or colchicine (from GP), long-term with urate-lowering therapy such as allopurinol if attacks recur. Dietary triggers include red meat, offal, shellfish, beer, and sugary drinks. Hydration and weight management help. See your GP for a first attack to confirm diagnosis.",
  },
  {
    source_type: "condition",
    source_slug: "ankylosing-spondylitis",
    url: "/conditions/ankylosing-spondylitis",
    title: "Ankylosing Spondylitis",
    content:
      "Ankylosing spondylitis is an inflammatory arthritis primarily affecting the spine and sacroiliac joints. Typical onset is in late teens to 30s. Hallmark: inflammatory back pain that improves with movement and worsens with rest, morning stiffness over 30 minutes. Management centres on daily exercise (especially stretching and posture work), NSAIDs, and biologics (TNF inhibitors, IL-17 inhibitors) for active disease. Referral to rheumatology is important — average UK diagnostic delay is 7–9 years.",
  },
  {
    source_type: "condition",
    source_slug: "fibromyalgia",
    url: "/conditions/fibromyalgia",
    title: "Fibromyalgia",
    content:
      "Fibromyalgia causes widespread musculoskeletal pain, fatigue, sleep disturbance, and cognitive issues (fibro fog). It is not strictly arthritis but overlaps with many arthritis clinics. Management: graded exercise (start low, build slowly), sleep hygiene, cognitive behavioural therapy, and pacing. Medications such as amitriptyline, duloxetine, or pregabalin may help some people. Support groups and pain-management courses reduce isolation.",
  },

  // ─── Exercise ───────────────────────────────────────────────────────
  {
    source_type: "exercise",
    source_slug: "safe-exercise-oa",
    url: "/exercises",
    title: "Safe exercises for osteoarthritis",
    content:
      "Safe, evidence-based exercises for osteoarthritis include: walking (20–30 minutes most days), stationary cycling, swimming or water aerobics (aquatic exercise reduces joint load by up to 80%), tai chi (strong evidence for knee and hip OA — reduces pain and improves balance), and yoga adapted for arthritis. Strengthening: quadriceps sets, straight-leg raises, wall sits, bridges — 2 to 3 sets of 10 reps. Aim for a mix of aerobic, strength, flexibility, and balance work each week. NICE NG226 states exercise is a core treatment; short-term soreness during and after exercise is expected and does NOT mean damage.",
  },
  {
    source_type: "exercise",
    source_slug: "tai-chi",
    url: "/exercises/tai-chi",
    title: "Tai chi for arthritis and balance",
    content:
      "Tai chi is a low-impact martial art with strong evidence for arthritis. Meta-analyses show it reduces pain and improves function in knee osteoarthritis comparable to conventional physiotherapy. It also improves balance and reduces fall risk in older adults. Beginner sequences include weight shifts, cloud hands, brush knee, and the rooted stance. Start with 20 minutes twice a week and progress. Suitable for most people including those with severe joint disease.",
  },
  {
    source_type: "exercise",
    source_slug: "knee-strengthening",
    url: "/exercises/knee",
    title: "Knee strengthening for osteoarthritis",
    content:
      "Strong quadriceps and glutes protect painful knees. Core exercises: straight-leg raises (10 reps × 3 sets), seated knee extensions, wall sits (hold 20–30 seconds × 5), step-ups on a low step, and clamshells for hip stability. Do 2 to 3 sessions per week. Expect mild soreness — sharp catching pain or significant swelling means stop and consult a physiotherapist. Combine with walking or cycling for aerobic conditioning.",
  },
  {
    source_type: "exercise",
    source_slug: "hand-exercises",
    url: "/exercises/hand",
    title: "Hand exercises for arthritis",
    content:
      "Hand exercises maintain grip strength and finger mobility in OA and RA. Try: finger bends (bend each joint slowly, hold, release), thumb touches (touch thumb to each fingertip), fist clenches with soft ball, and wrist stretches. Do 5–10 reps twice daily. In active RA flares, keep gentle range-of-motion work but avoid heavy grip strengthening until the flare settles. Warm water soaks before exercising can help.",
  },
  {
    source_type: "exercise",
    source_slug: "hip-exercises",
    url: "/exercises/hip",
    title: "Hip exercises for arthritis",
    content:
      "For hip OA: clamshells, side-lying leg raises, glute bridges, and standing hip abductions strengthen the gluteal muscles that stabilise the hip. Stretch hip flexors and hamstrings daily. Aquatic walking is excellent for hip OA. Avoid deep squats and heavy lunges if they provoke sharp groin pain. Progression should be gradual over 6–8 weeks.",
  },

  // ─── Diet ───────────────────────────────────────────────────────────
  {
    source_type: "diet",
    source_slug: "anti-inflammatory-diet",
    url: "/diet",
    title: "Anti-inflammatory diet for arthritis",
    content:
      "The Mediterranean diet has the strongest evidence for reducing inflammation and arthritis symptoms. Key elements: plenty of vegetables and fruit, whole grains, olive oil as main fat, oily fish (salmon, mackerel, sardines) twice a week, nuts and seeds, legumes, and moderate dairy. Limit red and processed meats, refined sugar, and ultra-processed foods. Studies show meaningful reductions in pain, stiffness, and inflammatory markers over 12–16 weeks. Weight loss of 5–10% significantly reduces knee OA pain in people carrying excess weight.",
  },
  {
    source_type: "diet",
    source_slug: "foods-to-avoid",
    url: "/diet/foods-to-avoid",
    title: "Foods to limit with arthritis",
    content:
      "Foods that may worsen inflammation: sugary drinks and desserts, ultra-processed foods high in refined carbs, red and processed meats (bacon, sausages, ham), fried foods, and excess alcohol. For gout specifically, also limit organ meats, shellfish, and beer. There is no single 'arthritis diet' that eliminates symptoms — the goal is a sustainable overall pattern, not perfection. If you notice specific foods flare your symptoms, keep a simple food-symptom diary for 2 weeks.",
  },
  {
    source_type: "diet",
    source_slug: "omega-3",
    url: "/diet/omega-3",
    title: "Omega-3 for arthritis",
    content:
      "Omega-3 fatty acids (EPA and DHA) have anti-inflammatory effects. Best food sources: oily fish twice a week — salmon, mackerel, sardines, anchovies, trout. For vegetarians: ground flaxseed, chia seeds, walnuts (ALA form is less potent). Supplement doses in trials for RA are typically 2.7 g/day EPA+DHA for 12+ weeks. Discuss with your GP if you take blood thinners.",
  },
  {
    source_type: "diet",
    source_slug: "turmeric-curcumin",
    url: "/diet/turmeric",
    title: "Turmeric and curcumin for arthritis",
    content:
      "Curcumin, the active compound in turmeric, has anti-inflammatory effects. A 2016 meta-analysis in the Journal of Medicinal Food found ~1000 mg/day curcumin extract (with piperine or a bioavailability-enhanced formulation) reduced knee OA pain similarly to NSAIDs, with better tolerability. Culinary turmeric alone contains too little curcumin for a therapeutic effect. Discuss with your GP if you take blood thinners or have gallbladder issues.",
  },
  {
    source_type: "diet",
    source_slug: "weight-management",
    url: "/diet/weight-management",
    title: "Weight management and arthritis",
    content:
      "Every pound of extra body weight adds 4 pounds of pressure on the knees and 6 on the hips during walking. Losing 5–10% of body weight in people with knee OA reduces pain by 20–50% and improves function significantly. Combine a Mediterranean-style diet with low-impact exercise. Rapid crash dieting is rarely sustainable — aim for 0.5–1 kg per week.",
  },

  // ─── Treatments ─────────────────────────────────────────────────────
  {
    source_type: "guide",
    source_slug: "pain-management",
    url: "/guides/pain-management",
    title: "Pain management options",
    content:
      "First-line pain management for OA per NICE NG226: topical NSAIDs (e.g. ibuprofen gel) for hands and knees. Paracetamol has limited efficacy and is no longer first-line. Oral NSAIDs are effective but require caution in kidney disease, heart disease, and stomach ulcers. Opioids are not recommended for long-term OA pain. Non-drug: exercise, weight loss, TENS, and heat/cold packs. For RA, disease-modifying drugs (DMARDs) are the priority — pain often improves as inflammation is controlled.",
  },
  {
    source_type: "guide",
    source_slug: "dmards",
    url: "/guides/dmards",
    title: "DMARDs and biologics",
    content:
      "Disease-modifying antirheumatic drugs (DMARDs) slow or halt joint damage in inflammatory arthritis. Methotrexate is the standard first-choice for RA and PsA — usually 15–25 mg once weekly with folic acid. Other conventional DMARDs: sulfasalazine, leflunomide, hydroxychloroquine. Biologics (TNF inhibitors like adalimumab, IL-6 inhibitors, JAK inhibitors) are used when conventional DMARDs aren't enough. All require blood monitoring. Never stop these medications without speaking to your rheumatology team.",
  },
  {
    source_type: "guide",
    source_slug: "flare-management",
    url: "/guides/flares",
    title: "Managing an arthritis flare",
    content:
      "During a flare: rest the affected joint but avoid complete immobility, use ice for hot swollen joints (10–15 minutes at a time) or heat for stiffness, take your usual pain relief as prescribed, and stay hydrated. Gentle range-of-motion exercise helps prevent stiffness even during flares. Contact your rheumatology team if a flare in inflammatory arthritis lasts more than 2 weeks or affects daily function. Track flares to identify triggers (stress, poor sleep, over-exertion, infection).",
  },
  {
    source_type: "guide",
    source_slug: "mental-health",
    url: "/arthritis-mental-health",
    title: "Mental health and arthritis",
    content:
      "Chronic pain and arthritis significantly raise the risk of depression and anxiety — around one in three people with arthritis experience low mood. Evidence-based support: cognitive behavioural therapy (CBT), pacing strategies, mindfulness, and peer support. NHS Talking Therapies (IAPT) is free in England — self-refer online. Samaritans 116 123 is free 24/7. If you have thoughts of self-harm, call NHS 111 option 2 or 999. Speak to your GP about how pain is affecting your mood — treating both together works best.",
  },
  {
    source_type: "guide",
    source_slug: "sleep",
    url: "/guides/sleep",
    title: "Sleep and arthritis",
    content:
      "Poor sleep worsens arthritis pain and pain worsens sleep — a two-way loop. Practical steps: keep a consistent bedtime, dim lights an hour before bed, avoid screens in bed, keep the bedroom cool and dark, and use extra pillows to support sore joints. Avoid caffeine after midday. Gentle stretching before bed can ease morning stiffness. If pain regularly wakes you, ask your GP about medication timing (some DMARDs and NSAIDs work better taken at night).",
  },
  {
    source_type: "guide",
    source_slug: "uk-benefits",
    url: "/guides/benefits",
    title: "UK benefits and support",
    content:
      "Personal Independence Payment (PIP) is the main UK benefit for adults with long-term conditions affecting daily living or mobility. Attendance Allowance is for over-66s. Employment and Support Allowance (ESA) supports those unable to work. Access to Work grants help fund adjustments in the workplace. Blue Badge for parking is available if walking is limited. Apply via gov.uk. Local Citizens Advice offices offer free help with forms. Versus Arthritis has a free helpline: 0800 5200 520.",
  },
];

async function embedBatch(inputs: string[], apiKey: string): Promise<number[][]> {
  const resp = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai/text-embedding-3-small",
      input: inputs,
    }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Embedding failed ${resp.status}: ${text}`);
  }
  const data = await resp.json();
  const rows = (data?.data ?? []) as Array<{ index: number; embedding: number[] }>;
  rows.sort((a, b) => a.index - b.index);
  return rows.map((r) => r.embedding);
}

function checksum(text: string): string {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) + hash) ^ text.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);
  const requestId = newRequestId();
  const corsHeaders = getCorsHeaders(req);

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!SUPABASE_URL || !SERVICE_KEY || !LOVABLE_API_KEY) {
      return errJson(req, { code: "service_unavailable", message: "Missing configuration.", requestId });
    }

    // Admin gate — extract JWT from Authorization header and verify role.
    const authHeader = req.headers.get("Authorization") ?? "";
    const jwt = authHeader.replace(/^Bearer\s+/i, "");
    if (!jwt) {
      return errJson(req, { code: "unauthorized", message: "Sign-in required.", requestId, status: 401 });
    }

    const userClient = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser(jwt);
    if (userErr || !userData?.user) {
      return errJson(req, { code: "unauthorized", message: "Invalid session.", requestId, status: 401 });
    }
    const adminClient = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: isAdminData } = await adminClient.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (!isAdminData) {
      return errJson(req, { code: "forbidden", message: "Admin only.", requestId, status: 403 });
    }

    // Rate limit content ingestion (prevent abuse of batch embedding operations)
    const rl = await checkRateLimit(adminClient, {
      ip: getClientIp(req),
      accountId: userData.user.id,
      tier: "authenticated",
      scope: "ingest-content",
    });
    if (!rl.allowed) {
      return rateLimitResponse(corsHeaders, rl.retryAfterSeconds);
    }

    // Embed all corpus items in batches (max 100 per request for safety).
    const inputs = CORPUS.map((c) => `${c.title}\n\n${c.content}`);
    const embeddings: number[][] = [];
    for (let i = 0; i < inputs.length; i += 50) {
      const batch = inputs.slice(i, i + 50);
      const vecs = await embedBatch(batch, LOVABLE_API_KEY);
      embeddings.push(...vecs);
    }

    // Upsert into content_embeddings.
    const rows = CORPUS.map((item, i) => ({
      source_type: item.source_type,
      source_slug: item.source_slug,
      chunk_index: 0,
      url: item.url,
      title: item.title,
      snippet: item.content.slice(0, 500),
      content: item.content,
      checksum: checksum(item.content),
      embedding: embeddings[i] as unknown as string,
      updated_at: new Date().toISOString(),
    }));

    // Clear existing rows for these source_types then insert fresh.
    await adminClient.from("content_embeddings").delete().in(
      "source_type",
      Array.from(new Set(CORPUS.map((c) => c.source_type))),
    );

    const { error: insErr } = await adminClient.from("content_embeddings").insert(rows);
    if (insErr) {
      console.error(`[${requestId}] Insert failed:`, insErr);
      return errJson(req, { code: "server_error", message: `Insert failed: ${insErr.message}`, requestId });
    }

    return new Response(
      JSON.stringify({ ok: true, ingested: rows.length, requestId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error(`[${requestId}] Ingest error:`, error);
    return errJson(req, {
      code: "server_error",
      message: error instanceof Error ? error.message : "Unknown error",
      requestId,
    });
  }
});
