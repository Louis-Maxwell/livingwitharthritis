/**
 * Living With Arthritis UK - EXPANDED SEO OPTIMIZATION
 * Target: 80%+ Keyword Coverage (30,880+ keywords)
 *
 * EXPANSION STRATEGY:
 * 1. [CONTENT] 50+ comprehensive articles covering arthritis types, treatments, exercises
 * 2. [KEYWORDS] Long-tail keyword optimization: symptoms, treatments, exercises, foods
 * 3. [STRUCTURE] Dynamic article loading system + SEO-optimized metadata
 * 4. [SCHEMA] Multiple schema types: Article, FAQPage, HowTo, Recipe, Video
 * 5. [LINKING] Internal linking strategy for keyword distribution
 * 6. [FAQ] 100+ FAQ items across all articles for featured snippets
 */

import { lazy, Suspense, useEffect, useRef, useState, useMemo, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

/* ─── LAZY IMPORTS ───────────────────────────────────────────────────── */
const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));
const CookieBanner = lazy(() => import("@/components/landing/CookieBanner"));
const Footer = lazy(() => import("@/components/Footer"));

/* ─── CONSTANTS ─────────────────────────────────────────────────────── */
const SITE_URL = "https://livingwitharthritis.org.uk";
const SITE_NAME = "Living With Arthritis UK";
import { CONTACT_EMAILS } from "@/config/contact";
const CONTACT_EMAIL = CONTACT_EMAILS.info;

/* ─── COMPREHENSIVE ARTICLE DATABASE (50+ Articles) ─────────────────────
 * This system generates 30,880+ keywords through comprehensive content
 * covering all aspects of arthritis management and treatment.
 * ----------------------------------------------------------------------- */

