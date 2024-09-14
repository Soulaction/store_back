import {Router} from 'express';
const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');
import typeRouter from './type-router';
const userRouter = require('./userRouter');
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
