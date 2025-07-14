"use client";
import type { Article } from "@/utils/types";
import articlesData from "@/data/articlaJsonData.json";

import { CircleCheckBig } from "lucide-react";

import { articleService } from "@/app/admin/(dashboard)/new-article-v1/action";
import { useCallback, useEffect, useRef, useState } from "react";
import { timeSince } from "@/lib/utils";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import ArticleCard from "./articleCard";
import LocoWrapper from "./locoWrapper";

export default function AdminArticleList({
  articles: initialArticles,
  error,
}: {
  articles: Article[];
  error: string | null;
}) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [err, setError] = useState("");
  const columnsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;

      columnsRef.current.forEach((col, i) => {
        if (!col) return;

        // Different parallax speeds for each column
        let speed = 0;
        switch (i) {
          case 0:
            speed = 0;
            break; // Static
          case 1:
            speed = 0.2;
            break; // Slow
          case 2:
            speed = 0;
            break; // Static
          case 3:
            speed = 0.2;
            break; // Reverse direction
        }

        const yPos = scrollY * speed;
        col.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const columns = [
    articles,
    articles.slice(1, 6),
    articles.slice(0, 5),
  ];
  if (error) {
    return (
      <div className="text-center text-red-500">Error loading articles</div>
    );
  }
  if (!articles.length && error == null)
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
  const handleDelete = useCallback(async (id: string) => {
    try {
      await articleService.deleteArticle(id);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the article"
      );
    }
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4 overflow-hidden justify-center px-4 pt-12 bg-black/5 backdrop-blur-[2px]">
      {columns.map((cards, i) => (
        <div
          key={i}
          ref={(el) => {
            columnsRef.current[i] = el!;
          }}
          className="grid gap-4 content-start will-change-transform"
        >
          {cards.map((card) => (
            <ArticleCard article={card} key={card.id} onDelete={handleDelete} />
          ))}
        </div>
      ))}
    </div>
  );
}
