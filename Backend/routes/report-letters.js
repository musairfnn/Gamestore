const express = require("express")

const reportRouters = express.Router()

//route ini untuk mengambil data pembelian untuk dimasukkan ke dalam laporan keuangan
const reportControllers = require("../controllers/report-letters")

reportRouters
    .get("/:id_dev", reportControllers.GetBuyingDatas)

module.exports = reportRouters