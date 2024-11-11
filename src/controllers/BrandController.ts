import {NextFunction, Request, Response} from "express";
import BrandService from "../service/BrandService";
import {BrandDto} from "../dto/BrandDto";

class BrandController {

    async create(req: Request, res: Response) {
        const {name} = req.body;
        const brand: BrandDto = new BrandDto(await BrandService.create(name));
        return res.json(brand);
    }

    async getAll(req: Request, res: Response) {
        const brand: BrandDto[] = BrandDto.mapListEntityToDto(await BrandService.getAll());
        return res.json(brand);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const brandDto: BrandDto = req.body;
        try {
            const newBrand = await BrandService.update(brandDto);
            res.status(201).json(newBrand);
        } catch (e) {
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        try {
            await BrandService.delete(id);
            return res.status(204).json();
        } catch (err) {
            next(err);
        }
    }
}

export default new BrandController()
