/**
 * Long-form content for /exercises/ankle-arthritis-exercises (foot and ankle
 * arthritis exercises). Exercise & Physiotherapy batch 2, article 24.
 * Pending clinical review.
 */
export const FOOT_ANKLE_TITLE = "Foot and Ankle Arthritis Exercises: 10 Moves (UK)";
export const FOOT_ANKLE_DESCRIPTION = "10 gentle foot and ankle arthritis exercises for OA, RA, gout and big toe pain: a daily plan, footwear tips, stop rules and when to get help.";
export const FOOT_ANKLE_INTRO = "Arthritis in the foot or ankle can make every step stiff and sore and leave you feeling unsteady. These ten gentle exercises, based on standard physiotherapy practice and NICE advice, keep the joints moving, strengthen the muscles that support your arches and ankle, and rebuild balance. You only need a chair, a towel, a ball and an optional resistance band.";
export const FOOT_ANKLE_QUICK_ANSWER = "Gentle foot and ankle arthritis exercises include ankle alphabet and circles, big toe mobilisation, toe spreads, towel scrunches, heel raises, band work, calf stretches and single-leg balance. Do the movement exercises daily and strength and balance work 3 or 4 days a week. Mild discomfort that settles within 2 hours is fine; sharp pain or new swelling means stop.";
export const FOOT_ANKLE_DATE_MODIFIED = "2026-10-10";

export interface FootAnkleExercise { name: string; purpose: string; how: string; reps: string }

export const FOOT_ANKLE_EXERCISES: FootAnkleExercise[] = [
  {
    "name": "Ankle alphabet",
    "purpose": "Range of movement · seated",
    "how": "Sit with one leg lifted slightly or resting on a cushion. Slowly trace each letter of the alphabet in the air with your big toe, moving only the ankle. Keep the movements smooth and within comfort. Repeat with the other foot.",
    "reps": "Once per foot, 1–2 times a day"
  },
  {
    "name": "Ankle circles",
    "purpose": "Gentle warm-up · seated",
    "how": "Lift one foot off the floor. Slowly circle the ankle 10 times clockwise, then 10 times anti-clockwise, keeping the rest of the leg still. Then point and flex the foot 10 times.",
    "reps": "10 each way, both feet"
  },
  {
    "name": "Big toe mobilisation",
    "purpose": "Big toe stiffness · seated",
    "how": "Sit with your foot on the opposite knee or a low stool. Hold the foot just behind the big toe joint with one hand and the big toe with the other. Gently bend the toe up and down within a comfortable range, then hold it gently stretched upwards for 10 seconds.",
    "reps": "10 slow movements, then 3 holds"
  },
  {
    "name": "Toe spreads",
    "purpose": "Small foot muscles · seated",
    "how": "With your feet flat on the floor, spread all your toes apart as wide as you can, hold for 5 seconds, then relax. Then try lifting just the big toe while keeping the other toes down, then the reverse.",
    "reps": "10 repetitions"
  },
  {
    "name": "Towel scrunches",
    "purpose": "Arch strength · seated",
    "how": "Place a small towel flat on the floor and rest your bare foot on it. Using only your toes, scrunch the towel towards you, then push it back out. Keep your heel on the floor.",
    "reps": "1–2 minutes per foot"
  },
  {
    "name": "Foot roll",
    "purpose": "Sole of the foot · seated",
    "how": "Roll the sole of your foot slowly back and forth over a tennis ball or a cold drinks bottle for 1 to 2 minutes, using gentle pressure. Avoid this if you have diabetes, reduced feeling in your feet or broken skin.",
    "reps": "1–2 minutes per foot"
  },
  {
    "name": "Heel and toe raises",
    "purpose": "Calf and shin strength · standing, holding on",
    "how": "Stand holding a worktop. Rise up onto the balls of both feet, hold for 2 seconds, and lower slowly. Then rock back onto your heels, lifting your toes, hold for 2 seconds, and lower.",
    "reps": "2 sets of 10"
  },
  {
    "name": "Resistance band ankle work",
    "purpose": "Ankle strength · seated",
    "how": "Sit with your leg out straight and loop a light resistance band around the ball of your foot, holding the ends. Push the foot down against the band, then return slowly. For the front of the shin, anchor the band to a table leg and pull your toes towards you.",
    "reps": "2 sets of 10 each direction"
  },
  {
    "name": "Calf stretch",
    "purpose": "Stiffness at the back of the ankle · standing",
    "how": "Stand facing a wall with hands on it. Step one foot back, keeping both feet pointing forwards and the back heel down. Lean forwards until you feel a stretch in the calf. Hold for 20 to 30 seconds. Repeat with the back knee slightly bent to stretch the lower calf.",
    "reps": "2–3 holds each way, each leg"
  },
  {
    "name": "Single-leg balance",
    "purpose": "Ankle stability and falls prevention · standing, holding on",
    "how": "Stand next to a worktop and hold on lightly. Lift one foot just off the floor and balance on the other for up to 30 seconds. As it gets easier, hold on with one finger, then hover your hand above the worktop.",
    "reps": "2–3 times each leg"
  }
];

