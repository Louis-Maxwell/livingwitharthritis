# Imported article batches 1–8

Imported 40 articles from the supplied ZIP. The eight original Markdown files are preserved byte for byte. Each article also has a JSON draft in `src/content/blog/posts/`, using the existing blog schema. `manifest.json` maps original articles and suggested URLs to repository files. Existing articles are preserved; conflicting slugs receive an imported-batch suffix.

Entries have `is_published: false` and `reviewStatus: "pending"`. No clinical reviewer or review date has been invented. The source collection includes draft/not-published editorial status and recommends clinical and benefits review before publication.

Before publishing: verify current clinical/benefits guidance and references, complete editorial review, assign unique relevant covers, and decide whether the five suggested `/guides/` destinations should be guide pages or blog routes. The shared existing cover is a draft placeholder. The standard catalog generator includes articles after publication flags change.
