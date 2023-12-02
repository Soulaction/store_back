const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo, BasketDevice } = require('../models/models')
const ApiError = require('../error/ApiError')
const { off } = require('process')

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({ name, price, brandId, typeId, img: fileName });

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        discription: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {

        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId } }, limit, offset)
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId } }, limit, offset)
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId } }, limit, offset)
        }

        return res.json(devices)
    }

    async getOne(req, res) {

        const { id } = req.params
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            }
        )
        return res.json(device)
    }

    async addBasket(req, res, next) {
        const { basketId, deviceId } = req.body
        const basketDevice = await BasketDevice.create({ basketId, deviceId })
        return res.json(basketDevice)
    }

    async deleteDevice (req, res) {
        const { id } = req.params
        console.log(id)
        const device = await Device.destroy(
            {
                where: {id}
            }
        )
        // Удаление из корзины
        const deviceBasket = await BasketDevice.destroy(
            {
                where: {deviceId: id}
            }
        )
        return res.json(device)
    }
}

module.exports = new DeviceController()