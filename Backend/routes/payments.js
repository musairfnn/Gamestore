const express = require("express")
const routes = express.Router()

const paymentControllers = require("../controllers/payments")

routes
    .post('/:id_user', paymentControllers.CreateNewPayment)

module.exports = routes