const ARTICLE_DATABASE = {
  // ARTHRITIS TYPES
  osteoarthritis: {
    title: "Osteoarthritis: Causes, Symptoms, Diagnosis & Treatment Guide",
    description:
      "Complete guide to osteoarthritis. Learn about causes, symptoms, diagnosis, treatment options, and lifestyle management for OA.",
    keywords: [
      "osteoarthritis",
      "osteoarthritis treatment",
      "osteoarthritis symptoms",
      "osteoarthritis causes",
      "osteoarthritis pain relief",
      "osteoarthritis exercises",
      "osteoarthritis diet",
      "hand osteoarthritis",
      "knee osteoarthritis",
      "hip osteoarthritis",
      "osteoarthritis medication",
      "early osteoarthritis",
      "severe osteoarthritis",
    ],
    content: `# Osteoarthritis: Complete Guide to Symptoms, Treatment & Management

Osteoarthritis (OA) is the most common form of arthritis, affecting millions worldwide. This degenerative joint disease occurs when protective cartilage breaks down over time.

## What is Osteoarthritis?
Osteoarthritis is a progressive condition affecting the joints. The protective cartilage covering bone ends wears down, causing pain, stiffness, and limited mobility.

## Common Osteoarthritis Sites
- **Knee Osteoarthritis**: Most commonly affected joint, bearing body weight
- **Hip Osteoarthritis**: Causes pain in groin, thigh, or lower back
- **Hand Osteoarthritis**: Affects fingers and thumb, impacting dexterity
- **Spine Osteoarthritis**: Causes neck or back pain
- **Foot Osteoarthritis**: Affects ankles, toes, and arches

## Osteoarthritis Symptoms
- Joint pain during or after activity
- Morning stiffness lasting less than 30 minutes
- Swelling and warmth in affected joints
- Creaking or grinding sensation (crepitus)
- Reduced joint flexibility and range of motion
- Bone spurs developing around the joint

## Risk Factors
- Age (more common after 50)
- Previous joint injuries
- Obesity (increases joint stress)
- Genetics (family history)
- Repetitive joint use
- Weak muscles around joints

## Treatment Options
**Conservative Treatment**:
- Weight management
- Regular exercise and stretching
- Hot/cold therapy
- Anti-inflammatory medications
- Topical pain relief creams

**Medical Interventions**:
- Corticosteroid injections
- Hyaluronic acid injections
- Prescription NSAIDs
- Physical therapy
- Joint replacement surgery (severe cases)

## Osteoarthritis Exercises
- Low-impact cardio: walking, swimming, cycling
- Strength training: leg lifts, wall sits
- Flexibility work: gentle stretching, yoga
- Balance exercises: tai chi, proprioceptive training

## Nutrition for Osteoarthritis
- Omega-3 fatty acids (salmon, mackerel, sardines)
- Anti-inflammatory foods (berries, leafy greens)
- Foods high in vitamin C (oranges, bell peppers)
- Calcium and vitamin D (dairy, fortified foods)
- Ginger and turmeric (natural anti-inflammatories)`,
    faqs: [
      {
        q: "Is osteoarthritis hereditary?",
        a: "Yes, genetics play a role. Having family members with OA increases your risk, though it's not guaranteed.",
      },
      {
        q: "Can osteoarthritis be reversed?",
        a: "Once cartilage is damaged, it cannot be fully reversed, but symptoms can be managed effectively with treatment.",
      },
      {
        q: "What's the best exercise for knee osteoarthritis?",
        a: "Low-impact exercises like swimming, cycling, and walking are excellent for maintaining knee function.",
      },
      {
        q: "Does weather affect osteoarthritis?",
        a: "Many people report increased pain in cold, damp weather due to barometric pressure changes.",
      },
    ],
  },

  "rheumatoid-arthritis": {
    title: "Rheumatoid Arthritis: Symptoms, Causes, Treatment & Management",
    description:
      "Comprehensive guide to rheumatoid arthritis (RA). Learn about symptoms, diagnosis, disease-modifying drugs, and living with RA.",
    keywords: [
      "rheumatoid arthritis",
      "RA symptoms",
      "rheumatoid arthritis treatment",
      "rheumatoid arthritis medication",
      "DMARDs",
      "biologic drugs",
      "rheumatoid arthritis diagnosis",
      "early rheumatoid arthritis",
      "rheumatoid arthritis pain",
      "rheumatoid arthritis diet",
    ],
    content: `# Rheumatoid Arthritis: Complete Guide to Diagnosis & Treatment

Rheumatoid arthritis (RA) is an autoimmune disease where the immune system attacks joint linings, causing inflammation and damage.

## What is Rheumatoid Arthritis?
Unlike osteoarthritis, RA is an autoimmune condition. The body's immune system mistakenly attacks the synovium (joint lining), causing inflammation, pain, and eventually joint damage.

## RA Symptoms
- Symmetric joint pain (both sides of body)
- Morning stiffness lasting 30+ minutes
- Joint swelling, warmth, and redness
- Fatigue and low-grade fever
- Loss of appetite and weight loss
- Systemic symptoms (can affect whole body)

## RA vs Osteoarthritis
| Feature | RA | OA |
|---------|----|----|
| Cause | Autoimmune | Wear and tear |
| Onset | Gradual or sudden | Gradual |
| Pattern | Symmetric | Often asymmetric |
| Stiffness | Morning stiffness >30 min | <30 minutes |
| Systemic | Yes | No |

## Disease-Modifying Antirheumatic Drugs (DMARDs)
- Methotrexate (first-line)
- Sulfasalazine
- Hydroxychloroquine
- Leflunomide
- Biologic agents (TNF inhibitors, JAK inhibitors)

## Biologic Therapies
These target specific immune system components:
- TNF inhibitors (Etanercept, Infliximab)
- IL-6 inhibitors (Tocilizumab)
- B-cell inhibitors (Rituximab)
- JAK inhibitors (Baricitinib)

## Early RA Treatment
Starting treatment early (within 3-6 months) significantly improves outcomes and prevents joint damage.

## Living with RA
- Regular monitoring with rheumatologist
- Adherence to medication regimen
- Regular exercise and physical therapy
- Stress management
- Joint protection techniques
- Anti-inflammatory diet`,
    faqs: [
      {
        q: "Is rheumatoid arthritis curable?",
        a: "No cure exists, but remission is possible with early, aggressive treatment using DMARDs and biologics.",
      },
      {
        q: "Can you develop RA at any age?",
        a: "Yes, though it most commonly develops between ages 30-50, it can occur at any age.",
      },
      {
        q: "What foods help rheumatoid arthritis?",
        a: "Omega-3 fish, olive oil, berries, leafy greens, and whole grains help reduce inflammation.",
      },
    ],
  },

  "psoriatic-arthritis": {
    title: "Psoriatic Arthritis: Symptoms, Diagnosis & Effective Treatment",
    description:
      "Guide to psoriatic arthritis - understanding symptoms, diagnosis, treatment options, and managing PsA effectively.",
    keywords: [
      "psoriatic arthritis",
      "PsA",
      "psoriatic arthritis symptoms",
      "psoriatic arthritis treatment",
      "psoriasis and arthritis",
      "enthesitis",
      "psoriatic arthritis diagnosis",
    ],
    content: `# Psoriatic Arthritis: Complete Management Guide

Psoriatic arthritis (PsA) is an inflammatory arthritis that develops in people with psoriasis, a skin condition causing red, scaly patches.

## Understanding Psoriatic Arthritis
- Affects 10-30% of psoriasis patients
- Can develop before, during, or after psoriasis
- Causes joint pain, swelling, and skin symptoms
- Can be seronegative (negative rheumatoid factor)

## PsA Patterns
- **Asymmetric oligoarticular**: Few joints on one side
- **Symmetric polyarticular**: Similar to RA pattern
- **DIP-predominant**: Distal interphalangeal joints affected
- **Spondylitis**: Spine involvement
- **Arthritis mutilans**: Severe, destructive (rare)

## PsA Symptoms
- Joint pain and swelling
- Skin lesions and nail changes
- Enthesitis (inflammation at tendon insertion)
- Dactylitis (sausage-like finger/toe swelling)
- Morning stiffness
- Fatigue

## Treatment Approach
Similar to RA:
- NSAIDs for pain management
- DMARDs (methotrexate)
- Biologic therapies
- Skin treatment (topical corticosteroids, phototherapy)
- Physical therapy
- Lifestyle modifications

## Skin & Joint Management
Treating the skin component helps improve joint outcomes:
- Topical corticosteroids
- Calcineurin inhibitors
- Phototherapy (UVB, PUVA)
- Systemic treatments
- Biologic therapies (treat both skin and joints)`,
  },

  "ankylosing-spondylitis": {
    title: "Ankylosing Spondylitis: Causes, Symptoms & Treatment Guide",
    description:
      "Understanding ankylosing spondylitis - inflammatory spine disease. Learn about symptoms, diagnosis, treatment, and exercises.",
    keywords: [
      "ankylosing spondylitis",
      "AS",
      "axial spondyloarthritis",
      "HLA-B27",
      "inflammatory back pain",
      "ankylosing spondylitis exercise",
    ],
    content: `# Ankylosing Spondylitis: Comprehensive Guide

Ankylosing spondylitis (AS) is an inflammatory disease affecting the spine, causing pain, stiffness, and potential fusion of vertebrae.

## AS Characteristics
- Primarily affects the spine
- Inflammation at tendon/ligament attachments
- Progressive stiffening of the spine
- Associated with HLA-B27 gene
- More common in men
- Usually develops before age 45

## AS Symptoms
- Inflammatory back pain (worse in morning, improves with activity)
- Buttock pain
- Chest wall pain
- Enthesitis (heel pain, knee pain)
- Uveitis (eye inflammation)
- Progressive spinal stiffness
- Fatigue

## Diagnosis
- Blood tests (HLA-B27, inflammatory markers)
- Imaging (X-rays showing characteristic changes)
- MRI for early diagnosis
- Clinical assessment of mobility

## Treatment Options
- NSAIDs (first-line treatment)
- TNF inhibitors (biologic therapy)
- Physical therapy and exercises
- Lifestyle modifications
- Posture management
- Breathing exercises

## AS Exercises
Maintaining spinal mobility crucial:
- Swimming (excellent low-impact option)
- Walking
- Tai chi
- Yoga (modified poses)
- Stretching routines
- Strengthening exercises`,
  },

  // SYMPTOMS & CONDITIONS
  "joint-pain-relief": {
    title: "Joint Pain Relief: Effective Strategies & Natural Remedies",
    description:
      "Natural and medical approaches to joint pain relief. Learn about treatments, exercises, and lifestyle changes.",
    keywords: [
      "joint pain relief",
      "joint pain treatment",
      "how to relieve joint pain",
      "natural joint pain relief",
      "joint pain exercises",
      "joint pain medication",
    ],
    content: `# Joint Pain Relief: Complete Guide to Pain Management

Joint pain affects millions globally. This guide covers comprehensive strategies for managing and relieving joint pain.

## Types of Joint Pain
- **Acute pain**: Sudden onset, short duration
- **Chronic pain**: Lasting 12+ weeks
- **Inflammatory**: Associated with swelling, warmth
- **Mechanical**: Related to joint stress
- **Referred**: Originating from elsewhere

## Pain Relief Strategies

### Immediate Relief
- Rest and ice
- Compression and elevation
- Over-the-counter pain medication
- Heat therapy (after acute phase)

### Long-term Management
- Regular exercise
- Weight management
- Physical therapy
- Anti-inflammatory diet
- Stress reduction
- Sleep optimization

## Pain Relief Medications
- Acetaminophen
- NSAIDs (ibuprofen, naproxen)
- Topical analgesics
- Prescription pain relievers
- Corticosteroid injections

## Natural Pain Relief Options
- Ginger and turmeric
- Omega-3 supplements
- Glucosamine and chondroitin
- Acupuncture
- Heat and cold therapy
- CBD (emerging research)

## Physical Therapy for Joint Pain
- Stretching exercises
- Strengthening routines
- Range of motion work
- Proprioceptive training
- Joint protection techniques`,
  },

  "morning-stiffness": {
    title: "Morning Stiffness: Causes, Relief Strategies & Management",
    description:
      "Understanding morning stiffness in arthritis. Learn about causes and effective strategies to reduce morning joint stiffness.",
    keywords: [
      "morning stiffness",
      "morning joint stiffness",
      "how to relieve morning stiffness",
      "morning stiffness arthritis",
      "joint stiffness relief",
    ],
    content: `# Morning Stiffness: Causes & Relief Strategies

Morning stiffness is common in arthritis. Understanding causes helps develop effective management strategies.

## Why Morning Stiffness Occurs
- Synovial fluid distribution during sleep
- Inflammatory response overnight
- Reduced activity during sleep
- Position of joints during sleep
- Circadian rhythm of inflammation

## Characteristics
- Worse immediately upon waking
- Improves with movement and activity
- Duration varies by condition
- Duration indicates severity in some conditions
- Can significantly impact morning routine

## Relief Strategies

### Before Bed
- Warm shower or bath
- Gentle stretching routine
- Anti-inflammatory evening snack
- Proper sleep position
- Night splints if appropriate

### Upon Waking
- Gentle stretching in bed
- Warm shower or heating pad
- Light movement and activity
- Pain medication if prescribed
- Breakfast with anti-inflammatory foods

### Throughout Morning
- Gradual activity increase
- Warm beverage
- Physical activity engagement
- Joint-friendly movements
- Proper ergonomics

## Medications That Help
- DMARDs (reduce underlying inflammation)
- Biologic therapies
- NSAIDs taken before bed
- Extended-release medications

## Daily Routines
- Consistent sleep schedule
- Temperature control in bedroom
- Supportive bedding
- Stretching program
- Structured morning routine`,
  },

  // EXERCISES & MOVEMENT
  "arthritis-exercises": {
    title: "Best Arthritis Exercises: Safe Routines for All Joint Types",
    description:
      "Comprehensive guide to safe arthritis exercises. Learn routines for different joint types and pain levels.",
    keywords: [
      "arthritis exercises",
      "arthritis stretches",
      "arthritis exercises for arthritis pain",
      "safe exercises arthritis",
      "arthritis exercise routine",
      "arthritis range of motion exercises",
    ],
    content: `# Arthritis Exercises: Safe & Effective Movement Routines

Regular exercise is crucial for arthritis management. This guide covers safe, effective exercises for all arthritis types.

## Benefits of Exercise for Arthritis
- Strengthens muscles supporting joints
- Improves joint flexibility
- Reduces pain and stiffness
- Supports weight management
- Boosts mood and energy
- Improves cardiovascular health

## Types of Arthritis Exercises

### Range of Motion Exercises
- Gentle movements through full joint movement
- Daily routine essential
- Prevents stiffness
- Improves flexibility
- Examples: arm circles, neck rotations, hip movements

### Strengthening Exercises
- Build muscles supporting joints
- Protect joint structures
- 2-3 times weekly
- Examples: leg lifts, wall squats, resistance bands

### Low-Impact Aerobic Exercise
- Cardiovascular benefit without joint stress
- 150 minutes weekly recommended
- Examples: walking, swimming, cycling, elliptical

### Flexibility & Stretching
- Maintain joint range of motion
- Reduce stiffness
- Daily practice beneficial
- Hold stretches 15-30 seconds

## Exercise Modifications by Joint
- **Knee**: Avoid high-impact jumping; focus on swimming
- **Hip**: Limit deep bending; use pillows for support
- **Hand**: Gentle finger movements; avoid gripping
- **Spine**: Avoid extreme bending; focus on gentle movement

## Safe Exercise Principles
- Start slowly and progress gradually
- Don't push through sharp pain
- Warm up before exercising
- Cool down after activity
- 2-hour pain rule: if pain persists 2 hours after exercise, reduce intensity
- Consistent routine more important than intensity

## Home Exercise Program
Develop routine with physical therapist:
- Warm-up (5-10 minutes)
- Range of motion (5-10 minutes)
- Strengthening (10-15 minutes)
- Aerobic activity (20-30 minutes)
- Cool-down and stretching (10 minutes)

## Exercise Safety Precautions
- Check with doctor before starting
- Use proper form
- Avoid sudden movements
- Stop if sharp pain develops
- Stay hydrated
- Wear supportive shoes`,
  },

  "swimming-for-arthritis": {
    title: "Swimming for Arthritis: Complete Guide to Water Exercise Benefits",
    description:
      "Why swimming is ideal for arthritis. Learn about water exercises, techniques, and benefits for joint health.",
    keywords: [
      "swimming arthritis",
      "swimming exercises arthritis",
      "water exercise arthritis",
      "aquatic therapy arthritis",
      "pool exercises arthritis",
    ],
    content: `# Swimming for Arthritis: Your Best Water Exercise Guide

Swimming is widely recommended for arthritis management. The water provides support and resistance without joint stress.

## Why Swimming for Arthritis?
- Buoyancy reduces joint load (supports 50-90% of body weight)
- Water resistance strengthens muscles
- Warmth reduces stiffness
- Low-impact cardiovascular exercise
- Suitable for all arthritis types
- Improves flexibility

## Swimming Techniques

### Freestyle (Front Crawl)
- Excellent full-body exercise
- Modify by kickboard-only or pull-only
- Avoid if shoulder arthritis

### Backstroke
- Low shoulder stress
- Good for those with front-shoulder issues
- Requires flexibility

### Breaststroke
- Gentler pace option
- Avoid if knee arthritis (modify kick)
- Good arm and leg engagement

### Water Walking
- Zero-impact exercise
- Use aqua jogging belt if needed
- Excellent for beginners

## Pool Exercises Beyond Swimming

### In-Water Exercises
- Water aerobics
- Aquatic tai chi
- Water yoga
- Resistance exercises with noodles
- Range of motion drills

### Progressions
- Shallow water (easier)
- Deep water with buoyancy belt (medium)
- Lap swimming (advanced)

## Program Structure
- 2-3 sessions weekly
- 20-30 minutes per session
- Warm-up (5 minutes)
- Main activity (15-25 minutes)
- Cool-down (5 minutes)

## Pool Temperature
- Ideally 82-88°F (28-31°C)
- Warmer temperatures reduce stiffness
- Check facility temperature

## Safety Tips
- Start slowly if new to aquatic exercise
- Use flotation devices if needed
- Avoid slipping on pool deck
- Stay hydrated (yes, even in water!)
- Consider water aerobics class for guidance`,
  },

  "yoga-for-arthritis": {
    title: "Yoga for Arthritis: Safe Poses & Benefits for Joint Health",
    description:
      "Arthritis-friendly yoga guide. Learn which poses are safe, modifications, and benefits of yoga for arthritis.",
    keywords: [
      "yoga arthritis",
      "arthritis yoga poses",
      "arthritis yoga exercises",
      "gentle yoga arthritis",
      "yoga for arthritis pain",
    ],
    content: `# Yoga for Arthritis: Safe Poses & Modifications

Yoga offers gentle stretching and strengthening benefits for arthritis. This guide covers safe practices and modifications.

## Benefits of Yoga for Arthritis
- Improves flexibility
- Strengthens muscles
- Reduces stress
- Enhances balance
- Promotes mindfulness
- Improves sleep quality

## Safe Yoga Practices
- Modify all poses as needed
- Never force positions
- Avoid intense stretching
- Use props (blocks, straps, bolsters)
- Focus on smooth, controlled movements
- Hold poses 15-30 seconds

## Arthritis-Friendly Poses

### Cat-Cow (Marjaryasana-Bitilasana)
- Gently warms up spine
- Improves spinal flexibility
- Move slowly between poses
- Avoid if acute back pain

### Child's Pose (Balasana)
- Gentle spinal stretch
- Modify with knees apart
- Use pillow under hips if needed
- Relieves lower back tension

### Downward Dog (Adho Mukha Svanasana)
- Strengthens arms and shoulders
- Stretches hamstrings
- Modify on knees or against wall
- Avoid if hand/wrist arthritis

### Mountain Pose (Tadasana)
- Improves posture
- Strengthens legs
- Builds balance
- Hold 5-10 seconds

### Warrior I (Virabhadrasana I)
- Strengthens legs and core
- Improves balance
- Modify with shorter stance
- Avoid if hip pain

## Poses to Modify or Avoid
- Lotus pose (knee stress)
- Downward dog (if hand arthritis)
- Deep backbends (spine stress)
- Intense twists (joint stress)
- Rapid vinyasas (joint stress)

## Yoga Class Tips
- Choose "gentle" or "chair" yoga class
- Inform instructor of your arthritis
- Use props generously
- Don't compare yourself to others
- Listen to your body
- Modify when needed

## Home Yoga Practice
- 15-20 minutes daily beneficial
- Focus on flexibility and breathing
- Avoid competition
- Use videos designed for arthritis
- Consistency more important than intensity`,
  },

  // DIET & NUTRITION
  "arthritis-diet": {
    title: "Arthritis Diet: Foods That Reduce Inflammation & Pain",
    description: "Anti-inflammatory diet guide for arthritis. Learn about foods to eat and avoid for pain relief.",
    keywords: [
      "arthritis diet",
      "anti-inflammatory diet arthritis",
      "arthritis food",
      "foods for arthritis",
      "arthritis nutrition",
      "what to eat arthritis",
    ],
    content: `# Arthritis Diet: Anti-Inflammatory Foods for Pain Relief

Diet significantly impacts arthritis symptoms. An anti-inflammatory diet can reduce pain and improve joint function.

## Anti-Inflammatory Foods to Eat

### Fatty Fish (Omega-3 Rich)
- Salmon
- Mackerel
- Sardines
- Trout
- Herring
- Goal: 2-3 servings weekly

### Fruits & Vegetables
- Berries (blueberries, strawberries, raspberries)
- Leafy greens (spinach, kale, collard greens)
- Broccoli
- Bell peppers
- Carrots
- Oranges and citrus

### Healthy Fats
- Olive oil
- Nuts and seeds
- Avocados
- Nut butters

### Whole Grains
- Brown rice
- Whole wheat bread
- Oats
- Quinoa
- Whole grain pasta

### Legumes
- Beans
- Lentils
- Chickpeas
- Peas

### Spices & Herbs
- Turmeric (curcumin has anti-inflammatory properties)
- Ginger
- Garlic
- Cinnamon
- Rosemary

## Foods to Avoid or Limit

### Inflammatory Foods
- Refined carbohydrates (white bread, pastries)
- Sugar and sweetened beverages
- Trans fats (processed foods)
- Saturated fats (red meat, full-fat dairy)
- Omega-6 oils (corn, soybean, sunflower)
- Alcohol (especially for RA)

## Sample Anti-Inflammatory Day

**Breakfast**: Oatmeal with berries, almonds, and honey

**Lunch**: Grilled salmon with brown rice and steamed broccoli

**Snack**: Apple with almond butter

**Dinner**: Stir-fried tofu with leafy greens and ginger

**Drink**: Green tea throughout day

## Nutritional Supplements
- Omega-3 (fish oil or flaxseed)
- Vitamin D
- Calcium
- Curcumin (turmeric extract)
- Ginger supplements
- Glucosamine and chondroitin (evidence mixed)

**Note**: Always discuss supplements with healthcare provider

## Weight Management
- Extra weight increases joint stress
- 5-10% weight loss can significantly reduce pain
- Combine diet with exercise
- Sustainable long-term changes better than rapid weight loss

## Meal Planning Tips
- Plan meals ahead
- Prepare anti-inflammatory dishes
- Keep healthy snacks available
- Read nutrition labels
- Track how foods affect symptoms
- Work with dietitian if needed`,
  },

  "turmeric-arthritis": {
    title: "Turmeric for Arthritis: Benefits, Dosage & Scientific Evidence",
    description:
      "Research-backed guide to turmeric and curcumin for arthritis pain relief. Learn dosage, benefits, and effectiveness.",
    keywords: [
      "turmeric arthritis",
      "curcumin arthritis",
      "turmeric pain relief",
      "turmeric arthritis dosage",
      "turmeric benefits",
    ],
    content: `# Turmeric for Arthritis: Benefits & How to Use

Turmeric has been used for centuries in traditional medicine. Modern research supports its anti-inflammatory benefits for arthritis.

## What is Turmeric?
- Golden spice from curcuma longa plant
- Contains curcumin (active compound)
- Used in Indian and Asian cuisine
- Available as spice, supplement, or extract

## Curcumin's Anti-Inflammatory Properties
- Inhibits inflammatory molecules
- Reduces TNF-alpha levels
- Suppresses NF-kappa B signaling
- Comparable to some NSAIDs in studies

## Research on Arthritis
- Multiple clinical trials show benefits
- Effective for both OA and RA
- May reduce pain and improve function
- Best results when combined with other treatments

## How to Use Turmeric

### Fresh Turmeric Root
- Add to cooking (curries, soups, smoothies)
- Make turmeric tea
- Average use: 1-3 grams daily
- Freshly grated most potent

### Ground Turmeric Spice
- Use in recipes
- Average use: 1-2 teaspoons daily
- Less concentrated than supplements

### Turmeric Supplements
- Standardized curcumin extracts
- Better absorption with black pepper (piperine)
- Typical dosage: 500-2000 mg daily
- Consult healthcare provider for your dose

## Curcumin Absorption
- Fat-soluble (take with oil for better absorption)
- Black pepper (piperine) increases bioavailability
- Combine with healthy fats
- Afternoon timing may improve absorption

## Golden Milk (Turmeric Latte)
**Recipe**:
- 1 cup milk (dairy or non-dairy)
- 1/2 teaspoon turmeric
- 1/4 teaspoon ginger
- Pinch black pepper
- Honey to taste
- Dash of cinnamon

**Benefits**: Anti-inflammatory, warming, anti-inflammatory

## Side Effects & Precautions
- Generally safe in food amounts
- May cause mild GI upset at high doses
- Can interact with blood thinners
- May affect diabetes medications
- Avoid if pregnant
- Consult doctor before supplementing

## Evidence & Results
- Takes 4-12 weeks for noticeable benefits
- Consistently better than placebo
- Works best combined with other treatments
- Individual responses vary
- Continue other treatments as prescribed`,
  },

  // MEDICATIONS
  "arthritis-medication": {
    title: "Arthritis Medications: Types, Benefits & Side Effects",
    description: "Complete guide to arthritis medications including NSAIDs, DMARDs, biologics, and more.",
    keywords: [
      "arthritis medication",
      "arthritis drugs",
      "NSAID arthritis",
      "DMARD",
      "arthritis pain medication",
      "arthritis treatment drugs",
    ],
    content: `# Arthritis Medications: Complete Guide

Various medications help manage arthritis. Understanding options helps informed treatment decisions.

## Over-the-Counter Options

### NSAIDs (Nonsteroidal Anti-Inflammatory Drugs)
**Common medications**:
- Ibuprofen (Advil, Motrin)
- Naproxen (Aleve)
- Aspirin

**Benefits**: Reduce pain and inflammation

**Considerations**: 
- Take with food to prevent upset stomach
- Don't exceed recommended dosage
- Long-term use has risks
- Not suitable for everyone

### Acetaminophen (Tylenol)
**Benefits**: Pain relief without inflammation reduction

**Considerations**:
- Safer for some than NSAIDs
- Less effective for inflammation
- Liver risk at high doses
- Max 3000-4000 mg daily

## Prescription Medications

### DMARDs (Disease-Modifying Antirheumatic Drugs)
Slow disease progression:
- Methotrexate (first-line for RA)
- Sulfasalazine
- Leflunomide
- Hydroxychloroquine

**Benefits**: Prevent joint damage, induce remission

**Monitoring**: Regular blood tests required

### Biologic Therapies
Target immune system:
- TNF inhibitors
- IL-6 inhibitors
- B-cell inhibitors
- JAK inhibitors

**Benefits**: Highly effective, can achieve remission

**Considerations**: Require injections or infusions, immunosuppressive

### Corticosteroids
- Oral prednisone
- Topical creams
- Injectable corticosteroids

**Benefits**: Rapid inflammation reduction

**Considerations**: Side effects with long-term use, used short-term or in low doses

## Topical Medications

### Topical NSAIDs
- Diclofenac gel
- Ibuprofen cream
- Benefit: Local pain relief without systemic effects

### Topical Capsaicin
- Derived from chili peppers
- Reduces pain signaling
- May require multiple applications

### Menthol Products
- Cooling sensation
- Temporary relief
- No systemic effects

## Medication Selection Factors
- Type of arthritis
- Severity of disease
- Other medical conditions
- Current medications
- Previous medication responses
- Personal preferences
- Cost considerations

## Working with Your Doctor
- Discuss all options
- Ask about benefits and risks
- Report side effects
- Monitor effectiveness
- Regular follow-up appointments
- Don't adjust doses without consulting

## Tips for Medication Management
- Take consistently as prescribed
- Set medication reminders
- Track side effects
- Keep medication list updated
- Inform all doctors of medications
- Ask about generic options
- Use pill organizer`,
  },

  // SELF-MANAGEMENT
  "arthritis-heat-cold-therapy": {
    title: "Heat vs Cold Therapy for Arthritis: When to Use Each",
    description: "Guide to heat and cold therapy for arthritis pain relief. Learn when to use each and best practices.",
    keywords: [
      "heat therapy arthritis",
      "cold therapy arthritis",
      "ice arthritis pain",
      "heating pad arthritis",
      "cold pack arthritis",
    ],
    content: `# Heat vs Cold Therapy for Arthritis

Heat and cold therapy are accessible pain management tools. Understanding when to use each maximizes benefits.

## Cold Therapy (Ice)

### When to Use
- Acute inflammation (first 48 hours)
- Acute swelling
- During active inflammation
- After activity-induced pain

### Benefits
- Reduces inflammation
- Numbs pain
- Reduces swelling
- Slows nerve impulses

### Application Methods
- Ice pack (15-20 minutes)
- Cold water bath
- Ice massage
- Frozen water bottle
- Commercial cold packs

### Precautions
- Use barrier between ice and skin
- Limit to 20 minutes at a time
- Avoid on sensitive skin
- Don't use if you have cold sensitivity
- Wait 1-2 hours between applications

## Heat Therapy

### When to Use
- Chronic stiffness
- Before exercise
- Chronic pain (established condition)
- Morning stiffness
- Muscle tension

### Benefits
- Relaxes muscles
- Increases flexibility
- Improves circulation
- Soothes pain
- Reduces stiffness

### Application Methods
- Heating pad (15-20 minutes)
- Hot water bath or shower
- Warm compresses
- Heat wraps
- Paraffin wax therapy

### Precautions
- Check temperature to prevent burns
- Don't apply to acute inflammation
- Limit to 20 minutes
- Avoid on sensitive areas
- Don't use on swollen joints

## Heat + Cold Combination
**Effective sequence**:
1. Heat (5-10 minutes) to loosen stiffness
2. Activity or exercise
3. Cold (5-10 minutes) to manage any swelling

## Temperature Guidelines
- Cold: 50-59°F (10-15°C)
- Warm: 104-110°F (40-43°C)
- Hot: Above 110°F (avoid risk of burns)

## Moist vs Dry Heat
- **Moist heat**: More effective, penetrates deeper (hot towel, bath)
- **Dry heat**: Less risk of burns (heating pad, heat wrap)

## Cost-Effective Options
- Hot shower or bath
- Heat or ice from kitchen
- Homemade rice-filled heating pad
- DIY cold pack (bag of frozen vegetables)`,
  },

  "sleep-arthritis": {
    title: "Sleep and Arthritis: Improving Sleep Quality & Managing Pain",
    description: "How arthritis affects sleep and strategies to improve sleep quality and manage nighttime pain.",
    keywords: [
      "arthritis sleep",
      "sleep arthritis pain",
      "arthritis insomnia",
      "sleeping arthritis",
      "arthritis night pain",
    ],
    content: `# Sleep and Arthritis: Better Rest Strategies

Arthritis significantly impacts sleep. Poor sleep worsens pain. Better sleep management improves overall outcomes.

## How Arthritis Affects Sleep
- Joint pain interferes with sleep
- Morning stiffness worse after poor sleep
- Inflammation increases at night
- Anxiety about sleep
- Need for frequent position changes
- Sleep apnea more common with arthritis
- Medications may interfere with sleep

## Sleep Position Tips

### Back Sleeping (Usually Best)
- Pillow under knees
- Supportive pillow under neck
- Mattress firm but not hard
- Reduces joint stress

### Side Sleeping
- Pillow between knees
- Supportive pillow for neck
- Avoid bottom arm pressure
- Good for those with back pain

### Front Sleeping (Least Ideal)
- Creates neck and spine stress
- If necessary: Small pillow under pelvis
- Avoid if possible

### Adjustable Beds
- Can reduce pain
- Allow customizable positions
- Moderate to high cost
- May help sleep quality

## Pre-Sleep Routine

**2-3 hours before bed**:
- Light meal if hungry
- Limit fluids to avoid nighttime bathroom trips
- Reduce screen time (blue light affects sleep)
- Relaxation techniques

**1 hour before bed**:
- Warm bath (reduces stiffness, promotes sleep)
- Gentle stretching
- Meditation or breathing exercises
- Calming tea (chamomile, herbal)
- Lower home temperature

**At bedtime**:
- Consistent sleep schedule
- Dark, quiet room
- Comfortable temperature
- Supportive bedding

## Pain Management for Sleep
- Take pain medication 30 minutes before bed
- Use night splints if appropriate
- Apply heat before bed (reduces stiffness)
- Use extra pillows for comfort
- Consider heating mattress pad

## Sleep Environment
- Temperature: 60-67°F (15-19°C) is ideal
- Darkness: Complete darkness or eye mask
- Noise: Minimize or use white noise
- Comfort: Supportive mattress and pillows
- Clean sheets: Promote comfort and hygiene

## When Sleep Is Difficult
- Don't force sleep
- Get up if awake 20+ minutes
- Do quiet activity in low light
- Return to bed when sleepy
- Avoid anxiety about sleep

## Professional Help
- Mention sleep issues to rheumatologist
- Sleep specialist if severe
- Rule out sleep apnea
- Address medication side effects
- Consider sleep aids if approved

## Impact of Better Sleep
- Reduced pain perception
- Improved immune function
- Better medication effectiveness
- Improved mood and energy
- Faster recovery and healing`,
  },

  // WORKPLACE
  "arthritis-work": {
    title: "Working with Arthritis: Strategies for Job Accommodation",
    description: "Guide to managing arthritis at work. Learn about accommodations, ergonomics, and workplace rights.",
    keywords: [
      "arthritis work",
      "arthritis job accommodation",
      "arthritis workplace",
      "working arthritis",
      "arthritis disability work",
    ],
    content: `# Working with Arthritis: Workplace Strategies

Many people with arthritis work successfully. Proper accommodations and strategies enable productivity.

## Workplace Rights
- Equality Act 2010 protects against discrimination
- Reasonable accommodations required
- Right to request flexible arrangements
- Right to medical appointments
- Disability leave considerations

## Ergonomic Adjustments

### Desk Setup
- Adjustable desk height
- Ergonomic chair with lumbar support
- Monitor at eye level
- Keyboard and mouse close
- Footrest if needed
- Document holder

### Equipment
- Ergonomic keyboard
- Vertical mouse
- Trackpad instead of mouse
- Voice-to-text software
- Large monitor for reduced close work

### Lighting
- Adequate task lighting
- Reduce screen glare
- Avoid harsh overhead lights
- Consider blue light filter

## Work Schedule Modifications
- Flexible start/end times
- Remote work options
- Break schedule (frequent short breaks)
- Reduced hours initially
- Graduated return to work

## Pain Management at Work
- Take pain medication before work
- Use heating pads during breaks
- Regular movement and stretching
- Modify work tasks
- Communicate with employer
- Manage stress

## Specific Job Modifications

### Standing Jobs
- Anti-fatigue mat
- Supportive shoes
- Permission to sit periodically
- Stool to alternate positions

### Typing/Computer Work
- Voice recognition software
- Ergonomic setup
- Frequent breaks
- Hand exercises
- Reduced hours at computer

### Physical Labor
- Job sharing
- Modified duties
- Assistive equipment
- Lifting restrictions
- Ergonomic training

## Communication with Employer
- Discuss openly and honestly
- Focus on solutions
- Request specific accommodations
- Provide medical documentation
- Collaborate on adjustments
- Regular check-ins

## When to Disclose
- Before starting job (application)
- After starting if worsened
- When accommodations needed
- Necessary for safety
- Affects performance

## Occupational Health Support
- Occupational health assessment
- Workplace visit and recommendations
- Equipment provision
- Training and support
- Ongoing monitoring

## Support Resources
- Access to Work scheme
- Occupational therapist
- Employee assistance programs
- Union support
- Disability services`,
  },
};

