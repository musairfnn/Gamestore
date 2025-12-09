const db = require('../config/config_db');


const PostDataGame = (datas) => {
    const SQL_QUERY_INSERT = `
        INSERT INTO games 
        (id_dev, title, publisher, description, category, price, file_url, image_profile_url, image_url) 
        VALUES ('${datas.id_dev}', '${datas.title}', '${datas.publisher}', 
                '${datas.description}', '${datas.category}', '${datas.price}', 
                '${datas.fileUrl}', '${datas.coverUrl}', '${datas.screenshotUrls}')
    `;

    db.execute(SQL_QUERY_INSERT);
    return { success: "Sudah Input" };
};


const GetAllgames = async (id_dev) => {
    const SQL_QUERY_SELECT = `SELECT * FROM games WHERE id_dev = ('${id_dev}')`;
    const [result] = await db.execute(SQL_QUERY_SELECT);

    if (result.length > 0) {
        return { success: "Berhasil get data", status: 200, data: result };
    } else {
        return { error: "Gagal get data", status: 404 };
    }
};


const DeleteGame = (id_game) => {
    const SQL_Query_Delete = `DELETE FROM games WHERE id_game = ('${id_game}')`;

    db.execute(SQL_Query_Delete);
    return { success: 'Berhasil Dihapus' };
};

// =====================================
// GET ALL GAMES FOR CLIENT (TANPA PROMO)
// =====================================
const GetAllGamesForClient = async () => {
    const SQL_Query_Get = `SELECT * FROM games`;
    const [result] = await db.execute(SQL_Query_Get);

    if (result.length > 0) {
        return { message: "Data Berhasil Di Get", status: 200, data: result };
    } else {
        return { message: "Tabel kosong", status: 404 };
    }
};

// =====================================
// GET ALL GAMES + PROMO AKTIF (BARU)
// =====================================
const GetAllGamesWithPromoForClient = async () => {
    const SQL = `
        SELECT 
            g.*,
            p.price_promo,
            p.promo_title,
            p.start_date,
            p.end_date,
            p.is_active
        FROM games g
        LEFT JOIN promo p 
            ON g.id_game = p.id_game
            AND p.is_active = 1
            AND NOW() BETWEEN p.start_date AND p.end_date
        ORDER BY g.id_game DESC
    `;

    const [result] = await db.execute(SQL);

    return {
        message: "Games + Promo berhasil diambil",
        status: 200,
        data: result
    };
};

module.exports = {
    PostDataGame,
    GetAllgames,
    DeleteGame,
    GetAllGamesForClient,
    GetAllGamesWithPromoForClient, // ⭐ WAJIB ADA
};
