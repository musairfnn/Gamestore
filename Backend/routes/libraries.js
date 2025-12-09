const express = require("express")

const libraryRoutes = express.Router()

const libraryControllers = require("../controllers/libraries")

libraryRoutes
    .post('/input-game/:id_user', libraryControllers.InputNewGame)
    .get('/games/:id_user', libraryControllers.GetAllGames)
    .get('/check-games/:id_game/:id_user', libraryControllers.CheckTheGame)

module.exports = libraryRoutes