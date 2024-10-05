import {NextFunction, Request, Response} from "express";
import basketService from '../service/BasketService';
import {BasketDto} from "../dto/BasketDto";

class BasketController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        const {idBasket} = req.params;
        res.status(200).json(await basketService.getAll(idBasket))
    }

    async deleteItem(req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        return res.status(204).json(await basketService.deleteItem(id));
    }

    async addItem(req: Request, res: Response, next: NextFunction) {
        const basketDto: BasketDto = req.body;
        return res.status(201).json(await basketService.addItem(basketDto));
    }
}

export default new BasketController();
