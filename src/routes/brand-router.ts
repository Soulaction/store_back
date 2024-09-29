import {Router} from 'express';
import brandController from '../controllers/BrandController';

const brandRouter = Router();
brandRouter.get('/', brandController.getAll);
brandRouter.post('/', brandController.create);
brandRouter.put('/', brandController.update);
brandRouter.delete('/:id', brandController.delete);

export default brandRouter;
