/* eslint-disable no-unused-vars */
import { Guild } from "@prisma/client";
import { GetGuildDTO } from "./dto/guild.dto";

export const _IGuildService = "IGUILDSERVICE";
export interface IGuildService {
	registerGuild(guildId: string): Promise<Guild>;
	getGuilds(clientArgs: GetGuildDTO): Promise<Guild[]>;
}
