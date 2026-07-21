/**
 * Multi-language UI strings for global expansion (EN/ES/FR/DE/PT).
 *
 * Source of truth is English (en-GB). Translations machine-generated
 * and reviewed for medical terminology. Mark page content as
 * "machine translation, pending native review" until a local clinician
 * reviewer (see PageSchema reviewedBy) is appointed for that locale.
 */

export type Lang = "en" | "es" | "fr" | "de" | "pt";

export const SUPPORTED_LANGS: Lang[] = ["en", "es", "fr", "de", "pt"];

export const LANG_LABELS: Record<Lang, { native: string; english: string; flag: string }> = {
  en: { native: "English", english: "English", flag: "🇬🇧" },
  es: { native: "Español", english: "Spanish", flag: "🇪🇸" },
  fr: { native: "Français", english: "French", flag: "🇫🇷" },
  de: { native: "Deutsch", english: "German", flag: "🇩🇪" },
  pt: { native: "Português", english: "Portuguese", flag: "🇵🇹" },
};

export const HREFLANG_CODES: Record<Lang, string> = {
  en: "en-GB",
  es: "es",
  fr: "fr",
  de: "de",
  pt: "pt",
};

/**
 * Base paths (English, no lang prefix) that ACTUALLY have a translated
 * route registered in App.tsx for every locale in SUPPORTED_LANGS.
 *
 * CRITICAL: only list a path here once /{lang}/{path} genuinely exists
 * as a <Route> for es, fr, de AND pt. Emitting hreflang alternates for
 * pages that don't have a real translated route creates broken links
 * that search engines crawl and flag as errors — this list exists to
 * prevent that. Currently only the homepage and the Osteoarthritis
 * condition page have full translated versions; every other page
 * (blog posts, other conditions, comparisons, city pages, glossary,
 * etc.) does NOT and must not get a hreflang cluster.
 */
export const TRANSLATED_BASE_PATHS: string[] = [
  "/",
  "/conditions/osteoarthritis",
];

type Dict = {
  nav: {
    home: string;
    conditions: string;
    exercises: string;
    diet: string;
    blog: string;
    about: string;
    donate: string;
    language: string;
  };
  common: {
    readMore: string;
    learnMore: string;
    backHome: string;
    machineTranslationNotice: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    sectionConditions: string;
    sectionExercises: string;
    sectionDiet: string;
  };
  osteoarthritis: {
    title: string;
    intro: string;
    symptomsHeading: string;
    symptoms: string[];
    managementHeading: string;
    management: string[];
  };
};

