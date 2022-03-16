import { Inject, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { RegisterGuildErrors } from "../../common/exceptions/htttpExceptions";
import { GetGuildDTO } from "./dto/guilds.dto";
import { IGuildsRepository, IGuildsService, _IGuildsRepository } from "./structure";

@Injectable()
export default class GuildService implements IGuildsService {
	// eslint-disable-next-line prettier/prettier
	constructor(@Inject(_IGuildsRepository) private guildRepository: IGuildsRepository) { }

	async registerGuild(guildId: string) {
		if (await this.guildRepository.checkIfExistsById(guildId)) {
			throw new RegisterGuildErrors.GuildWithIdAlreadyExists();
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
