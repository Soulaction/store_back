import 'dotenv/config';
import express from 'express';
import {sequelize} from './db';
import fileUpload from 'express-fileupload';
import router from './routes/index';
import errorHandler from './middleware/ErrorHandingMiddleWare';
import path from 'path';
import corsMiddleware from "./middleware/CorsMiddleware";
const {graphqlHTTP} = require('express-graphql');
const schema = require('./graphql/shema');

const PORT = process.env.PORT || 5000;

const app = express()
app.use(corsMiddleware);
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}));
app.use(express.json());
app.use(fileUpload({}));
app.use('/store-api', express.static(path.resolve(__dirname, '..', 'static')));
app.use('/store-api', router);


app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
