import { useUser } from "@/app/context/userContext";
import { findFirstImage, findTitle, timeSince } from "@/lib/utils";
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

      <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-100 mb-2">
        {title}
      </h1>
      <div className="my-6 w-full overflow-hidden">
        <div className="relative w-full h-full lg:h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            width={1140}
            height={720}
            src={findFirstImage(article.blocks)?.src || ""}
            alt={findFirstImage(article.blocks)?.alt || "Image"}
            className="w-full h-full object-cover object-[center_10%] bg-gray-950"
          />
          {findFirstImage(article.blocks)?.alt && (  // need to be checked because sheet happen
            <p className="absolute bottom-0 right-0 bg-black/65 px-1 text-xs sm:text-sm text-gray-300">
              findFirstImage(article.blocks)?.alt
            </p>
          )}
        </div>
      </div>
    </header>
  );
}

export default ArticleHeader;
