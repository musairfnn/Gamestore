const db = require("../config/config_db");

const CreateNewReviewModel = async (datas) => {
    const SQL_QUERY_INSERT = 
    `INSERT INTO review_game (id_user, id_game, comment, date_comment) VALUES (?, ?, ?, NOW())`;

    const [result] = await db.execute(SQL_QUERY_INSERT, [
        datas.id_user,
        datas.id_game,
        datas.comment
    ]);

    if(result.affectedRows > 0){
        return {
            message: "Review berhasil ditambahkan",
            status: 200
        };
    } else {
        return {
            message: "Review gagal ditambahkan",
            status: 500
        };
    }
};

const GetAllCommentsModel = async (id_game) => {
    const SQL_QUERY_GET = `SELECT * FROM review_game WHERE id_game = ?`;

    const [result] = await db.execute(SQL_QUERY_GET, [id_game]);

    if(result.length > 0) {
        return {
            message: "Berhasil mengambil semua komentar",
            status: 200,
            datas: result
        };
    } else {
        return {
            message: "Tidak ada komentar ditemukan",
            status: 202,
            datas: []
        };
    }
};

// Function baru untuk hapus komentar
const DeleteCommentModel = async (id_review, id_user) => {
    const SQL_QUERY_DELETE = `DELETE FROM review_game WHERE id_review = ? AND id_user = ?`;

    const [result] = await db.execute(SQL_QUERY_DELETE, [id_review, id_user]);

    if (result.affectedRows > 0) {
        return {
            message: "Komentar berhasil dihapus",
            status: 200
        };
    } else {
        return {
            message: "Komentar gagal dihapus atau tidak ditemukan",
            status: 404
        };
    }
};

module.exports = {
    CreateNewReviewModel,
    GetAllCommentsModel,
    DeleteCommentModel
};