export const FOOT_ANKLE_FAQS: { q: string; a: string }[] = [
  {
    "q": "What are the best exercises for foot and ankle arthritis?",
    "a": "A mix of range-of-movement exercises (ankle alphabet, circles, big toe mobilisation), strength exercises (heel raises, band work, towel scrunches), stretches (calf stretch) and balance work (single-leg balance). Combine them with regular walking, cycling or swimming and supportive footwear."
  },
  {
    "q": "Is walking good for ankle arthritis?",
    "a": "Yes, for most people. Short, regular walks on flat ground keep the joint moving and strengthen the supporting muscles. Wear supportive, cushioned shoes and build up gradually. If walking leaves your ankle sore for more than a couple of hours, shorten the walk or try cycling or swimming instead."
  },
  {
    "q": "Should I exercise during a foot or ankle flare-up?",
    "a": "Keep gentle seated movements going, such as ankle circles and toe exercises, to stop the joint stiffening. Avoid heel raises, balance work and long walks until the swelling and pain settle, then build back up over about a week."
  },
  {
    "q": "How long until foot exercises make a difference?",
    "a": "Many people notice less stiffness after 2 to 3 weeks of regular practice. Strength and balance usually take 6 to 12 weeks to improve. Keep going even if progress feels slow."
  },
  {
    "q": "Do I need insoles or an ankle brace?",
    "a": "Not everyone does. Insoles, rocker-soled shoes or an ankle support can help some people, particularly on long walks, but they should not replace exercise. A podiatrist or physiotherapist can advise. People with rheumatoid arthritis and foot problems should have access to a podiatrist, according to NICE."
  },
  {
    "q": "Can exercises help big toe arthritis?",
    "a": "Gentle big toe mobilisation and toe spreads can help maintain movement and comfort, alongside calf stretches. Stiff or rocker-soled shoes reduce pain when pushing off. If pain is limiting walking, ask your GP about podiatry or physiotherapy."
  }
];

