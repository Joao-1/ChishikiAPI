import { Request, Response } from "express";
import { IBodyPut, IDiscordServerService, IQueryParamsRead } from "../../types/types";

class DiscordServerController {
	discordServerService: IDiscordServerService;

	constructor(discordServerService: IDiscordServerService) {
		this.discordServerService = discordServerService;
	}

	async create(req: Request, res: Response) {
		// eslint-disable-next-line prettier/prettier
		const discordServerId = req.body.id as string;
		const newDiscordServer = await this.discordServerService.createDiscordServer(discordServerId);
		res.status(201).json({ status: "sucess", newDiscordServer });
	}

	async read(req: Request, res: Response) {
		const querysInRead = req.query as unknown as IQueryParamsRead;
		const discordServerSearched = await this.discordServerService.readDiscordServers(querysInRead);
		res.status(200).json({ status: "sucess", servers: discordServerSearched });
	}

	async put(req: Request, res: Response) {
		const discordServerId = req.params.id as unknown as string;
		const bodyPut = req.body as unknown as IBodyPut;
		await this.discordServerService.updateDiscordServer(discordServerId, bodyPut);
		res.status(204).json();
	}

	// async delete() {}
}

export default DiscordServerController;
