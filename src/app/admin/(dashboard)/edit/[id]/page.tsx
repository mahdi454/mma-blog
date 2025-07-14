import { createClient } from "@/utils/supabase/server";
import EditorPageClient from "../../new-article/editorPageClient";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const articleId = (await params).id;
  try {
    const { data: article, error: articleErr } = await supabase
      .from("articles")
      .select("*")
      .eq("id", articleId)
      .single();

    if (articleErr || !article) {
      console.error("Error fetching article:", articleErr);
    }


  return <EditorPageClient article={article}/>;
  } catch (error) {
        return <div>Article not found.</div>;
  }

  
}

