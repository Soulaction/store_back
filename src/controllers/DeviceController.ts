import uuid from 'uuid';
import path from 'path';
import {DeviceEntity, DeviceInfoEntity, BasketDeviceEntity} from '../models/models';
import {ApiError} from '../error/ApiError';
import {DeviceDto} from "../dto/DeviceDto";

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body;

            const {img} = req.files;
            const fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '../../', 'static/devices', fileName));
            const device = new DeviceDto(await DeviceEntity.create({name, price, brandId, typeId, img: fileName}));

            if (info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    DeviceInfoEntity.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device);
        } catch (e) {
            next(ApiError.badRequest((<Error>e).message));
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let devices;
        if (!brandId && !typeId) {
            devices = await DeviceEntity.findAndCountAll({limit, offset});
        }
        if (brandId && !typeId) {
            devices = await DeviceEntity.findAndCountAll({where: {brandId}, limit, offset});
        }
        if (!brandId && typeId) {
            devices = await DeviceEntity.findAndCountAll({where: {typeId}, limit, offset});
        }
        if (brandId && typeId) {
            devices = await DeviceEntity.findAndCountAll({where: {brandId, typeId}, limit, offset});
        }

        return res.json(devices);
    }

    async getOne(req, res) {

        const {id} = req.params;
        const device = await DeviceEntity.findOne(
            {
                where: {id},
                include: [{model: DeviceInfoEntity, as: 'info'}]
            }
        )
        return res.json(device);
    }

    async addBasket(req, res, next) {
        const {basketId, deviceId} = req.body;
        const basketDevice = await BasketDeviceEntity.create({basketId, deviceId});
        return res.json(basketDevice);
    }

    async deleteDevice(req, res) {
        const {id} = req.params
        const device = await DeviceEntity.destroy(
            {
                where: {id}
            }
        )
        // Удаление из корзины
        const deviceBasket = await BasketDeviceEntity.destroy(
            {
                where: {deviceId: id}
            }
        )
        return res.json(device);
    }
}

export default new DeviceController();
