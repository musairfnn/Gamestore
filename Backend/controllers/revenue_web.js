const { GetAllDatasRevenueModel } = require("../model/revenue_web");

const GetAllDatasRevenue = async (req, res) => {
  try {
    const result = await GetAllDatasRevenueModel();

    if (result.datas && result.datas.length > 0) {
      res.status(200).json({
        message: result.message,
        datas: result.datas,
      });
    } else {
      res.status(404).json({
        message: result.message || "Data tidak ditemukan",
        datas: [],
      });
    }
  } catch (error) {
    console.error("Error GetAllDatasRevenue:", error);
    res.status(500).json({
      message: "Terjadi kesalahan server saat mengambil data pendapatan",
      error: error.message || error,
    });
  }
};

module.exports = {
  GetAllDatasRevenue,
};
