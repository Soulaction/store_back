import {DeviceDto} from "./DeviceDto";

export class BasketItemDto extends DeviceDto {
    userId: string;
    deviceId: string;

    constructor(model) {
        super(model.device);
        this.id = model.id;
        this.userId = model.userId;
        this.deviceId = model.deviceId;
    }

    static mapListEntityToDto(model): DeviceDto[] {
        return model.map(el => new BasketItemDto(el));
    }
}
