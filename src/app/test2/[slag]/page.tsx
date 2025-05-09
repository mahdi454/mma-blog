import MaxWidthWrapper from "@/components/maxWidthWrapper";
import Post from "./post";
import { createClient } from "@/utils/supabase/server";
import ArticleGrid from "@/components/articles/articleGrid";

export default async function Page({
  params,
}: {
  params: Promise<{ slag: string }>;
}) {
  const supabase = await createClient();
  const id = (await params).slag;
  try {
    const { data: article, error: articleErr } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    // Fetch articles for multiple categories
    const { data: ufcArticles, error: ufcError } = await supabase
      .from("articles")
      .select("*")
      .eq("category", "UFC")
      .order("created_at", { ascending: false })
      .limit(5);

    // Fetch articles with the "Hot" badge
    const { data: hotArticles, error: hotError } = await supabase
      .from("articles")
      .select("*")
      .eq("badge", "Hot")
      .order("created_at", { ascending: false })
      .limit(5);
    const recommendedArticles = [
      // ...(ufcArticles || []),
      ...(hotArticles || []),
    ].filter((a) => a.id !== article.id); // exclude current article
    if (articleErr || hotError || ufcError) {
      throw new Error(articleErr?.message || ufcError?.message ||
        hotError?.message || "Error fetching articles");
    }
    return (
      <MaxWidthWrapper className="max-w-screen-2xl px-2 md:px-4  bg-black/0 backdrop-blur-[2px]">
          {/* Main Content */}
        <div className="flex  lg:gap-2 xl:gap-2 2xl:gap-6 ">
          <div className=" space-y-6 max-w-5xl ">
            <Post blocks={article} />
          </div>

          {/* Sidebar */}
          <aside className="hidden  md:block sticky top-24 h-fit max-w-sm 2xl:max-w-md">
            <h2 className="mb-3  font-semibold bg-emerald-700  pl-2 pr-6 py-1 relative clip-arrow w-fit  rounded-l-sm">Recommended Articles</h2>
            <ArticleGrid articles={recommendedArticles} />
          </aside>
        </div>
      </MaxWidthWrapper>
    );
  } catch (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Failed to load: {(error as Error).message}
      </div>
    );
  }
}
