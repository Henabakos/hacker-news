"use client";
import { fetchArticles } from "@/utils/api";
import ArticleList from "@/components/ArticleList";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Article } from "@/components/ArticleList";

export default function ArticlesPage({
  params,
}: {
  params: { query: string };
}) {
  const query = decodeURIComponent(params.query);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 12);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      const fetchedArticles = await fetchArticles(query, currentPage);
      setArticles(fetchedArticles);
      setLoading(false);
    }
    loadArticles();
  }, [query, currentPage]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const featuredArticle = articles.length > 0 ? articles[0] : null;

  return (
    <div className="container mx-auto p-6">
      <section
        className="relative bg-gray-900 text-white py-20 px-6 rounded-lg shadow-lg mb-8"
        style={{
          backgroundImage: `url(${
            featuredArticle?.urlToImage || "/default-news.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl font-bold">
            Latest Articles on &ldquo;{query}&rdquo;
          </h1>
          <p className="mt-2 text-lg text-gray-300">
            Stay updated with the most recent news, reports, and in-depth
            analysis on {query}.
          </p>
        </div>
      </section>

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
