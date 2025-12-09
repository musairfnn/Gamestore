const express = require('express');
const cartRoutes = express.Router()

const cartControllers = require('../controllers/carts')

cartRoutes
    .post('/', cartControllers.InputToCart)
    .get('/:id_user', cartControllers.GetFromCart)
    .post('/delete/:id_user', cartControllers.DeleteFromCart)

module.exports = cartRoutes;