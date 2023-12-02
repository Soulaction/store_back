const { BasketDevice, Device, Order } = require("../models/models")

class BasketController {

    async getAll(req, res) {
        const {basketId} = req.params
        const products = await BasketDevice.findAll(
            {
                where: {basketId},
                include: [{model: Device}]
            }
        )
        return res.json(products)
    }

    async deleteItem(req, res) {
        const {id} = req.params;
        const basketDevice = await BasketDevice.destroy(
            {
            where: {id}
            }
        )
        return res.json(basketDevice)
    }

}

module.exports = new BasketController()