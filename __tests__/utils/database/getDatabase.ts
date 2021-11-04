import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import config from '../../../src/config/config';

const { database } = config;

let sequelize = new Sequelize({
    database: database.database,
    password: database.password,
    username: database.username,
    dialect: database.dialect as Dialect,
    models: [`${__dirname}/../../src/database/models`],
});

const db = {
    sequelize,
    Sequelize,
};

Object.values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});

export default db;
