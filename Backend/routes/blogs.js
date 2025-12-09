const express = require("express");
const blogRoutes = express.Router();

const blogController = require("../controllers/blogs");

blogRoutes
    .get("/", blogController.getAllArticles)
    .get("/:id", blogController.getArticleDetail);

module.exports = blogRoutes;
