"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Game Blog & News</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-600">Belum ada artikel.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((item) => (
            <Link
              key={item.id}
              href={`/client-panel/blog/${item.id}`}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <img
                src={item.thumbnail}
                className="w-full h-48 object-cover rounded-md mb-3"
                alt={item.title}
              />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.publisher}</p>
              <p className="text-gray-600 line-clamp-3 mt-2 text-sm">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
