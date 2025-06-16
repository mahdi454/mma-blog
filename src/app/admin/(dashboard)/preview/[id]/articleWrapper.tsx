"use client";

import ArticleRenderer from "./articleRender";
import { Article } from "@/utils/types";
import ArticleHeader from "./articleHeader";

interface ArticleClientWrapperProps {
  article: Article;
}

export function ArticleClientWrapper({ article }: ArticleClientWrapperProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-black/10 backdrop-blur-sm">
      {/* Article header */}
      <ArticleHeader article={article} />
      {/* Article content */}
      <article className="prose lg:prose-xl max-w-none">
        <ArticleRenderer content={article.blocks} />
      </article>

      {/* Keywords/tags */}
      {article.keywords && article.keywords.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Related Topics</h3>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
