export interface ExerciseJointPage {
  slug: string;
  exercise: string;
  joint: string;
  title: string;
  metaDescription: string;
  intro: string;
  benefits: string[];
  instructions: { name: string; description: string; reps: string }[];
  safetyTips: string[];
  whenToAvoid: string[];
}

const exercises = ["swimming", "yoga", "cycling", "walking", "tai-chi", "pilates", "stretching", "strength-training"] as const;
const joints = ["knee", "hip", "shoulder", "hand", "back", "ankle"] as const;

type Exercise = typeof exercises[number];
type Joint = typeof joints[number];

const exerciseLabels: Record<Exercise, string> = {
  swimming: "Swimming", yoga: "Yoga", cycling: "Cycling", walking: "Walking",
  "tai-chi": "Tai Chi", pilates: "Pilates", stretching: "Stretching", "strength-training": "Strength Training"
};

const jointLabels: Record<Joint, string> = {
  knee: "Knee", hip: "Hip", shoulder: "Shoulder", hand: "Hand", back: "Back", ankle: "Ankle"
};

const benefitsMap: Record<Exercise, string[]> = {
  swimming: ["Zero joint impact — water supports body weight", "Improves cardiovascular fitness", "Increases range of motion", "Reduces stiffness and swelling", "Strengthens muscles around joints"],
  yoga: ["Improves flexibility and range of motion", "Strengthens supporting muscles gently", "Reduces stress and pain perception", "Improves balance and coordination", "Adaptable to all fitness levels"],
  cycling: ["Low-impact cardiovascular exercise", "Strengthens quadriceps and hamstrings", "Improves joint mobility", "Burns calories for weight management", "Can be done indoors on a stationary bike"],
  walking: ["Most accessible form of exercise", "Maintains joint function and mobility", "Supports bone density", "Improves mood and reduces fatigue", "Can be done anywhere, no equipment needed"],
  "tai-chi": ["Gentle, flowing movements reduce joint stress", "Improves balance — reduces fall risk", "Decreases pain and stiffness", "Promotes relaxation and stress relief", "Suitable for all ages and abilities"],
  pilates: ["Strengthens core muscles supporting the spine", "Improves posture and alignment", "Low-impact and joint-friendly", "Increases flexibility", "Can be modified for limited mobility"],
  stretching: ["Reduces morning stiffness", "Improves daily range of motion", "Relieves muscle tension around joints", "Increases blood flow to affected areas", "Can be done in bed or chair"],
  "strength-training": ["Builds muscles that protect and stabilise joints", "Reduces joint pain over time", "Improves bone density", "Boosts metabolism for weight management", "Resistance bands offer gentle starting option"],
};

