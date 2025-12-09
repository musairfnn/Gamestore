const db = require("../config/config_db");

// Get all blog articles (from games table)
exports.getAllArticles = (callback) => {
    const sql = `
        SELECT 
            id_game AS id,
            title,
            publisher,
            description,
            image_profile_url AS thumbnail
        FROM games
        ORDER BY id_game DESC
    `;

    db.query(sql)
        .then(([results]) => callback(null, results))
        .catch(err => callback(err, null));
};

// Get detail of one blog article (from games table)
exports.getArticleDetail = (id, callback) => {
    const sql = `
        SELECT 
            id_game AS id,
            title,
            publisher,
            description,
            image_profile_url AS thumbnail,
            image_url,
            price
        FROM games
        WHERE id_game = ?
    `;

    db.query(sql, [id])
        .then(([results]) => callback(null, results))
        .catch(err => callback(err, null));
};
