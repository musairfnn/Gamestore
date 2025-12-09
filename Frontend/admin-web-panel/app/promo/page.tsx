"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/adminSidebar";

type RawPromo = any;

interface Promo {
  id_promo: number;
  id_game?: number;
  game_name: string;
  promo_title: string;
  price_promo?: number;
  start_date?: string;
  end_date?: string;
}

export default function PromoListPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const fetchPromos = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("http://localhost:4000/promo");
      const json = await res.json();

      const extractArray = (payload: any): RawPromo[] => {
        if (!payload) return [];
        if (Array.isArray(payload)) return payload;
        if (Array.isArray(payload.data)) return payload.data;
        if (payload.data?.data && Array.isArray(payload.data.data)) return payload.data.data;
        if (Array.isArray(payload.result)) return payload.result;
        if (payload.data?.rows && Array.isArray(payload.data.rows)) return payload.data.rows;
        if (Array.isArray(payload.rows)) return payload.rows;

        for (const k of Object.keys(payload)) {
          if (Array.isArray(payload[k])) return payload[k];
        }
        return [];
      };

      const rawList = extractArray(json);

      // Normalisasi data promo
      const normalized: Promo[] = rawList.map((r: any) => ({
        id_promo: Number(r.id_promo ?? r.id ?? r.promo_id ?? 0),
        id_game: r.id_game ?? r.game_id,
        game_name:
          r.game_name ??
          r.game_title ??
          r.title ??
          r.name ??
          r.name_game ??
          (r.game?.name ?? "") ??
          `Game ${r.id_game ?? ""}`,
        promo_title: r.promo_title ?? r.nama_promo ?? r.title ?? "",
        price_promo:
          typeof r.price_promo !== "undefined"
            ? Number(r.price_promo)
            : undefined,
        start_date: r.start_date ?? r.tanggal_mulai ?? "-",
        end_date: r.end_date ?? r.tanggal_berakhir ?? "-",
      }));

      setPromos(normalized);
    } catch (err) {
      console.error("Error fetch promos:", err);
      setErrorMsg("Gagal mengambil data promo. Cek server backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  // Fungsi hapus promo
  const handleDelete = async (id_promo: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus promo ini?");
    if (!confirmDelete) return;

    setDeleteLoading(id_promo);
    setErrorMsg(null);

    try {
      const res = await fetch(`http://localhost:4000/promo/delete/${id_promo}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete promo with id ${id_promo}`);
      }

      const data = await res.json();
      alert(data.message || "Promo berhasil dihapus");
      await fetchPromos(); // refresh list
    } catch (err) {
      console.error(err);
      setErrorMsg("Gagal menghapus promo. Cek server backend.");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) return <p className="p-6">Loading promos...</p>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Promo List</h1>

          <Link href="/promo/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Add Promo
          </Link>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 text-sm rounded bg-red-100 text-red-700">{errorMsg}</div>
        )}

        {promos.length === 0 ? (
          <div className="p-4 text-center text-gray-600">
            Tidak ada promo untuk ditampilkan.
          </div>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Game</th>
                <th className="p-2 border">Promo</th>
                <th className="p-2 border">Harga Promo</th>
                <th className="p-2 border">Tanggal Mulai</th>
                <th className="p-2 border">Tanggal Berakhir</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {promos.map((p) => (
                <tr key={p.id_promo}>
                  <td className="border p-2">{p.id_promo}</td>
                  <td className="border p-2">{p.game_name}</td>
                  <td className="border p-2">{p.promo_title}</td>

                  {/* Format harga promo */}
                  <td className="border p-2">
                    {p.price_promo
                      ? `Rp ${p.price_promo.toLocaleString("id-ID")}`
                      : "-"}
                  </td>

                  <td className="border p-2">{p.start_date}</td>
                  <td className="border p-2">{p.end_date}</td>

                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDelete(p.id_promo)}
                      disabled={deleteLoading === p.id_promo}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      {deleteLoading === p.id_promo ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
