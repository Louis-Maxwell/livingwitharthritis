import { describe, expect, it } from "vitest";
import {
  isIndexableCityHubPath,
  resolveSeoRedirect,
} from "@/lib/seoRedirects";

describe("resolveSeoRedirect", () => {
  it("301s the GSC hard 404 blog slug to the live mindfulness guide", () => {
    expect(resolveSeoRedirect("/blog/mindfulness-meditation-chronic-pain")).toBe(
      "/blog/mindfulness-chronic-pain-arthritis-guide",
    );
  });

  it("301s locale 404s to the English homepage, not /404", () => {
    expect(resolveSeoRedirect("/fr/404")).toBe("/");
    expect(resolveSeoRedirect("/es/404")).toBe("/");
    expect(resolveSeoRedirect("/de/404")).toBe("/");
    expect(resolveSeoRedirect("/pt/404")).toBe("/");
  });

  it("strips empty locale stubs onto the English equivalent", () => {
    expect(resolveSeoRedirect("/de/glossary/methotrexate")).toBe(
      "/glossary/methotrexate",
    );
    expect(resolveSeoRedirect("/es/glossary/pain-scale")).toBe(
      "/glossary/pain-scale",
    );
    expect(resolveSeoRedirect("/fr/guides/wet-vs-dry-heat-therapy")).toBe(
      "/guides/wet-vs-dry-heat-therapy",
    );
    expect(resolveSeoRedirect("/de/pets/pet-weight-and-joint-health")).toBe(
      "/pets/pet-weight-and-joint-health",
    );
    expect(resolveSeoRedirect("/fr/uk/coventry/waiting-list-help")).toBe(
      "/arthritis-support/coventry",
    );
    expect(resolveSeoRedirect("/es/corporate-partnerships")).toBe(
      "/corporate-partnerships",
    );
  });

  it("does not redirect real translated routes", () => {
    expect(resolveSeoRedirect("/es")).toBeNull();
    expect(resolveSeoRedirect("/fr/conditions/osteoarthritis")).toBeNull();
    expect(resolveSeoRedirect("/")).toBeNull();
    expect(resolveSeoRedirect("/donate")).toBeNull();
    expect(resolveSeoRedirect("/community")).toBeNull();
    expect(resolveSeoRedirect("/chat")).toBeNull();
    expect(resolveSeoRedirect("/accessibility")).toBeNull();
    expect(resolveSeoRedirect("/guides/diet")).toBeNull();
  });

  it("301s GSC city soft 404s to the closest live city hub", () => {
    expect(resolveSeoRedirect("/arthritis-support/stockport")).toBe(
      "/arthritis-support/manchester",
    );
    expect(resolveSeoRedirect("/arthritis-support/stirling")).toBe(
      "/arthritis-support/glasgow",
    );
    expect(resolveSeoRedirect("/arthritis-support/winchester")).toBe(
      "/arthritis-support/southampton",
    );
  });

  it("301s city×condition templates onto the city hub", () => {
    expect(
      resolveSeoRedirect("/arthritis-support/london/osteoarthritis"),
    ).toBe("/arthritis-support/london");
    expect(
      resolveSeoRedirect("/arthritis-support/stockport/gout"),
    ).toBe("/arthritis-support/manchester");
  });

  it("301s UK city×service templates onto the city hub", () => {
    expect(resolveSeoRedirect("/uk/coventry/waiting-list-help")).toBe(
      "/arthritis-support/coventry",
    );
  });

  it("301s legacy short exercise slugs onto the -arthritis canonical", () => {
    expect(resolveSeoRedirect("/exercises/pilates-for-knee")).toBe(
      "/exercises/pilates-for-knee-arthritis",
    );
    expect(resolveSeoRedirect("/exercises/stretching-for-knee")).toBe(
      "/exercises/stretching-for-knee-arthritis",
    );
    expect(resolveSeoRedirect("/exercises/walking-for-back")).toBe(
      "/exercises/walking-for-back-arthritis",
    );
  });

  it("does not rewrite dedicated tai-chi URLs as matrix slugs", () => {
    expect(resolveSeoRedirect("/exercises/tai-chi-for-arthritis")).toBeNull();
    expect(resolveSeoRedirect("/exercises/tai-chi-for-balance")).toBeNull();
  });

  it("301s /exercise-hub to /exercises", () => {
    expect(resolveSeoRedirect("/exercise-hub")).toBe("/exercises");
  });

  it("301s unrouted library cluster hubs onto real condition or guide pages", () => {
    expect(resolveSeoRedirect("/library/osteoarthritis-hub")).toBe(
      "/conditions/osteoarthritis",
    );
    expect(resolveSeoRedirect("/library/rheumatoid-arthritis-hub")).toBe(
      "/conditions/rheumatoid-arthritis",
    );
    expect(resolveSeoRedirect("/library/pain-management-hub")).toBe(
      "/guides/arthritis-pain-relief",
    );
    expect(resolveSeoRedirect("/library/exercise-hub")).toBe("/exercises");
    expect(resolveSeoRedirect("/library/nutrition-hub")).toBe("/diet");
  });

  it("does not redirect real library or FAQ articles that still have copy", () => {
    expect(resolveSeoRedirect("/library/fibromyalgia")).toBeNull();
    expect(resolveSeoRedirect("/conditions/gout/symptoms")).toBeNull();
    expect(resolveSeoRedirect("/faq/arthritis-and-cold-weather")).toBeNull();
  });

  it("301s /zakat onto the appeal page", () => {
    expect(resolveSeoRedirect("/zakat")).toBe("/zakat-appeal");
  });

  it("301s legacy alias paths onto their canonical English pages", () => {
    expect(resolveSeoRedirect("/about-us")).toBe("/about");
    expect(resolveSeoRedirect("/privacy-policy")).toBe("/privacy");
  });

  it("301s exercise×condition templates to a real joint/condition page", () => {
    expect(resolveSeoRedirect("/exercises/knee/for/osteoarthritis")).toBe(
      "/conditions/knee-arthritis",
    );
    expect(resolveSeoRedirect("/exercises/neck/for/rheumatoid-arthritis")).toBe(
      "/exercises/neck-arthritis-exercises",
    );
  });

  it("301s the thin Sheffield RA doorway onto the RA hub, not a city template", () => {
    expect(
      resolveSeoRedirect("/arthritis-support/sheffield/rheumatoid-arthritis"),
    ).toBe("/conditions/rheumatoid-arthritis");
    expect(
      resolveSeoRedirect("/arthritis-support/london/osteoarthritis"),
    ).toBe("/arthritis-support/london");
  });
});



  it("301s trailing-slash URLs onto the slashless path", () => {
    expect(resolveSeoRedirect("/about/")).toBe("/about");
    expect(resolveSeoRedirect("/blog/")).toBe("/blog");
  });

  it("301s hip exercises alternate and glucosamine library duplicate", () => {
    expect(resolveSeoRedirect("/conditions/hip-arthritis/exercises")).toBe(
      "/guides/hip-exercises-for-osteoarthritis",
    );
    expect(resolveSeoRedirect("/library/glucosamine")).toBe(
      "/supplements/glucosamine",
    );
  });

  it("301s GSC locale soft-404 glossary URLs onto English glossary pages", () => {
    expect(resolveSeoRedirect("/es/glossary/nice")).toBe("/glossary/nice");
    expect(resolveSeoRedirect("/fr/glossary/nice")).toBe("/glossary/nice");
    expect(resolveSeoRedirect("/de/glossary/facet-joint-injection")).toBe(
      "/glossary/facet-joint-injection",
    );
  });

describe("isIndexableCityHubPath", () => {
  it("allows real city hubs and rejects unknown or nested paths", () => {
    expect(isIndexableCityHubPath("/arthritis-support/manchester")).toBe(true);
    expect(isIndexableCityHubPath("/arthritis-support/stockport")).toBe(false);
    expect(
      isIndexableCityHubPath("/arthritis-support/manchester/osteoarthritis"),
    ).toBe(false);
  });

  it("301s bare hub stubs that previously soft-404ed", () => {
    expect(resolveSeoRedirect("/exercise-hub")).toBe("/exercises");
    expect(resolveSeoRedirect("/conditions")).toBe("/conditions/arthritis");
    expect(resolveSeoRedirect("/guides")).toBeNull();
    expect(resolveSeoRedirect("/about-us")).toBe("/about");
    expect(resolveSeoRedirect("/search")).toBeNull();
  });

});
