const express = require('express')
const promoRoutes = express.Router()
const promoControllers = require('../controllers/promo')

// GET all promos (admin)
promoRoutes.get('/', promoControllers.GetAllPromos)

// GET active promos (client)
promoRoutes.get('/active', promoControllers.GetPromosForClient)

// ADD new promo
promoRoutes.post('/add', promoControllers.AddPromo)

// DELETE promo by id_promo
promoRoutes.delete('/delete/:id_promo', promoControllers.DeletePromo)

module.exports = promoRoutes
