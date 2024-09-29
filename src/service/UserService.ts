import {v4} from "uuid";
import path from "path";
import {DeviceDto} from "../dto/DeviceDto";
import {BasketDeviceEntity, DeviceEntity, DeviceInfoEntity} from "../models/models";
import {UploadedFile} from "express-fileupload";
import {DeviceInfoDto} from "../dto/DeviceInfoDto";
import fs from "fs";
import {TypeDto} from "../dto/TypeDto";
import {UserDto} from "../dto/UserDto";

class UserService {
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
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                })
            );
        }
        return device;
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

export default new UserService();
