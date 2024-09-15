import {v4} from "uuid";
import path from "path";
import {BrandEntity} from "../models/models";
import {UploadedFile} from "express-fileupload";
import * as fs from "fs";
import {TypeDto} from "../dto/TypeDto";

class TypeService {
    async create(name: string, img: UploadedFile) {

        let fileName = v4() + ".jpg"
        await img.mv(path.resolve(__dirname, '../../', 'static/types/', fileName));
        return await BrandEntity.create({name, img: fileName});
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
        fs.unlinkSync(path.resolve(__dirname, '../../', 'static/types/', new TypeDto(brandEntity).name));
    }
}

export default new TypeService();
