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

/* ─── NEW: Shoulder Exercise Guide ─── */
export function generateShoulderExercisePdf() {
  const doc = new jsPDF();
  header(doc, "Shoulder Exercise Guide", "Gentle mobility & strengthening for shoulder arthritis");

  let y = 50;
  y = paragraph(doc, y, "Shoulder arthritis can make reaching, lifting and dressing difficult. These exercises aim to maintain range of motion, reduce stiffness and build the rotator cuff and deltoid muscles. Perform daily, using heat on the shoulder for 5 minutes beforehand if helpful.");

  const exercises = [
    { name: "1. Pendulum Swings", reps: "30 seconds each arm", desc: "Lean forward with one hand on a table. Let the affected arm hang and gently swing it in small circles, then side to side. Gradually increase the arc. Relieves stiffness without loading the joint." },
    { name: "2. Wall Finger Walk", reps: "5 reps each arm", desc: "Face a wall at arm's length. Walk your fingers up the wall as high as you can comfortably reach. Hold 5 seconds, then walk them down. Improves overhead reach progressively." },
    { name: "3. Cross-Body Stretch", reps: "Hold 15 seconds, 3 each side", desc: "Bring one arm across your chest. Use the opposite hand to gently press the arm closer. Stretches the posterior shoulder capsule." },
    { name: "4. External Rotation with Band", reps: "10 each arm", desc: "Hold a resistance band with elbows bent at 90° and tucked to your sides. Rotate your forearm outward against the band. Hold 2 seconds. Strengthens the rotator cuff." },
    { name: "5. Shoulder Blade Squeeze", reps: "12 reps", desc: "Sit or stand tall. Squeeze your shoulder blades together as if holding a pencil between them. Hold 5 seconds. Improves posture and upper back strength." },
    { name: "6. Towel Stretch (Behind Back)", reps: "5 reps each side", desc: "Hold a towel behind your back — one hand over the shoulder, the other at the lower back. Gently pull upward with the top hand. Improves internal and external rotation." },
    { name: "7. Isometric Shoulder Press", reps: "Hold 10 seconds × 5", desc: "Stand in a doorway. Push your palm against the frame at shoulder height without moving the arm. Builds strength without joint movement — ideal during flare-ups." },
  ];

  for (const ex of exercises) {
    y = sectionTitle(doc, y, ex.name);
    doc.setFontSize(9); doc.setFont("helvetica", "italic");
    doc.text(`Reps: ${ex.reps}`, 18, y);
    doc.setFont("helvetica", "normal"); y += 5;
    y = paragraph(doc, y, ex.desc, 10); y += 2;
  }

  y = sectionTitle(doc, y, "Tips");
  y = bulletList(doc, y, [
    "Never force a movement — work within your pain-free range.",
    "Apply ice for 10 minutes after if the shoulder feels warm or swollen.",
    "Sleep on the unaffected side with a pillow supporting the painful arm.",
    "Ask your GP about a referral to a physiotherapist for hands-on guidance.",
  ]);

  footer(doc);
  doc.save("Shoulder_Exercise_Guide_LWA.pdf");
}