export const translations: Record<Lang, Dict> = {
  en: {
    nav: {
      home: "Home", conditions: "Conditions", exercises: "Exercises",
      diet: "Diet", blog: "Blog", about: "About", donate: "Donate",
      language: "Language",
    },
    common: {
      readMore: "Read more", learnMore: "Learn more",
      backHome: "Back to home",
      machineTranslationNotice:
        "This page is a machine translation pending review by a local clinician. For UK clinical pathways, see the English version.",
    },
    home: {
      heroEyebrow: "Living With Arthritis",
      heroTitle: "Evidence-based arthritis support — for everyone",
      heroSubtitle:
        "Free guides, exercises and clinical content reviewed by a HCPC-registered chartered physiotherapist.",
      ctaPrimary: "Explore conditions",
      ctaSecondary: "Find exercises",
      sectionConditions: "Conditions we cover",
      sectionExercises: "Exercises by joint",
      sectionDiet: "Anti-inflammatory eating",
    },
    osteoarthritis: {
      title: "Osteoarthritis",
      intro:
        "Osteoarthritis is the most common form of arthritis — a wear-and-tear condition where joint cartilage breaks down over time, causing pain, stiffness and reduced movement.",
      symptomsHeading: "Common symptoms",
      symptoms: [
        "Joint pain that worsens with activity",
        "Stiffness after rest, usually under 30 minutes",
        "Swelling around the joint",
        "Reduced range of motion",
        "Grating sensation or crepitus",
      ],
      managementHeading: "How it is managed",
      management: [
        "Regular low-impact exercise (walking, cycling, swimming)",
        "Weight management to reduce joint load",
        "Strengthening the muscles around the joint",
        "Pain relief: paracetamol, topical NSAIDs",
        "Physiotherapy and self-management programmes",
      ],
    },
  },
  es: {
    nav: {
      home: "Inicio", conditions: "Condiciones", exercises: "Ejercicios",
      diet: "Dieta", blog: "Blog", about: "Sobre nosotros", donate: "Donar",
      language: "Idioma",
    },
    common: {
      readMore: "Leer más", learnMore: "Saber más",
      backHome: "Volver al inicio",
      machineTranslationNotice:
        "Esta página es una traducción automática pendiente de revisión por un clínico local. Para vías clínicas del Reino Unido, consulte la versión en inglés.",
    },
    home: {
      heroEyebrow: "Vivir con Artritis",
      heroTitle: "Apoyo basado en evidencia para la artritis — para todos",
      heroSubtitle:
        "Guías, ejercicios y contenido clínico gratuito revisado por un fisioterapeuta colegiado HCPC.",
      ctaPrimary: "Explorar condiciones",
      ctaSecondary: "Buscar ejercicios",
      sectionConditions: "Condiciones que cubrimos",
      sectionExercises: "Ejercicios por articulación",
      sectionDiet: "Alimentación antiinflamatoria",
    },
    osteoarthritis: {
      title: "Artrosis (Osteoartritis)",
      intro:
        "La artrosis es la forma más común de artritis: una enfermedad degenerativa en la que el cartílago articular se desgasta con el tiempo, causando dolor, rigidez y menor movilidad.",
      symptomsHeading: "Síntomas comunes",
      symptoms: [
        "Dolor articular que empeora con la actividad",
        "Rigidez tras el reposo, normalmente menos de 30 minutos",
        "Hinchazón alrededor de la articulación",
        "Reducción del rango de movimiento",
        "Crepitación al mover la articulación",
      ],
      managementHeading: "Cómo se trata",
      management: [
        "Ejercicio regular de bajo impacto (caminar, bicicleta, natación)",
        "Control del peso para reducir la carga articular",
        "Fortalecimiento de los músculos alrededor de la articulación",
        "Alivio del dolor: paracetamol, AINEs tópicos",
        "Fisioterapia y programas de autocuidado",
      ],
    },
  },
  fr: {
    nav: {
      home: "Accueil", conditions: "Pathologies", exercises: "Exercices",
      diet: "Alimentation", blog: "Blog", about: "À propos", donate: "Faire un don",
      language: "Langue",
    },
    common: {
      readMore: "Lire la suite", learnMore: "En savoir plus",
      backHome: "Retour à l'accueil",
      machineTranslationNotice:
        "Cette page est une traduction automatique en attente de relecture par un clinicien local. Pour les parcours cliniques britanniques, consultez la version anglaise.",
    },
    home: {
      heroEyebrow: "Vivre avec l'arthrite",
      heroTitle: "Un soutien fondé sur des preuves pour l'arthrite — pour tous",
      heroSubtitle:
        "Guides, exercices et contenu clinique gratuits, validés par un kinésithérapeute agréé HCPC.",
      ctaPrimary: "Explorer les pathologies",
      ctaSecondary: "Trouver des exercices",
      sectionConditions: "Les pathologies couvertes",
      sectionExercises: "Exercices par articulation",
      sectionDiet: "Alimentation anti-inflammatoire",
    },
    osteoarthritis: {
      title: "Arthrose",
      intro:
        "L'arthrose est la forme la plus fréquente d'arthrite : une maladie dégénérative dans laquelle le cartilage articulaire s'use, provoquant douleur, raideur et perte de mobilité.",
      symptomsHeading: "Symptômes fréquents",
      symptoms: [
        "Douleur articulaire aggravée par l'activité",
        "Raideur après le repos, généralement moins de 30 minutes",
        "Gonflement autour de l'articulation",
        "Diminution de l'amplitude de mouvement",
        "Sensation de craquement (crépitation)",
      ],
      managementHeading: "Prise en charge",
      management: [
        "Activité physique régulière à faible impact (marche, vélo, natation)",
        "Gestion du poids pour réduire la charge articulaire",
        "Renforcement des muscles autour de l'articulation",
        "Antalgiques : paracétamol, AINS topiques",
        "Kinésithérapie et programmes d'auto-prise en charge",
      ],
    },
  },
  de: {
    nav: {
      home: "Startseite", conditions: "Erkrankungen", exercises: "Übungen",
      diet: "Ernährung", blog: "Blog", about: "Über uns", donate: "Spenden",
      language: "Sprache",
    },
    common: {
      readMore: "Weiterlesen", learnMore: "Mehr erfahren",
      backHome: "Zurück zur Startseite",
      machineTranslationNotice:
        "Diese Seite ist eine maschinelle Übersetzung, die noch von einer lokalen Klinikerin oder einem Kliniker geprüft werden muss. Für britische klinische Pfade siehe die englische Version.",
    },
    home: {
      heroEyebrow: "Leben mit Arthritis",
      heroTitle: "Evidenzbasierte Unterstützung bei Arthritis — für alle",
      heroSubtitle:
        "Kostenlose Anleitungen, Übungen und klinische Inhalte, geprüft von einem HCPC-registrierten Physiotherapeuten.",
      ctaPrimary: "Erkrankungen entdecken",
      ctaSecondary: "Übungen finden",
      sectionConditions: "Behandelte Erkrankungen",
      sectionExercises: "Übungen nach Gelenk",
      sectionDiet: "Entzündungshemmende Ernährung",
    },
    osteoarthritis: {
      title: "Arthrose (Osteoarthritis)",
      intro:
        "Arthrose ist die häufigste Form der Arthritis — eine Verschleißerkrankung, bei der sich der Gelenkknorpel mit der Zeit abbaut und Schmerzen, Steifheit und Bewegungseinschränkungen verursacht.",
      symptomsHeading: "Häufige Symptome",
      symptoms: [
        "Gelenkschmerzen, die sich bei Aktivität verschlimmern",
        "Steifheit nach Ruhe, meist unter 30 Minuten",
        "Schwellung um das Gelenk",
        "Eingeschränkter Bewegungsumfang",
        "Knirschen oder Reibegeräusche (Krepitation)",
      ],
      managementHeading: "Behandlung",
      management: [
        "Regelmäßige gelenkschonende Bewegung (Gehen, Radfahren, Schwimmen)",
        "Gewichtsmanagement zur Entlastung der Gelenke",
        "Stärkung der gelenkumgebenden Muskulatur",
        "Schmerzlinderung: Paracetamol, topische NSAR",
        "Physiotherapie und Selbstmanagement-Programme",
      ],
    },
  },
  pt: {
    nav: {
      home: "Início", conditions: "Condições", exercises: "Exercícios",
      diet: "Alimentação", blog: "Blog", about: "Sobre", donate: "Doar",
      language: "Idioma",
    },
    common: {
      readMore: "Ler mais", learnMore: "Saiba mais",
      backHome: "Voltar ao início",
      machineTranslationNotice:
        "Esta página é uma tradução automática pendente de revisão por um clínico local. Para vias clínicas do Reino Unido, consulte a versão em inglês.",
    },
    home: {
      heroEyebrow: "Viver com Artrite",
      heroTitle: "Apoio baseado em evidências para a artrite — para todos",
      heroSubtitle:
        "Guias, exercícios e conteúdo clínico gratuitos, revistos por um fisioterapeuta registado pela HCPC.",
      ctaPrimary: "Explorar condições",
      ctaSecondary: "Encontrar exercícios",
      sectionConditions: "Condições que cobrimos",
      sectionExercises: "Exercícios por articulação",
      sectionDiet: "Alimentação anti-inflamatória",
    },
    osteoarthritis: {
      title: "Osteoartrite",
      intro:
        "A osteoartrite é a forma mais comum de artrite — uma doença degenerativa em que a cartilagem articular se desgasta ao longo do tempo, causando dor, rigidez e redução da mobilidade.",
      symptomsHeading: "Sintomas comuns",
      symptoms: [
        "Dor articular que piora com a atividade",
        "Rigidez após repouso, normalmente inferior a 30 minutos",
        "Inchaço ao redor da articulação",
        "Redução da amplitude de movimento",
        "Sensação de atrito ou crepitação",
      ],
      managementHeading: "Como é tratada",
      management: [
        "Exercício regular de baixo impacto (caminhada, ciclismo, natação)",
        "Controlo do peso para reduzir a carga articular",
        "Fortalecimento dos músculos em redor da articulação",
        "Alívio da dor: paracetamol, AINEs tópicos",
        "Fisioterapia e programas de autocuidado",
      ],
    },
  },
};

/** Extract the language from a pathname like "/es/conditions/...". */
export function detectLangFromPath(pathname: string): Lang {
  const seg = pathname.split("/")[1];
  if ((SUPPORTED_LANGS as string[]).includes(seg)) return seg as Lang;
  return "en";
}

/** Strip the leading "/xx" language prefix from a path, if present. */
export function stripLangPrefix(pathname: string): string {
  const seg = pathname.split("/")[1];
  if ((SUPPORTED_LANGS as string[]).includes(seg) && seg !== "en") {
    return pathname.slice(3) || "/";
  }
  return pathname;
}

/** Build the URL for a given language + base (English) path. */
export function buildLangUrl(lang: Lang, basePath: string): string {
  const clean = basePath.startsWith("/") ? basePath : `/${basePath}`;
  if (lang === "en") return clean;
  return `/${lang}${clean === "/" ? "" : clean}`;
}
