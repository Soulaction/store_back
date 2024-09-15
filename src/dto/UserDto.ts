export class UserDto {
    id: number;
    fio: string;
    telephone: string;
    email: string;
    password: string;
    role: string;

    constructor(model) {
        this.id = model.id;
        this.fio = model.fio;
        this.telephone = model.telephone;
        this.email = model.email;
        this.password = model.password;
        this.role = model.role;
    }

    static mapListEntityToDto(model): UserDto[] {
        return model.map(el => new UserDto(el));
    }
}
