import {Request, Response} from 'express';
import TypeService from "../service/TypeService";
import {TypeDto} from "../dto/TypeDto";
import {FileArray, UploadedFile} from "express-fileupload";


class TypeController {
    async create(req: Request, res: Response) {
        const {name} = req.body;
        const {img} = req.files as FileArray;
        const type = await TypeService.create(name, img as UploadedFile);
        return res.status(201).json(type);
    }

    async getAll(req: Request, res: Response) {
        const types: TypeDto[] = TypeDto.mapListEntityToDto(await TypeService.getAll());
        return res.json(types)
    }

    async delete(req: Request<{id: number}>) {
        const {id} = req.params;
        await TypeService.delete(id);
    }
}

export default new TypeController();
