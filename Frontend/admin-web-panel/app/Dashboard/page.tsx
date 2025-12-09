"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/adminSidebar";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface DatasRevenue {
  id_pendapatan: number;
  pendapatan: number;
  tanggal: string;
}

type CostItem = {
  id: string;
  label: string;
  amount: number;
};

export default function Dashboard() {
  const [datas, setDatas] = useState<DatasRevenue[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [todayRevenue, setTodayRevenue] = useState<number>(0);
  const [monthRevenue, setMonthRevenue] = useState<number>(0);

  // --- administrasi costs state ---
  const [costs, setCosts] = useState<CostItem[]>([
    { id: "gaji", label: "Gaji Karyawan", amount: 0 },
    { id: "hosting", label: "Biaya Hosting", amount: 0 },
    { id: "listrik", label: "Biaya Listrik", amount: 0 },
    { id: "maintenance", label: "Maintenance & Perawatan", amount: 0 },
    { id: "lainnya", label: "Biaya Lainnya", amount: 0 },
  ]);

  // basis perhitungan: total / bulan ini / hari ini
  const [basis, setBasis] = useState<"total" | "month" | "today">("total");

  const fetchDatasRevenue = async () => {
    try {
      const response = await fetch("/api/revenues");
      const result = await response.json();

      const datas_revenue: DatasRevenue[] = Array.isArray(result.datas)
        ? result.datas
        : [];

      setDatas(datas_revenue);

      const total_revenue = datas_revenue.reduce(
        (acc, item) => acc + item.pendapatan,
        0
      );
      setTotal(total_revenue);

      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");

      const today_revenue = datas_revenue
        .filter((item) => item.tanggal.startsWith(todayStr))
        .reduce((acc, item) => acc + item.pendapatan, 0);
      setTodayRevenue(today_revenue);

      const month_revenue = datas_revenue
        .filter((item) => item.tanggal.startsWith(`${year}-${month}`))
        .reduce((acc, item) => acc + item.pendapatan, 0);
      setMonthRevenue(month_revenue);
    } catch (error) {
      console.error("Gagal mengambil data pendapatan:", error);
    }
  };

  useEffect(() => {
    fetchDatasRevenue();
  }, []);

  // ==================== 📌 AGREGASI HARIAN UNTUK CHART ====================
  const dailyMap: Record<string, number> = {};
  datas.forEach((item) => {
    const iso = new Date(item.tanggal).toISOString();
    const dayKey = iso.split("T")[0];
    if (!dailyMap[dayKey]) dailyMap[dayKey] = 0;
    dailyMap[dayKey] += item.pendapatan;
  });

  const sortedDays = Object.keys(dailyMap).sort((a, b) =>
    a.localeCompare(b)
  );

  const chartLabels = sortedDays.map((d) =>
    new Date(d).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    })
  );
  const chartDataValues = sortedDays.map((d) => dailyMap[d]);

  const grafikData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Pendapatan per Hari (Rp)",
        data: chartDataValues,
        backgroundColor: "#4ade80",
        borderRadius: 6,
        maxBarThickness: 48,
        hoverBackgroundColor: "#22c55e",
      },
    ],
  };

  const grafikOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { font: { size: 12 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const val = ctx.raw ?? 0;
            return `Rp ${Number(val).toLocaleString("id-ID")}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 12 } },
        grid: { display: false },
      },
      y: {
        ticks: {
          callback: (val: any) => `Rp ${Number(val).toLocaleString("id-ID")}`,
          font: { size: 12 },
        },
        grid: { color: "rgba(0,0,0,0.06)" },
      },
    },
    animation: { duration: 700, easing: "easeOutQuart" },
  };

  // ------------------ Administrasi: perhitungan ------------------
  const totalCost = costs.reduce((acc, c) => acc + Number(c.amount || 0), 0);

  const revenueBasisValue =
    basis === "total" ? total : basis === "month" ? monthRevenue : todayRevenue;

  const netProfit = revenueBasisValue - totalCost;

  // handlers
  const handleCostChange = (id: string, value: string) => {
    // terima string dari input, bersihkan non-digit
    const numeric = value.replace(/[^0-9]/g, "");
    const num = numeric === "" ? 0 : Number(numeric);
    setCosts((prev) => prev.map((c) => (c.id === id ? { ...c, amount: num } : c)));
  };

  const formatRp = (v: number) => "Rp " + v.toLocaleString("id-ID");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Dashboard Pendapatan</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-green-100 border border-green-300 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              Total Pendapatan
            </h2>
            <p className="text-4xl font-bold text-green-800">
              Rp {total.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="p-6 bg-blue-100 border border-blue-300 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              Pendapatan Hari Ini
            </h2>
            <p className="text-4xl font-bold text-blue-800">
              Rp {todayRevenue.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="p-6 bg-yellow-100 border border-yellow-300 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-yellow-700 mb-2">
              Pendapatan Bulan Ini
            </h2>
            <p className="text-4xl font-bold text-yellow-800">
              Rp {monthRevenue.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* 📊 Grafik - Pendapatan per hari */}
        <div className="bg-white p-6 rounded-lg shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Statistik Pendapatan (Per Hari)</h2>
          <div style={{ width: "100%", height: 320 }}>
            {sortedDays.length > 0 ? (
              <Bar data={grafikData} options={grafikOptions as any} />
            ) : (
              <p className="text-gray-500 text-center py-4">
                Belum ada data untuk ditampilkan
              </p>
            )}
          </div>
        </div>

        {/* TABLE Pendapatan */}
        <div className="overflow-x-auto border rounded-lg shadow mb-8">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border text-left">ID Pendapatan</th>
                <th className="py-3 px-4 border text-left">Pendapatan (Rp)</th>
                <th className="py-3 px-4 border text-left">Tanggal</th>
              </tr>
            </thead>

            <tbody>
              {datas.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-4 px-6 border text-center text-gray-500"
                  >
                    Belum ada data pendapatan
                  </td>
                </tr>
              ) : (
                datas.map((item) => (
                  <tr key={item.id_pendapatan}>
                    <td className="py-2 px-4 border">{item.id_pendapatan}</td>
                    <td className="py-2 px-4 border text-green-700 font-semibold">
                      Rp{" "}
                      {item.pendapatan.toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                      })}
                    </td>
                    <td className="py-2 px-4 border">
                      {new Date(item.tanggal).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Tabel Perhitungan Administrasi */}
        <div className="bg-white p-6 rounded-lg shadow mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Perhitungan Administrasi</h2>

            <div className="flex items-center gap-3">
              <label className="text-sm">Basis Pendapatan:</label>
              <select
                value={basis}
                onChange={(e) => setBasis(e.target.value as any)}
                className="px-3 py-2 border rounded"
              >
                <option value="total">Total Pendapatan</option>
                <option value="month">Pendapatan Bulan Ini</option>
                <option value="today">Pendapatan Hari Ini</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* left: input biaya */}
            <div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-3 text-left">Item Biaya</th>
                    <th className="py-2 px-3 text-left">Jumlah (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  {costs.map((c) => (
                    <tr key={c.id} className="border-b">
                      <td className="py-2 px-3">{c.label}</td>
                      <td className="py-2 px-3">
                        <input
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={c.amount === 0 ? "" : c.amount.toString()}
                          onChange={(e) => handleCostChange(c.id, e.target.value)}
                          placeholder="0"
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                    </tr>
                  ))}
                  {/* tombol tambah biaya kecil */}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="py-3 px-3 font-semibold">Total Biaya</td>
                    <td className="py-3 px-3 font-semibold">{formatRp(totalCost)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* right: ringkasan */}
            <div className="bg-gray-50 p-4 rounded">
              <div className="mb-3">
                <div className="text-sm text-gray-600">Basis yang dipilih</div>
                <div className="text-lg font-semibold">
                  {basis === "total" && "Total Pendapatan"}{" "}
                  {basis === "month" && "Pendapatan Bulan Ini"}{" "}
                  {basis === "today" && "Pendapatan Hari Ini"}
                </div>
                <div className="text-2xl font-bold mt-2">{formatRp(revenueBasisValue)}</div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-600">Total Biaya</div>
                <div className="text-xl font-semibold">{formatRp(totalCost)}</div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-600">Laba Bersih</div>
                <div
                  className={`text-2xl font-bold ${
                    netProfit < 0 ? "text-red-600" : "text-green-700"
                  }`}
                >
                  {formatRp(netProfit)}
                </div>
                {netProfit < 0 && (
                  <div className="text-sm text-red-600 mt-2">
                    Perhatian: biaya melebihi pendapatan pada basis yang dipilih.
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    // reset biaya
                    setCosts((prev) => prev.map((c) => ({ ...c, amount: 0 })));
                  }}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Reset Biaya
                </button>

                <button
                  onClick={() => {
                    // copy summary ke clipboard
                    const summary = `Basis: ${
                      basis === "total" ? "Total" : basis === "month" ? "Bulan Ini" : "Hari Ini"
                    }\nPendapatan: ${formatRp(revenueBasisValue)}\nTotal Biaya: ${formatRp(totalCost)}\nLaba Bersih: ${formatRp(netProfit)}`;
                    navigator.clipboard
                      .writeText(summary)
                      .then(() => alert("Ringkasan disalin ke clipboard"))
                      .catch(() => alert("Gagal menyalin"));
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Salin Ringkasan
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
