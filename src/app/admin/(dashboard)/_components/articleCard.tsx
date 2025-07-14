import { useUser } from "@/app/context/userContext";
import { findFirstImage, findTitle, timeSince } from "@/lib/utils";
import { Article } from "@/utils/types";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

interface ArticleCardProps {
  article: Article;
  onDelete?: (id: string) => Promise<void>;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onDelete }) => {
  const { profile } = useUser();
  return (
    <div className="max-w-md mx-auto bg-black/50 backdrop-blur-[2px] border border-gray-700 rounded-lg shadow-sm mb-6 text-gray-50">
    

      {/* Image */}
      <div>
        <img
          className="w-full object-cover max-h-96"
          src={findFirstImage(article.blocks)?.src || "/placeholder-image.png"}
          alt={findFirstImage(article.blocks)?.alt || "Article Image"}
        />
      </div>
        {/* Header */}
      <div className="flex items-center px-4 py-2">
        <img
          className="h-10 w-10 rounded-full object-cover border border-gray-300"
          src={profile?.avatar_url}
          alt={profile?.username || "User Avatar"}
        />
        <div className="ml-3 flex-1">
          <div className="text-sm font-semibold text-gray-100">
            {profile?.username || "Unknown User"}
          </div>
          <div className="text-xs text-gray-300">{timeSince(article.created_at)}</div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="text-gray-50 hover:cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-slate-900 border-gray-800 text-gray-50">
            <DropdownMenuLabel>My Article</DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem>
               <Link href={`/admin/edit/${article.id}`} className="w-full">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin/preview/${article.id}`} className="w-full">
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Publish</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem
              className="text-red-700 focus:text-red-700"
              onClick={() => onDelete && onDelete(article.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Likes & Title */}
      <div className="px-2">
        <div className="font-semibold text-lg  text-gray-100 line-clamp-3 mt-2">
          {findTitle(article.blocks.content)}
        </div>
        <div className="text-gray-500 text-sm mb-2 cursor-pointer mt-3">
          READ MORE
        </div>
      </div>

    </div>
  );
};

export default ArticleCard;