export const FOOT_ANKLE_BEFORE_HTML = "<h2 id=\"who-for\">Who these exercises are for</h2>\n<p>These exercises are for adults with arthritis in the ankle or foot, including osteoarthritis (often at the ankle, the big toe joint or the midfoot), rheumatoid arthritis, psoriatic arthritis, gout once an attack has settled, and stiffness after an old sprain or fracture. They also suit people who want to keep their feet strong and steady as they get older. They are general guidance; if a physiotherapist or podiatrist has given you a programme, follow theirs first.</p>\n<p>The foot and ankle take your full body weight with every step. When they are stiff or painful, people tend to walk less, change the way they walk, and lose strength and balance, which can lead to problems in the knees, hips and back and a higher risk of falls. NICE guideline NG226 recommends tailored therapeutic exercise for everyone with osteoarthritis, and the NHS recommends regular gentle exercise for foot pain that lasts. Regular, simple exercises help keep the joints moving, strengthen the muscles that support the arches and ankle, and rebuild balance.</p>\n\n<h2 id=\"which-joints\">Which joints are affected?</h2>\n<table>\n<thead><tr><th>Area</th><th>Typical symptoms</th><th>Most helpful exercises</th></tr></thead>\n<tbody>\n<tr><td>Ankle joint</td><td>Deep ankle pain and stiffness, swelling after walking, difficulty on slopes and stairs</td><td>Ankle alphabet, circles, calf stretches, heel raises, balance</td></tr>\n<tr><td>Big toe joint (hallux rigidus)</td><td>Pain and stiffness at the base of the big toe, a bony lump, pain when pushing off</td><td>Big toe mobilisation, toe spreads, calf stretches</td></tr>\n<tr><td>Midfoot</td><td>Aching across the top of the foot, worse in thin or flexible shoes</td><td>Towel scrunches, short foot, calf stretches, plus supportive footwear</td></tr>\n<tr><td>Toes and forefoot (common in RA)</td><td>Pain under the ball of the foot, \"walking on pebbles\", toe deformities</td><td>Toe spreads, towel scrunches, foot roll, and podiatry review</td></tr>\n</tbody>\n</table>\n<p>Our <a href=\"/conditions/foot-and-ankle-arthritis\">foot and ankle arthritis guide</a> explains the causes, symptoms and treatments in more detail.</p>\n\n<h2 id=\"before-you-start\">Before you start</h2>\n<ul>\n<li><strong>Warm up:</strong> do the exercises after a short walk around the house, or after a warm bath or shower.</li>\n<li><strong>Use support:</strong> stand next to a kitchen worktop or a sturdy chair for standing exercises.</li>\n<li><strong>Bare feet or socks?</strong> Seated exercises are easiest barefoot. For standing balance work, wear supportive shoes at first if your feet are painful or you feel unsteady.</li>\n<li><strong>Check your skin:</strong> if you have diabetes, poor circulation or reduced feeling in your feet, check your feet for cuts or redness before and after exercise, and avoid rolling hard objects under the foot.</li>\n<li><strong>Use the 2-hour rule:</strong> mild discomfort that settles within about 2 hours is fine. If pain lasts longer, or your foot is more swollen the next day, you have done too much; do fewer repetitions next time.</li>\n</ul>";

