"use client";

import type { Article } from "@/utils/types";
import { CircleCheckBig } from "lucide-react";
import { articleService } from "@/app/admin/(dashboard)/new-article-v1/action";
import { useCallback, useRef, useState } from "react";
import ArticleCard from "./articleCard";
import { useSidebar } from "@/components/ui/sidebar";
import { useColumnParallax } from "@/hooks/useParallaxSrl";

export default function AdminArticleList({
  articles: initialArticles,
  error,
}: {
  articles: Article[];
  error: string | null;
}) {
  const { open: isOpen } = useSidebar();
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [err, setError] = useState("");
  const columnsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🟢 Apply parallax only to column 2 and 4 (index 1 and 3)
  useColumnParallax(columnsRef, [1, 3], -20);

  // 🟢 Round-robin distribute articles evenly across 4 columns
  const numColumns = 4;
  const columns = Array.from({ length: numColumns }, () => [] as Article[]);

  articles.forEach((article, index) => {
    columns[index % numColumns].push(article);
  });

  const handleDelete = useCallback(async (id: string) => {
    try {
      await articleService.deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the article"
      );
    }
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500">Error loading articles</div>
    );
  }

  if (!articles.length && error == null) {
    return (
      <div className="flex h-full flex-col items-center justify-center mt-10">
        <CircleCheckBig width="32" height="32" className="text-green-500" />
        <h3 className="font-semibold text-xl mt-4 text-gray-50">
          Welcome, You&apos;re all set!
        </h3>
        <p className="text-gray-200 text-center mt-2">
          Thank you for joining us, add your first blog.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 sm:grid-cols-2 ${
        isOpen
          ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
          : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      } gap-4 overflow-hidden justify-start px-4 pt-12 bg-black/5 backdrop-blur-[2px] items-start`}
    >
      {columns.map((cards, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) columnsRef.current[i] = el;
          }}
          className="flex flex-col gap-4 will-change-transform"
        >
          {cards.map((card) => (
            <ArticleCard article={card} key={card.id} onDelete={handleDelete} />
          ))}
        </div>
      ))}
    </div>
  );
}
