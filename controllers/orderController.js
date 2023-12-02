const { model } = require("../db");
const { Order, Device } = require("../models/models")

class OrderController {


    async createOrder(req, res) {
        const { userId, basketDeviceId, deviceId, payment } = req.body;
        const statusPayment = payment === undefined ? 'Не оплачено' : 'Оплачено'
        const order = await Order.create({ statusPayment, userId, basketDeviceId, deviceId })
        return res.json(order)
    }

    async getPaymantOrder(req, res) {

        let statusPayment = 'Оплачено'
        const paymantOrder = await Order.findAll({
            include: [{ model: Device}],
            where: {statusPayment}
        })
        return res.json(paymantOrder)
    }

    async getSendOrder(req, res){
        let statusOrder = 'Отправлено'
        const sendOrder = await Order.findAll({
            include: [{ model: Device}],
            where: {statusOrder}
        })
        return res.json(sendOrder)
    }

    async getAllOrder(req, res) {
        const orders = await Order.findAll(
            {
                include: [{ model: Device }]
            }
        )
        return res.json(orders)
    }

    async getOneOrder(req, res) {
        const {id} = req.params
        const order = await Order.findAll(
            {
                include: [{ model: Device }],
                where: {id}
            }
        )
        return res.json(order)
    }

    async updateOneOrder(req, res) {
        const {id, statusOrder} = req.body
        const order = await Order.update(
            {statusOrder},
            {
                where: {id}
            }
        )
        return res.json(order)
    }

    async findOrder(req, res) {
        const {basketDeviceId, userId} = req.query
        console.log({basketDeviceId, userId})
        const order = await Order.findOne(
            {
                where: {basketDeviceId, userId}
            }
        )
        return res.json(order)
    }

    async updateDateOrder(req, res) {
        const {basketDeviceId, userId,  statusPaymant} = req.body
        const statusPayment = statusPaymant === undefined ? 'Не оплачено' : 'Оплачено'
        const order = await Order.update(
            {statusPayment},
            {
                where: {basketDeviceId, userId}
            }
        )
        return res.json(order)
    }
}

module.exports = new OrderController()