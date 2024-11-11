import {Router} from 'express';
import typeController from '../controllers/TypeController';
import authMiddleware from "../middleware/AuthMiddleware";
import checkRoleMiddleware from "../middleware/CheckRoleMiddleware";

const typeRouter = Router();
typeRouter.get('/', typeController.getAll);
typeRouter.post('/', authMiddleware, checkRoleMiddleware('ADMIN'), typeController.create);
typeRouter.put('/', authMiddleware, checkRoleMiddleware('ADMIN'), typeController.update);
typeRouter.delete('/:id', authMiddleware, checkRoleMiddleware('ADMIN'), typeController.delete);

export default typeRouter;
