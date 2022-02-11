import { Injectable } from "@nestjs/common";
import { DataBaseError } from "src/common/exceptions/serverErros";
import PrismaService from "src/providers/prisma/prisma.service";

@Injectable()
export default class DiscordServerRepository {
	// eslint-disable-next-line no-unused-vars
	constructor(private prisma: PrismaService) { }

	async insertServer(serverId: string) {
		try {
			return this.prisma.discordServer.create({ data: { id: serverId } });
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to register a new server in the database",
				error,
				"DiscordServerRepository"
			);
		}
	}

	async checkIfServerExistsById(discordServerId: string) {
		try {
			const possibleServer = await this.prisma.discordServer.findFirst({ where: { id: discordServerId } });
			return !!possibleServer;
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to check if a server exists by Id",
				error,
				"DiscordServerRepository"
			);
		}
	}
}
