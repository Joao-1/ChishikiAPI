import { Router } from "express";
import DiscordCommandsController from "../api/controllers/DiscordCommandsController";
import DiscordCommandsRepository from "../api/repositories/DiscordCommandsRepository";
import DiscordCommandsService from "../api/services/DiscordCommandsService";
import validation from "../middlewares/validationMiddlewares";
import {
	discordCommandsBodyToCreateSchema,
	discordCommandsQueryParamsToReadSchema,
} from "../validation/validationSchemas/discordCommandsValidation";

const discordCommandsRepository = new DiscordCommandsRepository();
const discordCommandsService = new DiscordCommandsService(discordCommandsRepository);
const discordCommandsController = new DiscordCommandsController(discordCommandsService);

const discordcommandsRoutes = Router();

discordcommandsRoutes.post("/discord/commands", validation("body", discordCommandsBodyToCreateSchema), (req, res) =>
	discordCommandsController.create(req, res)
);

discordcommandsRoutes.get(
	"/discord/commands",
	validation("params", discordCommandsQueryParamsToReadSchema),
	(req, res) => discordCommandsController.read(req, res)
);

export default discordcommandsRoutes;
