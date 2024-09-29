export class BrandDto {
    id: number;
    name: string;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
    }

    static mapListEntityToDto(model): BrandDto[] {
        return model.map(el => new BrandDto(el));
    }
}
