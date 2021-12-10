import { NextFunction, Request, Response } from "express";
import { IDiscordServerBodyPut, IDiscordServerService, IQueryParamsRead } from "../../types/types";

class DiscordServerController {
	discordServerService: IDiscordServerService;

	constructor(discordServerService: IDiscordServerService) {
		this.discordServerService = discordServerService;
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const discordServerId = req.body.id as string;
		const newDiscordServer = await this.discordServerService.registerDiscordServer(discordServerId);

		if (newDiscordServer.isFailure()) {
			const { error } = newDiscordServer;

			if (error.statusCode === 500) {
				next(error);
				return;
			}

			res.status(error.statusCode).json({ status: "error", error });
		} else {
			res.status(201).json({ status: "sucess", server: newDiscordServer.value });
		}
	}

	async read(req: Request, res: Response, next: NextFunction) {
		const querysInRead = req.query as unknown as IQueryParamsRead;

		const discordServerSearched = await this.discordServerService.readDiscordServers(querysInRead);

		if (discordServerSearched.isFailure()) {
			const { error } = discordServerSearched;

			if (error.statusCode === 500) {
				next(error);
				return;
			}

			res.status(error.statusCode).json({ status: "error", error });
		} else {
			res.status(200).json({ status: "sucess", servers: discordServerSearched.value });
		}
	}

	async put(req: Request, res: Response, next: NextFunction) {
		const discordServerId = req.params.id as unknown as string;
		const bodyPut = req.body as unknown as IDiscordServerBodyPut;

		const serverUpdated = await this.discordServerService.updateDiscordServer(discordServerId, bodyPut);

		if (serverUpdated.isFailure()) {
			const { error } = serverUpdated;

			if (error.statusCode === 500) {
				next(error);
				return;
			}

			res.status(error.statusCode).json({ status: "error", error });
		} else {
			res.status(204).send();
		}
	}

	// async delete() {}
}

export default DiscordServerController;
