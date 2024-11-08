import {v4} from "uuid";
import {BasketDeviceEntity, DeviceEntity} from "../models/models";
import {BasketDataDto} from "../dto/BasketDto";

class BasketService {
    async getAll(userId: string) {
        const products = await BasketDeviceEntity.findAll(
            {
                where: {userId},
                include: [{model: DeviceEntity}]
            }
        );

        return products;
    }

    async addItem(basketDto: BasketDataDto) {
        const basketItem = await BasketDeviceEntity.create(
            {
                id: v4(),
                userId: basketDto.userId,
                deviceId: basketDto.deviceId
            }
        );
        return basketItem;
    }

    async deleteItem(id: string) {
        await BasketDeviceEntity.destroy(
            {
                where: {id}
            }
        );
    }
}

export default new BasketService;
