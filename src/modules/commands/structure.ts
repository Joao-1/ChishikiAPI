import { Command } from "@prisma/client";
import { Response } from "express";
import { RegisterCommandDTO } from "./dto/commands.dto";

export interface ICommandsController {
	post(registerGuild: RegisterCommandDTO, res: Response): Promise<void>;
}

export const _ICommandsService = "ICOMMANDSSERVICE";
export interface ICommandsService {
	registerCommand(commandId: string, scope: string): Promise<Command>;
}

export const _ICommandsRepository = "ICOMMANDSREPOSITORY";
export interface ICommandsRepository {
	insert(id: string, name: string, description: string, scope: string): Promise<Command>;
	checkIfExistsById(id: string): Promise<boolean>;
}
