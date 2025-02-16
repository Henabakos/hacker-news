import ArticleList from "@/components/ArticleList";
import { fetchTopHeadlines } from "@/utils/api";

export default async function HomePage() {
  const articles = await fetchTopHeadlines("bbc-news");
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
          <img
            src={featuredArticle.urlToImage || "/default-image.jpg"}
            alt={featuredArticle.title}
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
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
