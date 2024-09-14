import {Options} from "sequelize/types/sequelize";
import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_Password!,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    } as Options
);
