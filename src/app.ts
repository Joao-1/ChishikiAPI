import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import config from "./config/config";
import errorMiddleware from "./middlewares/ApiErrorHandler";
// import passport from 'passport';
// import auth from './API/auth/passportStrategy';
import Routes from "./routes";

class App {
	// eslint-disable-next-line prettier/prettier
	private express: express.Application;

	constructor() {
		this.express = express();
	}

	public async load() {
		await this.database();
		this.middleware();
		// this.authenticate();
		this.routes();
		this.errors();
	}

	public start(port: number) {
		console.log(`App starting at http://localhost:${port}`);
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
			console.log("Banco de dados conectado com sucesso");
		} catch (error) {
			console.log(error);
		}
	}

	private middleware() {
		this.express.use(morgan("dev"));
		this.express.use(helmet());
		this.express.use(express.urlencoded({ extended: false }));
		this.express.use(express.json());
		// this.express.use(passport.initialize());
	}

	// private authenticate() {
	//     passport.use(auth.jwtStrategy);
	// }

	private routes() {
		this.express.use(Routes);
	}

	private errors() {
		this.express.use(errorMiddleware);
	}
}

export default App;
