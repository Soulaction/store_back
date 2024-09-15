import {NextFunction, Request, Response} from 'express';
import TypeService from "../service/TypeService";
import {TypeDto} from "../dto/TypeDto";
import {FileArray, UploadedFile} from "express-fileupload";


class TypeController {
    async create(req: Request, res: Response, next: NextFunction) {
        const {name} = req.body;
        const {img} = req.files as FileArray;
        const type = await TypeService.create(name, img as UploadedFile);
        return res.status(201).json(type);
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const types: TypeDto[] = TypeDto.mapListEntityToDto(await TypeService.getAll());
        return res.json(types)
    }

    async delete(req: Request<{id: number}>, res: Response, next: NextFunction) {
        const {id} = req.params;
        try {
            await TypeService.delete(id);
            return res.status(204).json();
        } catch (err) {
            console.log(err);
            next(err);
        };
    }
}

export default new TypeController();
