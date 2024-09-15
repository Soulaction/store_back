import {Router} from 'express';
import brandController from '../controllers/BrandController';

const brandRouter = Router();
brandRouter.get('/', brandController.getAll);
brandRouter.post('/', brandController.create);

export default brandRouter;
