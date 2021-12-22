import { NextFunction, Request, Response } from "express";
import { IDiscordServerBodyPut, IDiscordServerService, IQueryParamsRead } from "../../types/types";
import returnErrorToClient from "../../utils/returnErrorToClient";

export default class DiscordServerController {
	discordServerService: IDiscordServerService;

	constructor(discordServerService: IDiscordServerService) {
		this.discordServerService = discordServerService;
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const discordServerId = req.body.id as string;
		const newDiscordServer = await this.discordServerService.registerDiscordServer(discordServerId);

		if (newDiscordServer.isFailure()) {
			returnErrorToClient(newDiscordServer.error, res, next);
			return;
		}
		res.status(201).json({ status: "success", server: newDiscordServer.value });
	}

	async read(req: Request, res: Response, next: NextFunction) {
		const specificServerId = req.params.id as string;
		const querysInRead = req.query as unknown as IQueryParamsRead;

		const discordServerSearched = await this.discordServerService.readDiscordServers(
			querysInRead,
			specificServerId
		);

		if (discordServerSearched.isFailure()) {
			returnErrorToClient(discordServerSearched.error, res, next);
			return;
		}
		res.status(200).json({ status: "success", servers: discordServerSearched.value });
	}

	async put(req: Request, res: Response, next: NextFunction) {
		const discordServerId = req.params.id as unknown as string;
		const bodyPut = req.body as unknown as IDiscordServerBodyPut;

		const serverUpdated = await this.discordServerService.updateDiscordServer(discordServerId, bodyPut);

		if (serverUpdated.isFailure()) {
			returnErrorToClient(serverUpdated.error, res, next);
			return;
		}
		res.status(204).send();
	}

	// async delete() {}
}
