const paymentModels = require("../model/payments");
const midtransClient = require("midtrans-client");

console.log("🔧 DEBUG — MIDTRANS_SERVER_KEY =", process.env.MIDTRANS_SERVER_KEY);

const snap = new midtransClient.Snap({
  isProduction: false, // ganti true kalau live
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const CreateNewPayment = async (req, res) => {
  try {
    console.log("🟢 REQUEST BODY:", req.body);
    console.log("🟢 PARAMS:", req.params);

    const idUser = req.params.id_user;
    const order_id = `ORDER-${Date.now()}`;
    const { gross_amount, id_game, title, price } = req.body;

    // Cek user
    const result = await paymentModels.GetAllUsers(idUser);
    console.log("🟢 USER LOOKUP RESULT:", result);

    if (!result || !result.data) {
      console.log("🔴 USER NOT FOUND");
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    // Pastikan number & bulatkan ke integer (Midtrans IDR tidak menerima pecahan)
    const grossAmountNum = Math.round(Number(gross_amount));
    const priceNum = Math.round(Number(price));

    console.log("🟢 FINAL PRICE NUMBERS (BULAT):", { grossAmountNum, priceNum });

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: grossAmountNum,
      },
      item_details: [
        {
          id: id_game,
          price: priceNum,
          quantity: 1,
          name: title,
        },
      ],
      customer_details: {
        first_name: result.data.username,
        email: result.data.email,
      },
      enabled_payments: ["gopay", "shopeepay", "dana", "bca_va"],
    };

    console.log("🟢 MIDTRANS PARAMETER:", JSON.stringify(parameter, null, 2));

    // Buat transaksi di Midtrans
    const transaction = await snap.createTransaction(parameter);

    console.log("🟢 MIDTRANS RESPONSE (SUCCESS):", transaction);

    // Simpan pembayaran ke DB
    await paymentModels.CreateNewPaymentModels({
      gross_amount: grossAmountNum,
      id_user: idUser,
      id_game,
      date: new Date().toISOString().slice(0, 10),
    });

    return res.status(200).json({
      url: transaction.redirect_url,
      token: transaction.token,
    });

  } catch (error) {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("🔴 MIDTRANS ERROR RAW:", error);
    console.error("🔴 MIDTRANS ApiResponse:", error?.ApiResponse);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    return res.status(500).json({
      status: 500,
      message: "Midtrans error",
      detail: error?.ApiResponse || error?.message || error,
    });
  }
};

module.exports = {
  CreateNewPayment,
};
