import {sequelize} from '../db';
import {DataTypes } from 'sequelize';

const UserEntity = sequelize.define('user',{

    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fio: {type: DataTypes.STRING},
    telephone: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue:"USER"}

})

const BasketDeviceEntity = sequelize.define("basket_device",{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BasketEntity = sequelize.define('basket',{

    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}

})

const DeviceEntity = sequelize.define('device',{

    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue:0},
    img: {type: DataTypes.STRING, allowNull: false}

})

const RatingEntity = sequelize.define('rating',{

    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}

})

const TypeEntity = sequelize.define('type',{

    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}

})

const BrandEntity = sequelize.define('brand',{

    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}

})

const DeviceInfoEntity = sequelize.define('device_info',{

    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const OrderEntity = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    statusOrder: {type: DataTypes.STRING, allowNull: false, defaultValue: 'Ожидание формирования'},
    statusPayment: {type: DataTypes.STRING, allowNull: false},
})

UserEntity.hasOne(BasketEntity)
BasketEntity.belongsTo(UserEntity)

UserEntity.hasMany(RatingEntity)
RatingEntity.belongsTo(UserEntity)

UserEntity.hasMany(OrderEntity)
OrderEntity.belongsTo(UserEntity)

BasketEntity.hasMany(BasketDeviceEntity)
BasketDeviceEntity.belongsTo(BasketEntity)

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
    UserEntity,
    BasketEntity,
    BasketDeviceEntity,
    BrandEntity,
    TypeEntity,
    DeviceEntity,
    DeviceInfoEntity,
    RatingEntity,
    OrderEntity
}
