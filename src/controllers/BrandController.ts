import {BrandEntity} from '../models/models';

class BrandController {

    async create(req, res) {

        const {name} = req.body
        const brand = await BrandEntity.create({name})
        console.log({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brand = await BrandEntity.findAll()
        return res.json(brand)
    }
}

export default new BrandController()
