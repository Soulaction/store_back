const Router = require('express')
const deviceController = require('../controllers/deviceController')

const router = new Router()

router.post('/add', deviceController.addBasket)
router.get('/', deviceController.getAll)
router.post('/', deviceController.create)
router.get('/:id', deviceController.getOne)
router.delete('/:id', deviceController.deleteDevice)

module.exports = router