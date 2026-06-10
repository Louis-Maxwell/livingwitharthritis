import { useKeywordData } from "@/hooks/useKeywordData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KeywordTargetingProps {
  articleSlug: string;
  /** Optional override; otherwise it looks up by slug in the content map. */
  primaryKeyword?: string;
}

/**
 * Admin / editorial-only widget. Renders the keyword targets and
 * recommended internal links for a given article slug.
 */
const KeywordTargeting = ({ articleSlug, primaryKeyword }: KeywordTargetingProps) => {
  const { contentMap, suggestInternalLinks } = useKeywordData();

  const cm = contentMap as unknown as { pillars: Array<{ slug: string; title: string; type: string; word_count_target: [number, number]; cluster: string; primary_keyword: string; secondary_keywords: string[]; }>; clusters_sample?: Array<{ slug: string; title: string; type: string; word_count_target: [number, number]; cluster: string; primary_keyword: string; secondary_keywords: string[]; }>; };
  const all = [...cm.pillars, ...(cm.clusters_sample ?? [])];
  const article = all.find((a) => a.slug === articleSlug);
  const primary = primaryKeyword ?? article?.primary_keyword ?? "";
  const suggestions = primary ? suggestInternalLinks(primary, 5) : [];

  if (!article && !primary) return null;

  return (
    <Card className="border-primary/30">
      <CardHeader>
        <CardTitle className="text-lg">Keyword targets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {article && (
          <>
            <div>
              <p className="font-semibold mb-1">Primary</p>
              <Badge variant="default">{article.primary_keyword}</Badge>
            </div>
            <div>
              <p className="font-semibold mb-1">Secondary</p>
              <div className="flex flex-wrap gap-1">
                {article.secondary_keywords.map((k) => (
                  <Badge key={k} variant="secondary">{k}</Badge>
                ))}
              </div>
            </div>
            <div className="text-muted-foreground">
              Type: <b>{article.type}</b> · Word target: {article.word_count_target[0]}–{article.word_count_target[1]} · Cluster: {article.cluster}
            </div>
          </>
        )}
        {suggestions.length > 0 && (
          <div>
            <p className="font-semibold mb-1">Recommended internal links</p>
            <ul className="list-disc pl-5 space-y-0.5">
              {suggestions.filter((s) => s.slug !== articleSlug).map((s) => (
                <li key={s.slug}>
                  <a className="underline" href={`/blog/${s.slug}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeywordTargeting;
