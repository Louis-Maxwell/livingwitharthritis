CREATE TRIGGER on_new_forum_reply
  AFTER INSERT ON public.forum_replies
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_forum_reply();