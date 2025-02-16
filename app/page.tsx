"use client";
import { fetchTopHeadlines } from "@/utils/api";
import ArticleList from "@/components/ArticleList";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HomePage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 12);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      const fetchedArticles = await fetchTopHeadlines("bbc-news", currentPage);
      setArticles(fetchedArticles);
      setLoading(false);
    }
    loadArticles();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const featuredArticle = articles.length > 0 ? articles[0] : null;

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">BBC News</h1>
        <p className="text-gray-600 mt-2">
          Stay informed with the latest breaking news, analysis, and in-depth
          reports from around the world.
        </p>
      </header>

      {featuredArticle && (
        <section className="mb-8 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          <Image
            src={featuredArticle.urlToImage || "/default-image.jpg"}
            alt={featuredArticle.title}
            width={640}
            height={360}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              <a
                href={featuredArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                {featuredArticle.title}
              </a>
            </h2>
            <p className="text-gray-700 mt-2">
              {featuredArticle.description || "No description available."}
            </p>
            <small className="text-gray-500 mt-2 block">
              By {featuredArticle.author || "Unknown"} |{" "}
              {new Date(featuredArticle.publishedAt).toLocaleDateString()}
            </small>
          </div>
        </section>
      )}

      <div className="bg-white shadow-md p-6 rounded-lg">
        {loading ? <p>Loading...</p> : <ArticleList articles={articles} />}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {currentPage}</span>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