/* ─── NEW: Hip Exercise Guide ─── */
export function generateHipExercisePdf() {
  const doc = new jsPDF();
  header(doc, "Hip Exercise Guide", "Strengthening & flexibility for hip osteoarthritis");

  let y = 50;
  y = paragraph(doc, y, "Hip osteoarthritis is one of the most common causes of reduced mobility. These exercises strengthen the muscles around the hip joint, improve balance and help maintain independence. Do them daily — consistency is more important than intensity.");

  const exercises = [
    { name: "1. Standing Hip Abduction", reps: "10 each leg", desc: "Stand holding a chair. Lift one leg out to the side, keeping it straight. Hold 2 seconds, lower slowly. Strengthens the gluteus medius, critical for walking stability." },
    { name: "2. Hip Flexor Stretch (Kneeling)", reps: "Hold 20 seconds each side", desc: "Kneel on one knee with the other foot forward. Push your hips gently forward until you feel a stretch at the front of the back hip. Counters the tightness from sitting." },
    { name: "3. Bridges", reps: "12 reps", desc: "Lie on your back, knees bent, feet flat. Squeeze your glutes and lift your hips until your body forms a straight line from knees to shoulders. Hold 3 seconds. Strengthens glutes and lower back." },
    { name: "4. Seated Hip Internal Rotation", reps: "10 each leg", desc: "Sit on a chair. Keeping your knee still, move your foot outward (rotating the hip inward). Hold 3 seconds. Maintains rotational range of motion." },
    { name: "5. Clamshells", reps: "12 each side", desc: "Lie on your side with knees bent at 45°. Keep feet together and open the top knee like a clamshell. Hold 3 seconds. Targets hip external rotators." },
    { name: "6. Step-Ups (Low Step)", reps: "8 each leg", desc: "Use a low step (10–15 cm). Step up, straighten, step down. Builds functional strength for stairs." },
    { name: "7. Supine Hip Circles", reps: "8 each direction, each leg", desc: "Lie on your back and lift one knee. Gently circle the knee in small circles. Lubricates the hip joint and maintains range." },
  ];

  for (const ex of exercises) {
    y = sectionTitle(doc, y, ex.name);
    doc.setFontSize(9); doc.setFont("helvetica", "italic");
    doc.text(`Reps: ${ex.reps}`, 18, y);
    doc.setFont("helvetica", "normal"); y += 5;
    y = paragraph(doc, y, ex.desc, 10); y += 2;
  }

  y = sectionTitle(doc, y, "Daily Living Tips");
  y = bulletList(doc, y, [
    "Use a raised toilet seat and grab rails to reduce deep bending.",
    "Wear supportive shoes with good cushioning.",
    "Avoid sitting in very low chairs — aim for seat height at knee level or above.",
    "Walking aids (a stick in the opposite hand) can reduce hip load by up to 25%.",
  ]);

  footer(doc);
  doc.save("Hip_Exercise_Guide_LWA.pdf");
}

/* ─── NEW: Weekly Exercise Progress Tracker ─── */
export function generateProgressTrackerPdf() {
  const doc = new jsPDF();
  header(doc, "Weekly Exercise Progress Tracker", "Track your activity, set goals & celebrate wins");

  let y = 50;
  y = paragraph(doc, y, "Use this tracker to build a consistent exercise habit. Record what you did each day, how it felt, and reflect at the end of the week. Print one per week and keep them together to see your progress over time.");

  y = sectionTitle(doc, y, "My Goal This Week");
  y = paragraph(doc, y, "_______________________________________________________________");
  y += 2;

  // Table
  doc.setFillColor(LIGHT.r, LIGHT.g, LIGHT.b);
  doc.rect(15, y, 180, 8, "F");
  doc.setFontSize(8); doc.setFont("helvetica", "bold");
  const cols = ["Day", "Exercise Done", "Duration", "Pain Before (0-10)", "Pain After", "Mood ☺/😐/☹"];
  const colX = [17, 32, 90, 120, 150, 170];
  cols.forEach((c, i) => doc.text(c, colX[i], y + 5.5));
  y += 10;
  doc.setFont("helvetica", "normal");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  for (const day of days) {
    doc.setDrawColor(200, 200, 200);
    doc.rect(15, y - 1, 180, 12);
    doc.text(day, 17, y + 6);
    y += 12;
  }

  y += 8;
  y = sectionTitle(doc, y, "Weekly Reflection");
  y = paragraph(doc, y, "Total exercise sessions this week: _______");
  y = paragraph(doc, y, "Total minutes active: _______");
  y = paragraph(doc, y, "Best exercise this week: _______________________________________________");
  y = paragraph(doc, y, "Biggest challenge: ____________________________________________________");
  y = paragraph(doc, y, "What I'll do differently next week: ____________________________________");

  y += 4;
  y = sectionTitle(doc, y, "Celebration Corner 🎉");
  y = paragraph(doc, y, "Write one thing you're proud of this week, no matter how small:");
  y = paragraph(doc, y, "_______________________________________________________________");

  footer(doc);
  doc.save("Weekly_Exercise_Progress_Tracker_LWA.pdf");
}

