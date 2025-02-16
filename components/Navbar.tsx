"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Newspaper } from "lucide-react";

export default function Navbar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/articles/${encodeURIComponent(query)}`;
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/80 shadow-md p-4 flex justify-between items-center z-50 px-10">
      <Link
        href="/"
        className="flex items-center text-xl font-bold text-gray-900"
      >
        <Newspaper className="w-6 h-6 mr-2 text-blue-600" />
        NewsApp
      </Link>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className="p-2 pl-10 w-72 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition-all"
        >
          Go
        </button>
      </form>

      <div className="hidden md:flex space-x-4">
        <Link
          href="/articles/bitcoin"
          className="text-gray-700 hover:text-blue-600"
        >
          Bitcoin
        </Link>
        <Link
          href="/articles/football"
          className="text-gray-700 hover:text-blue-600"
        >
          FootBall
        </Link>
        <Link
          href="/articles/coding"
          className="text-gray-700 hover:text-blue-600"
        >
          Coding
        </Link>
        <Link
          href="/articles/politics"
          className="text-gray-700 hover:text-blue-600"
        >
          Politics
        </Link>
        <Link
          href="/articles/business"
          className="text-gray-700 hover:text-blue-600"
        >
          Business
        </Link>
      </div>
    </nav>
  );
}