const jointInstructions: Record<Joint, Record<Exercise, { name: string; description: string; reps: string }[]>> = {
  knee: {
    swimming: [
      { name: "Water Walking", description: "Walk back and forth in waist-deep water, focusing on smooth knee movement.", reps: "5 minutes" },
      { name: "Flutter Kicks", description: "Hold the pool edge and gently kick legs, keeping knees slightly bent.", reps: "3 × 30 seconds" },
      { name: "Water Squats", description: "Stand in chest-deep water and perform slow squats, letting buoyancy support you.", reps: "3 × 10" },
    ],
    yoga: [
      { name: "Chair Pose (Modified)", description: "Stand with feet hip-width apart, bend knees slightly as if sitting, hold.", reps: "Hold 15-30 seconds × 3" },
      { name: "Warrior II", description: "Wide stance, front knee bent over ankle, back leg straight. Strengthens quads.", reps: "Hold 20 seconds each side" },
      { name: "Reclined Knee-to-Chest", description: "Lying down, gently pull one knee toward chest. Relieves stiffness.", reps: "Hold 20 seconds each leg" },
    ],
    cycling: [
      { name: "Stationary Cycling (Low Resistance)", description: "Set bike to low resistance, maintain smooth pedalling motion.", reps: "15-20 minutes" },
      { name: "Recumbent Bike", description: "Use a recumbent bike for extra back support while cycling.", reps: "15-20 minutes" },
      { name: "Interval Cycling", description: "Alternate 2 minutes moderate with 1 minute easy pedalling.", reps: "15 minutes total" },
    ],
    walking: [
      { name: "Flat Surface Walk", description: "Walk on flat, even ground at a comfortable pace.", reps: "20-30 minutes" },
      { name: "Nordic Walking", description: "Use walking poles to reduce knee load and improve stability.", reps: "20-30 minutes" },
      { name: "Treadmill Walking", description: "Walk on a treadmill with no incline for consistent, joint-friendly exercise.", reps: "15-20 minutes" },
    ],
    "tai-chi": [
      { name: "Weight Shifting", description: "Slowly shift weight from one leg to the other, keeping knees soft.", reps: "2 minutes" },
      { name: "Brush Knee Push", description: "Step forward slowly, brush past knee with hand, push forward gently.", reps: "8 each side" },
      { name: "Standing Meditation", description: "Stand with knees slightly bent, arms relaxed. Focus on knee alignment.", reps: "3-5 minutes" },
    ],
    pilates: [
      { name: "Leg Slides", description: "Lying on back, slowly slide one heel along the floor, extending knee.", reps: "10 each leg" },
      { name: "Bridge", description: "Lying on back, feet flat, lift hips. Strengthens glutes supporting knees.", reps: "3 × 10" },
      { name: "Clam Shell", description: "Side-lying, knees bent, open top knee like a clam. Strengthens hip stabilisers.", reps: "10 each side" },
    ],
    stretching: [
      { name: "Quad Stretch", description: "Standing, pull heel toward buttock. Hold support if needed.", reps: "Hold 20 seconds each" },
      { name: "Hamstring Stretch", description: "Sit on chair edge, extend one leg straight, lean forward gently.", reps: "Hold 20 seconds each" },
      { name: "Calf Stretch", description: "Lean against wall with one leg behind, heel on floor.", reps: "Hold 20 seconds each" },
    ],
    "strength-training": [
      { name: "Wall Sit", description: "Lean back against wall, slide down until knees at 45°. Hold.", reps: "Hold 15-30 seconds × 3" },
      { name: "Step-Ups", description: "Step up onto a low step, alternating legs. Use handrail for balance.", reps: "3 × 8 each leg" },
      { name: "Resistance Band Leg Extension", description: "Seated, loop band around ankle, extend knee against resistance.", reps: "3 × 10 each leg" },
    ],
  },
  hip: {
    swimming: [
      { name: "Side-Stepping in Water", description: "Walk sideways in waist-deep water, keeping hips level.", reps: "3 × 1 minute" },
      { name: "Leg Circles", description: "Hold pool edge, make slow circles with one leg in the water.", reps: "10 circles each leg" },
      { name: "Backstroke", description: "Gentle backstroke encourages hip extension and rotation.", reps: "10 minutes" },
    ],
    yoga: [
      { name: "Pigeon Pose (Modified)", description: "Use a cushion under hip for support. Opens hip flexors gently.", reps: "Hold 30 seconds each side" },
      { name: "Butterfly Pose", description: "Sit with soles of feet together, gently press knees toward floor.", reps: "Hold 30 seconds" },
      { name: "Supine Hip Rotation", description: "Lying on back, bend knees, gently drop both knees to one side.", reps: "10 each side" },
    ],
    cycling: [
      { name: "Recumbent Cycling", description: "Recumbent position supports hips while cycling.", reps: "15-20 minutes" },
      { name: "Low-Resistance Pedalling", description: "Focus on smooth circular motion, minimal resistance.", reps: "15 minutes" },
      { name: "Seated Pedal Circles", description: "Focus on full circular pedal strokes to maximise hip mobility.", reps: "10 minutes" },
    ],
    walking: [
      { name: "Gentle Flat Walking", description: "Walk on level ground at a comfortable pace to maintain hip mobility.", reps: "20-30 minutes" },
      { name: "Lateral Walking", description: "Walk sideways to engage hip abductors.", reps: "3 × 1 minute each direction" },
      { name: "Backward Walking", description: "Walk backwards carefully in a safe space to change hip loading.", reps: "2-3 minutes" },
    ],
    "tai-chi": [
      { name: "Repulse Monkey", description: "Step backwards slowly, rotating trunk. Opens hip and improves balance.", reps: "8 each side" },
      { name: "Cloud Hands", description: "Shift weight side to side with flowing arm movements.", reps: "2-3 minutes" },
      { name: "Golden Rooster Stands", description: "Slowly lift one knee, hold balance. Strengthens hip stabilisers.", reps: "10 seconds each side × 5" },
    ],
    pilates: [
      { name: "Hip Circles", description: "On hands and knees, make small circles with one knee.", reps: "8 circles each direction" },
      { name: "Side-Lying Leg Lift", description: "Lie on side, lift top leg slowly. Strengthens hip abductors.", reps: "10 each side" },
      { name: "Pelvic Clock", description: "Lying on back, imagine a clock on pelvis, tilt in all directions.", reps: "5 full rotations" },
    ],
    stretching: [
      { name: "Hip Flexor Stretch", description: "Kneel on one knee, push hips forward gently.", reps: "Hold 20 seconds each" },
      { name: "Figure-4 Stretch", description: "Lying on back, cross ankle over opposite knee, pull toward chest.", reps: "Hold 20 seconds each" },
      { name: "Seated Hip Rotation", description: "Sit with one ankle on opposite knee, gently press knee down.", reps: "Hold 20 seconds each" },
    ],
    "strength-training": [
      { name: "Glute Bridge", description: "Lying on back, feet flat, lift hips. Squeeze glutes at top.", reps: "3 × 12" },
      { name: "Side-Lying Clam", description: "Lie on side, knees bent, open top knee against resistance band.", reps: "3 × 10 each side" },
      { name: "Standing Hip Abduction", description: "Hold chair, lift leg to side against band resistance.", reps: "3 × 10 each leg" },
    ],
  },
  shoulder: {
    swimming: [
      { name: "Breaststroke", description: "Gentle breaststroke keeps shoulders below water with low impact.", reps: "10 minutes" },
      { name: "Water Arm Circles", description: "Stand in chest-deep water, make slow circles with arms.", reps: "10 each direction" },
      { name: "Pool Edge Push-Ups", description: "Stand facing pool wall, push away gently for shoulder strength.", reps: "3 × 8" },
    ],
    yoga: [
      { name: "Cat-Cow", description: "On hands and knees, arch and round back. Mobilises shoulders and spine.", reps: "10 repetitions" },
      { name: "Thread the Needle", description: "On all fours, slide one arm under body, rotating shoulder gently.", reps: "5 each side" },
      { name: "Eagle Arms", description: "Cross arms in front, wrap forearms if possible. Stretches upper back.", reps: "Hold 20 seconds each side" },
    ],
    cycling: [
      { name: "Upright Cycling Position", description: "Use an upright bike to reduce shoulder strain from leaning forward.", reps: "15 minutes" },
      { name: "Arm Circles While Stationary", description: "On stationary bike, pause pedalling and do gentle arm circles.", reps: "10 each direction between intervals" },
      { name: "Handlebar Grip Releases", description: "Periodically release grip and shake out arms to prevent stiffness.", reps: "Every 5 minutes" },
    ],
    walking: [
      { name: "Arm Swing Walking", description: "Walk briskly, allowing natural arm swing to mobilise shoulders.", reps: "20 minutes" },
      { name: "Walking with Shoulder Rolls", description: "During walk, periodically roll shoulders forward and backward.", reps: "10 rolls every 5 minutes" },
      { name: "Nordic Walking", description: "Poles engage shoulders and upper body while reducing lower joint load.", reps: "20 minutes" },
    ],
    "tai-chi": [
      { name: "Wave Hands Like Clouds", description: "Slow arm movements across body, rotating through shoulders.", reps: "3-5 minutes" },
      { name: "Opening & Closing", description: "Slowly open arms wide, then bring together. Mobilises shoulder joints.", reps: "10 repetitions" },
      { name: "Brush Arm Past Knee", description: "Flowing arm movements that gently rotate the shoulder.", reps: "8 each side" },
    ],
    pilates: [
      { name: "Arm Circles", description: "Lying on back, arms up, make small circles. Builds rotator cuff.", reps: "10 each direction" },
      { name: "Chest Expansion", description: "Kneeling or standing, pull arms back, squeeze shoulder blades.", reps: "10 repetitions" },
      { name: "Side Arm Reach", description: "Side-lying, reach arm up and over head in an arc.", reps: "8 each side" },
    ],
    stretching: [
      { name: "Cross-Body Stretch", description: "Pull one arm across chest with the other hand.", reps: "Hold 20 seconds each" },
      { name: "Doorway Stretch", description: "Place forearm on doorframe, lean through gently.", reps: "Hold 20 seconds each side" },
      { name: "Pendulum Swing", description: "Lean forward, let affected arm hang, swing gently in circles.", reps: "1 minute each direction" },
    ],
    "strength-training": [
      { name: "Resistance Band External Rotation", description: "Elbow at side, rotate forearm outward against band.", reps: "3 × 10 each arm" },
      { name: "Wall Push-Ups", description: "Stand arm's length from wall, push away. Builds shoulder strength gently.", reps: "3 × 10" },
      { name: "Light Lateral Raise", description: "Very light weights or no weight, raise arms to side to shoulder height.", reps: "3 × 8" },
    ],
  },
  hand: {
    swimming: [
      { name: "Water Fist Squeezes", description: "Submerge hands, open and close fists against water resistance.", reps: "3 × 15" },
      { name: "Finger Spread in Water", description: "Spread fingers wide underwater, close. Water provides gentle resistance.", reps: "3 × 10" },
      { name: "Wrist Rotations in Water", description: "Submerge wrists, rotate slowly in each direction.", reps: "10 each direction" },
    ],
    yoga: [
      { name: "Finger Stretches", description: "Spread all fingers wide, hold, then make a fist. Repeat.", reps: "10 repetitions" },
      { name: "Prayer Pose", description: "Press palms together at chest, slowly lower hands keeping palms pressed.", reps: "Hold 15 seconds × 3" },
      { name: "Wrist Flexion Stretch", description: "Extend arm, use other hand to gently pull fingers back.", reps: "Hold 15 seconds each hand" },
    ],
    cycling: [
      { name: "Padded Glove Cycling", description: "Use padded cycling gloves to reduce vibration and hand pressure.", reps: "During any ride" },
      { name: "Grip Switches", description: "Change grip position on handlebars every few minutes.", reps: "Every 3-5 minutes" },
      { name: "Finger Extensions on Bars", description: "Periodically straighten all fingers while resting on bars.", reps: "10 repetitions every 5 minutes" },
    ],
    walking: [
      { name: "Walking Ball Squeeze", description: "Carry a soft stress ball, squeeze gently while walking.", reps: "10 squeezes each hand" },
      { name: "Finger Counting Walk", description: "While walking, touch each finger to thumb in sequence.", reps: "3 rounds each hand" },
      { name: "Wrist Circles While Walking", description: "Rotate wrists gently during your walk.", reps: "10 each direction" },
    ],
    "tai-chi": [
      { name: "Silk Reeling Hands", description: "Slow, circular hand movements characteristic of tai chi.", reps: "2-3 minutes" },
      { name: "Gathering Chi", description: "Cup hands as if holding a ball, rotate slowly.", reps: "1-2 minutes" },
      { name: "Finger Tapping Meditation", description: "Tap each finger to thumb slowly and mindfully.", reps: "3 rounds" },
    ],
    pilates: [
      { name: "Towel Squeeze", description: "Roll a small towel, squeeze with fingers.", reps: "3 × 10 each hand" },
      { name: "Finger Lifts", description: "Place hand flat on table, lift each finger individually.", reps: "5 lifts per finger" },
      { name: "Putty Pinch", description: "Use therapy putty to pinch and squeeze, building grip strength.", reps: "5 minutes" },
    ],
    stretching: [
      { name: "Finger Fan Stretch", description: "Spread all fingers as wide as possible, hold.", reps: "Hold 10 seconds × 5" },
      { name: "Thumb Stretch", description: "Gently pull thumb away from palm, hold.", reps: "Hold 15 seconds each hand" },
      { name: "Table Top Stretch", description: "Place palm flat on table, gently straighten fingers.", reps: "Hold 20 seconds each hand" },
    ],
    "strength-training": [
      { name: "Grip Strengthener", description: "Use a spring-loaded grip strengthener on lowest setting.", reps: "3 × 10 each hand" },
      { name: "Rubber Band Finger Extensions", description: "Place rubber band around fingertips, spread fingers against resistance.", reps: "3 × 10" },
      { name: "Wrist Curls (Light)", description: "Very light weight, curl wrist up and down.", reps: "3 × 10 each wrist" },
    ],
  },
  back: {
    swimming: [
      { name: "Backstroke", description: "Gentle backstroke extends and mobilises the spine with water support.", reps: "10 minutes" },
      { name: "Water Walking", description: "Walk in waist-deep water, allowing natural trunk rotation.", reps: "5-10 minutes" },
      { name: "Floating Stretch", description: "Float on back (with noodle if needed), letting spine decompress.", reps: "3-5 minutes" },
    ],
    yoga: [
      { name: "Cat-Cow Stretch", description: "On all fours, alternate arching and rounding the spine.", reps: "10 repetitions" },
      { name: "Child's Pose", description: "Kneel, sit back on heels, reach arms forward. Decompresses spine.", reps: "Hold 30 seconds" },
      { name: "Supine Twist", description: "Lying on back, drop both knees to one side. Gentle spinal rotation.", reps: "Hold 20 seconds each side" },
    ],
    cycling: [
      { name: "Recumbent Bike", description: "Recumbent position supports the back fully while cycling.", reps: "15-20 minutes" },
      { name: "Upright Bike (Short Sessions)", description: "Short upright cycling sessions with good posture.", reps: "10-15 minutes" },
      { name: "Spin Breaks", description: "Stop every 10 minutes to stand and gently extend back.", reps: "30-second break" },
    ],
    walking: [
      { name: "Posture-Focused Walking", description: "Walk tall, chin level, shoulders relaxed, engaging core.", reps: "20-30 minutes" },
      { name: "Gentle Hill Walking", description: "Mild inclines engage back extensors and core.", reps: "15-20 minutes" },
      { name: "Walking with Core Engagement", description: "Gently draw navel toward spine while walking.", reps: "20 minutes" },
    ],
    "tai-chi": [
      { name: "Standing Meditation", description: "Stand with soft knees, spine neutral, arms relaxed.", reps: "5 minutes" },
      { name: "Waist Turning", description: "Rotate trunk left and right slowly, arms following.", reps: "2-3 minutes" },
      { name: "Cloud Hands", description: "Shifting weight with gentle trunk rotation.", reps: "3-5 minutes" },
    ],
    pilates: [
      { name: "Pelvic Tilt", description: "Lying on back, flatten lower back into floor, then release.", reps: "3 × 10" },
      { name: "Swimming (Pilates)", description: "Lying face down, alternate lifting opposite arm and leg.", reps: "3 × 10 each side" },
      { name: "Spine Stretch Forward", description: "Sit tall, feet apart, roll forward through spine gently.", reps: "8 repetitions" },
    ],
    stretching: [
      { name: "Knee-to-Chest Stretch", description: "Lying on back, pull one knee gently toward chest.", reps: "Hold 20 seconds each leg" },
      { name: "Seated Spinal Twist", description: "Sit cross-legged, twist gently to one side, hold.", reps: "Hold 20 seconds each side" },
      { name: "Standing Extension", description: "Place hands on lower back, gently lean back.", reps: "Hold 10 seconds × 3" },
    ],
    "strength-training": [
      { name: "Bird Dog", description: "On all fours, extend opposite arm and leg simultaneously.", reps: "3 × 8 each side" },
      { name: "Dead Bug", description: "Lying on back, extend opposite arm and leg while keeping core engaged.", reps: "3 × 8 each side" },
      { name: "Resistance Band Row", description: "Seated, loop band around feet, pull toward waist. Strengthens back.", reps: "3 × 10" },
    ],
  },
  ankle: {
    swimming: [
      { name: "Ankle Circles in Water", description: "Hold pool edge, rotate each ankle slowly in water.", reps: "10 each direction" },
      { name: "Toe Raises in Water", description: "Stand in shallow water, rise onto toes, lower slowly.", reps: "3 × 10" },
      { name: "Kick Board Kicks", description: "Hold kickboard, flutter kick gently to mobilise ankles.", reps: "5 minutes" },
    ],
    yoga: [
      { name: "Ankle Rotations", description: "Seated, lift one foot and rotate ankle slowly.", reps: "10 each direction" },
      { name: "Downward Dog (Modified)", description: "From all fours, lift hips, press heels toward floor gently.", reps: "Hold 15-20 seconds" },
      { name: "Toes Pose", description: "Kneel with toes tucked under, sit back gently. Stretches foot.", reps: "Hold 15 seconds" },
    ],
    cycling: [
      { name: "Low-Resistance Pedalling", description: "Light cycling allows ankle joints to move through full range.", reps: "15 minutes" },
      { name: "Toe-Clip Cycling", description: "Use toe clips to encourage full ankle range during pedalling.", reps: "15 minutes" },
      { name: "Single-Leg Pedalling", description: "Unclip one foot, pedal with one leg to focus on ankle motion.", reps: "2 minutes each leg" },
    ],
    walking: [
      { name: "Flat Surface Walking", description: "Walk on smooth, flat surfaces to reduce ankle stress.", reps: "20-30 minutes" },
      { name: "Heel-Toe Walking", description: "Walk deliberately heel-to-toe to improve ankle range of motion.", reps: "3 × 1 minute" },
      { name: "Sand Walking", description: "Walking on sand (if available) gently challenges ankle stability.", reps: "10-15 minutes" },
    ],
    "tai-chi": [
      { name: "Rocking on Feet", description: "Slowly shift weight from heels to toes and back.", reps: "2 minutes" },
      { name: "Single-Leg Stand", description: "Stand on one foot, focus on ankle stability.", reps: "15 seconds each foot × 3" },
      { name: "Stepping Movements", description: "Slow, deliberate tai chi steps focusing on ankle placement.", reps: "3-5 minutes" },
    ],
    pilates: [
      { name: "Pointed and Flexed Feet", description: "Sitting or lying, alternate pointing and flexing feet.", reps: "3 × 10" },
      { name: "Ankle Alphabet", description: "Lift foot, trace the alphabet with big toe.", reps: "Full alphabet each foot" },
      { name: "Toe Scrunches", description: "Place a towel on floor, scrunch it toward you with toes.", reps: "3 × 10" },
    ],
    stretching: [
      { name: "Calf Stretch", description: "Lean against wall, one foot back, press heel into floor.", reps: "Hold 20 seconds each" },
      { name: "Ankle Dorsiflexion Stretch", description: "Kneel with one foot flat, lean knee forward over toes.", reps: "Hold 15 seconds each" },
      { name: "Towel Pull Stretch", description: "Sit with leg extended, loop towel around ball of foot, pull gently.", reps: "Hold 20 seconds each" },
    ],
    "strength-training": [
      { name: "Calf Raises", description: "Stand on flat ground, rise onto toes slowly, lower.", reps: "3 × 12" },
      { name: "Resistance Band Dorsiflexion", description: "Loop band around foot, pull toes toward shin against resistance.", reps: "3 × 10 each foot" },
      { name: "Balance Board", description: "Stand on a wobble board for ankle stability training.", reps: "1-2 minutes × 3" },
    ],
  },
};

