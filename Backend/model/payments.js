const db = require('../config/config_db');

const GetAllUsers = async (id_User) => {
    try {
        const SQL_QUERY_GET = `SELECT * FROM users WHERE id_user = ?`;
        const [result] = await db.execute(SQL_QUERY_GET, [id_User]);

        if (result.length > 0) {
            return {
                message: "User ditemukan",
                status: 200,
                data: result[0]
            };
        } else {
            return {
                message: "User tidak ditemukan",
                status: 400
            };
        }
    } catch (error) {
        console.error("GetAllUsers ERROR:", error);
        throw error;
    }
};


const CreateNewPaymentModels = async (datas) => {
    try {
        // hitung admin
        const cost_admin = datas.gross_amount * 20 / 100;
        const final_gross_amount = datas.gross_amount - cost_admin;

        // simpan pendapatan
        await PendapatanModels(cost_admin);

        // simpan transaksi tanpa order_id karena DB kamu tidak punya kolom itu
        const SQL_QUERY_INSERT = `
            INSERT INTO buying (id_game, id_user, total, date_buying)
            VALUES (?, ?, ?, ?)
        `;

        await db.execute(SQL_QUERY_INSERT, [
            datas.id_game,
            datas.id_user,
            final_gross_amount,
            datas.date,
        ]);

        return {
            message: "Pembayaran berhasil",
            status: 200
        };
    } catch (error) {
        console.error("CreateNewPaymentModels ERROR:", error);
        throw error;
    }
};


const PendapatanModels = async (amount) => {
    try {
        const SQL_QUERY_INSERT = `INSERT INTO pendapatan (pendapatan) VALUES (?)`;
        await db.execute(SQL_QUERY_INSERT, [amount]);
    } catch (error) {
        console.error("PendapatanModels ERROR:", error);
        // tidak dilempar agar alur pembayaran tetap lanjut
    }
};


module.exports = {
    GetAllUsers,
    CreateNewPaymentModels,
};