/* ─── NEW: Arthritis Fact Sheet ─── */
export function generateArthritisFactSheet() {
  const doc = new jsPDF();
  header(doc, "UK Arthritis Fact Sheet", "Key statistics and impact data — Living With Arthritis UK");

  let y = 50;
  y = paragraph(doc, y, "This fact sheet summarises the prevalence, economic impact and key statistics around arthritis in the United Kingdom. Ideal for journalists, researchers, healthcare professionals and resource pages.");

  y = sectionTitle(doc, y, "Prevalence");
  y = bulletList(doc, y, [
    "Over 10 million people in the UK live with arthritis or a related musculoskeletal condition.",
    "Osteoarthritis is the most common form, affecting approximately 8.75 million people.",
    "Rheumatoid arthritis affects around 400,000 adults in the UK.",
    "1 in 6 people in the UK have arthritis — it is the leading cause of pain and disability.",
    "Arthritis affects people of all ages, including over 15,000 children (juvenile idiopathic arthritis).",
  ]);

  y = sectionTitle(doc, y, "Economic Impact");
  y = bulletList(doc, y, [
    "Musculoskeletal conditions cost the UK economy an estimated £20.7 billion per year in lost productivity.",
    "Arthritis accounts for over 30 million lost working days annually.",
    "The health service spends approximately £10 billion per year treating musculoskeletal conditions.",
    "Joint replacement surgery (hips and knees) costs the health service over £1 billion annually.",
  ]);

  y = sectionTitle(doc, y, "Risk Factors");
  y = bulletList(doc, y, [
    "Age — most common in people over 50, but can affect any age group.",
    "Gender — women are more likely to develop most forms of arthritis.",
    "Obesity — excess weight increases the load on weight-bearing joints significantly.",
    "Previous joint injury, repetitive occupational use and family history.",
  ]);

  y = sectionTitle(doc, y, "Management");
  y = bulletList(doc, y, [
    "There is no cure, but symptoms can be effectively managed through exercise, weight control and diet.",
    "Low-impact exercise (walking, swimming, cycling) is one of the most effective treatments.",
    "Anti-inflammatory diets (Mediterranean-style) have been shown to reduce pain and stiffness.",
    "Early diagnosis and physiotherapy referral significantly improve long-term outcomes.",
  ]);

  y += 4;
  y = paragraph(doc, y, "Sources: NICE, Versus Arthritis, World Health Organization, Public Health England. For educational use — not medical advice.", 8);

  footer(doc);
  doc.save("UK_Arthritis_Fact_Sheet_LWA.pdf");
}

/* ─── NEW: Anti-Inflammatory Shopping List ─── */
export function generateShoppingListPdf() {
  const doc = new jsPDF();
  header(doc, "Anti-Inflammatory Shopping List", "Printable grocery checklist for joint-friendly eating");

  let y = 50;
  y = paragraph(doc, y, "Take this list to the supermarket! Organised by food group with notes on why each item helps manage inflammation and joint pain. Tick items off as you shop.");

  const groups = [
    { group: "Oily Fish (2+ portions/week)", items: ["Salmon — omega-3 rich", "Mackerel — high EPA/DHA", "Sardines — calcium + omega-3", "Trout — lean protein + omega-3"] },
    { group: "Berries & Fruits", items: ["Blueberries — anthocyanins", "Strawberries — vitamin C", "Cherries — reduce uric acid", "Oranges — vitamin C", "Avocado — healthy fats", "Pomegranate — polyphenols"] },
    { group: "Vegetables", items: ["Spinach — iron + folate", "Kale — vitamins A, C, K", "Broccoli — sulforaphane", "Red peppers — vitamin C", "Beetroot — betalains", "Sweet potato — beta-carotene", "Tomatoes — lycopene", "Garlic — allicin"] },
    { group: "Nuts & Seeds", items: ["Walnuts — omega-3 ALA", "Almonds — vitamin E", "Ground flaxseed — lignans", "Chia seeds — fibre + omega-3", "Pumpkin seeds — magnesium"] },
    { group: "Whole Grains & Pulses", items: ["Oats — beta-glucan fibre", "Brown rice — B vitamins", "Quinoa — complete protein", "Lentils — plant protein", "Chickpeas — fibre + iron"] },
    { group: "Spices & Herbs", items: ["Turmeric — curcumin (anti-inflammatory)", "Ginger — gingerols", "Cinnamon — antioxidant", "Black pepper — enhances curcumin"] },
    { group: "Healthy Fats", items: ["Extra virgin olive oil — oleocanthal", "Rapeseed oil — balanced omega ratio"] },
    { group: "Drinks", items: ["Green tea — EGCG catechins", "Turmeric latte / golden milk", "Water with lemon — hydration"] },
  ];

  for (const g of groups) {
    y = sectionTitle(doc, y, g.group);
    doc.setFontSize(10);
    for (const item of g.items) {
      if (y > 270) { doc.addPage(); footer(doc); y = 20; }
      doc.rect(18, y - 3, 3.5, 3.5);
      doc.text(item, 25, y);
      y += 6;
    }
    y += 3;
  }

  footer(doc);
  doc.save("Anti_Inflammatory_Shopping_List_LWA.pdf");
}

