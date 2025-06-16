import Image from 'next/image';

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
export default function ArticleImage({ article }: { article: Article }) {
  const unsplashId = article.image_url?.split('/photos/')[1]?.split('?')[0];
  const imageUrl = unsplashId 
    ? `https://images.unsplash.com/photo-${unsplashId}?w=1200&auto=format` 
    : '/placeholder-image.png';

  return (
    <div className="w-full h-96 relative">
      <Image
        src={imageUrl}
        alt={article.title || "Article image"}
        fill
        className="object-cover"
        sizes="100vw"
        priority={article.is_featured}
      />
    </div>
  );
}