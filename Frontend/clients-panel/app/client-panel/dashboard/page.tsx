"use client";

import { AddToCartMethod } from "@/actions/Add_To_Cart/route";
import { CheckTheGame } from "@/actions/check_the_game_in_lib/route";
import { GetAllGames } from "@/actions/get_all_games/route";
import CardProducts from "@/components/CardProducts";
import React, { useEffect, useState } from "react";

interface Game {
  id_game: number;
  id_dev: number;
  title: string;
  publisher: string;
  description: string;
  category: string;
  price: number;
  price_promo?: number | null;
  promo_title?: string | null;
  file_url: string;
  image_profile_url: string;
  rating?: number;
  image_url?: string;
  status_buyed: boolean;
}

const Dashboard = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [id_user, setIdUser] = useState<string | null>(null);

  // ⭐ FIX: per-game library status, bukan global
  const [libraryStatus, setLibraryStatus] = useState<{ [key: number]: boolean }>({});

  const CheckGameInLib = async (datas: any) => {
    const result = await CheckTheGame(datas);

    if (result.status === 200) {
      console.log("Game is already in library:", datas.id_game);

      // ⭐ Simpan status khusus untuk game itu saja
      setLibraryStatus((prev) => ({
        ...prev,
        [datas.id_game]: true,
      }));
    }

    return result;
  };

  useEffect(() => {
    setIsClient(true);

    const id_user_local = localStorage.getItem("id_user");
    if (id_user_local) {
      setIdUser(id_user_local);
    }

    const fetchGames = async () => {
      try {
        const result = await GetAllGames();
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

  if (!isClient) return null;

  const HandleAddToCart = async (datas: any) => {
    if (!datas.id_user) {
      alert("Please login first");
      return;
    }

    const result1 = await CheckGameInLib(datas);

    if (result1.status === 200) {
      alert("Game sudah ada di Library, tidak bisa ditambahkan ke cart.");
      return;
    }

    const result = await AddToCartMethod(datas);

    if (result.status === 200) {
      alert("Game ditambahkan ke cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Section Semua Game */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold mb-4">All Games In Store</h2>

        {loading ? (
          <p>Loading games...</p>
        ) : games.length === 0 ? (
          <p className="text-gray-600">Belum ada game yang tersedia.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {games.map((game) => (
              <div
                key={game.id_game}
                onClick={() => setSelectedGame(game)}
                className="w-[180px] bg-white rounded-lg shadow hover:shadow-lg transition p-3 cursor-pointer"
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

                  {/* Harga + Promo */}
                  <p className="text-sm font-medium mt-1">
                    {game.price_promo ? (
                      <>
                        <span className="line-through text-gray-400 text-xs block">
                          Rp {game.price.toLocaleString("id-ID")}
                        </span>

                        <span className="text-red-600 font-semibold">
                          Rp {game.price_promo.toLocaleString("id-ID")}
                        </span>

                        <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded">
                          Promo
                        </span>
                      </>
                    ) : (
                      <span>Rp {game.price.toLocaleString("id-ID")}</span>
                    )}
                  </p>

                  {/* Add to cart */}
                  <p className="text-sm font-medium mt-1">
                    {libraryStatus[game.id_game] ? (
                      <span className="text-blue-500">In Library</span>
                    ) : (
                      <button
                        className="hover:text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();

                          HandleAddToCart({
                            id_user,
                            id_game: game.id_game,
                            price: game.price_promo ?? game.price,
                          });
                        }}
                      >
                        Add to cart
                      </button>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedGame && (
        <CardProducts
          games={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
