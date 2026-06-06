UPDATE public.blog_articles b
SET content = b.content || E'\n\n' || replace(e.expansion, '\n', E'\n'),
    updated_at = now()
FROM public._blog_expansions_tmp e
WHERE b.id = e.id;

DROP TABLE public._blog_expansions_tmp;