const safetyTipsMap: Record<Exercise, string[]> = {
  swimming: ["Start with just 10-15 minutes and build up gradually", "Warm water pools (28-32°C) are ideal for arthritic joints", "Avoid butterfly stroke — it's too demanding on most joints", "Wear aqua shoes for grip on pool sides"],
  yoga: ["Use props — blocks, straps, and cushions to support joints", "Never force a stretch past mild discomfort", "Tell your instructor about your arthritis beforehand", "Modified poses are real poses — skip anything painful"],
  cycling: ["Adjust seat height so knee has a slight bend at the bottom of the pedal stroke", "Start with low or no resistance", "Stop if you feel sharp or sudden pain", "Recumbent bikes offer more support for back and hips"],
  walking: ["Wear supportive, cushioned shoes — replace every 500 miles", "Walk on flat, even surfaces to reduce joint stress", "Use walking poles for extra stability and reduced joint load", "Walk during the warmest part of the day in cold weather"],
  "tai-chi": ["Movements should be slow and controlled — never rushed", "Keep knees soft — never lock them", "Start with a beginners' class or online session", "Practice on a flat, non-slippery surface"],
  pilates: ["Let your instructor know about affected joints", "Avoid any exercises that cause sharp pain", "Focus on controlled, small movements — quality over range", "Mat pilates with props is often better than reformer for arthritis"],
  stretching: ["Never bounce — use slow, sustained holds", "Stretch after a warm shower or bath for best results", "A little discomfort is OK; sharp pain is not", "Hold each stretch for at least 15-20 seconds"],
  "strength-training": ["Start with bodyweight or resistance bands — avoid heavy weights", "Pain during exercise means stop and modify", "Allow 48 hours between strength sessions for the same muscle group", "Focus on proper form over number of repetitions"],
};

