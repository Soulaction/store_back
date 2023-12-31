const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/authentication', authMiddleware, userController.check)
router.delete('/delete/:id', userController.deleteUser)
router.get('/viewUsers', userController.allUser)

module.exports = router