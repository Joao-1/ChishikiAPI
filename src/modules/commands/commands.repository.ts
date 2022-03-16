import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DataBaseError } from "../../common/exceptions/serverErros";
import PrismaService from "../../providers/prisma/prisma.service";
import { ICommandsRepository } from "./structure";

@Injectable()
export default class CommandsRepository implements ICommandsRepository {
	// eslint-disable-next-line prettier/prettier
	constructor(public prisma: PrismaService) { }

	async insert(name: string, description: string, scope: string) {
		try {
			return this.prisma.command.create({ data: { name, description, scope } });
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to register a new command in the database",
				error,
				"GuildRepository"
			);
		}
	}

	async read(findManyArgs: Prisma.CommandFindManyArgs) {
		try {
			return this.prisma.command.findMany(findManyArgs);
		} catch (error) {
			throw new DataBaseError("An error occurred while trying to read a command", error, "GuildRepository");
		}
	}

	async update(updateArgs: Prisma.CommandUpdateArgs) {
		try {
			return this.prisma.command.update(updateArgs);
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to update a command exists",
				error,
				"GuildRepository"
			);
		}
	}

	async checkIfExistsByName(name: string) {
		try {
			const possibleCommand = await this.prisma.command.findFirst({ where: { name } });
			return !!possibleCommand;
		} catch (error) {
			throw new DataBaseError(
				"An error occurred while trying to check if a guild exists by name",
				error,
				"GuildRepository"
			);
		}
	}
}
