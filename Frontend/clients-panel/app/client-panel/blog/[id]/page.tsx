"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:4000/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data))   // <= TIDAK PAKAI [0]
      .catch(() => setArticle(null));
  }, [id]);

  if (!article) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={article.thumbnail}
        alt={article.title}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-4">Publisher: {article.publisher}</p>

      <p className="text-gray-700 whitespace-pre-line text-lg leading-relaxed">
        {article.description}
      </p>
    </div>
  );
}