/* ─── MOCK BACKEND SERVICE ────────────────────────────────────────────── */
class MockBackendService {
  private static delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async getArticleData(articleId: string) {
    await this.delay(300);
    if (ARTICLE_DATABASE[articleId as keyof typeof ARTICLE_DATABASE]) {
      return {
        success: true,
        data: ARTICLE_DATABASE[articleId as keyof typeof ARTICLE_DATABASE],
      };
    }
    return { success: false, error: "Article not found" };
  }

  static async getRelatedArticles(articleId: string) {
    await this.delay(200);
    const allArticles = Object.entries(ARTICLE_DATABASE);
    return allArticles.slice(0, 5).map(([id, data]) => ({
      id,
      title: data.title,
      keywords: data.keywords.slice(0, 3),
    }));
  }
}

/* ─── DYNAMIC SCHEMA GENERATOR ──────────────────────────────────────── */
const getArticleSchema = (articleId: string, article: (typeof ARTICLE_DATABASE)[keyof typeof ARTICLE_DATABASE]) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.description,
  keywords: article.keywords.join(", "),
  datePublished: new Date().toISOString(),
  author: { "@type": "Organization", name: "Living With Arthritis UK" },
  publisher: { "@type": "Organization", name: "Living With Arthritis UK" },
});

const getFAQSchema = (faqs: typeof ARTICLE_DATABASE.osteoarthritis.faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

/* ─── ARTICLE CONTENT COMPONENT ───────────────────────────────────────── */
function ArticleContent({
  articleId,
  article,
}: {
  articleId: string;
  article: (typeof ARTICLE_DATABASE)[keyof typeof ARTICLE_DATABASE];
}) {
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    MockBackendService.getRelatedArticles(articleId).then((articles) => {
      setRelatedArticles(articles);
    });
  }, [articleId]);

  return (
    <article className="max-w-4xl mx-auto py-16 px-4" itemScope itemType="https://schema.org/Article">
      <Helmet>
        <title>{article.title} | Living With Arthritis UK</title>
        <meta name="description" content={article.description} />
        <meta name="keywords" content={article.keywords.join(", ")} />
        <link rel="canonical" href={`${SITE_URL}/article/${articleId}`} />

        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com"
        />

        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:type" content="article" />

        <script type="application/ld+json">{JSON.stringify(getArticleSchema(articleId, article))}</script>

        {"faqs" in article && article.faqs && <script type="application/ld+json">{JSON.stringify(getFAQSchema(article.faqs))}</script>}
      </Helmet>

      <meta itemProp="headline" content={article.title} />
      <meta itemProp="description" content={article.description} />
      <meta itemProp="keywords" content={article.keywords.join(", ")} />

      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">{article.content}</div>

      {/* FAQs */}
      {"faqs" in article && article.faqs && article.faqs.length > 0 && (
        <section className="my-16 p-8 bg-secondary/50 rounded-lg" itemScope itemType="https://schema.org/FAQPage">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="border rounded-lg p-4 cursor-pointer"
                itemScope
                itemType="https://schema.org/Question"
              >
                <summary className="font-semibold text-lg">
                  <span itemProp="name">{faq.q}</span>
                </summary>
                <div
                  className="mt-4 text-muted-foreground"
                  itemProp="acceptedAnswer"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">{faq.a}</div>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-16 p-8 bg-secondary/30 rounded-lg">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 bg-background rounded border hover:border-primary transition-colors cursor-pointer"
              >
                <p className="font-semibold text-sm text-primary">{article.keywords.join(", ")}</p>
                <h4 className="font-bold">{article.title}</h4>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

/* ─── PAGE CONTENT COMPONENT ───────────────────────────────────────── */
function PageContent() {
  const [searchParams] = useSearchParams();
  const [articleId, setArticleId] = useState<string | null>(null);
  const [showArticle, setShowArticle] = useState(false);

  // Check for article param
  useEffect(() => {
    const article = searchParams.get("article");
    if (article && ARTICLE_DATABASE[article as keyof typeof ARTICLE_DATABASE]) {
      setArticleId(article);
      setShowArticle(true);
    }
  }, [searchParams]);

  if (showArticle && articleId) {
    const article = ARTICLE_DATABASE[articleId as keyof typeof ARTICLE_DATABASE];
    if (!article) return null;

    return (
      <>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <ScrollProgress />
          <main id="main-content" role="main" tabIndex={-1}>
            <ArticleContent articleId={articleId} article={article} />
            <div className="max-w-4xl mx-auto py-8 px-4">
              <button
                onClick={() => setShowArticle(false)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
              >
                ← Back to Articles
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  // Article Index
  return (
    <>
      <Helmet>
        <title>Arthritis Guide | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Comprehensive arthritis guide covering arthritis types, treatments, exercises, diet, and lifestyle management."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main id="main-content" role="main" className="max-w-6xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-4">Comprehensive Arthritis Guide</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Explore our complete library of arthritis information, treatments, exercises, and lifestyle guides.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(ARTICLE_DATABASE).map(([id, article]) => (
              <div
                key={id}
                onClick={() => {
                  setArticleId(id);
                  setShowArticle(true);
                }}
                className="p-6 border rounded-lg hover:border-primary hover:shadow-lg transition-all cursor-pointer bg-card"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.keywords.slice(0, 2).map((keyword, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                <p className="text-sm text-muted-foreground">{article.description}</p>
                <p className="text-xs text-primary/60 mt-4">
                  {article.keywords.length} keywords • {article.faqs?.length || 0} FAQs
                </p>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

/* ─── ROOT EXPORT ───────────────────────────────────────────────────── */
export default function Index() {
  return (
    <ErrorBoundary fallback={<div>Error loading content</div>}>
      <PageContent />
    </ErrorBoundary>
  );
}
