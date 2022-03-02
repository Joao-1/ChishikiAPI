/* eslint-disable no-unused-vars */
import { Guild, Prisma } from "@prisma/client";
import { GetGuildDTO } from "./dto/guild.dto";

export const _IGuildService = "IGUILDSERVICE";
export interface IGuildService {
	registerGuild(guildId: string): Promise<Guild>;
	getGuilds(clientArgs: GetGuildDTO): Promise<Guild[]>;
}

export const _IGuildRepository = "IGUILDREPOSITORY";
export interface IGuildRepository {
	insert(guildId: string): Promise<Guild>;
	read(findManyArgs: Prisma.GuildFindManyArgs): Promise<Guild[]>;
	checkIfExistsById(guildId: string): Promise<boolean>;
}
