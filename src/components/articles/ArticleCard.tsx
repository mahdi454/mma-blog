import Image from 'next/image';
import React from 'react';

type ArticleCardProps = {
  title: string;
  category: string;
  image: string;
};

export default function ArticleCard({ title, category, image }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Image src={image} alt={title} width={40} height={40} className="w-full h-48 object-cover"  />
      <div className="p-4">
        <span className="text-sm text-red-600 font-semibold">{category}</span>
        <h3 className="text-xl font-bold mt-2">{title}</h3>
        <button className="mt-4 text-blue-600 hover:text-blue-800">Read More →</button>
      </div>
    </div>
  );
}