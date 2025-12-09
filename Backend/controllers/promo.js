const promoModel = require("../model/promo")

const AddPromo = async (req, res) => {
    try {
        const { id_game, promo_title, price_promo, start_date, end_date } = req.body

        const result = await promoModel.CreatePromo({
            id_game,
            promo_title,
            price_promo,
            start_date,
            end_date
        })

        res.json({
            message: result.success,
            status: 200
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
}

const GetPromosForClient = async (req, res) => {
    try {
        const promos = await promoModel.GetActivePromos()

        res.json({
            message: "Promo aktif ditemukan",
            status: 200,
            data: promos
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
}

const GetAllPromos = async (req, res) => {
    try {
        const promos = await promoModel.GetAllPromos();

        res.json(promos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE PROMO
const DeletePromo = async (req, res) => {
    try {
        const { id_promo } = req.params;
        if (!id_promo) {
            return res.status(400).json({ message: "id_promo harus disertakan" });
        }

        const result = await promoModel.DeletePromo(id_promo);

        res.json({
            message: result.success,
            status: 200
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    AddPromo,
    GetPromosForClient,
    GetAllPromos,
    DeletePromo
}
