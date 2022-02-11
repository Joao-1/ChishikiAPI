import { REST } from "@discordjs/rest";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Routes } from "discord-api-types/v9";

@Injectable()
export default class DiscordJsService {
	private rest = new REST({ version: "9" });

	// eslint-disable-next-line no-unused-vars
	constructor(private configService: ConfigService) { }

	async verifyIfGuildExists(guildId: string) {
		try {
			const possibleGuild = await this.rest
				.setToken(this.configService.get<string>("discord.token"))
				.get(Routes.guild(guildId));
			return !!possibleGuild;
		} catch (error) {
			throw new Error("Erro ao tentar saber a existencia de uma guilda no discord");
		}
	}
}
