"use client";
import type { Article } from "@/utils/types";
import articlesData from "@/data/articlaJsonData.json";

import {
  CircleCheckBig,
  EllipsisVertical,
  Square,
  SquareCheckBig,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { articleService } from "@/app/admin/(dashboard)/new-article-v1/action";
import { useCallback, useState } from "react";
import { timeSince } from "@/lib/utils";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import ArticleCard from "./articleCard";
import ArtCard from "./artCard";
import LocoWrapper from "./locoWrapper";

export default function AdminArticleList({
  articles: initialArticles,
  error,
}: {
  articles: Article[];
  error: string | null;
}) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const art1 = articlesData.articles.slice(0, 6);
  const art2 = articlesData.articles.slice(6, 12);
  const art3 = articlesData.articles.slice(12, 17);
  const [err, setError] = useState("");
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
    <LocoWrapper>
      <div
        data-scroll-section
        className="grid grid-cols-4 gap-4 h-full px-8 py-12"
      >
        {/* Left column - scrolls down (normal speed) */}
        <div className="space-y-6" data-scroll data-scroll-speed="-1">
          {art1.map((article) => (
            <ArtCard
              key={article.id}
              article={article}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <div className="space-y-6" data-scroll data-scroll-speed="-1">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <div className="space-y-6" data-scroll data-scroll-speed="1">
          {art1.map((article) => (
            <ArtCard
              key={article.id}
              article={article}
              onDelete={handleDelete}
            />
          ))}
        </div>
        

        {/* Right column - scrolls up (reverse) */}
        <div className="space-y-6" data-scroll data-scroll-speed="1">
          {art3.map((article) => (
            <ArtCard
              key={article.id}
              article={article}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </LocoWrapper>
  );
}
