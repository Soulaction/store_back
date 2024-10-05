import {v4, version, validate} from "uuid";
import path from "path";
import {DeviceDto} from "../dto/DeviceDto";
import {BasketDeviceEntity, DeviceEntity, DeviceInfoEntity} from "../models/models";
import {UploadedFile} from "express-fileupload";
import {DeviceInfoDto} from "../dto/DeviceInfoDto";
import fs from "fs";
import {ApiError} from "../error/ApiError";
import {Op} from "sequelize";

class DeviceService {
    async create(deviceDto: DeviceDto, file: UploadedFile) {
        let {name, price, brandId, typeId, info} = deviceDto;
        const id: string = v4();
        const fileName = v4() + ".jpg";
        file.mv(path.resolve(__dirname, '../../', 'static/devices', fileName));
        const device = new DeviceDto(await DeviceEntity.create({id, name, price, brandId, typeId, img: fileName}));

        if (info && info.length > 0) {
            const parseInfo: DeviceInfoDto[] = JSON.parse(info);
            const filterInfo: DeviceInfoDto[] = parseInfo.filter(el => (el.title && el.description));
            filterInfo.forEach(i =>
                DeviceInfoEntity.create({
                    id: v4(),
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                })
            );
        }
        return device;
    }

    async update(device: DeviceDto, img: UploadedFile | null) {

        const findDevice = await DeviceEntity.findOne({where: {id: device.id}});
        if (!findDevice?.dataValues) {
            throw ApiError.badRequest('Редактируемая запись не найдена');
        }

        const checkDevice = await DeviceEntity.findOne({where: {name: device.name, id: {[Op.ne]: device.id}}});
        if (checkDevice?.dataValues) {
            throw ApiError.badRequest('Запись с таким наименованием уже существует');
        }
        let updateType;

        if (img) {
            await fs.unlinkSync(path.resolve(__dirname, '../../', 'static/devices/', findDevice.dataValues.img));

            const fileName = v4() + ".jpg";
            updateType = await findDevice.update({name: device.name, img: fileName});
            await img.mv(path.resolve(__dirname, '../../', 'static/devices/', fileName));
        } else {
            updateType = await findDevice.update({name: device.name});
        }
        (JSON.parse(device.info) as DeviceInfoDto[]).forEach(item => {
            console.log(item);
            if (validate(item.id)) {
                DeviceEntity.update({
                        title: item.title,
                        description: item.description
                    },
                    {
                        where: {
                            id: item.id
                        }
                    }
                );
            } else {
                DeviceInfoEntity.create({
                    id: v4(),
                    title: item.title,
                    description: item.description,
                    deviceId: device.id
                })
            }

        })
        return updateType;
    }

    async getAll(brandId: string, typeId: string, limit: number, offset: number) {
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
        return devices;
    }

    async getOne(id: string) {
        const device = await DeviceEntity.findOne(
            {
                where: {id},
                include: [{model: DeviceInfoEntity, as: 'info'}]
            }
        );
        return device;
    }

    async addBasket(basketId: string, deviceId: string) {
        return await BasketDeviceEntity.create({basketId, deviceId});
    }

    async deleteDevice(id: string) {
        const device = await DeviceEntity.destroy(
            {
                where: {id}
            }
        );
        try {
            fs.unlinkSync(path.resolve(__dirname, '../../', 'static/types/', new DeviceDto(device).img));
        } catch {
        }
        // Удаление из корзины
        await BasketDeviceEntity.destroy(
            {
                where: {deviceId: id}
            }
        );
    }
}

export default new DeviceService();
