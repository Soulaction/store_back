export class DeviceDto {
    id: number;
    name: string;
    price: string;
    brandId: string;
    typeId: string;
    img: string;
    info: string;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.price = model.price;
        this.brandId = model.brandId;
        this.typeId = model.typeId;
        this.img = model.img;
        this.info = model.info;
    }

    static mapListEntityToDto(model): DeviceDto[] {
        return model.map(el => new DeviceDto(el));
    }
}
