const express = require("express");

const gameRoutes = express.Router();

const gameControllers = require("../controllers/games");

// ==============================
// CLIENT ROUTES
// ==============================

// Semua game tanpa promo (lama)
gameRoutes.get('/client', gameControllers.GetAllGamesForClient);

// Semua game *dengan* promo (BARU)
gameRoutes.get('/client-with-promo', gameControllers.GetAllGamesWithPromoForClient);

// ==============================
// DEVELOPER ROUTES
// ==============================

// Upload game
gameRoutes.post('/upload/:id_dev', gameControllers.UploadGame);

// Delete game
gameRoutes.get('/delete/:id_game', gameControllers.DeleteGame);

// Ambil semua game berdasarkan developer
// (Diletakkan paling bawah biar tidak mengganggu route lain)
gameRoutes.get('/:id_dev', gameControllers.GetAllGames);

// ==============================
// DEFAULT ROUTE
// ==============================
gameRoutes.get('/', gameControllers.GetAllGamesForClient);

module.exports = gameRoutes;
