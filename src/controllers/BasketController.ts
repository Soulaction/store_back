import {NextFunction, Request, Response} from "express";
import basketService from '../service/BasketService';
import {BasketDataDto} from "../dto/BasketDto";
import {BasketItemDto} from "../dto/BasketItemDto";

class BasketController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params;
            res.status(200).json(BasketItemDto.mapListEntityToDto(await basketService.getAll(userId)));
        } catch (e) {
            next(e)
        }
    }

    async deleteItem(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            return res.status(204).json(await basketService.deleteItem(id));
        } catch (e) {
            next(e)
        }
    }

    async addItem(req: Request, res: Response, next: NextFunction) {
        try {
            const basketDto: BasketDataDto = req.body;
            return res.status(201).json(await basketService.addItem(basketDto));
        } catch (e) {
            next(e)
        }
    }
}

export default new BasketController();
