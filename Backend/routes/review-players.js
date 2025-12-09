const express = require("express");

const reviewRouters = express.Router();

const reviewControllers = require("../controllers/review-players");

// Tambah komentar
reviewRouters.post("/", reviewControllers.CreateNewReview);

// Ambil semua komentar berdasarkan id_game
reviewRouters.get("/get-comments/:id_game", reviewControllers.GetAllCommentsByIdGame);

// Hapus komentar berdasarkan id_review
reviewRouters.delete("/:id_review", reviewControllers.DeleteCommentById);

module.exports = reviewRouters;
