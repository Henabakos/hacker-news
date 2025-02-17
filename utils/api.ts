import axios from "axios";

const base_URL = "https://newsapi.org/v2/everything";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

export async function fetchArticles(query: string, page = 1, pageSize = 10) {
  try {
    const response = await axios.get(`${base_URL}`, {
      params: {
        q: query,
        apiKey: API_KEY,
        page: page,
        pagesize: pageSize,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function fetchTopHeadlines(
  source: string,
  page = 1,
  pageSize = 10
) {
  try {
    const response = await axios.get(`${base_URL}`, {
      params: {
        sources: source,
        page: page,
        pagesize: pageSize,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}
