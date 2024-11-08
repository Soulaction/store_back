import {sequelize} from '../db';
import {DataTypes } from 'sequelize';

const BasketDeviceEntity = sequelize.define("basket_device",{
    id: {type: DataTypes.UUID, primaryKey: true},
    userId: {type: DataTypes.STRING, allowNull: false}
})

const DeviceEntity = sequelize.define('device',{

    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: true}

})

const RatingEntity = sequelize.define('rating',{

    id: {type: DataTypes.UUID, primaryKey: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}

})

const TypeEntity = sequelize.define('type',{

    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}

})

const BrandEntity = sequelize.define('brand',{

    id: {type: DataTypes.UUID, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}

})

const DeviceInfoEntity = sequelize.define('device_info',{

    id: {type: DataTypes.UUID, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const OrderEntity = sequelize.define('order', {
    id: {type: DataTypes.UUID, primaryKey: true},
    statusOrder: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Ожидание формирования'},
    statusPayment: {type: DataTypes.STRING, allowNull: false},
})

BasketDeviceEntity.hasMany(OrderEntity)
OrderEntity.belongsTo(BasketDeviceEntity)

TypeEntity.hasMany(DeviceEntity)
DeviceEntity.belongsTo(TypeEntity)

BrandEntity.hasMany(DeviceEntity)
DeviceEntity.belongsTo(BrandEntity)

DeviceEntity.hasMany(BasketDeviceEntity)
BasketDeviceEntity.belongsTo(DeviceEntity)

DeviceEntity.hasMany(OrderEntity)
OrderEntity.belongsTo(DeviceEntity)

DeviceEntity.hasMany(RatingEntity)
RatingEntity.belongsTo(DeviceEntity)

DeviceEntity.hasMany(DeviceInfoEntity, {as: 'info'})
DeviceInfoEntity.belongsTo(DeviceEntity)


export {
    BasketDeviceEntity,
    BrandEntity,
    TypeEntity,
    DeviceEntity,
    DeviceInfoEntity,
    RatingEntity,
    OrderEntity
}
