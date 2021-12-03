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

discordServerRoutes.post("/discordserver", validation("body", discordServerBodyToCreateSchema), (req, res) =>
	discordServerController.create(req, res)
);

discordServerRoutes.get("/discordserver", validation("query", discordServerQueryParamsToReadSchema), (req, res) =>
	discordServerController.read(req, res)
);

discordServerRoutes.put(
	"/discordserver/:id",
	validation("params", Joi.object({ id: Joi.string().required() })),
	validation("body", discordServerBodyToUpdateSchema),
	(req, res) => discordServerController.put(req, res)
);

export default discordServerRoutes;
