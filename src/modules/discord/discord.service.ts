import { Injectable } from "@nestjs/common";
import { RegisterDiscordServerErrors } from "../../common/exceptions/htttpExceptions";
import DiscordJsService from "../external/discord.js/discordJS.service";
import DiscordServerRepository from "./discord.repository";

@Injectable()
export default class DiscordServerService {
	// eslint-disable-next-line no-unused-vars
	constructor(private discordServerRepository: DiscordServerRepository, private discordJsService: DiscordJsService) { }

	async registerDiscordServer(serverId: string) {
		if (!(await this.discordJsService.verifyIfGuildExists(serverId))) {
			throw new RegisterDiscordServerErrors.GuildWithIdDoesNotExistsInDiscord();
		}
		if (await this.discordServerRepository.checkIfServerExistsById(serverId)) {
			throw new RegisterDiscordServerErrors.DiscordServerWithIdAlreadyExists();
		}

		return this.discordServerRepository.insertServer(serverId);
	}
}
