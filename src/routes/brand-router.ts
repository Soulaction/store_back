import {Router} from 'express';
import brandController from '../controllers/BrandController';
import authMiddleware from "../middleware/AuthMiddleware";
import checkRoleMiddleware from "../middleware/CheckRoleMiddleware";

const brandRouter = Router();
brandRouter.get('/', brandController.getAll);
brandRouter.post('/', authMiddleware, checkRoleMiddleware('ADMIN'), brandController.create);
brandRouter.put('/', authMiddleware, checkRoleMiddleware('ADMIN'), brandController.update);
brandRouter.delete('/:id', authMiddleware, checkRoleMiddleware('ADMIN'), brandController.delete);

export default brandRouter;
