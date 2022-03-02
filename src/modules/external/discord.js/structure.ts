export const _IDiscordJsService = "IDISCORDJSSERVICE";
export interface IDiscordJsService {
	verifyIfGuildExists(guildId: string): Promise<boolean>;
}
