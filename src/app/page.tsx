import { createClient } from "@/utils/supabase/server";
import NewsGrid from "@/components/Home/NewsGrid";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import FeaturedArticle from "@/components/Home/FeaturedArticle";

export default async function HomePage() {
  const supabase = await createClient();

  try {
    // Fetch articles for multiple categories
    const { data: ufcArticles, error: ufcError } = await supabase
      .from("articles")
      .select("*")
      .eq("category", "UFC")
      .order("created_at", { ascending: false })
      .limit(5);

    const { data: boxingArticles, error: boxingError } = await supabase
      .from("articles")
      .select("*")
      .eq("category", "Boxing")
      .order("created_at", { ascending: false })
      .limit(5);

    // Fetch articles with the "Hot" badge
    const { data: hotArticles, error: hotError } = await supabase
      .from("articles")
      .select("*")
      .eq("badge", "Hot")
      .order("created_at", { ascending: false })
      .limit(5);

    if (ufcError || boxingError || hotError) {
      throw new Error(
        ufcError?.message ||
          boxingError?.message ||
          hotError?.message ||
          "Error fetching articles"
      );
    }

    return (
      <MaxWidthWrapper>
        <FeaturedArticle hotArticles={hotArticles} error={null} />
        <NewsGrid
          ufcArticles={ufcArticles || []}
          boxingArticles={boxingArticles || []}
          error={null}
        />
        
      </MaxWidthWrapper>
    );
  } catch (error) {
    return (
      <MaxWidthWrapper>
        <FeaturedArticle hotArticles={[]} error={(error as Error).message} />
        <NewsGrid
          ufcArticles={[]}
          boxingArticles={[]}
          error={(error as Error).message}
        />
         
      </MaxWidthWrapper>
    );
  }
}
