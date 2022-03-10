import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DataBaseError } from "../../common/exceptions/serverErros";
import PrismaService from "../../providers/prisma/prisma.service";
import { IGuildsRepository } from "./structure";

@Injectable()
export default class GuildRepository implements IGuildsRepository {
	// eslint-disable-next-line prettier/prettier
	constructor(public prisma: PrismaService) { }

	async insert(guildId: string) {
		try {
			return this.prisma.guild.create({ data: { id: guildId } });
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to register a new guild in the database",
				error,
				"GuildRepository"
			);
		}
	}

	async read(findManyArgs: Prisma.GuildFindManyArgs) {
		try {
			return this.prisma.guild.findMany(findManyArgs);
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to check if a guild exists by Id",
				error,
				"GuildRepository"
			);
		}
	}

	async checkIfExistsById(guildId: string) {
		try {
			const possibleGuild = await this.prisma.guild.findFirst({ where: { id: guildId } });
			return !!possibleGuild;
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to check if a guild exists by Id",
				error,
				"GuildRepository"
			);
		}
	}
}
