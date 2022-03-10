import { REST } from "@discordjs/rest";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Routes } from "discord-api-types/v9";
import { ApplicationCommand } from "discord.js";
import { ServicesProvidersError } from "../../../common/exceptions/serverErros";

@Injectable()
export default class DiscordJsService {
	rest: REST;

	// eslint-disable-next-line no-unused-vars
	constructor(private configService: ConfigService) {
		this.rest = new REST({ version: "9" }).setToken(configService.get<string>("discord.token"));
	}

	async verifyIfGuildExists(guildId: string) {
		try {
			const possibleGuild = await this.rest.get(Routes.guild(guildId));
			return !!possibleGuild;
		} catch (error) {
			if (error.status === 400 || error.status === 403) {
				return false;
			}

			throw new ServicesProvidersError.DiscordError(
				"Error when trying to verify the existence of a guild from Discord servers",
				error,
				"DiscordJsService"
			);
		}
	}

	async getDiscordCommand(commandId: string) {
		try {
			const command = (await this.rest.get(
				Routes.applicationCommand(this.configService.get<string>("discord.clientId"), commandId)
			)) as unknown as ApplicationCommand;
			return command;
		} catch (error) {
			if (error.status === 404 && error.rawError.message === "Unknown application command") return null;

			throw new ServicesProvidersError.DiscordError(
				"Error when trying to get a command from Discord servers",
				error,
				"DiscordJsService"
			);
		}
	}
}
