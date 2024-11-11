import {v4} from "uuid";
import path from "path";
import {TypeEntity} from "../models/models";
import {UploadedFile} from "express-fileupload";
import * as fs from "fs";
import {TypeDto} from "../dto/TypeDto";
import {ApiError} from "../error/ApiError";
import {Op} from "sequelize";

class TypeService {
    async create(name: string, img: UploadedFile) {

        const id = v4();
        const fileName = v4() + ".jpg";
        const type = await TypeEntity.findOne({where: {name}});
        if (type?.dataValues) {
            throw ApiError.badRequest('Запись с таким наименованием уже существует');
        }
        await img.mv(path.resolve(__dirname, '../../', 'static/types/', fileName));
        return await TypeEntity.create({id, name, img: fileName});
    }

    async update(type: TypeDto, img: UploadedFile | null) {

        const findType = await TypeEntity.findOne({where: {id: type.id}});
        if (!findType?.dataValues) {
            throw ApiError.badRequest('Редактируемая запись не найдена');
        }

        const checkType = await TypeEntity.findOne({where: {name: type.name, id: { [Op.ne]: type.id }}});
        if (checkType?.dataValues) {
            throw ApiError.badRequest('Запись с таким наименованием уже существует');
        }
        let updateType;

        if (img) {
            await fs.unlinkSync(path.resolve(__dirname, '../../', 'static/types/', findType.dataValues.img));

            const fileName = v4() + ".jpg";
            updateType = await findType.update({name: type.name, img: fileName});
            await img.mv(path.resolve(__dirname, '../../', 'static/types/', fileName));
        } else {
            updateType = await findType.update({name: type.name});
        }
        return updateType;
    }

    async getAll() {
        return await TypeEntity.findAll();
    }

    async delete(id: string): Promise<void> {
        const brandEntity = await TypeEntity.findOne(
            {
                where: {id}
            }
        );
        brandEntity?.destroy();
        try {
            fs.unlinkSync(path.resolve(__dirname, '../../', 'static/types/', new TypeDto(brandEntity).img));
        } catch {
        }
    }
}

export default new TypeService();
