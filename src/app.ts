import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import logger from "../logs/logger";
import config from "./config/config";
import errorHandler from "./middlewares/errorHandlerMiddleware";
import Routes from "./routes";

class App {
	private express: express.Application;

	constructor() {
		this.express = express();
	}

	public async load() {
		await this.database();
		this.middleware();
		this.routes();
		this.errorHandler();
	}

	public start(port: number) {
		logger.info(`App starting at http://localhost:${port}`);
		return this.express.listen(port);
	}

	private async database() {
		const { database } = config;
		try {
			const connection = new Sequelize({
				database: database.database,
				password: database.password,
				username: database.username,
				host: database.host,
				dialect: database.dialect as Dialect,
				models: [`${__dirname}/database/models`],
			});
			connection.authenticate();
			logger.info("Database connected successfully");
		} catch (error) {
			logger.error("Error connecting to database", error as string, "app");
			process.exit();
		}
	}

	private middleware() {
		this.express.use(morgan("dev"));
		this.express.use(helmet());
		this.express.use(express.urlencoded({ extended: false }));
		this.express.use(express.json());
	}

	private routes() {
		this.express.use(Routes);
	}

	private errorHandler() {
		this.express.use(errorHandler);
	}
}

export default App;
