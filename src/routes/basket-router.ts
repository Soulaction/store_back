import {Router} from 'express';
import basketController from '../controllers/basketController';

const basketRout = Router();
basketRout.get('/:idBasket', basketController.getAll);
basketRout.post('/', basketController.addItem);
basketRout.delete('/:id', basketController.deleteItem);

export default basketRout;
