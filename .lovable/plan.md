Remove the "Site visitors: Over 10,000 in the past month" band from the homepage.

Scope
- The component is rendered on `src/pages/Index.tsx` at line 201 as `<VisitorStats variant="band" />`.
- It is imported from `@/components/VisitorStats`.
- The search showed no other usage of `VisitorStats` in the codebase.

Changes
1. Remove the `<VisitorStats variant="band" />` element from `src/pages/Index.tsx`.
2. Remove the now-unused `import VisitorStats from "@/components/VisitorStats";` line from `src/pages/Index.tsx`.
3. Leave `src/components/VisitorStats.tsx` and `src/config/visitorStats.ts` in place so the component can be reused later if needed.

Verification
- Run `tsgo --noEmit` to confirm no type errors after removing the import/usage.
- Run `bun run build` to confirm the production build still succeeds.
- Visually verify the red-circled visitor band no longer appears on the homepage preview.