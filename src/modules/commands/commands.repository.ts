import { Injectable } from "@nestjs/common";
import { DataBaseError } from "../../common/exceptions/serverErros";
import PrismaService from "../../providers/prisma/prisma.service";
import { ICommandsRepository } from "./structure";

@Injectable()
export default class CommandsRepository implements ICommandsRepository {
	// eslint-disable-next-line prettier/prettier
	constructor(public prisma: PrismaService) { }

	async insert(id: string, name: string, description: string, scope: string) {
		try {
			return this.prisma.command.create({ data: { id, name, description, scope } });
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to register a new command in the database",
				error,
				"GuildRepository"
			);
		}
	}

	async checkIfExistsById(id: string) {
		try {
			const possibleCommand = await this.prisma.guild.findFirst({ where: { id } });
			return !!possibleCommand;
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to check if a guild exists by Id",
				error,
				"GuildRepository"
			);
		}
	}
}
