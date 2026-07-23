-- Sub-1,400-word published blog articles, shortest first.
SELECT slug,
       title,
       array_length(regexp_split_to_array(trim(content), '\s+'), 1) AS word_count
FROM public.blog_articles
WHERE is_published = true
  AND array_length(regexp_split_to_array(trim(content), '\s+'), 1) < 1400
ORDER BY word_count ASC;
