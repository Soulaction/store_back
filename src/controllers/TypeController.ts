import {NextFunction, Request, Response} from 'express';
import TypeService from "../service/TypeService";
import {TypeDto} from "../dto/TypeDto";
import {FileArray, UploadedFile} from "express-fileupload";
import {ApiError} from "../error/ApiError";


class TypeController {
    async create(req: Request, res: Response, next: NextFunction) {
        const {name} = req.body;
        try {
            let type;
            if (!req.files) {
                throw ApiError.badRequest('Картинка не была передана');
            }
            const {img} = req.files as FileArray;
            type = await TypeService.create(name, img as UploadedFile);
            res.status(201).json(type);
        } catch (e) {
            next(e);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const type: TypeDto = req.body;
        try {
            let img: UploadedFile | null = null;
            if (req.files) {
                img = (req.files as FileArray).img as UploadedFile;
            }

            const newType = await TypeService.update(type, img);
            res.status(201).json(newType);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req: Request, res: Response) {
        const types: TypeDto[] = TypeDto.mapListEntityToDto(await TypeService.getAll());
        return res.json(types)
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        try {
            await TypeService.delete(id);
            res.status(204).json();
        } catch (err) {
            next(err);
        }
    }
}

export default new TypeController();