const whenToAvoidMap: Record<Exercise, string[]> = {
  swimming: ["During an active flare — rest and let it settle first", "If you have open wounds or skin infections", "If chlorine irritates your skin significantly"],
  yoga: ["During severe flares — wait until inflammation subsides", "If any pose causes sharp, shooting pain", "Hot yoga — excess heat can worsen some inflammatory conditions"],
  cycling: ["During a knee or hip flare with significant swelling", "If you cannot maintain proper bike posture without pain", "In extreme cold without proper warm-up"],
  walking: ["During severe foot, ankle, or knee flares", "On uneven or icy surfaces that increase fall risk", "If weight-bearing causes sharp pain — try swimming instead"],
  "tai-chi": ["If standing causes significant pain — try seated tai chi instead", "During balance-affecting flares — use a chair for support"],
  pilates: ["During acute spinal or core-area flares", "If you cannot get up from and down to the floor — try chair pilates"],
  stretching: ["During acute flares with hot, red, swollen joints", "If stretching increases pain rather than relieving it"],
  "strength-training": ["During active flares in the targeted muscle/joint area", "If you experience joint instability during the exercise", "If you've recently had joint surgery — get physiotherapist clearance first"],
};

export function generateExerciseJointPages(): ExerciseJointPage[] {
  const pages: ExerciseJointPage[] = [];
  for (const exercise of exercises) {
    for (const joint of joints) {
      const ex = exerciseLabels[exercise];
      const jo = jointLabels[joint];
      pages.push({
        slug: `${exercise}-for-${joint}-arthritis`,
        exercise: ex,
        joint: jo,
        title: `${ex} for ${jo} Arthritis — Exercises, Benefits & Safety Tips`,
        metaDescription: `Discover how ${ex.toLowerCase()} can help manage ${jo.toLowerCase()} arthritis. Step-by-step exercises, benefits, and safety tips from UK physiotherapy guidance.`,
        intro: `${ex} is one of the most recommended activities for managing ${jo.toLowerCase()} arthritis. It helps reduce stiffness, strengthen the muscles around the ${jo.toLowerCase()} joint, and improve your overall mobility — all with minimal joint impact. This guide provides step-by-step exercises, benefits, and safety considerations specifically for ${jo.toLowerCase()} arthritis, based on UK physiotherapy guidelines.`,
        benefits: benefitsMap[exercise],
        instructions: jointInstructions[joint][exercise],
        safetyTips: safetyTipsMap[exercise],
        whenToAvoid: whenToAvoidMap[exercise],
      });
    }
  }
  return pages;
}

export const exerciseJointPages = generateExerciseJointPages();
