/* eslint-disable no-unused-vars */
import { Guild, Prisma } from "@prisma/client";
import { Response } from "express";
import { GetGuildDTO, RegisterGuildDTO } from "./dto/guilds.dto";

export interface IGuildsController {
	post(registerGuild: RegisterGuildDTO, res: Response): Promise<void>;
	read(getGuilds: GetGuildDTO, res: Response, req): Promise<void>;
}

export const _IGuildsService = "IGUILDSSERVICE";
export interface IGuildsService {
	registerGuild(guildId: string): Promise<Guild>;
	getGuilds(clientArgs: GetGuildDTO): Promise<Guild[]>;
}

export const _IGuildsRepository = "IGUILDSREPOSITORY";
export interface IGuildsRepository {
	insert(guildId: string): Promise<Guild>;
	read(findManyArgs: Prisma.GuildFindManyArgs): Promise<Guild[]>;
	checkIfExistsById(guildId: string): Promise<boolean>;
}
