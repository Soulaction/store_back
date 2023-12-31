const Router = require('express')
const BasketController = require('../controllers/basketController')
const router = new Router()


router.get('/:basketId', BasketController.getAll)
router.delete('/:id', BasketController.deleteItem)


module.exports = router