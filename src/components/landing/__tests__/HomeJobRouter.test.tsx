import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeJobRouter from "../HomeJobRouter";
import { GOFUNDME_URL, MORE_TOPICS, VISITOR_JOBS } from "../homeJobs";
import blogSlugs from "@/data/blog-slugs.generated.json";
import authors from "@/data/medical-authors.json";

vi.mock("@/lib/ga-events", () => ({
  trackStartHereCard: vi.fn(),
  trackDonationClick: vi.fn(),
}));

const appRoutes = new Set(
  [...readFileSync(resolve("src/App.tsx"), "utf8").matchAll(/path="([^"]+)"/g)].map((m) => m[1]),
);
const librarySlugs = new Set(
  [...readFileSync(resolve("src/data/libraryTopicSeo.ts"), "utf8").matchAll(/"([a-z0-9-]+)"\s*:/g)].map(
    (m) => m[1],
  ),
);
const published = new Set(
  (blogSlugs as unknown as Array<string | { slug: string }>).map((s) =>
    typeof s === "string" ? s : s.slug,
  ),
);

/** True when an internal href maps to a declared route or a real post/topic. */
function resolves(href: string): boolean {
  if (appRoutes.has(href)) return true;
  const blog = href.match(/^\/blog\/([^/]+)$/);
  if (blog) return published.has(blog[1]);
  const author = href.match(/^\/authors\/([^/]+)$/);
  if (author) return Object.prototype.hasOwnProperty.call(authors, author[1]);
  const lib = href.match(/^\/library\/([^/]+)$/);
  if (lib) return librarySlugs.has(lib[1]);
  return false;
}

const renderRouter = () =>
  render(
    <MemoryRouter>
      <HomeJobRouter />
    </MemoryRouter>,
  );

describe("HomeJobRouter", () => {
  it("covers every customer job with one card each", () => {
    expect(VISITOR_JOBS.map((j) => j.id)).toEqual([
      "pain",
      "newly-diagnosed",
      "exercises",
      "money",
      "carers",
      "trust",
      "community",
      "donate",
    ]);
  });

  it("renders a heading and a primary link per job", () => {
    renderRouter();
    expect(screen.getByRole("heading", { level: 2, name: /what do you need today/i })).toBeInTheDocument();
    for (const job of VISITOR_JOBS) {
      const heading = screen.getByRole("heading", { level: 3, name: job.title });
      expect(heading.closest("a")).toHaveAttribute("href", job.href);
    }
  });

  it("keeps donate last and opens GoFundMe safely in a new tab", () => {
    renderRouter();
    expect(VISITOR_JOBS.at(-1)?.id).toBe("donate");
    const gofundme = screen.getByRole("link", { name: /research fund on gofundme/i });
    expect(gofundme).toHaveAttribute("href", GOFUNDME_URL);
    expect(gofundme).toHaveAttribute("target", "_blank");
    expect(gofundme.getAttribute("rel")).toMatch(/noopener/);
  });

  it("only links to real routes, published posts or library topics", () => {
    const internal = [
      ...VISITOR_JOBS.flatMap((j) => [j.href, ...j.more.filter((m) => !m.external).map((m) => m.href)]),
      ...MORE_TOPICS.map((t) => t.href),
    ];
    const broken = internal.filter((href) => !resolves(href));
    expect(broken).toEqual([]);
  });

  it("never links to city doorway pages", () => {
    renderRouter();
    const section = screen.getByRole("region", { name: /what do you need today/i });
    for (const a of within(section).getAllByRole("link")) {
      expect(a.getAttribute("href") ?? "").not.toMatch(/arthritis-support\/|\/uk\/|\/regions\//);
    }
  });
});
