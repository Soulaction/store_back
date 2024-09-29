import {v4} from "uuid";
import {BrandEntity} from "../models/models";
import {ApiError} from "../error/ApiError";
import {Op} from "sequelize";
import {BrandDto} from "../dto/BrandDto";

class BrandService {
    async create(name: string) {
        const id = v4();
        return await BrandEntity.create({id, name});
    }

    async update(brandDto: BrandDto) {

        const findBrand = await BrandEntity.findOne({where: {id: brandDto.id}});
        if (!findBrand?.dataValues) {
            throw ApiError.badRequest('Редактируемая запись не найдена');
        }

        const checkBrand = await BrandEntity.findOne({where: {name: brandDto.name, id: { [Op.ne]: brandDto.id }}});
        if (checkBrand?.dataValues) {
            throw ApiError.badRequest('Запись с таким наименованием уже существует');
        }
        let updateBrand = await findBrand.update({name: brandDto.name});
        return updateBrand;
    }

    async getAll() {
        return await BrandEntity.findAll();
    }

    async delete(id: number): Promise<void> {
        const brandEntity = await BrandEntity.findOne(
            {
                where: {id}
            }
        );
        brandEntity?.destroy();
    }
}

export default new BrandService();
