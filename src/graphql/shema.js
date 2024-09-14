const {buildSchema} = require('graphql');

const schema = buildSchema(`

    type Device {
        id: ID
        name: String
        price: Int
        rating: Int
        img: String
        info: [DeviceInfo]
    }
    type DeviceInfo {
        id: ID
        title: String
        description: String
    }
    
    input DeviceInput {
        id: ID
        name: String!
        price: Int!
        rating: Int!
        img: String!
        info: [DeviceInfoInput]
    }
    input DeviceInfoInput {
        id: ID
        title: String!
        description: String!
    }
    
    type Query {
        getAllDevices: [Device]
        getADevice(id: ID): Device
    }
`);

module.exports = schema;
