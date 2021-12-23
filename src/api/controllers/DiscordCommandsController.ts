import { NextFunction, Request, Response } from "express";
import { IDiscordCommandsService, IQueryParamsRead } from "../../types/types";
import returnErrorToClient from "../../utils/returnErrorToClient";

export default class DiscordCommandsController {
	discordCommandsService: IDiscordCommandsService;

	constructor(discordCommandsService: IDiscordCommandsService) {
		this.discordCommandsService = discordCommandsService;
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const { name, description, type } = req.body;
		const newCommand = await this.discordCommandsService.registerDiscordCommand(name, description, type);

		if (newCommand.isFailure()) {
			returnErrorToClient(newCommand.error, res, next);
			return;
		}
		res.status(201).json({ status: "success", command: newCommand.value });
	}

	async read(req: Request, res: Response, next: NextFunction) {
		const querysInRead = req.query as unknown as IQueryParamsRead;
		const discordServerSearched = await this.discordCommandsService.readDiscordCommands(querysInRead);

		if (discordServerSearched.isFailure()) {
			returnErrorToClient(discordServerSearched.error, res, next);
			return;
		}
		res.status(200).json({ status: "success", commands: discordServerSearched.value });
	}
}
