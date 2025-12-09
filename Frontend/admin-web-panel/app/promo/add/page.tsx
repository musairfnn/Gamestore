"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Game {
  id_game: number;
  title: string;
  price?: number;
  image_profile_url?: string;
}

export default function PromoAddForm() {
  const router = useRouter();

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    id_game: "",
    nama_promo: "",
    diskon: "",
    tanggal_mulai: "",
    tanggal_berakhir: "",
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("http://localhost:4000/games/client");
        const json = await res.json();

        console.log("GET /games/client response:", json);

        const extractGames = (payload: any): Game[] => {
          if (!payload) return [];
          if (Array.isArray(payload)) return payload;
          if (Array.isArray(payload.data)) return payload.data;
          if (payload.data && Array.isArray(payload.data.data)) return payload.data.data;
          if (Array.isArray(payload.result)) return payload.result;
          return [];
        };

        const list = extractGames(json);
        setGames(list);
      } catch (err) {
        console.error("Error fetch games:", err);
        setErrorMsg("Gagal mengambil daftar game. Cek console/network.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (
      !form.id_game ||
      !form.nama_promo ||
      !form.diskon ||
      !form.tanggal_mulai ||
      !form.tanggal_berakhir
    ) {
      setErrorMsg("Semua field wajib diisi.");
      return;
    }

    // ⭐ Cari harga asli game dari list games
    const selectedGame = games.find(
      (g) => String(g.id_game) === String(form.id_game)
    );

    if (!selectedGame || selectedGame.price === undefined) {
      setErrorMsg("Harga game tidak ditemukan.");
      return;
    }

    const originalPrice = Number(selectedGame.price);
    const percent = Number(form.diskon);

    // ⭐ Hitung price_promo = harga setelah diskon
    const price_promo = Math.max(
      0,
      originalPrice - (originalPrice * percent) / 100
    );

    // Payload sesuai backend kamu
    const payload = {
      id_game: Number(form.id_game),
      promo_title: form.nama_promo,
      price_promo: price_promo,
      start_date: form.tanggal_mulai,
      end_date: form.tanggal_berakhir,
    };

    console.log("PAYLOAD DIKIRIM:", payload);

    try {
      const res = await fetch("http://localhost:4000/promo/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      console.log("POST /promo/add response:", json);

      if (res.ok && (json.status === 200 || json.success)) {
        router.push("/promo");
      } else {
        setErrorMsg(json.message || "Gagal menambah promo");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Terjadi kesalahan saat menghubungi server.");
    }
  };

  if (loading) return <p className="p-6">Loading game data...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Tambah Promo Baru</h1>

      {errorMsg && (
        <div className="mb-4 p-3 text-sm rounded bg-red-100 text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Game Dropdown */}
        <div>
          <label className="block mb-1 text-sm font-medium">Pilih Game</label>
          <select
            name="id_game"
            className="w-full border p-2 rounded"
            value={form.id_game}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Game --</option>
            {games.length === 0 ? (
              <option disabled>No games available</option>
            ) : (
              games.map((g) => (
                <option key={g.id_game} value={String(g.id_game)}>
                  {g.title} — Rp {Number(g.price).toLocaleString("id-ID")}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Nama Promo */}
        <div>
          <label className="block mb-1 text-sm font-medium">Nama Promo</label>
          <input
            type="text"
            name="nama_promo"
            className="w-full border p-2 rounded"
            value={form.nama_promo}
            onChange={handleChange}
            required
          />
        </div>

        {/* Diskon */}
        <div>
          <label className="block mb-1 text-sm font-medium">Diskon (%)</label>
          <input
            type="number"
            name="diskon"
            className="w-full border p-2 rounded"
            value={form.diskon}
            onChange={handleChange}
            required
            min={1}
            max={99}
          />
        </div>

        {/* Tanggal Mulai */}
        <div>
          <label className="block mb-1 text-sm font-medium">Tanggal Mulai</label>
          <input
            type="date"
            name="tanggal_mulai"
            className="w-full border p-2 rounded"
            value={form.tanggal_mulai}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tanggal Berakhir */}
        <div>
          <label className="block mb-1 text-sm font-medium">Tanggal Berakhir</label>
          <input
            type="date"
            name="tanggal_berakhir"
            className="w-full border p-2 rounded"
            value={form.tanggal_berakhir}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Tambahkan Promo
        </button>
      </form>
    </div>
  );
}
