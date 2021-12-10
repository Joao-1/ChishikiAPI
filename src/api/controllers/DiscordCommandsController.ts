import { Request, Response } from "express";
import { IDiscordCommandsService, IQueryParamsRead } from "../../types/types";

class DiscordCommandsController {
	discordCommandsService: IDiscordCommandsService;

	constructor(discordCommandsService: IDiscordCommandsService) {
		this.discordCommandsService = discordCommandsService;
	}

	async create(req: Request, res: Response) {
		const { name, description, type } = req.body;
		const newCommand = await this.discordCommandsService.createDiscordCommand(name, description, type);
		res.status(201).json({ status: "sucess", newCommand });
	}

	async read(req: Request, res: Response) {
		const querysInRead = req.query as unknown as IQueryParamsRead;
		const discordServerSearched = await this.discordCommandsService.readDiscordCommands(querysInRead);
		res.status(200).json({ status: "sucess", commands: discordServerSearched });
	}
}

export default DiscordCommandsController;
