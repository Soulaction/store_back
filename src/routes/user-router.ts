import {Router} from 'express';
import userController from '../controllers/UserController';

const typeRouter = Router();
typeRouter.post('/registration', userController.registration)
typeRouter.post('/login', userController.login)
typeRouter.get('/authentication', userController.check)
typeRouter.delete('/delete/:id', userController.deleteUser)
typeRouter.get('/viewUsers', userController.getAllUsers)

export default typeRouter;
