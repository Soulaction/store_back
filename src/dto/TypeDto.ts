export class TypeDto {
    id: number;
    name: string;
    img: string;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.img = model.img;
    }

    static mapListEntityToDto(model): TypeDto[] {
        return model.map(el => ({id: el.id, name: el.name} as TypeDto));
    }
}
