import jsPDF from "jspdf";

/* ── helpers ── */
const BRAND = { r: 34, g: 139, b: 34 }; // forest-green accent
const GRAY = { r: 80, g: 80, b: 80 };
const LIGHT = { r: 245, g: 245, b: 245 };

function header(doc: jsPDF, title: string, subtitle: string) {
  doc.setFillColor(BRAND.r, BRAND.g, BRAND.b);
  doc.rect(0, 0, 210, 38, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(title, 15, 18);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(subtitle, 15, 28);
  doc.setTextColor(GRAY.r, GRAY.g, GRAY.b);
}

function footer(doc: jsPDF) {
  const h = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text("Living With Arthritis UK  •  livingwitharthritis.lovable.app  •  Free resource — not medical advice", 15, h - 8);
  doc.setTextColor(GRAY.r, GRAY.g, GRAY.b);
}

function sectionTitle(doc: jsPDF, y: number, text: string): number {
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(BRAND.r, BRAND.g, BRAND.b);
  doc.text(text, 15, y);
  doc.setTextColor(GRAY.r, GRAY.g, GRAY.b);
  doc.setFont("helvetica", "normal");
  return y + 8;
}

function bulletList(doc: jsPDF, y: number, items: string[], fontSize = 10): number {
  doc.setFontSize(fontSize);
  for (const item of items) {
    const lines = doc.splitTextToSize(`•  ${item}`, 175);
    if (y + lines.length * 5 > 275) { doc.addPage(); footer(doc); y = 20; }
    doc.text(lines, 18, y);
    y += lines.length * 5 + 2;
  }
  return y;
}

function paragraph(doc: jsPDF, y: number, text: string, fontSize = 10): number {
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, 180);
  if (y + lines.length * 5 > 275) { doc.addPage(); footer(doc); y = 20; }
  doc.text(lines, 15, y);
  return y + lines.length * 5 + 4;
}

/* ───────────────────────── PDF generators ───────────────────────── */

export function generateKneeExercisePdf() {
  const doc = new jsPDF();
  header(doc, "Knee Exercise Routine", "10-minute daily programme for knee osteoarthritis");

  let y = 50;
  y = paragraph(doc, y, "This guide provides a gentle, evidence-based 10-minute daily routine designed specifically for people living with knee osteoarthritis. Perform each exercise slowly and stop if you feel sharp pain.");

  const exercises = [
    { name: "1. Seated Knee Extensions", reps: "10 each leg", desc: "Sit upright in a firm chair. Slowly straighten one knee until the leg is extended. Hold for 3 seconds, then slowly lower. This strengthens the quadriceps, which support the knee joint." },
    { name: "2. Standing Hamstring Curls", reps: "10 each leg", desc: "Stand behind a chair for support. Bend one knee, bringing the heel toward your buttock. Hold 2 seconds, then lower slowly. Targets hamstring strength and knee stability." },
    { name: "3. Wall Squats (Mini)", reps: "8–10 reps", desc: "Stand with your back against a wall, feet shoulder-width apart. Slide down until knees are at roughly 30–45°. Hold 5 seconds, then slide back up. Builds quad and glute strength." },
    { name: "4. Straight Leg Raises", reps: "10 each leg", desc: "Lie on your back with one knee bent and the other straight. Raise the straight leg to the height of the opposite knee. Hold 3 seconds, then lower. Strengthens hip flexors and quads without bending the knee." },
    { name: "5. Calf Raises", reps: "12 reps", desc: "Stand holding a chair back. Rise onto your toes, hold 2 seconds, then lower. Improves ankle stability and calf strength, reducing load on knees during walking." },
    { name: "6. Step-Ups", reps: "8 each leg", desc: "Use a low step (10–15 cm). Step up with one foot, bring the other up, then step down. Builds functional strength for stairs and slopes." },
    { name: "7. Seated Marching", reps: "30 seconds", desc: "Sit tall and march your knees up alternately. Keep a steady rhythm. A gentle warm-up or cool-down that keeps the joint moving." },
  ];

  for (const ex of exercises) {
    y = sectionTitle(doc, y, ex.name);
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(`Reps: ${ex.reps}`, 18, y);
    doc.setFont("helvetica", "normal");
    y += 5;
    y = paragraph(doc, y, ex.desc, 10);
    y += 2;
  }

  y = sectionTitle(doc, y, "Tips for Success");
  y = bulletList(doc, y, [
    "Warm up with 2 minutes of gentle walking or seated marching before starting.",
    "Breathe normally — don't hold your breath during exercises.",
    "Ice the knee for 10 minutes after exercising if swelling is present.",
    "Aim for consistency: daily short sessions are more effective than occasional long ones.",
    "Consult your GP or physiotherapist before starting any new exercise programme.",
  ]);

  footer(doc);
  doc.save("Knee_Exercise_Routine_LWA.pdf");
}

