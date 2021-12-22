import { Router } from "express";
import Joi from "joi";
import DiscordServerController from "../api/controllers/DiscordServerController";
import DiscordServerRepository from "../api/repositories/DiscordServerRepository";
import DiscordServerService from "../api/services/DiscordServerService";
import validation from "../middlewares/validationMiddlewares";
import {
	discordServerBodyToCreateSchema,
	discordServerBodyToUpdateSchema,
	discordServerQueryParamsToReadSchema,
} from "../validation/validationSchemas/discordServerValidation";

const discordServerRepository = new DiscordServerRepository();
const discordServerService = new DiscordServerService(discordServerRepository);
const discordServerController = new DiscordServerController(discordServerService);

const discordServerRoutes = Router();

discordServerRoutes.get("/ping", (req, res) => {
	res.status(200).json("pong!");
});

discordServerRoutes.post("/discord/server", validation("body", discordServerBodyToCreateSchema), (req, res, next) =>
	discordServerController.create(req, res, next)
);

discordServerRoutes.get(
	"/discord/server/:id?",
	validation("params", Joi.object({ id: Joi.number() })),
	validation("query", discordServerQueryParamsToReadSchema),
	(req, res, next) => discordServerController.read(req, res, next)
);

discordServerRoutes.put(
	"/discord/server/:id",
	validation("params", Joi.object({ id: Joi.number().required() })),
	validation("body", discordServerBodyToUpdateSchema),
	(req, res, next) => discordServerController.put(req, res, next)
);

export default discordServerRoutes;
