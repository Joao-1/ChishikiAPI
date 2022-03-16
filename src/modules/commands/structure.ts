import { Command, Prisma } from "@prisma/client";
import { Response } from "express";
import { GetCommandDTO, RegisterCommandDTO } from "./dto/commands.dto";

export interface ICommandsController {
	post(registerGuild: RegisterCommandDTO, res: Response): Promise<void>;
}

export const _ICommandsService = "ICOMMANDSSERVICE";
export interface ICommandsService {
	registerCommand(commandName: string, commandDescription: string, scope: string): Promise<Command>;
	getCommands(clientArgs: GetCommandDTO): Promise<Command[]>;
}

export const _ICommandsRepository = "ICOMMANDSREPOSITORY";
export interface ICommandsRepository {
	insert(name: string, description: string, scope: string): Promise<Command>;
	read(findManyArgs: Prisma.CommandFindManyArgs): Promise<Command[]>;
	update(updateArgs: Prisma.CommandUpdateArgs): Promise<Command>;
	checkIfExistsByName(id: string): Promise<boolean>;
}
