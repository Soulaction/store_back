import {DeviceDto} from "./DeviceDto";

export class BasketItemDto extends DeviceDto {
    idBasketItem: string;
    constructor(model) {
        super(model.device);
        this.idBasketItem = model.id;
    }

    static mapListEntityToDto(model): DeviceDto[] {
        return model.map(el => new BasketItemDto(el));
    }
}
