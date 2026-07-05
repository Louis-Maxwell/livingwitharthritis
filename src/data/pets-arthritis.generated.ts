// AUTO-GENERATED — Pet arthritis articles (dogs, cats, llamas/alpacas, horses)
// Images: Unsplash (free licence). Replace with owned photos when available.

export interface PetImage { url: string; alt: string; caption: string; }
export interface PetSection { heading: string; body: string; }
export interface PetFaq { q: string; a: string; }
export interface PetArticle {
  slug: string; title: string; species: string; summary: string;
  images: PetImage[]; sections: PetSection[]; warning: string; faqs: PetFaq[];
}

export const PET_ARTICLES: PetArticle[] = [
  {
    "slug": "arthritis-in-dogs",
    "title": "Arthritis in Dogs: Signs, Treatment & Daily Care",
    "species": "Dogs",
    "summary": "Around 80% of dogs over 8 show signs of arthritis. Learn the early warning signs, what your vet can offer (from supplements to Librela), and simple home changes that make a big difference.",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=75",
        "alt": "Senior dachshund resting on a soft bed",
        "caption": "Long-backed and large breeds are at higher risk of joint problems."
      },
      {
        "url": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=75",
        "alt": "Golden retriever on a gentle walk in the park",
        "caption": "Little-and-often walks beat one long weekend hike for arthritic joints."
      },
      {
        "url": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=75",
        "alt": "Dog being examined by a veterinarian",
        "caption": "Your vet can grade arthritis and build a stepped treatment plan."
      }
    ],
    "sections": [
      {
        "heading": "Early signs owners miss",
        "body": "Dogs hide pain well. Look for: slowing on walks, hesitating at stairs or the car boot, stiffness after rest that eases with movement, licking one joint, reluctance to jump on the sofa, and irritability when touched. Limping is a late sign \u2014 by the time a dog visibly limps, arthritis is usually well established."
      },
      {
        "heading": "Weight is treatment number one",
        "body": "Every excess kilogram multiplies load through your dog's joints. In overweight arthritic dogs, weight loss alone can reduce lameness as much as medication. Ask your vet for your dog's body condition score (BCS) and a target weight; feed to that target, not the bowl."
      },
      {
        "heading": "What your vet can offer",
        "body": "A stepped plan usually starts with weight and exercise adjustment plus a quality joint supplement (glucosamine, chondroitin, green-lipped mussel, omega-3). If signs persist, prescription options include dog-specific NSAIDs (meloxicam, carprofen) and Librela \u2014 a monthly antibody injection licensed in the UK that many owners report transforms mobility. Physiotherapy and hydrotherapy are increasingly available for dogs too."
      },
      {
        "heading": "Home adaptations that help today",
        "body": "Non-slip runners on hard floors, a ramp for the car or sofa, a warm orthopaedic bed away from draughts, raised food and water bowls for large breeds, and keeping nails short all reduce daily joint strain. Little-and-often exercise (three 15-minute walks beats one 45-minute hike) keeps joints moving without overload."
      }
    ],
    "warning": "Never give your dog human painkillers. Paracetamol and ibuprofen are toxic to dogs and can be fatal. Only use medication prescribed by your vet.",
    "faqs": [
      {
        "q": "Which dog breeds get arthritis most?",
        "a": "Labradors, Golden Retrievers, German Shepherds, Rottweilers and other large breeds are most affected, plus long-backed breeds like Dachshunds. But any dog can develop arthritis, especially after joint injury or with excess weight."
      },
      {
        "q": "Should I walk my arthritic dog less?",
        "a": "No \u2014 movement keeps joints healthy. Switch to shorter, more frequent, consistent walks on soft ground. Avoid ball-chasing and sudden twisting games, which spike joint load."
      },
      {
        "q": "Is Librela worth it?",
        "a": "Many UK owners report significant improvement. It's a monthly vet-administered injection (roughly \u00a350-80/month). Discuss with your vet whether your dog is a good candidate \u2014 response varies."
      }
    ]
  },
  {
    "slug": "arthritis-in-cats",
    "title": "Arthritis in Cats: The Silent Condition",
    "species": "Cats",
    "summary": "Up to 90% of cats over 12 have arthritic changes on X-ray, yet most are never diagnosed \u2014 cats mask pain superbly. Here's how to spot it and what genuinely helps.",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=75",
        "alt": "Senior tabby cat resting on a windowsill",
        "caption": "Cats rarely limp \u2014 they simply stop doing things that hurt."
      },
      {
        "url": "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800&q=75",
        "alt": "Cat stepping carefully down from furniture",
        "caption": "Hesitating before jumps is one of the clearest arthritis signs in cats."
      },
      {
        "url": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=75",
        "alt": "Cat being gently stroked at home",
        "caption": "Grooming changes and grumpiness when touched can signal joint pain."
      }
    ],
    "sections": [
      {
        "heading": "Why cat arthritis goes unnoticed",
        "body": "Cats don't limp the way dogs do \u2014 they modify behaviour instead. A cat with sore joints jumps less, climbs less, grooms less (look for a scurfy or matted coat over the back and hips), sleeps more, and may start missing the litter tray because climbing in hurts. Owners often put this down to 'just ageing'. It's usually pain, and it's treatable."
      },
      {
        "heading": "The five-question home check",
        "body": "Ask yourself monthly: Does my cat still jump to its favourite high spot? Use stairs freely? Groom its whole body? Play, even briefly? Get in and out of the litter tray easily? Two or more 'no' answers deserve a vet visit."
      },
      {
        "heading": "Treatment options for cats",
        "body": "Weight management matters just as much as in dogs. Vet options include cat-licensed NSAIDs (meloxicam oral suspension is widely used long-term at low dose with monitoring) and Solensia \u2014 the feline equivalent of Librela, a monthly antibody injection licensed in the UK. Joint supplements formulated for cats can help as part of the plan."
      },
      {
        "heading": "Make your home arthritis-friendly",
        "body": "Provide steps or a ramp to favourite perches, a low-sided litter tray (a large storage box with a cut-down entrance works), soft warm bedding away from draughts, food and water at floor level in easy reach, and gentle daily grooming help for areas your cat can no longer reach."
      }
    ],
    "warning": "Never give your cat human painkillers. Paracetamol is extremely toxic to cats \u2014 a single tablet can be fatal. Only use medication prescribed by your vet.",
    "faqs": [
      {
        "q": "How do I know if my cat is in pain?",
        "a": "Watch behaviour, not limping: reduced jumping, less grooming, hiding more, litter tray accidents, and irritability when stroked over the back or hips are the classic signs."
      },
      {
        "q": "What is Solensia?",
        "a": "A monthly antibody injection licensed in the UK for feline arthritis pain \u2014 the cat version of the dog drug Librela. Many owners see improved jumping and activity within weeks. Discuss suitability with your vet."
      },
      {
        "q": "Can indoor cats get arthritis?",
        "a": "Yes. Age, genetics and weight matter more than lifestyle. Indoor cats are often heavier, which increases risk."
      }
    ]
  },
  {
    "slug": "arthritis-in-horses",
    "title": "Arthritis in Horses: Managing Joints for a Longer Ridden Life",
    "species": "Horses",
    "summary": "Degenerative joint disease is the leading cause of early retirement in UK horses. Early management \u2014 footcare, surfaces, warm-up and vet support \u2014 keeps horses comfortable for years longer.",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=75",
        "alt": "Horse grazing in a green paddock",
        "caption": "Consistent turnout keeps joints moving \u2014 box rest stiffens arthritic horses."
      },
      {
        "url": "https://images.unsplash.com/photo-1534773728080-33d31da27ae5?w=800&q=75",
        "alt": "Horse and rider walking calmly in an arena",
        "caption": "A long, progressive walk warm-up is the cheapest joint treatment there is."
      },
      {
        "url": "https://images.unsplash.com/photo-1450052590821-8bf91254a353?w=800&q=75",
        "alt": "Farrier working on a horse's hoof",
        "caption": "Balanced, regular farriery directly reduces abnormal joint loading."
      }
    ],
    "sections": [
      {
        "heading": "Spotting it early",
        "body": "Early equine arthritis shows as stiffness that improves with work ('warming out of it'), shortened stride, reluctance on one rein, bunny-hopping into canter, fidgeting for the farrier, or heat and mild filling around a joint after work. Hocks, coffin joints and fetlocks are most commonly affected."
      },
      {
        "heading": "Management fundamentals",
        "body": "Maximise turnout \u2014 movement is medicine and standing in a stable stiffens arthritic joints. Keep weight down (obesity is as damaging in horses as in dogs). Warm up in walk for at least 10-15 minutes before any work. Work on consistent, well-maintained surfaces and avoid repetitive small circles on the affected rein. Keep a regular farriery cycle: balanced feet directly reduce joint strain."
      },
      {
        "heading": "Veterinary options",
        "body": "Your vet may suggest oral joint supplements, prescription anti-inflammatories (phenylbutazone 'bute' remains widely used), intra-articular injections (corticosteroid, hyaluronic acid, or biologics like IRAP/arthramid), and in some cases Cartrophen courses. Many arthritic horses stay in ridden work for years with a well-managed programme."
      },
      {
        "heading": "Know when to adjust the job",
        "body": "Arthritis is progressive but manageable. Stepping down from jumping to flatwork, or from competition to hacking, often gives a horse many more happy, comfortable years. Retirement to good pasture with a companion is a kind option when ridden work is no longer comfortable."
      }
    ],
    "warning": "Always work with your vet and farrier as a team. Never medicate a horse with drugs prescribed for another animal, and be aware of competition withdrawal times for anti-inflammatories.",
    "faqs": [
      {
        "q": "Can an arthritic horse still be ridden?",
        "a": "Usually yes \u2014 appropriate, consistent, correctly warmed-up work generally helps rather than harms. Your vet can advise the right level for your horse's joints."
      },
      {
        "q": "Is box rest good for arthritis?",
        "a": "Generally no. Unlike acute injuries, arthritic joints stiffen with immobility. Most arthritic horses do best with maximum turnout and steady gentle movement."
      },
      {
        "q": "What age do horses get arthritis?",
        "a": "It's most common from mid-teens onward, but competition horses can show joint changes from as young as 8-10. Early management makes the biggest difference."
      }
    ]
  },
  {
    "slug": "arthritis-in-llamas-and-alpacas",
    "title": "Arthritis in Llamas & Alpacas: A Practical Owner's Guide",
    "species": "Llamas & Alpacas",
    "summary": "Camelids are stoic animals that hide lameness until it's advanced. Learn the subtle signs of joint disease in llamas and alpacas and the husbandry changes that keep them comfortable.",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1531928351158-2f736078e0a1?w=800&q=75",
        "alt": "Llama standing in a grassy field",
        "caption": "Camelids mask pain \u2014 watch for lying down more and lagging behind the herd."
      },
      {
        "url": "https://images.unsplash.com/photo-1589182337358-2cb63099350c?w=800&q=75",
        "alt": "Alpacas grazing together in a paddock",
        "caption": "Arthritic camelids often separate slightly from the herd and graze less widely."
      }
    ],
    "sections": [
      {
        "heading": "Signs in a stoic species",
        "body": "Llamas and alpacas rarely show obvious lameness until joint disease is advanced. Earlier clues: spending more time cushed (lying down), rising slowly or awkwardly, lagging behind the herd, reduced range while grazing, weight shifting at the standing rest, and reluctance on slopes or rough ground. Older animals and those with previous limb injuries are most at risk."
      },
      {
        "heading": "Husbandry adjustments",
        "body": "Keep body condition lean \u2014 overweight camelids load their joints heavily. Provide well-drained, even paddocks and avoid deep mud, which strains joints with every step. Ensure shelter with deep, dry bedding so animals can cush comfortably. Keep toenails trimmed on schedule: overgrown nails alter limb alignment and accelerate joint wear. Position hay and water so arthritic animals don't have to travel far or compete."
      },
      {
        "heading": "Working with your vet",
        "body": "A camelid-experienced vet can confirm arthritis by examination and X-ray. Treatment typically combines NSAIDs dosed for camelids, joint supplements, and management changes. Because llamas and alpacas are herd animals, keep an arthritic animal with at least one calm companion \u2014 isolation causes stress that worsens everything."
      }
    ],
    "warning": "Camelids metabolise drugs differently from other livestock. Never dose a llama or alpaca with medication prescribed for sheep, horses or dogs \u2014 always get camelid-specific veterinary advice.",
    "faqs": [
      {
        "q": "How long do llamas and alpacas live with arthritis?",
        "a": "With good management many live comfortably into their late teens or twenties. Weight control, footcare and dry footing make the biggest difference."
      },
      {
        "q": "Should I isolate an arthritic alpaca?",
        "a": "No \u2014 camelids are herd animals and isolation causes significant stress. Keep them with at least one calm companion, and manage feeding so they aren't pushed off hay."
      }
    ]
  },
  {
    "slug": "senior-pet-exercise-guide",
    "title": "Exercise for Arthritic Pets: Little and Often Wins",
    "species": "All pets",
    "summary": "The single most common mistake owners make is weekend-warrior exercise. Here's how to build a joint-friendly movement routine for dogs, cats and horses alike.",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=75",
        "alt": "Older dog walking slowly beside owner on a lead",
        "caption": "Consistency beats intensity: the same gentle route daily is ideal."
      },
      {
        "url": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=75",
        "alt": "Two dogs walking calmly with owner in a field",
        "caption": "Avoid high-speed chase games that twist and jar arthritic joints."
      }
    ],
    "sections": [
      {
        "heading": "The golden rule",
        "body": "Consistent, moderate, frequent movement \u2014 never boom and bust. For dogs: three short walks daily beats one long weekend hike. For cats: several short play sessions with a wand toy at ground level. For horses: daily turnout plus regular gentle ridden or in-hand work. Two days of soreness after activity means it was too much; scale back and rebuild gradually."
      },
      {
        "heading": "Warm up, especially in winter",
        "body": "Cold, stiff joints injure easily. Start every walk slowly for the first five minutes; for horses, walk 10-15 minutes before trot work. In cold weather, a coat for short-haired or elderly dogs and a quarter sheet for clipped horses keeps joint-supporting muscles warm."
      },
      {
        "heading": "Surfaces matter",
        "body": "Grass and woodland paths are kinder than pavement for dogs. For horses, consistent arena surfaces beat rutted frozen ground. Swimming and hydrotherapy (widely available for dogs in the UK, increasingly for horses) build strength with near-zero joint load."
      }
    ],
    "warning": "If your pet shows increased lameness, night restlessness or pain lasting more than 48 hours after exercise, contact your vet before continuing the routine.",
    "faqs": [
      {
        "q": "Is hydrotherapy worth it for dogs?",
        "a": "For many arthritic dogs, yes \u2014 it builds muscle that protects joints without impact. UK sessions cost \u00a325-45; some insurers cover it on vet referral."
      },
      {
        "q": "My cat won't 'exercise' \u2014 what can I do?",
        "a": "Cats exercise through play. Two or three 5-minute sessions with a wand toy kept at ground level maintain joint movement without jumping strain."
      }
    ]
  },
  {
    "slug": "pet-weight-and-joint-health",
    "title": "Pet Weight & Joint Health: The Treatment Owners Control",
    "species": "All pets",
    "summary": "Excess weight is the most powerful \u2014 and most fixable \u2014 driver of arthritis pain in pets. A practical guide to body condition scoring and safe weight loss for dogs, cats, horses and camelids.",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=75",
        "alt": "Healthy lean dog standing in profile",
        "caption": "You should feel ribs easily under a light fat cover and see a waist from above."
      },
      {
        "url": "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=75",
        "alt": "Cat at a healthy weight sitting upright",
        "caption": "Cats lose weight safely at no more than 1-2% of body weight per week."
      }
    ],
    "sections": [
      {
        "heading": "Why weight matters more than any supplement",
        "body": "In dogs, studies show weight loss of 6-9% of body weight measurably reduces lameness \u2014 an effect comparable to starting an NSAID. The mechanics are simple: less load per stride, thousands of strides per day. The same principle holds for cats, horses and camelids."
      },
      {
        "heading": "Score, don't guess",
        "body": "Use body condition scoring (BCS): for dogs and cats, you should feel ribs easily under a thin fat layer and see a waist from above. Your vet or vet nurse will score your pet free at most practices and set a target weight. Weigh monthly on the same scales."
      },
      {
        "heading": "Safe rate of loss",
        "body": "Dogs: 1-2% of body weight per week. Cats: no more than 1-2% weekly \u2014 rapid feline weight loss risks serious liver disease (hepatic lipidosis), so never crash-diet a cat. Horses: aim for gradual loss over a season with soaked hay, grazing muzzles and increased work as comfort allows. Always cut treats first; they're usually 20-30% of calories."
      }
    ],
    "warning": "Never starve or crash-diet a pet \u2014 rapid weight loss is dangerous, especially in cats. Ask your vet practice for a supervised weight clinic; most UK practices run them free with a vet nurse.",
    "faqs": [
      {
        "q": "How fast should my dog lose weight?",
        "a": "About 1-2% of body weight per week. A 30 kg Labrador losing 300-600 g weekly will reach a 4 kg target in roughly 2-3 months."
      },
      {
        "q": "What's the easiest first step?",
        "a": "Measure meals with digital scales instead of a scoop, and swap treats for part of the daily food ration or vegetables like carrot (dogs). Measuring alone typically cuts 10-20% of calories."
      }
    ]
  },
  {
    "slug": "home-adaptations-for-arthritic-pets",
    "title": "Home Adaptations for Arthritic Pets: 15 Cheap Changes That Work",
    "species": "All pets",
    "summary": "Ramps, rugs, raised bowls and warm beds \u2014 small changes around the home dramatically reduce daily joint strain for arthritic dogs and cats.",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=800&q=75",
        "alt": "Dog resting comfortably on a thick orthopaedic bed",
        "caption": "A supportive orthopaedic bed in a draught-free spot pays for itself in comfort."
      },
      {
        "url": "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800&q=75",
        "alt": "Cat using low steps to reach a sofa",
        "caption": "Steps or a ramp let cats keep their favourite high spots without painful jumps."
      }
    ],
    "sections": [
      {
        "heading": "Flooring and traction",
        "body": "Slipping on laminate or tile is both painful and dangerous for arthritic pets. Lay non-slip runners along main routes, add a mat where your pet eats and drinks, and keep claws and foot fur trimmed for grip. Toe grips (small rubber rings for dog claws) help dogs that still slip."
      },
      {
        "heading": "Beds, warmth and rest",
        "body": "An orthopaedic memory-foam bed with a low entry lip, placed away from draughts and off cold floors, reduces morning stiffness noticeably. For cats, a warm igloo bed at floor level plus a heated pad (thermostatically controlled, pet-safe) is often the most-used gift you'll ever buy."
      },
      {
        "heading": "Access without jumping",
        "body": "A car ramp saves a large dog's elbows and shoulders many times a day. Pet steps beside the sofa or bed let dogs and cats keep their favourite spots. For cats, cut a low entrance into a high-sided litter tray, and add a tray on every floor of the house."
      },
      {
        "heading": "Food, water and routine",
        "body": "Raise bowls for large dogs so they don't load sore necks and elbows. Keep water on every floor. Feed puzzle feeders at ground level for gentle mental and physical activity. Keep routines predictable \u2014 arthritic pets manage best when they can pace themselves."
      }
    ],
    "warning": "If your pet suddenly can't manage stairs, cries when handled, or drags a limb, that's beyond home adaptation \u2014 see your vet promptly.",
    "faqs": [
      {
        "q": "What single change helps most?",
        "a": "For dogs: non-slip flooring on their main routes. For cats: a low-entry litter tray on every floor. Both remove dozens of painful movements per day."
      },
      {
        "q": "Are heated beds safe for pets?",
        "a": "Yes, if designed for pets with a thermostat and chew-safe cable. They're particularly loved by arthritic cats and thin senior dogs in winter."
      }
    ]
  },
  {
    "slug": "when-to-see-the-vet-pet-arthritis",
    "title": "Pet Arthritis: When to See the Vet (Red Flags)",
    "species": "All pets",
    "summary": "Most pet arthritis can be managed at a routine appointment \u2014 but some signs need urgent attention. Know the difference.",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=75",
        "alt": "Vet examining a dog's leg in a clinic",
        "caption": "Book a routine appointment for gradual stiffness; go urgently for sudden non-weight-bearing lameness."
      },
      {
        "url": "https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=800&q=75",
        "alt": "Cat being checked over by a veterinary nurse",
        "caption": "Many UK practices run free nurse-led mobility and weight clinics."
      }
    ],
    "sections": [
      {
        "heading": "Book a routine appointment when...",
        "body": "Your pet is gradually stiffer after rest, slower on walks, jumping less, grooming less (cats), or you've noticed two or more changes on the home checks in our species guides. Gradual-onset signs suit a planned consultation where your vet can examine properly and build a stepped plan."
      },
      {
        "heading": "See a vet urgently when...",
        "body": "Your pet suddenly cannot bear weight on a limb, a joint is hot and swollen, there's a possible injury, your pet cries when touched or moved, stops eating, or a previously managed animal deteriorates rapidly. Sudden severe signs can mean fracture, ligament rupture or joint infection \u2014 all need same-day attention."
      },
      {
        "heading": "What to bring to the appointment",
        "body": "A short phone video of the stiffness or lameness at home is genuinely useful \u2014 many pets move differently (or perfectly!) in the consult room. Note when signs are worst (mornings? after exercise? cold weather?), what helps, and any products you already give, including doses."
      },
      {
        "heading": "Money worries shouldn't delay care",
        "body": "Ask about nurse-led mobility clinics (often free), payment plans, and whether your insurance covers physiotherapy or hydrotherapy on referral. UK charities including PDSA and Blue Cross provide subsidised veterinary care for owners on qualifying benefits."
      }
    ],
    "warning": "Never give any pet human painkillers while waiting for an appointment. Paracetamol and ibuprofen are toxic to dogs and cats \u2014 paracetamol can kill a cat in a single dose.",
    "faqs": [
      {
        "q": "Is limping ever an emergency?",
        "a": "Sudden non-weight-bearing lameness, a hot swollen joint, or lameness with a wound or after trauma needs same-day veterinary attention. Gradual mild stiffness suits a routine appointment."
      },
      {
        "q": "Can I get help with vet costs in the UK?",
        "a": "PDSA and Blue Cross offer subsidised care for owners on qualifying benefits. Many practices offer payment plans, and pet insurance often covers arthritis treatment if the policy predates the diagnosis."
      }
    ]
  }
];

export default PET_ARTICLES;