/* ─── NEW: Joint Pain Self-Assessment ─── */
export function generateSelfAssessmentPdf() {
  const doc = new jsPDF();
  header(doc, "Joint Pain Self-Assessment", "Printable tracker for GP & rheumatology appointments");

  let y = 50;
  y = paragraph(doc, y, "Complete this form before your GP or rheumatology appointment. It helps your healthcare team understand your symptoms quickly and provides a clear record for diagnosis and treatment planning.");

  y = sectionTitle(doc, y, "Personal Details");
  y = paragraph(doc, y, "Name: _______________________________________________  Date: _______________");
  y = paragraph(doc, y, "GP/Consultant: ________________________________________");
  y += 2;

  y = sectionTitle(doc, y, "Current Symptoms (tick all that apply)");
  const symptoms = ["Joint pain", "Morning stiffness (>30 mins)", "Swelling", "Warmth/redness", "Reduced grip strength", "Difficulty walking", "Fatigue", "Sleep disruption", "Clicking/grinding in joints"];
  doc.setFontSize(10);
  for (const s of symptoms) {
    if (y > 270) { doc.addPage(); footer(doc); y = 20; }
    doc.rect(18, y - 3, 3.5, 3.5);
    doc.text(s, 25, y);
    y += 6;
  }
  y += 4;

  y = sectionTitle(doc, y, "Joint Pain Map");
  y = paragraph(doc, y, "Rate pain 0–10 for each joint (0 = no pain, 10 = worst imaginable):");

  const joints = [
    ["Left Hand: ___", "Right Hand: ___"],
    ["Left Wrist: ___", "Right Wrist: ___"],
    ["Left Elbow: ___", "Right Elbow: ___"],
    ["Left Shoulder: ___", "Right Shoulder: ___"],
    ["Left Hip: ___", "Right Hip: ___"],
    ["Left Knee: ___", "Right Knee: ___"],
    ["Left Ankle: ___", "Right Ankle: ___"],
    ["Neck: ___", "Lower Back: ___"],
  ];

  doc.setFontSize(10);
  for (const [left, right] of joints) {
    if (y > 270) { doc.addPage(); footer(doc); y = 20; }
    doc.text(left, 18, y);
    doc.text(right, 110, y);
    y += 7;
  }
  y += 4;

  y = sectionTitle(doc, y, "Daily Impact");
  y = paragraph(doc, y, "How much does your pain affect daily activities? (circle one)");
  y = paragraph(doc, y, "Not at all    |    Mildly    |    Moderately    |    Severely    |    Completely");
  y += 2;

  y = sectionTitle(doc, y, "Current Treatments");
  y = paragraph(doc, y, "Medications: ________________________________________________________");
  y = paragraph(doc, y, "Exercise: ___________________________________________________________");
  y = paragraph(doc, y, "Other (e.g. diet, supplements): ______________________________________");

  y += 4;
  y = sectionTitle(doc, y, "Questions for Your Doctor");
  for (let i = 1; i <= 3; i++) {
    y = paragraph(doc, y, `${i}. ______________________________________________________________`);
  }

  footer(doc);
  doc.save("Joint_Pain_Self_Assessment_LWA.pdf");
}

