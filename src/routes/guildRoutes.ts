import { Router } from "express";
import GuildController from "../api/controllers/GuildController";
import GuildRepository from "../api/repositories/GuildRepository";
import GuildService from "../api/services/GuildService";
import validation from "../middlewares/validationMiddlewares";
import { guildBodySchema, guildQueryParamsSchema } from "../validation/validationSchemas/guildValidation";

const guildRepository = new GuildRepository();
const guildService = new GuildService(guildRepository);
const guildController = new GuildController(guildService);

const guildRoutes = Router();
guildRoutes.get("/ping", (req, res) => {
	res.status(200).json("pong!");
});

guildRoutes.post("/guild", validation("body", guildBodySchema), (req, res, NextFunction) =>
	guildController.create(req, res, NextFunction)
);
guildRoutes.get("/guild", validation("query", guildQueryParamsSchema), (req, res, NextFunction) =>
	guildController.read(req, res, NextFunction)
);

export default guildRoutes;
