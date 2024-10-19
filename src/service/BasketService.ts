import {v4} from "uuid";
import {BasketDeviceEntity, DeviceEntity} from "../models/models";
import {BasketDataDto} from "../dto/BasketDto";

class BasketService {
    async getAll(basketId: string) {
        const products = await BasketDeviceEntity.findAll(
            {
                where: {basketId},
                include: [{model: DeviceEntity}]
            }
        );

        return products;
    }

    async addItem(basketDto: BasketDataDto) {
        const basketItem = await BasketDeviceEntity.create(
            {
                id: v4(),
                basketId: basketDto.idBasketItem,
                deviceId: basketDto.id
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
