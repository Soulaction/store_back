import {NextFunction, Request, Response} from "express";
import {ApiError} from '../error/ApiError';
import {DeviceDto} from "../dto/DeviceDto";
import deviceService from '../service/DeviceService'
import {FileArray, UploadedFile} from "express-fileupload";

class DeviceController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            let deviceDto: DeviceDto = req.body;
            if (!req.files) {
                throw ApiError.badRequest('Картинка не была передана');
            }
            const {img} = req.files;
            const device = await deviceService.create(deviceDto, img as UploadedFile);
            res.status(201).json(device);
        } catch (e) {
            next(e);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const device: DeviceDto = req.body;
        try {
            let img: UploadedFile | null = null;
            if (req.files) {
                img = (req.files as FileArray).img as UploadedFile;
            }

            const newType = await deviceService.update(device, img);
            res.status(201).json(newType);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let {brandId, typeId, limit = 10, page = 1} = req.query;
            let offset = (+page) * (+limit) - (+limit);
            const devices = await deviceService.getAll(brandId as string, typeId as string, limit as number, offset);
            res.status(200).json(devices);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            res.status(200).json(await deviceService.getOne(id));
        } catch (e) {
            next(e);
        }
    }

    async addBasket(req: Request, res: Response, next: NextFunction) {
        try {
            const {basketId, deviceId} = req.body;
            const basketDevice = await deviceService.addBasket(basketId, deviceId);
            res.status(201).json(basketDevice);
        } catch (e) {
            next(e);
        }
    }

    async deleteDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            await deviceService.deleteDevice(id);
            res.status(204).json();
        } catch (e) {
            next(e);
        }
    }
}

export default new DeviceController();
