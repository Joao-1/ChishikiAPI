import { ApplicationCommand } from "discord.js";

export const _IDiscordJsService = "IDISCORDJSSERVICE";
export interface IDiscordJsService {
	verifyIfGuildExists(guildId: string): Promise<boolean>;
	getDiscordCommand(commandId: string): Promise<ApplicationCommand<{}>>;
}
