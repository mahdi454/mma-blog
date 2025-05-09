import { Article } from "@/utils/types";
import NewsArticleCarousel from "./NewsArticleCarousel";

export default function NewsGrid({
  ufcArticles,
  boxingArticles,
  error,
}: {
  ufcArticles: Article[];
  boxingArticles: Article[];
  error: string | null;
}) {
  const ufcArticle = [...ufcArticles, ...boxingArticles];
  if (error) {
    return (
      <div className="text-center text-red-500">Error loading articles</div>
    );
  }

  return (
    <>
      <NewsArticleCarousel
        title="Top News"
        articles={ufcArticle}
        isBadge={true}
      />
      <NewsArticleCarousel title="UFC" articles={ufcArticles} isBadge={false} />
      {/* <NewsArticleCarousel
        title="Boxing"
        articles={boxingArticles}
        isBadge={false}
      /> */}
    </>
  );
}
