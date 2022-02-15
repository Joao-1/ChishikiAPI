import { Injectable } from "@nestjs/common";
import { RegisterGuildErrors } from "../../common/exceptions/htttpExceptions";
import DiscordJsService from "../external/discord.js/discordJS.service";
import GuildRepository from "./guild.repository";

@Injectable()
export default class GuildService {
	// eslint-disable-next-line no-unused-vars
	constructor(private guildRepository: GuildRepository, private discordJsService: DiscordJsService) { }

	async registerGuild(guildId: string) {
		if (await this.guildRepository.checkIfGuildExistsById(guildId)) {
			throw new RegisterGuildErrors.GuildWithIdAlreadyExists();
		}

		if (!(await this.discordJsService.verifyIfGuildExists(guildId))) {
			throw new RegisterGuildErrors.GuildWithIdDoesNotExistsInDiscord();
		}

		return this.guildRepository.insertGuild(guildId);
	}
}
