import React from "react";
import Image from "next/image";
interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest News</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <div
            key={article.url}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {article.urlToImage && (
              <Image
                src={article.urlToImage || "/default-image.jpg"}
                alt={article.title}
                width={384}
                height={216}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h3>
              <p className="text-gray-700 mt-2 text-sm line-clamp-3">
                {article.description || "No description available."}
              </p>
              <small className="text-gray-500 block mt-3">
                By {article.author || "Unknown"} |{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
