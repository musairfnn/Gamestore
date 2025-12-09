const libraryModels = require("../model/libraries");

// =========================
// Input Game Baru ke Library
// =========================
const InputNewGame = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const { id_game, title, cover_image_game, file_url } = req.body;

        const result = await libraryModels.InputNewGame({
            id_user,
            id_game,
            title,
            cover_image_game,
            file_url
        });

        return res.json({
            message: result.message,
            status: result.status
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", status: 500 });
    }
};

// =========================
// Ambil Semua Games
// =========================
const GetAllGames = async (req, res) => {
    try {
        const id_user = req.params.id_user;

        const result = await libraryModels.GetAllGames(id_user);

        if (result.status > 200) {
            return res.json({
                message: "belum ada game di library",
                status: result.status
            });
        }

        return res.json({
            message: result.message,
            status: result.status,
            data: result.data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", status: 500 });
    }
};

// =========================
// Cek apakah game sudah ada
// =========================
const CheckTheGame = async (req, res) => {
    try {
        const id_game = req.params.id_game;
        const id_user = req.params.id_user;

        const result = await libraryModels.CheckTheGame(id_game, id_user);

        if (result.status > 200) {
            return res.json({
                message: result.message,
                status: result.status
            });
        }

        return res.json({
            message: result.message,
            status: result.status,
            data: result.data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", status: 500 });
    }
};

module.exports = {
    InputNewGame,
    GetAllGames,
    CheckTheGame
};
