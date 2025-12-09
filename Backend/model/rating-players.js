const db = require("../config/config_db")


const CreateNewRatingModels = async (datas) => {
    SQL_QUERY_INSERT = 
    `INSERT INTO rating (id_user, id_game, rating) 
    VALUES ("${datas.id_user}", "${datas.id_game}", "${datas.rating}")`

    const [result] = await db.execute(SQL_QUERY_INSERT)

    if(result.affectedRows > 0) {
        return {
            message: "Berhasil menambahkan rating",
            status: 200
        }
    }else {
        return {
            message: "Gagal menambahkan rating",
            status: 500
        }
    }
}

const GetAllRatingsByIdGameModels = async (id_game) => {
    SQL_QUERY_SELECT = 
    `SELECT * FROM rating WHERE id_game = "${id_game}"`
    const [result] = await db.execute(SQL_QUERY_SELECT)

    if(result.length > 0) {
        return {
            message: "Berhasil mengambil data rating",
            status: 200,
            datas: result
        }
    }else {
        return {
            message: "tidak ada rating untuk game ini",
            status: 202
        }
    }
}

module.exports = {
    CreateNewRatingModels,
    GetAllRatingsByIdGameModels
}