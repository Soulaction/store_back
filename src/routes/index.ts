import {Router} from 'express';
import deviceRouter from './device-router';
import typeRouter from './type-router';
import brandRouter from './type-router';
import userRouter from './user-router';
const basketRouter = require('./basketRouter');
const orderRouter = require('./orderRouter');


const router = Router();
router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/basket', basketRouter);
router.use('/order', orderRouter);

export default router;
