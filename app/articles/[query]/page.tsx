import { fetchArticles } from "@/utils/api";
import ArticleList from "@/components/ArticleList";

export default async function ArticlesPage({
  params,
}: {
  params: { query: string };
}) {
  const query = decodeURIComponent(params.query);
  const articles = await fetchArticles(query);
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
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
