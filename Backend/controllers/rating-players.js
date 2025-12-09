const ratingModels = require('../model/rating-players')

const CreateNewRating = async (req, res) => {
    try {
        const datas = {
            id_user: req.body.id_user,
            id_game: req.body.id_game,
            rating: req.body.rating
        }

        const result = await ratingModels.CreateNewRatingModels(datas)

        res.status(result.status).json({message: result.message})
    } catch (error) {
        console.log(error)
    }
}

const GetAllRatingsByIdGame = async (req, res) => {
    try {
        const id_game = req.params.id_game

        const result = await ratingModels.GetAllRatingsByIdGameModels(id_game)

        res.status(result.status).json({message: result.message, datas: result.datas})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    CreateNewRating,
    GetAllRatingsByIdGame
}