import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { RegisterGuildErrors } from "../../common/exceptions/htttpExceptions";
import { IDiscordJsService, _IDiscordJsService } from "../external/discord.js/structure";
import { GetGuildDTO } from "./dto/guild.dto";
import { IGuildRepository, IGuildService, _IGuildRepository } from "./structure";

@Injectable()
export default class GuildService implements IGuildService {
	// eslint-disable-next-line prettier/prettier
	constructor(@Inject(_IGuildRepository) private guildRepository: IGuildRepository, @Inject(_IDiscordJsService) private discordJsService: IDiscordJsService) { }

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
		let include: Prisma.GuildInclude;

		const filtersConfig: { [key: string]: any } = {
			include: () => {
				include = {
					commands: clientArgs.include.some((value) => value === "commands"),
				};
			},
		};

		for (const requestFilters in clientArgs) {
			if (Object.prototype.hasOwnProperty.call(filtersConfig, requestFilters)) {
				filtersConfig[requestFilters]();
			}
		}

		return this.guildRepository.read({
			skip: parseInt(clientArgs.offset, 10) || 0,
			take: parseInt(clientArgs.limit, 10) || 99,
			include,
		});
	}
}
