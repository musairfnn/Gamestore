const db = require("../config/config_db")

const InputToCartModel = async (datas) => {
    const SQL_INSERT_CART = `INSERT INTO cart (id_user, id_game) VALUES ('${datas.id_user}', '${datas.id_game}')`

    const [result] = await db.execute(SQL_INSERT_CART)

    if(result.affectedRows > 0){
        return {
            message: "Berhasil menambahkan ke cart",
            status: 200
        }
    }else{
        return {
            message: "Gagal menambahkan ke cart",
            status: 500
        }
    }
}

const GetFromCartModel = async (id_user) => {
    const SQL_SELECT_CART = `SELECT * FROM cart WHERE id_user='${id_user}'`
    const [rows] = await db.execute(SQL_SELECT_CART)

    if(rows.length > 0){
        var results = []
        var i = 0

        for (const element of rows) {
            results[i] = await GetDatagameByIdFromCartModel(element.id_game)
            i++
        }

        return {
            message: "Berhasil mengambil data cart",
            status: 200,
            data: results
        }
    }else{ 
        return {
            message: "Cart kosong",
            status: 404,
            data: []
        }
    }
}

const GetDatagameByIdFromCartModel = async (id_game) => {
    const SQL_SELECT_GAME = `SELECT * FROM games WHERE id_game='${id_game}'`
    const [rows] = await db.execute(SQL_SELECT_GAME)

    if(rows.length > 0){
        return rows[0]
    }else{ 
        return null
    }
}

const DeleteFromCartModel = async (id_user, id_game) => {
    const SQL_DELETE_CART = `DELETE FROM cart WHERE id_user='${id_user}' AND id_game='${id_game}'`

    const [result] = await db.execute(SQL_DELETE_CART)

    if(result.affectedRows > 0){
        return {
            message: "Berhasil menghapus dari cart",
            status: 200
        }
    }
}   

module.exports = {
    InputToCartModel, 
    GetFromCartModel,
    DeleteFromCartModel
}