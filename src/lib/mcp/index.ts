import { auth, defineMcp } from "@lovable.dev/mcp-js";
import searchBlogArticlesTool from "./tools/search-blog-articles";
import getBlogArticleTool from "./tools/get-blog-article";
import listMyAppointmentsTool from "./tools/list-my-appointments";
import listMyPainJournalTool from "./tools/list-my-pain-journal";
import createPainJournalEntryTool from "./tools/create-pain-journal-entry";

// Supabase project ref is inlined by Vite at build time — kept import-safe (no runtime env read).
// Must be a literal here (not an aliased import) so the bundled edge function stays self-contained.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID;
if (!projectRef) {
  throw new Error(
    "VITE_SUPABASE_PROJECT_ID is not set. Please check your environment configuration.",
  );
}


export default defineMcp({
  name: "living-with-arthritis-mcp",
  title: "Living With Arthritis UK",
  version: "0.1.0",
  instructions:
    "Tools for Living With Arthritis UK — a not-for-profit UK arthritis information and support service. Use `search_blog_articles` and `get_blog_article` to answer questions with the site's evidence-based content. Use `list_my_appointments`, `list_my_pain_journal_entries`, and `create_pain_journal_entry` to help the signed-in user review or log their own arthritis self-care data. All patient data is scoped to the signed-in user under Row-Level Security.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    searchBlogArticlesTool,
    getBlogArticleTool,
    listMyAppointmentsTool,
    listMyPainJournalTool,
    createPainJournalEntryTool,
  ],
});
