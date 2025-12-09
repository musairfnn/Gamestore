"use client";

import { DeleteGameMethod } from "@/actions/delete-game/route";
import { GetGames } from "@/actions/get-games-uploaded/route";
import CardProduct from "@/components/CardProduct";
import React, { useEffect, useState } from "react";

interface Game {
  id_game: number;
  id_dev: number;
  title: string;
  publisher: string;
  description: string;
  category: string;
  price: number;
  file_url: string;
  image_profile_url: string; 
  rating?: number;
  image_url?: string; 
}

const Dashboard = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGames] = useState<Game | null>(null)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const idDev = localStorage.getItem("id_dev");
        const username_dev = localStorage.getItem("username")
        
        if(username_dev !== null) setUsername(username_dev)

        if (!idDev) {
          setLoading(false);
          return;
        }

        const result = await GetGames(idDev);

        // pastikan ambil hanya properti data
        const data: Game[] = Array.isArray(result?.data) ? result.data : [];

        setGames(data);
      } catch (err) {
        console.error("Gagal fetch game:", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const DeleteGame = async (id: any) => {
      try {
        const result = await DeleteGameMethod(id)

        if (result.status === 200) {
          // update state langsung
          alert(result.message)
          setGames((prevGames) => prevGames.filter((g) => g.id_game !== id));
        }
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}

      {/* Section Rekomendasi */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4">{username ? username: ""}</h2>

        {loading ? (
          <p>Loading games...</p>
        ) : games.length === 0 ? (
          <p className="text-gray-600">Belum ada game yang diupload.</p>
        ) : (
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {games.map((game) => (
              <div
                key={game.id_game}
                onClick={() => setSelectedGames(game)}
                className="min-w-[180px] bg-white rounded-lg shadow hover:shadow-lg transition p-3 cursor-pointer"
              >
                {/* Cover */}
                <div className="w-full h-36 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                  {game.image_profile_url ? (
                    <img
                      src={game.image_profile_url}
                      alt={game.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>

                {/* Info */}
                <div className="mt-3">
                  <h3 className="text-sm font-semibold line-clamp-1">
                    {game.title}
                  </h3>
                  <p className="text-xs text-gray-500">{game.publisher}</p>
                  <p className="text-sm font-medium mt-1 flex items-center justify-between">
                    <span>Rp. {game.price.toLocaleString("id-ID")}</span>
                    <button
                      onClick={() => DeleteGame(game.id_game)}
                      className="ml-2 text-red-500 hover:text-red-700 text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {
        selectedGame && (<CardProduct game={selectedGame} onClose={() => setSelectedGames(null)}/>)
      }
    </div>
  );
};

export default Dashboard;
