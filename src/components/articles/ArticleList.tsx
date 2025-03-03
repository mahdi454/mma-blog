"use client";
import type { Article } from "@/utils/types";
import {
  CircleCheckBig,
  EllipsisVertical,
  Square,
  SquareCheckBig,
} from "lucide-react";
import MaxWidthWrapper from "../maxWidthWrapper";
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
import { articleService } from "@/app/admin/new-article/action";
import { useCallback, useState } from "react";
import { timeSince } from "@/lib/utils";

export default function AdminArticleList({
  articles: initialArticles,
  error,
}: {
  articles: Article[];
  error: string | null;
}) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
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
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the article"
      );
    }
  }, []);
  return (
    <MaxWidthWrapper>
      <div className="space-y-4 mt-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-slate-900 py-4 px-2 rounded-lg shadow flex justify-between items-center "
          >
            <div className="flex justify-normal items-center gap-2">
              <div>
                {!article.published ? (
                  <Square width={20} className="text-sky-500" />
                ) : (
                  <SquareCheckBig width={20} className="text-green-500" />
                )}
              </div>
              <div className="">
                {article.blocks[1].type === "h1" && (
                  <h1 className="font-bold text-gray-50">
                    {article.blocks[1].content}
                  </h1>
                )}
                <div>
                <p className="text-sm text-gray-100">{article.category}</p>
                <p className="text-lime-200">{timeSince(article.created_at)}</p>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical className="text-gray-50 hover:cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-slate-900 border-gray-800 text-gray-50">
                <DropdownMenuLabel>My Article</DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="">Edit</DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href={`/test2/${article.id}`} className="w-full">Preview</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Publish</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="text-red-700 focus:text-red-700" onClick={() => handleDelete(article.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
