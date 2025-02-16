import axios from "axios";

const base_URL = "https://newsapi.org/v2/everything";
const API_KEY = process.env.API_KEY;

export async function fetchArticles(query: string) {
  try {
    const response = await axios.get(`${base_URL}`, {
      params: {
        q: query,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function fetchTopHeadlines(source: string) {
  try {
    const response = await axios.get(`${base_URL}`, {
      params: {
        sources: source,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}
