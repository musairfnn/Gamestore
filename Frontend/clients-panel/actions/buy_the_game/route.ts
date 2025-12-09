export async function BuyingMethod(datas: any) {
  try {
    const endpoint = `http://localhost:4000/payment/${datas.id_user}`;

    // Pastikan parameter yang dikirim ke backend bertipe number
    const payload = {
      ...datas,
      gross_amount: Number(datas.gross_amount),
      price: Number(datas.price),
    };

    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const res = await result.json();

    console.log("📌 BuyingMethod Response:", res);

    // Bila backend error, lemparkan error ke frontend supaya tidak lanjut snap.pay
    if (!result.ok) {
      throw new Error(
        res?.message || res?.error?.message || "Server error saat memproses pembayaran"
      );
    }

    return res;
  } catch (error: any) {
    console.error("❌ BuyingMethod ERROR:", error);
    return {
      status: 500,
      message: error?.message || "Gagal memproses pembayaran",
    };
  }
}
