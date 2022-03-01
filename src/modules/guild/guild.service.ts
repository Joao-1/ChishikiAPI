import { Injectable } from "@nestjs/common";
import { RegisterGuildErrors } from "../../common/exceptions/htttpExceptions";
import DiscordJsService from "../external/discord.js/discordJS.service";
import { GetGuildDTO } from "./dto/guild.dto";
import GuildRepository from "./guild.repository";

@Injectable()
export default class GuildService {
	// eslint-disable-next-line prettier/prettier
	constructor(private guildRepository: GuildRepository, private discordJsService: DiscordJsService) { }

	async registerGuild(guildId: string) {
		if (await this.guildRepository.checkIfExistsById(guildId)) {
			throw new RegisterGuildErrors.GuildWithIdAlreadyExists();
		}

		if (!(await this.discordJsService.verifyIfGuildExists(guildId))) {
			throw new RegisterGuildErrors.GuildWithIdDoesNotExistsInDiscord();
		}

		return this.guildRepository.insert(guildId);
	}

	async getGuilds(clientArgs: GetGuildDTO) {
		return this.guildRepository.read({
			skip: parseInt(clientArgs.offset, 10) || 0,
			take: parseInt(clientArgs.limit, 10) || 99,
		});
	}
}
