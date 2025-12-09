"use client";

import { BuyingMethod } from "@/actions/buy_the_game/route";
import { CheckTheGame } from "@/actions/check_the_game_in_lib/route";
import { GetAllCommentarGame } from "@/actions/Get_all_commentar_game/route";
import { GetRatingGame } from "@/actions/Get_rating_game/route";
import { InputTheGameIntoLib } from "@/actions/input_game_into_lib/route";
import { CreateNewCommentar, DeleteComment } from "@/actions/Input_komentar_player/route";
import { CreateNewRating } from "@/actions/Input_rating_game/route";
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
  image_url?: string;
}

interface Ratings {
  id_rating: number;
  id_game: number;
  id_user: number;
  rating: number;
}

interface CardProductsProps {
  games: Game;
  onClose: () => void;
}

interface Comment {
  id_review: number;
  id_user: number;
  id_game: number;
  comment: string;
  date_comment: Date;
  username?: string;
}

const CardProducts: React.FC<CardProductsProps> = ({ games, onClose }) => {
  const [idUser, setIdUser] = useState<string | null>(null);
  const [checkGameInLib, setTheCondition] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [snapReady, setSnapReady] = useState<boolean>(false);

  useEffect(() => {
    const uid = localStorage.getItem("id_user");
    setIdUser(uid);
  }, []);

  // LOAD SNAP.JS
  useEffect(() => {
    const SCRIPT_ID = "midtrans-snap-js";
    if (document.getElementById(SCRIPT_ID)) {
      waitForSnap(5000).then((ok) => setSnapReady(ok));
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ""
    );
    script.async = true;

    script.onload = () => {
      waitForSnap(5000).then((ok) => setSnapReady(ok));
    };

    script.onerror = () => {
      console.error("Snap.js gagal dimuat");
      setSnapReady(false);
    };

    document.body.appendChild(script);
  }, []);

  const waitForSnap = (timeoutMs: number) => {
    return new Promise<boolean>((resolve) => {
      const intervalMs = 200;
      const maxTries = Math.ceil(timeoutMs / intervalMs);
      let tries = 0;
      const t = setInterval(() => {
        tries++;
        if ((window as any).snap) {
          clearInterval(t);
          resolve(true);
          return;
        }
        if (tries >= maxTries) {
          clearInterval(t);
          resolve(false);
        }
      }, intervalMs);
    });
  };

  // HANDLE BUY
  const HandleBuyingTheGame = async () => {
    if (!idUser) {
      alert("Please login first");
      return;
    }
    if (!snapReady || typeof (window as any).snap === "undefined") {
      alert("Payment system is not ready. Try again in a moment.");
      return;
    }

    try {
      const finalPrice = games.price_promo ?? games.price;

      const resultBuyMethod = await BuyingMethod({
        id_user: idUser,
        id_game: games.id_game,
        title: games.title,
        price: finalPrice,
        gross_amount: finalPrice,
      });

      if (!resultBuyMethod || !resultBuyMethod.token) {
        alert(resultBuyMethod?.message || "Gagal mendapatkan token pembayaran");
        return;
      }

      const snapInstance = (window as any).snap;
      if (!snapInstance) {
        alert("Payment system not ready.");
        return;
      }

      snapInstance.pay(resultBuyMethod.token, {
        onSuccess: async () => {
          const inputResult = await InputTheGameIntoLib({
            id_user: idUser,
            id_game: games.id_game,
            title: games.title,
            cover_image_game: games.image_profile_url,
            file_url: games.file_url,
          });

          if (inputResult.status === 200) {
            alert("Game berhasil dimasukkan ke Library!");
            window.location.reload();
          } else {
            alert("Gagal menambahkan game ke Library.");
          }
        },
        onPending: () => {
          alert("Pembayaran sedang diproses.");
        },
        onError: () => {
          alert("Terjadi kesalahan saat pembayaran.");
        },
        onClose: () => {
          console.log("snap closed by user");
        },
      });
    } catch (error) {
      console.error("Pembayaran error:", error);
      alert("Gagal memproses pembayaran");
    }
  };

  const CheckGame = async () => {
    if (!idUser) return;
    try {
      const result = await CheckTheGame({
        id_game: games.id_game,
        id_user: idUser,
      });
      if (result.status === 200) setTheCondition(true);
    } catch {}
  };

  const GetRatingGameMethod = async () => {
    try {
      const result = await GetRatingGame(games.id_game);
      const ratingsArray: Ratings[] = result.datas;
      if (!ratingsArray?.length) return;
      const total = ratingsArray.reduce((sum, item) => sum + item.rating, 0);
      const average = total / ratingsArray.length;
      setRating(Number(average.toFixed(1)));
    } catch {}
  };

  const GetAllCommentsMethod = async () => {
    try {
      const result = await GetAllCommentarGame(games.id_game);
      const commentsArray: Comment[] =
        result && result.datas && Array.isArray(result.datas)
          ? result.datas.map((c: Comment) => ({
              ...c,
              username: c.username || "Unknown",
            }))
          : [];
      setAllComments(commentsArray);
      console.log("✅ Loaded comments:", commentsArray);
    } catch (err) {
      console.error("Failed to fetch comments", err);
      setAllComments([]);
    }
  };

  const CreateNewRatingMethod = async () => {
    if (userRating <= 0) return alert("Rating harus diisi");
    if (!idUser) return;
    try {
      const result = await CreateNewRating({
        id_game: games.id_game,
        id_user: idUser,
        rating: userRating,
      });
      alert(result.message);
    } catch {}
  };

  const CreateNewCommentarMethod = async () => {
    if (!comment.trim()) return alert("Komentar tidak boleh kosong");
    if (!idUser) return;
    try {
      const result = await CreateNewCommentar({
        id_game: games.id_game,
        id_user: idUser,
        comment,
      });
      alert(result.message);
      setComment("");
      await GetAllCommentsMethod();
    } catch {}
  };

  // HAPUS KOMEN (diperbarui: id_user dikirim lewat query param)
  const DeleteCommentMethod = async (id_review: number) => {
    if (!idUser) return;
    if (!confirm("Apakah kamu yakin ingin menghapus komentar ini?")) return;
    try {
      const result = await DeleteComment({ id_review, id_user: idUser }); // query param akan dipakai di action
      alert(result.message);
      await GetAllCommentsMethod();
    } catch (err) {
      console.error("Gagal hapus komentar:", err);
    }
  };

  useEffect(() => {
    if (idUser) CheckGame();
    GetRatingGameMethod();
    GetAllCommentsMethod();
  }, [idUser, games.id_game]);

  const screenshots = games.image_url ? games.image_url.split(",") : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[800px] max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <div className="w-full h-64 bg-gray-200 overflow-hidden rounded-t-xl">
          {games.image_profile_url ? (
            <img
              src={games.image_profile_url}
              alt={games.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold">{games.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{games.publisher}</p>
          <p className="text-gray-700 mb-4">{games.description}</p>

          <div className="flex items-center text-sm mt-1">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{rating ?? "Belum ada rating"}</span>
          </div>

          {screenshots.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Screenshots</h3>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {screenshots.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`screenshot-${idx}`}
                    className="w-60 h-36 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-green-600">
              {games.price_promo ? (
                <div>
                  <span className="line-through text-gray-400 text-sm block">
                    Rp {games.price.toLocaleString("id-ID")}
                  </span>
                  <span className="text-red-600 font-bold text-2xl">
                    Rp {games.price_promo.toLocaleString("id-ID")}
                  </span>
                  <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded">
                    {games.promo_title ?? "Promo"}
                  </span>
                </div>
              ) : (
                <span>Rp {games.price.toLocaleString("id-ID")}</span>
              )}
            </span>

            {checkGameInLib ? (
              <h1 className="text-blue-500 hover:text-blue-700 text-sm font-semibold border border-blue-500 px-3 py-1.5 rounded">
                Game in Library
              </h1>
            ) : (
              <button
                onClick={HandleBuyingTheGame}
                className={`text-blue-500 border border-blue-500 px-3 py-1.5 rounded text-sm font-semibold
                  ${!snapReady ? "opacity-70 cursor-not-allowed" : "hover:text-blue-700"}`}
                disabled={!snapReady}
              >
                {snapReady ? "Buy" : "Loading payment..."}
              </button>
            )}
          </div>

          {checkGameInLib && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Beri Rating</h3>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-2xl cursor-pointer ${
                      (hoverRating || userRating) >= star
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tuliskan pendapatmu..."
                className="w-full border border-gray-300 rounded-lg p-2 h-24 mt-3"
              />

              <button
                onClick={async () => {
                  await CreateNewRatingMethod();
                  await CreateNewCommentarMethod();
                }}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Kirim Rating & Komentar
              </button>
            </div>
          )}

          <div className="mt-8 p-4 border-t">
            <h3 className="text-lg font-bold mb-3">Komentar Pemain</h3>

            {allComments.length === 0 ? (
              <p className="text-gray-500">Belum ada komentar</p>
            ) : (
              <div className="space-y-3">
                {allComments.map((c) => (
                  <div key={c.id_review} className="p-3 bg-gray-100 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-500 font-semibold">{c.username}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-400">
                          {new Date(c.date_comment).toLocaleDateString()}
                        </p>
                        {idUser && idUser === String(c.id_user) && (
                          <button
                            onClick={() => DeleteCommentMethod(c.id_review)}
                            className="text-red-500 text-xs hover:underline"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{c.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProducts;
