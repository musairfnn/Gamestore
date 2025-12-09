const db = require("../config/config_db");

const createNewUser = async (req) => {
    const SQL_Check_Username = `SELECT * FROM users WHERE username = ?`;
    const [rows1] = await db.execute(SQL_Check_Username, [req.username]);

    if (rows1.length > 0) {
        return { error: "Username sudah terdaftar" };
    }

    const SQL_Check_Email = `SELECT * FROM users WHERE email = ?`;
    const [rows2] = await db.execute(SQL_Check_Email, [req.email]);

    if (rows2.length > 0) {
        return { error: "Email sudah terdaftar" };
    }

    const SQL_Insert = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `;
    await db.execute(SQL_Insert, [req.username, req.email, req.password]);

    return { success: "Berhasil Membuat Akun" };
};


const GetUserByEmail = async (email, otp) => {
    const SQL_Update_OTP = `
        UPDATE users
        SET otp_code = ?
        WHERE email = ?
    `;
    await db.execute(SQL_Update_OTP, [otp, email]);

    const SQL_Get = `SELECT * FROM users WHERE email = ?`;
    const [row] = await db.execute(SQL_Get, [email]);

    if (row.length <= 0) {
        return { error: "Akun belum terdaftar" };
    }

    return {
        success: "Login Berhasil",
        data: row[0]
    };
};



const GetUserById = async (id_user) => {
    const SQL_Get = `SELECT * FROM users WHERE id_user = ?`;
    const [row] = await db.execute(SQL_Get, [id_user]);

    if (row.length <= 0) {
        return { error: "Akun tidak ada" };
    }

    return {
        success: "Berhasil",
        data: row[0]
    };
};



const ResetOtpCode = async (id_user) => {
    const SQL_Update = `UPDATE users SET otp_code = '' WHERE id_user = ?`;
    await db.execute(SQL_Update, [id_user]);
};



const ChangePassword = async (id_user, hashedNewPassword) => {
    const SQL_Update = `
        UPDATE users 
        SET password = ?
        WHERE id_user = ?
    `;

    const [result] = await db.execute(SQL_Update, [
        hashedNewPassword,
        id_user
    ]);

    if (result.affectedRows === 0) {
        return { error: "Akun tidak ada" };
    }

    return { success: "Password berhasil diperbarui" };
};


module.exports = {
    createNewUser,
    GetUserByEmail,
    GetUserById,
    ResetOtpCode,
    ChangePassword
};
