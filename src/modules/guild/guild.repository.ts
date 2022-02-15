import { Injectable } from "@nestjs/common";
import { DataBaseError } from "../../common/exceptions/serverErros";
import PrismaService from "../../providers/prisma/prisma.service";

@Injectable()
export default class GuildRepository {
	// eslint-disable-next-line no-unused-vars
	constructor(private prisma: PrismaService) { }

	async insertGuild(guildId: string) {
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

	async checkIfGuildExistsById(guildId: string) {
		try {
			const possibleGuild = await this.prisma.guild.findFirst({ where: { id: guildId } });
			return !!possibleGuild;
		} catch (error) {
			console.log(error);
			throw new DataBaseError(
				"An error occurred while trying to check if a guild exists by Id",
				error,
				"GuildRepository"
			);
		}
	}
}
