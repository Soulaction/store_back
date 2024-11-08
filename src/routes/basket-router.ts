import {Router} from 'express';
import basketController from '../controllers/basketController';

const basketRout = Router();
basketRout.get('/:userId', basketController.getAll);
basketRout.post('/', basketController.addItem);
basketRout.delete('/:id', basketController.deleteItem);

export default basketRout;
