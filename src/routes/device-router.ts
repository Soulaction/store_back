import {Router} from 'express';
import deviceController from '../controllers/DeviceController';
import authMiddleware from "../middleware/AuthMiddleware";
import checkRoleMiddleware from "../middleware/CheckRoleMiddleware";

const deviceRouter = Router();
deviceRouter.get('/', deviceController.getAll);
deviceRouter.post('/', authMiddleware, checkRoleMiddleware('ADMIN'), deviceController.create);
deviceRouter.patch('/', authMiddleware, checkRoleMiddleware('ADMIN'), deviceController.update);
deviceRouter.get('/:id', deviceController.getOne);
deviceRouter.delete('/:id', authMiddleware, checkRoleMiddleware('ADMIN'), deviceController.deleteDevice);

export default deviceRouter;
