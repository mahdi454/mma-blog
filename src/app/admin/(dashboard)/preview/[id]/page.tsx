import { createClient } from '@/utils/supabase/server';
import { ArticleClientWrapper } from './articleWrapper';



export default async function ArticlePrePage({
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


    return <ArticleClientWrapper article={article} />;

  } catch (error) {
    console.error("Error in article page:", error);
  }
}