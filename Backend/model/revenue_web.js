const db = require("../config/config_db");

const GetAllDatasRevenueModel = async () => {
  const SQL_QUERY_GET = `
    SELECT 
      id_pendapatan, 
      pendapatan, 
      created_at AS tanggal 
    FROM pendapatan
    ORDER BY created_at DESC
  `;

  const [result] = await db.execute(SQL_QUERY_GET);

  if (result.length > 0) {
    return {
      message: "Data revenue berhasil diambil",
      datas: result,
    };
  } else {
    return {
      message: "Data tidak ada",
      datas: [],
    };
  }
};

module.exports = {
  GetAllDatasRevenueModel,
};
