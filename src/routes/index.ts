import {Router} from 'express';
import deviceRouter from './device-router';
import typeRouter from './type-router';
import brandRouter from './brand-router';
import basketRouter from './basket-router';
import authMiddleware from "../middleware/AuthMiddleware";

const orderRouter = require('./orderRouter');


const router = Router();
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/basket', authMiddleware, basketRouter);
router.use('/order', orderRouter);

export default router;
