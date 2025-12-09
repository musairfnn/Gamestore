const cartModels = require('../model/carts')

const InputToCart = async (req, res) => {
    const { id_user, id_game } = req.body;

    const result = await cartModels.InputToCartModel({ id_user, id_game })

    if(result.status > 200){
        return res.json({
            message: result.message,
            status: result.status
        })
    }

    res.json({
        message: result.message,
        status: result.status
    })
}

const GetFromCart = async (req, res) => {
    try {
        const { id_user } = req.params;

        const result = await cartModels.GetFromCartModel(id_user)

        res.json({
            message: result.message,
            status: result.status,
            data: result.data
        })
    } catch (error) {
        console.log(error)
    }
}

const DeleteFromCart = async (req, res) => {
    try {
        const { id_user } = req.params
        const { id_game } = req.body

        const result = await cartModels.DeleteFromCartModel(id_user, id_game)

        res.json({
            message: result.message,
            status: result.status
        })
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    InputToCart,
    GetFromCart,
    DeleteFromCart
}