export function generateHandExercisePdf() {
  const doc = new jsPDF();
  header(doc, "Hand Exercise Guide", "Grip strength & flexibility exercises for hand osteoarthritis");

  let y = 50;
  y = paragraph(doc, y, "Hand osteoarthritis can affect grip strength, dexterity and everyday tasks. These exercises are designed to maintain mobility, reduce stiffness and strengthen the small muscles of the hand. Do them daily, ideally after warming your hands in warm water for 5 minutes.");

  const exercises = [
    { name: "1. Finger Bends", reps: "5 each finger", desc: "Hold your hand up straight. Bend each finger slowly down toward the palm, one at a time. Hold 3 seconds, then straighten. Helps maintain range of motion in each joint." },
    { name: "2. Fist Making", reps: "10 reps", desc: "Start with fingers straight. Slowly curl them into a gentle fist (thumb outside). Hold 5 seconds, then open and spread fingers wide. Improves grip and flexibility." },
    { name: "3. Thumb Circles", reps: "10 each direction", desc: "Hold your hand relaxed. Move your thumb in gentle circles clockwise, then anti-clockwise. Keeps the thumb's carpometacarpal joint mobile." },
    { name: "4. Finger Lifts (Table-Top)", reps: "10 each finger", desc: "Place your hand flat on a table. Lift each finger individually, hold 2 seconds, then lower. Strengthens extensor tendons." },
    { name: "5. Rubber Band Finger Spread", reps: "10 reps", desc: "Place a rubber band around all five fingertips. Spread fingers apart against the resistance. Hold 3 seconds. Builds extensor and abductor strength." },
    { name: "6. Pinch Strengthening", reps: "10 each hand", desc: "Pinch a soft sponge or therapy putty between thumb and each fingertip. Hold 3 seconds. Improves pinch grip for opening jars and bottles." },
    { name: "7. Wrist Flexion & Extension", reps: "10 each direction", desc: "Rest your forearm on a table with the hand hanging over the edge. Slowly bend the wrist up, then down. Supports wrist mobility and forearm strength." },
  ];

  for (const ex of exercises) {
    y = sectionTitle(doc, y, ex.name);
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(`Reps: ${ex.reps}`, 18, y);
    doc.setFont("helvetica", "normal");
    y += 5;
    y = paragraph(doc, y, ex.desc, 10);
    y += 2;
  }

  footer(doc);
  doc.save("Hand_Exercise_Guide_LWA.pdf");
}

export function generateMealPlanPdf() {
  const doc = new jsPDF();
  header(doc, "7-Day Anti-Inflammatory Meal Plan", "Mediterranean-style meals for joint health");

  let y = 50;
  y = paragraph(doc, y, "This weekly meal plan follows Mediterranean diet principles shown to reduce inflammation. Each day provides balanced nutrition with omega-3 fatty acids, antioxidants, fibre and anti-inflammatory spices. Adjust portions to your calorie needs.");

  const days = [
    {
      day: "Monday",
      meals: [
        "Breakfast: Porridge with blueberries, walnuts & cinnamon",
        "Lunch: Grilled salmon salad with mixed leaves, cherry tomatoes, cucumber & olive oil dressing",
        "Dinner: Mediterranean chicken with roasted peppers, courgette & brown rice",
        "Snack: Handful of almonds & an apple",
      ],
    },
    {
      day: "Tuesday",
      meals: [
        "Breakfast: Greek yoghurt with mixed berries & ground flaxseed",
        "Lunch: Lentil & vegetable soup with wholemeal bread",
        "Dinner: Baked mackerel with sweet potato wedges & steamed broccoli",
        "Snack: Carrot sticks with hummus",
      ],
    },
    {
      day: "Wednesday",
      meals: [
        "Breakfast: Scrambled eggs on wholemeal toast with spinach",
        "Lunch: Quinoa bowl with chickpeas, red onion, cucumber, feta & lemon dressing",
        "Dinner: Turkey stir-fry with ginger, garlic, pak choi & brown noodles",
        "Snack: Small pot of mixed nuts & dried cranberries",
      ],
    },
    {
      day: "Thursday",
      meals: [
        "Breakfast: Overnight oats with chia seeds, banana & turmeric",
        "Lunch: Tuna & white bean salad with olive oil, lemon & parsley",
        "Dinner: Vegetable curry (chickpea, spinach, tomato) with brown rice",
        "Snack: Sliced pear with a tablespoon of almond butter",
      ],
    },
    {
      day: "Friday",
      meals: [
        "Breakfast: Smoothie — beetroot, frozen berries, banana, ginger & almond milk",
        "Lunch: Avocado & smoked salmon on rye bread with rocket",
        "Dinner: Grilled cod with roasted Mediterranean vegetables & new potatoes",
        "Snack: Dark chocolate square (70%+) & a handful of walnuts",
      ],
    },
    {
      day: "Saturday",
      meals: [
        "Breakfast: Banana pancakes (oat flour, egg, mashed banana) with berries",
        "Lunch: Roasted butternut squash soup with seeds & sourdough",
        "Dinner: Lean lamb meatballs in tomato-turmeric sauce with wholewheat pasta",
        "Snack: Edamame beans with sea salt",
      ],
    },
    {
      day: "Sunday",
      meals: [
        "Breakfast: Poached eggs with avocado & cherry tomatoes on sourdough",
        "Lunch: Grilled chicken wrap with mixed leaves, peppers & tzatziki",
        "Dinner: Baked salmon with garlic, lemon, asparagus & quinoa",
        "Snack: Fruit salad with a drizzle of honey & mint",
      ],
    },
  ];

  for (const d of days) {
    y = sectionTitle(doc, y, d.day);
    y = bulletList(doc, y, d.meals, 10);
    y += 3;
  }

  y = sectionTitle(doc, y, "Key Anti-Inflammatory Foods");
  y = bulletList(doc, y, [
    "Oily fish (salmon, mackerel, sardines) — rich in omega-3 fatty acids",
    "Berries (blueberries, strawberries) — high in antioxidants",
    "Leafy greens (spinach, kale) — vitamins C, K & folate",
    "Nuts & seeds (walnuts, flaxseed, chia) — healthy fats & fibre",
    "Turmeric & ginger — natural anti-inflammatory compounds",
    "Olive oil — monounsaturated fats, polyphenols",
    "Whole grains — fibre to support gut health and reduce inflammation",
  ]);

  footer(doc);
  doc.save("7_Day_Meal_Plan_LWA.pdf");
}

