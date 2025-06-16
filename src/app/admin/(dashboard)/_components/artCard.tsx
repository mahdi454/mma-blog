import { useUser } from "@/app/context/userContext";
import { findFirstImage, findTitle, timeSince } from "@/lib/utils";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import ArticleImage from "./imagArt";

export interface Article {
  id: number;
  title: string;
  author: string;
  published_date: string;
  content: string;
  category: string;
  tags: string[];
  image_url: string;
  likes: number;
  comments: number;
  is_featured: boolean;
}

interface ArticleCardProps {
  article: Article;
  onDelete?: (id: string) => Promise<void>;
}

const ArtCard: React.FC<ArticleCardProps> = ({ article, onDelete }) => {
  const { profile } = useUser();
  return (
    <div className="max-w-md mx-auto bg-black/50 backdrop-blur-[2px] border border-gray-400 rounded-lg shadow-sm mb-6 text-gray-50">
      {/* Header */}
      <div className="flex items-center px-4 py-2">
        <img
          className="h-10 w-10 rounded-full object-cover border border-gray-300"
          src={profile?.avatar_url || "/placeholder-avatar.png"}
          alt={profile?.username || "User Avatar"}
        />
        <div className="ml-3 flex-1">
          <div className="text-sm font-semibold text-gray-100">
            {profile?.username || "Unknown User"}
          </div>
          <div className="text-xs text-gray-300">
            {timeSince(article.published_date)}
          </div>
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
              onClick={() => onDelete && onDelete(article.id.toString())}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Image */}
      <ArticleImage article={article} />

      {/* Likes & Title */}
      <div className="px-2">
        <div className="font-semibold text-lg text-gray-100 line-clamp-3 mt-2">
          {article.title}
        </div>
        <div className="text-gray-500 text-sm mb-2 cursor-pointer mt-6">
          View all comments
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
