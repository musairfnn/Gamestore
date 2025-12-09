const db = require("../config/config_db");

// =========================
// Input Game Baru ke Library
// =========================
const InputNewGame = async (datas) => {

    // Cegah data undefined masuk DB
    if (!datas.id_user || !datas.id_game || !datas.title || !datas.cover_image_game || !datas.file_url) {
        return {
            message: "Data tidak lengkap, gagal menambahkan ke library",
            status: 400
        };
    }

    const SQL_QUERY_INSERT = `
        INSERT INTO library (id_user, id_game, title, cover_image_game, file_url) 
        VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(SQL_QUERY_INSERT, [
        datas.id_user,
        datas.id_game,
        datas.title,
        datas.cover_image_game,
        datas.file_url
    ]);

    return {
        message: "Game sudah di library",
        status: 200
    };
};

// =========================
// Ambil semua game user
// =========================
const GetAllGames = async (id_user) => {
    const SQL_QUERY_GET = `
        SELECT * FROM library WHERE id_user = ?
    `;

    const [result] = await db.execute(SQL_QUERY_GET, [id_user]);

    // filter data jelek
    const cleanData = result.filter(row => 
        row.id_game && row.title && row.cover_image_game && row.file_url
    );

    if (cleanData.length > 0) {
        return {
            message: "Data berhasil diambil",
            data: cleanData,
            status: 200
        };
    } else {
        return {
            message: "Data tidak ada di dalam database",
            status: 400
        };
    }
};

// =========================
// Cek apakah game sudah ada di library
// =========================
const CheckTheGame = async (id_game, id_user) => {
    const SQL_QUERY_GET = `
        SELECT * FROM library 
        WHERE id_game = ? AND id_user = ?
    `;

    const [result] = await db.execute(SQL_QUERY_GET, [id_game, id_user]);

    if (result.length > 0) {
        return {
            message: "Game Sudah Ada",
            data: result[0],
            status: 200
        };
    } else {
        return {
            message: "Game Belum Ada",
            status: 400
        };
    }
};

module.exports = {
    InputNewGame,
    GetAllGames,
    CheckTheGame
};
