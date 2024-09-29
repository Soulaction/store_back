import {Router} from 'express';
import deviceController from '../controllers/DeviceController';

const deviceRouter = Router();
deviceRouter.post('/add', deviceController.addBasket);
deviceRouter.get('/', deviceController.getAll);
deviceRouter.post('/', deviceController.create);
deviceRouter.patch('/', deviceController.update);
deviceRouter.get('/:id', deviceController.getOne);
deviceRouter.delete('/:id', deviceController.deleteDevice);

export default deviceRouter;
