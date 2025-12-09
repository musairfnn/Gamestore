const gameModels = require("../model/games");

// =================================
// UPLOAD GAME
// =================================
const UploadGame = async (req, res) => {  
    try {
        const id_dev = req.params.id_dev;
        const { 
            title, 
            publisher, 
            description, 
            category, 
            price, 
            fileUrl, 
            screenshotUrls, 
            coverUrl 
        } = req.body;

        const result = await gameModels.PostDataGame({
            id_dev,
            title, 
            publisher,
            description,
            category,
            price,
            fileUrl,
            screenshotUrls,
            coverUrl
        });

        res.json({
            message: result.success,
            status: 200
        });
    } catch (error) {
        console.log(error);
    }
};

// =================================
// GET ALL GAMES (DEVELOPER PANEL)
// =================================
const GetAllGames = async (req, res) => {
    try {
        const id_dev = req.params.id_dev;

        const result = await gameModels.GetAllgames(id_dev);

        if (result.error) {
            return res.json({
                message: result.error,
                status: result.status
            });
        }

        res.json({
            message: result.success,
            status: result.status,
            data: result.data
        });
    } catch (error) {
        console.log(error);
    }
};

// =================================
// DELETE GAME
// =================================
const DeleteGame = async (req, res) => {
    try {
        const id_game = req.params.id_game;

        const result = await gameModels.DeleteGame(id_game);

        res.json({
            message: result.success,
            status: 200
        });
    } catch (error) {
        console.log(error);
    }
};

// =================================
// GET ALL GAMES (CLIENT WITHOUT PROMO)
// =================================
const GetAllGamesForClient = async (req, res) => {
    try {
        const result = await gameModels.GetAllGamesForClient();

        if (result.status > 200) {
            return res.json({
                message: result.message,
                status: result.status
            });
        }

        res.json({
            message: result.message,
            status: result.status,
            data: result.data
        });
    } catch (error) {
        console.log(error);
    }
};

// =================================
// GET ALL GAMES + PROMO (CLIENT PANEL)
// =================================
const GetAllGamesWithPromoForClient = async (req, res) => {
    try {
        const result = await gameModels.GetAllGamesWithPromoForClient();

        if (result.status > 200) {
            return res.json({
                message: result.message,
                status: result.status
            });
        }

        res.json({
            message: result.message,
            status: result.status,
            data: result.data
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    UploadGame,
    GetAllGames,
    DeleteGame,
    GetAllGamesForClient,
    GetAllGamesWithPromoForClient
};
