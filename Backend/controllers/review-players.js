const db = require("../config/config_db");
const reviewModels = require("../model/review-players");

// Tambah komentar baru
const CreateNewReview = async (req, res) => {
    try {
        const datas = {
            id_user: req.body.id_user,
            id_game: req.body.id_game,
            comment: req.body.comment
        };

        const result = await reviewModels.CreateNewReviewModel(datas);

        res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.log("❌ ERROR CreateNewReview:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Ambil semua komentar berdasarkan id_game
const GetAllCommentsByIdGame = async (req, res) => {
    try {
        const id_game = req.params.id_game;
        const result = await reviewModels.GetAllCommentsModel(id_game);

        const comments = result.datas || [];
        const finalData = [];

        for (const comment of comments) {
            try {
                const [userRows] = await db.execute(
                    `SELECT username FROM users WHERE id_user = ?`,
                    [comment.id_user]
                );

                const username = userRows.length > 0 ? userRows[0].username : "Unknown";

                finalData.push({
                    id_review: comment.id_review,
                    id_user: comment.id_user,
                    id_game: comment.id_game,
                    comment: comment.comment,
                    date_comment: comment.date_comment,
                    username,
                    readyToSend: true
                });
            } catch (err) {
                console.log("❌ ERROR fetch user:", err);
                finalData.push({
                    ...comment,
                    username: "Unknown",
                    readyToSend: false
                });
            }
        }

        res.status(200).json({
            message: "Berhasil mengambil semua komentar",
            datas: finalData
        });
    } catch (error) {
        console.log("❌ ERROR GetAllCommentsByIdGame:", error);
        res.status(500).json({ message: "Internal server error", datas: [] });
    }
};

// Hapus komentar berdasarkan id_review
const DeleteCommentById = async (req, res) => {
    try {
        const id_review = req.params.id_review;
        const id_user = req.query.id_user; // ambil dari query param

        if (!id_user) {
            return res.status(400).json({ message: "id_user wajib disertakan di query" });
        }

        const result = await reviewModels.DeleteCommentModel(id_review, id_user);

        res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.log("❌ ERROR DeleteCommentById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    CreateNewReview,
    GetAllCommentsByIdGame,
    DeleteCommentById
};
