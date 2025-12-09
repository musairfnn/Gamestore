const e = require('cors')
const db = require('../config/config_db')

const GetGameDatasModel = async (id_dev) => {
    const SQL_QUERY_GET = `SELECT * FROM games WHERE id_dev = ('${id_dev}')`

    const [result] = await db.execute(SQL_QUERY_GET)

    if(result.length > 0){
        const finalResultBuying = []
        var i = 0
        var hasFinished = false

        for (let element of result) {
            finalResultBuying[i] = await GetBuyingDatasModel(element.id_game)
            i++
        }

        hasFinished = true
        
        if(hasFinished){
            return {
                message: "Data berhasil diambil",
                status: 200,
                data: finalResultBuying
            }
        }
    }else{
        return{
            message: "Data tidak ada"
        }
    }
}

const GetBuyingDatasModel = async (id_game) => {
    const SQL_QUERY_GET = `SELECT * FROM buying WHERE id_game = ('${id_game}')`

    const [result] = await db.execute(SQL_QUERY_GET)

    if(result.length > 0){
        return result
    }else{
        return{
            message: "Data game tidak ada"
        }
    }
}

module.exports = {
    GetGameDatasModel
}