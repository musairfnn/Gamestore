const express = require("express")
const revenueControllers = require("../controllers/revenue_web")

const revenueRoutes = express.Router()

revenueRoutes
    .get("/", revenueControllers.GetAllDatasRevenue)

module.exports = revenueRoutes