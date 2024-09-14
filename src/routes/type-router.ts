import {Router} from 'express';
import typeController from '../controllers/TypeController';

const typeRouter = Router();
typeRouter.get('/', typeController.getAll);
typeRouter.post('/', typeController.create);
typeRouter.delete('/:id', typeController.delete);

export default typeRouter;
