const blogModel = require("../model/blogs");

// Get all blog articles
exports.getAllArticles = (req, res) => {
    blogModel.getAllArticles((err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Gagal mengambil data artikel",
                error: err
            });
        }
        res.status(200).json(results);
    });
};

// Get detail article
exports.getArticleDetail = (req, res) => {
    const id = req.params.id;

    blogModel.getArticleDetail(id, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Gagal mengambil detail artikel",
                error: err
            });
        }
        // Jika tidak ditemukan
        if (results.length === 0) {
            return res.status(404).json({
                message: "Artikel tidak ditemukan"
            });
        }

        res.status(200).json(results[0]);
    });
};