export function generatePainTrackerPdf() {
  const doc = new jsPDF();
  header(doc, "Joint Pain & Symptom Tracker", "Daily diary worksheet — print one copy per week");

  let y = 50;
  y = paragraph(doc, y, "Track your daily symptoms to identify patterns and share meaningful information with your healthcare team. Fill in one row per day. Rate pain on a scale of 0 (none) to 10 (worst). Note the joints affected, activities, and any medications taken.");

  // Table header
  doc.setFillColor(LIGHT.r, LIGHT.g, LIGHT.b);
  doc.rect(15, y, 180, 8, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  const cols = ["Day", "Pain (0-10)", "Joints Affected", "Stiffness (mins)", "Activity", "Meds/Notes"];
  const colX = [17, 35, 58, 105, 135, 163];
  cols.forEach((c, i) => doc.text(c, colX[i], y + 5.5));
  y += 10;

  doc.setFont("helvetica", "normal");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  for (const day of days) {
    doc.setDrawColor(200, 200, 200);
    doc.rect(15, y - 1, 180, 10);
    doc.text(day, 17, y + 5);
    y += 10;
  }

  y += 10;
  y = sectionTitle(doc, y, "How to Use This Tracker");
  y = bulletList(doc, y, [
    "Fill in at the same time each evening for consistency.",
    "Be specific about joints: e.g. \"left knee\", \"right hand fingers\".",
    "Record morning stiffness duration — this is important for RA diagnosis/monitoring.",
    "Note triggers: weather, stress, specific foods, sleep quality.",
    "Bring completed sheets to your GP or rheumatology appointments.",
  ]);

  y += 5;
  y = sectionTitle(doc, y, "Weekly Reflection");
  y = paragraph(doc, y, "Best day this week: _______________________________________________");
  y = paragraph(doc, y, "Worst day this week: ______________________________________________");
  y = paragraph(doc, y, "What helped most: ________________________________________________");
  y = paragraph(doc, y, "Goals for next week: ______________________________________________");

  footer(doc);
  doc.save("Joint_Pain_Tracker_LWA.pdf");
}

export function generateChairExercisePdf() {
  const doc = new jsPDF();
  header(doc, "Chair Exercise Guide", "Seated routines for all abilities — no equipment needed");

  let y = 50;
  y = paragraph(doc, y, "These chair-based exercises are ideal for people with limited mobility, during flare-ups, or as a gentle starting point. Use a sturdy chair without wheels. Each exercise can be done seated. Aim for 10–15 minutes daily.");

  const exercises = [
    { name: "1. Seated Marching", reps: "30 seconds", desc: "Sit tall with feet flat. March your knees up alternately at a comfortable pace. Swing arms gently. Warms up hips and knees." },
    { name: "2. Ankle Circles", reps: "10 each direction, each foot", desc: "Lift one foot off the floor. Rotate the ankle slowly in circles. Switch direction, then swap feet. Improves ankle mobility and circulation." },
    { name: "3. Seated Leg Extensions", reps: "10 each leg", desc: "Sit upright, extend one leg straight out. Hold 3 seconds, engaging the thigh muscle. Lower slowly. Key quad strengthener." },
    { name: "4. Seated Side Bends", reps: "8 each side", desc: "Sit tall with arms by your sides. Slowly slide one hand down toward the floor, bending at the waist. Return to centre. Stretches the torso and improves spinal mobility." },
    { name: "5. Shoulder Rolls", reps: "10 forward, 10 backward", desc: "Roll both shoulders forward in large circles, then reverse. Eases upper back and shoulder tension." },
    { name: "6. Seated Heel & Toe Raises", reps: "12 reps", desc: "With feet flat, raise your heels (onto toes), hold briefly, then lower and raise your toes (onto heels). Strengthens calves and shins." },
    { name: "7. Arm Raises", reps: "10 reps", desc: "Start with arms at sides. Slowly raise both arms out to the side and up overhead (or as high as comfortable). Lower slowly. Improves shoulder range of motion." },
    { name: "8. Seated Twist", reps: "8 each side", desc: "Sit tall, cross arms over chest. Slowly rotate your upper body to the right, hold 3 seconds, return to centre, then left. Maintains spinal rotation." },
  ];

  for (const ex of exercises) {
    y = sectionTitle(doc, y, ex.name);
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(`Reps: ${ex.reps}`, 18, y);
    doc.setFont("helvetica", "normal");
    y += 5;
    y = paragraph(doc, y, ex.desc, 10);
    y += 2;
  }

  footer(doc);
  doc.save("Chair_Exercise_Guide_LWA.pdf");
}

export function generateFoodsListPdf() {
  const doc = new jsPDF();
  header(doc, "Anti-Inflammatory Foods Checklist", "Printable shopping list for joint-friendly eating");

  let y = 50;
  y = paragraph(doc, y, "Use this checklist when shopping to fill your kitchen with inflammation-fighting foods. Tick items as you add them to your trolley. Based on Mediterranean diet research for arthritis management.");

  const categories = [
    { cat: "Oily Fish (aim for 2+ portions/week)", items: ["Salmon", "Mackerel", "Sardines", "Trout", "Fresh tuna", "Anchovies"] },
    { cat: "Fruits (especially berries)", items: ["Blueberries", "Strawberries", "Cherries", "Oranges", "Apples", "Pomegranate", "Banana", "Avocado"] },
    { cat: "Vegetables", items: ["Spinach", "Kale", "Broccoli", "Red peppers", "Tomatoes", "Sweet potato", "Beetroot", "Garlic", "Onions", "Courgette"] },
    { cat: "Nuts & Seeds", items: ["Walnuts", "Almonds", "Flaxseed (ground)", "Chia seeds", "Pumpkin seeds", "Brazil nuts"] },
    { cat: "Whole Grains & Pulses", items: ["Brown rice", "Quinoa", "Oats (porridge)", "Wholemeal bread", "Lentils", "Chickpeas", "Black beans"] },
    { cat: "Healthy Fats & Oils", items: ["Extra virgin olive oil", "Rapeseed oil", "Coconut oil (occasional)"] },
    { cat: "Herbs & Spices", items: ["Turmeric", "Ginger (fresh & ground)", "Cinnamon", "Garlic", "Oregano", "Rosemary", "Black pepper (enhances curcumin absorption)"] },
    { cat: "Dairy & Alternatives", items: ["Greek yoghurt (natural)", "Kefir", "Almond milk (unsweetened)", "Oat milk"] },
    { cat: "Drinks", items: ["Green tea", "Turmeric latte (golden milk)", "Water with lemon", "Herbal teas (ginger, chamomile)"] },
  ];

  for (const c of categories) {
    y = sectionTitle(doc, y, c.cat);
    doc.setFontSize(10);
    for (const item of c.items) {
      if (y > 270) { doc.addPage(); footer(doc); y = 20; }
      doc.rect(18, y - 3, 3.5, 3.5); // checkbox
      doc.text(item, 25, y);
      y += 6;
    }
    y += 3;
  }

  y += 4;
  y = sectionTitle(doc, y, "Foods to Limit");
  y = bulletList(doc, y, [
    "Processed meats (sausages, bacon, salami)",
    "Refined sugars (sweets, fizzy drinks, biscuits)",
    "White bread, white pasta, white rice",
    "Fried foods & trans fats",
    "Excessive alcohol",
    "High-salt processed snacks",
  ]);

  footer(doc);
  doc.save("Anti_Inflammatory_Foods_Checklist_LWA.pdf");
}