export const FOOT_ANKLE_AFTER_HTML = "<h2 id=\"daily-plan\">A simple daily plan</h2>\n<table>\n<thead><tr><th>When</th><th>Exercises</th><th>Time</th></tr></thead>\n<tbody>\n<tr><td>In bed or on waking</td><td>Ankle alphabet and ankle circles</td><td>2–3 minutes</td></tr>\n<tr><td>Morning or afternoon</td><td>Big toe mobilisation, toe spreads, towel scrunches, foot roll</td><td>5–8 minutes</td></tr>\n<tr><td>3–4 days a week</td><td>Heel and toe raises, band work, calf stretches, single-leg balance</td><td>10 minutes</td></tr>\n<tr><td>Most days</td><td>A walk, cycle or swim at a comfortable level</td><td>10–30 minutes</td></tr>\n</tbody>\n</table>\n<p>Start with three or four exercises and build up to the full set over two weeks. Five to ten minutes every day is more helpful than one long session a week. Pair the routine with something you already do, such as waiting for the kettle.</p>\n\n<h2 id=\"levels\">Make it easier or harder</h2>\n<table>\n<thead><tr><th>Exercise</th><th>Easier</th><th>Harder</th></tr></thead>\n<tbody>\n<tr><td>Heel raises</td><td>Seated heel lifts</td><td>Single leg, or slow 3-second lowering</td></tr>\n<tr><td>Calf stretch</td><td>Seated with a towel around the foot</td><td>Longer holds, both straight and bent knee</td></tr>\n<tr><td>Balance</td><td>Both feet close together, holding on</td><td>One foot, light touch only, then no hands</td></tr>\n<tr><td>Band work</td><td>No band, just the movement</td><td>Thicker band, more repetitions</td></tr>\n</tbody>\n</table>\n<p>Progress one thing at a time when an exercise feels easy for a week and your feet settle within 2 hours.</p>\n\n<h2 id=\"footwear\">Footwear, insoles and walking aids</h2>\n<p>Exercise works best alongside the right footwear. The NHS suggests wearing comfortable, supportive shoes with a low heel and a soft sole for foot pain. Many people with foot or ankle arthritis find these features help:</p>\n<ul>\n<li>a cushioned, thick sole with a slight rocker shape, which reduces how much the big toe and ankle need to bend</li>\n<li>a deep, wide toe box for toe deformities or bunions</li>\n<li>laces or straps to hold the foot securely</li>\n<li>a firm heel counter for ankle stability</li>\n</ul>\n<p>Insoles, ankle supports and walking sticks can help some people, particularly on longer walks, but should not replace exercise. For rheumatoid arthritis, NICE guideline NG100 says adults with foot problems should have access to a podiatrist, and that functional insoles and therapeutic footwear should be available if needed. Ask your GP or rheumatology team about a podiatry referral. Our guide to <a href=\"/blog/best-walking-shoes-arthritis-uk\">the best walking shoes for arthritis</a> has more detail.</p>\n\n<h2 id=\"conditions\">Tips for specific conditions</h2>\n<h3>Big toe arthritis</h3>\n<p>Gentle big toe mobilisation helps keep what movement you have. Avoid forcing the toe if it is very stiff. Stiff-soled or rocker-soled shoes reduce the bending needed when you push off.</p>\n<h3>Rheumatoid and psoriatic arthritis</h3>\n<p>During a flare, keep to gentle seated range-of-movement exercises. When inflammation is controlled, add strength and balance work. Foot problems are common in RA, so regular podiatry review is worthwhile.</p>\n<h3>Gout</h3>\n<p>Rest and raise the foot during an attack, and only start gentle movement once the pain and swelling settle. Then build up these exercises to restore movement and strength. Gout attacks need treatment; see your GP if you have not been diagnosed.</p>\n<h3>After an old ankle injury</h3>\n<p>Ankle arthritis often follows previous sprains or fractures. Balance exercises are especially important, because the ankle's sense of position can be reduced after injury.</p>\n\n<h2 id=\"flare\">On flare days</h2>\n<p>Keep moving gently, but drop the loaded exercises (heel raises, balance, long walks). Do the ankle alphabet, circles and seated toe exercises a few times a day within comfort. Raise your foot when resting, and use a wrapped cold pack for 10 to 15 minutes on a hot, swollen joint. Build back up over a week as things settle.</p>\n\n<h2 id=\"walking\">Staying active beyond the exercises</h2>\n<p>Short, regular walks on flat ground keep the joints moving and help general fitness. If walking is too painful, cycling (including a static bike) and swimming or water exercise put much less load through the feet. For balance, tai chi is a gentle option; see our guide to <a href=\"/exercises/tai-chi-for-balance\">tai chi for balance</a>. You can explore more options in our <a href=\"/exercises\">exercise hub</a>.</p>\n\n<h2 id=\"mistakes\">Common mistakes to avoid</h2>\n<ul>\n<li><strong>Only resting the foot.</strong> Long periods of rest make the joints stiffer and the muscles weaker. Keep gentle movement going, even on bad days.</li>\n<li><strong>Pushing through sharp pain.</strong> A stretch or mild ache is fine; sharp pain is a signal to ease off.</li>\n<li><strong>Wearing worn-out or very flat, flexible shoes</strong> for walking and standing exercises.</li>\n<li><strong>Doing balance work without support.</strong> Always have something sturdy within reach until you are confident.</li>\n<li><strong>Stopping once it feels better.</strong> Keep a short routine going a few times a week to hold on to your gains.</li>\n</ul>\n\n<h2 id=\"when-to-get-help\">When to get medical help</h2>\n<p><strong>Stop the exercise if you get</strong> sharp pain, the ankle giving way, or new swelling.</p>\n<ul>\n<li><strong>Go to A&amp;E</strong> if you have a foot or ankle injury and cannot put weight on it, the foot or ankle looks misshapen, or you heard a snap at the time of injury.</li>\n<li><strong>Call NHS 111 or get urgent help</strong> if a joint in your foot or ankle suddenly becomes hot, red, swollen and very painful, especially with a high temperature or feeling unwell, or if you have diabetes and a foot wound, redness or swelling.</li>\n<li><strong>See your GP</strong> if foot pain has not improved after 2 weeks of home treatment, you have tingling or loss of feeling in your foot, you have new swelling in several joints, or pain is stopping you doing normal activities.</li>\n<li><strong>Ask about physiotherapy or podiatry.</strong> In many areas you can refer yourself to NHS physiotherapy, and some areas allow self-referral to podiatry.</li>\n</ul>";
