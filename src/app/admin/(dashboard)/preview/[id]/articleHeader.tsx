import { useUser } from "@/app/context/userContext";
import { findTitle, timeSince } from "@/lib/utils";
import { Article } from "@/utils/types";
import { Clock } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  article: Article;
};

function ArticleHeader({ article }: Props) {
  const { user, profile } = useUser();
  // Extract the first h1 heading as the title
  const title = findTitle(article.blocks?.content) || "Article";
  return (
    <header className="mb-8">
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex items-center  gap-3">
          <Image
            src={profile?.avatar_url || "/user1.png"}
            alt="Profile Picture"
            className="w-12 h-12 rounded-full object-cover  bg-gray-300"
            width={100}
            height={100}
            loading="lazy"
          />
          <p className="text-gray-400 text-sm">
            {profile?.username?.toUpperCase() || "Unknown"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-gray-400">
            <Clock width={18} />
            <p className="text-sm">{timeSince(article.created_at)}</p>
          </span>
        </div>
      </div>

      {/* {article.badge && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide font-semibold mb-4">
                {article.badge}
              </span>
            )} */}


      <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-100 mb-2">{title}</h1>

      {/* <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
        <div className="flex items-center space-x-4">
          <span>
            {new Date(article.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>·</span>
          <span>5 min read</span>
        </div>
        <div>
          <span>Category: {article.category}</span>
        </div>
      </div> */}
    </header>
  );
}

export default ArticleHeader;
