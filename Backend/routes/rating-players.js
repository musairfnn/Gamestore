const express = require("express")

const ratingRouters = express.Router()

const ratingControllers = require("../controllers/rating-players")

ratingRouters
    .post("/", ratingControllers.CreateNewRating)
    .get("/get-ratings/:id_game", ratingControllers.GetAllRatingsByIdGame)

module.exports = ratingRouters