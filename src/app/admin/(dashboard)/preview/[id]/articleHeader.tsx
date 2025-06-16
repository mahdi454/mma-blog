import { findTitle } from '@/lib/utils';
import { Article } from '@/utils/types'
import React from 'react'

type Props = {
    article: Article
}

function ArticleHeader({ article }: Props) {
      // Extract the first h1 heading as the title
  const title = findTitle(article.blocks?.content) || 'Article';
  return (
          <header className="mb-8">
            {article.badge && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide font-semibold mb-4">
                {article.badge}
              </span>
            )}

            <h1 className="text-4xl font-bold text-gray-100 mb-2">{title}</h1>

            <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
              <div className="flex items-center space-x-4">
                <span>{new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span>·</span>
                <span>5 min read</span>
              </div>
              <div>
                <span>Category: {article.category}</span>
              </div>
            </div>
          </header>
  )
}

export default ArticleHeader