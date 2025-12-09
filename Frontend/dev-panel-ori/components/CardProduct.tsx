import { GetAllComments } from "@/actions/Get_all_comments/route";
import { GetAllRating } from "@/actions/Get_all_rating/route";
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
  image_url?: string; // ini kumpulan link dipisah koma
}

interface CardProductProps {
  game: Game;
  onClose: () => void;
}

interface Rating {
  id_rating: number;
  id_game: number;
  id_user: number;
  rating: number;
}

interface Comment {
  id_review: number;
  id_game: number;
  id_user: number;
  comment: string;
  date_comment: string;
}

const CardProduct: React.FC<CardProductProps> = ({ game, onClose }) => {
  // pecah string jadi array link gambar
  const screenshots = typeof game.image_url === "string" && game.image_url.length > 0
  ? game.image_url.split(",")
  : [];


  const [ratings, setRatings] = useState(Number);
  const [comments, setComments] = useState<Comment[]>([]);

  const GetAllRatingMethod = async (id_game: any) => {
    const result = await GetAllRating(id_game)

    const ratingsArray: Rating[] = Array.isArray(result?.datas)
    ? result.datas
    : [];

    if(!ratingsArray || ratingsArray.length === 0) {
      return;
    }

    const totalRatings = ratingsArray.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRatings / ratingsArray.length;

    setRatings(Number(averageRating.toFixed(1)));
  }

  const GetAllCommentMethod = async (id_game: any) => {
    const result = await GetAllComments(id_game)

    const commentsArray: Comment[] = Array.isArray(result?.datas)
    ? result.datas
    : [];

    setComments(commentsArray)
  }

  useEffect(() => {
    GetAllRatingMethod(game.id_game)
    GetAllCommentMethod(game.id_game)
  }, [game.id_game]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[800px] max-h-[90vh] overflow-y-auto relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Cover Utama */}
        <div className="w-full h-64 bg-gray-200 overflow-hidden rounded-t-xl">
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
        <div className="p-6">
          <h2 className="text-2xl font-bold">{game.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{game.publisher}</p>
          <p className="text-gray-700 mb-4">{game.description}</p>
          <div className="flex items-center text-sm mt-1">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{ratings ?? "Belum ada rating"}</span>
          </div>

          <p><br/></p>

          {/* Screenshot Gallery */}
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

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">
              Rp {game.price.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="mt-8 p-4 border-t">
            <h3 className="text-lg font-bold mb-3">Komentar Pemain</h3>

            {comments.length === 0 ? (
              <p className="text-gray-500">Belum ada komentar</p>
            ) : (
              <div className="space-y-3">
                {comments.map((c) => (
                  <div
                    key={c.id_review}
                    className="p-3 bg-gray-100 border rounded-lg"
                  >
                    <p className="text-sm text-gray-700">{c.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Date: {new Date(c.date_comment).toLocaleDateString()}
                    </p>
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

export default CardProduct;
