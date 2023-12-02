const Router = require('express')
const TypeController = require('../controllers/typeController')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')


router.get('/', TypeController.getAll)
router.post('/', checkRole("ADMIN"), TypeController.create)

module.exports = router