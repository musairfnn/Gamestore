const reportModels = require("../model/report-letters")

const GetBuyingDatas = async (req, res) => {
    try {
        const id_dev = req.params.id_dev

        const result = await reportModels.GetGameDatasModel(id_dev)

        res.json({
            message: result.message,
            status: result.status,
            data: result.data
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    GetBuyingDatas
}