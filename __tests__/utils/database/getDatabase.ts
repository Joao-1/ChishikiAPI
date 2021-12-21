import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import config from "../../../src/config/config";

const { database } = config;

function openConnection() {
	return new Sequelize({
		database: database.database,
		password: database.password,
		username: database.username,
		dialect: database.dialect as Dialect,
		models: [`${__dirname}/../../../src/database/models`],
	});
}

export default function getModels() {
	const connection = openConnection();

	const db = {
		connection,
		Sequelize,
	};

	Object.values(db).forEach((model: any) => {
		if (model.associate) {
			model.associate(db);
		}
	});

	return db;
}
