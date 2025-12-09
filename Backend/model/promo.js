const db = require('../config/config_db')

// CREATE PROMO
const CreatePromo = async (datas) => {
    const query = `
        INSERT INTO promo (id_game, promo_title, price_promo, start_date, end_date)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    await db.execute(query, [
        datas.id_game,
        datas.promo_title,
        datas.price_promo,
        datas.start_date,
        datas.end_date
    ]);

    return { success: "Promo berhasil dibuat" };
};

// GET ACTIVE PROMOS
const GetActivePromos = async () => {
    const query = `
        SELECT p.*, g.title AS game_name
        FROM promo p
        LEFT JOIN games g ON p.id_game = g.id_game
        WHERE p.is_active = 1
        AND CURRENT_DATE BETWEEN p.start_date AND p.end_date
    `;

    const [result] = await db.execute(query);
    return result;
};

// GET ALL PROMOS (ADMIN)
const GetAllPromos = async () => {
    const query = `
        SELECT p.*, g.title AS game_name
        FROM promo p
        LEFT JOIN games g ON p.id_game = g.id_game
        ORDER BY p.id_promo DESC
    `;

    const [result] = await db.execute(query);
    return result;
};

// DELETE PROMO BY ID
const DeletePromo = async (id_promo) => {
    const query = `
        DELETE FROM promo WHERE id_promo = ?
    `;
    await db.execute(query, [id_promo]);
    return { success: "Promo berhasil dihapus" };
};

module.exports = {
    CreatePromo,
    GetActivePromos,
    GetAllPromos,
    DeletePromo
};
