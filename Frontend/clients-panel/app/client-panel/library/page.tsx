'use client'

import { GetAllGamesFromLib } from '@/actions/get_all_games_from_lib/route';
import React, { useEffect, useState } from 'react'

interface Game {
  id_game: number;
  id_user: number;
  file_url: string;
  cover_image_game: string;
  title: string;
}

const Library = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false)

  const GetAllGams = async (id_user: any) => {
    try {
      const result = await GetAllGamesFromLib(id_user) as { data?: Game[] }; // ⬅️ tambahkan tipe aman di sini
      const data: Game[] = Array.isArray(result?.data) ? result.data : [];

      setGames(data);
    } catch (error) {
      console.error("Gagal mengambil data game dari library:", error);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true)
    const idUser = localStorage.getItem("id_user");
    if (idUser) {
      GetAllGams(idUser);
    } else {
      alert("Anda harus login terlebih dahulu")
      setLoading(false);
    }
  }, []);

  if (!isClient) return null

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Memuat data game...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Library Kamu</h1>

      {games.length === 0 ? (
        <p className="text-gray-500">Kamu belum memiliki game di library.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {games.map((game) => (
            <div
              key={game.id_game}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <img
                src={game.cover_image_game}
                alt={game.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h2 className="text-sm font-semibold">{game.title}</h2>
                <a
                  href={game.file_url}
                  className="text-blue-500 hover:text-blue-700 text-sm font-semibold border border-blue-500 px-2 py-1 rounded"
                >
                  Unduh Game
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
