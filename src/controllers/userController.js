const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        { id: id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {

    async registration(req, res, next) {
        const { email, password, role } = req.body

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль!'))
        }

        const condidate = await User.findOne({ where: { email } })

        if (condidate) {
            return next(ApiError.badRequest('Пользователь уже существует!'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJWT(user.id, user.email, user.role)

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user){
            return next(ApiError.internal('Пользователь не найден!'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword){
            return next(ApiError.badRequest('Пароль введён не правильно!'))
        }

        const token = generateJWT(user.id, user.password, user.role)
        res.json({token})
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        res.json({token})
    }

    async deleteUser(req, res)  {
        const {id} = req.params
        const user = await User.destroy({where: {id}})
        return res.json(user)
    }

    async getAllUsers(req, res)  {
        const user = await User.findAll({attributes: {exclude: ['password']}})
        return res.json(user)
    }

}

module.exports = new UserController()
