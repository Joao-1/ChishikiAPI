/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import DiscordCommands from "../database/models/DiscordCommands";
import DiscordServers from "../database/models/DiscordServers";
import { DataBaseError, RegisterDiscordServerError, UpdateDiscordServer } from "../helpers/errors/errorsTypes";
import { Response } from "../helpers/errors/responseError";

export interface IDiscordServer {
	id: string;
	prefix: string;
	language: string;
}

export interface IWhereClause {
	status?: "active" | "inactive";
}

export interface IQueryParamsRead extends IWhereClause {
	[key: string]: any;
	// eslint-disable-next-line prettier/prettier
	[Symbol.iterator] = function* () {
		let properties = Object.keys(this);
		for (let i of properties) {
			yield [i, this[i]];
		}
	};
	offset?: number;
	limit?: number;
	include: string[];
}

export interface IDiscordServerBodyPut {
	prefix?: string;
	language?: string;
}

export interface IDiscordCommandBodyPut {
	name: string;
	description: string;
	type: string;
}

export interface FindAndCountAllConfig {
	offset: number;
	limit: number;
	where: WhereAttributeHash;
	include: Includeable | Includeable[];
}

export interface IDiscordServerService {
	registerDiscordServer(
		discordServerId: string
	): Promise<Response<RegisterDiscordServerError.DiscordServerAlreadyExistsError | DataBaseError, DiscordServers>>;
	readDiscordServers(querys: IQueryParamsRead): Promise<Response<DataBaseError, DiscordServers[]>>;
	updateDiscordServer(
		discordServerId: string,
		newDiscordServerValues: IDiscordServerBodyPut
	): Promise<Response<UpdateDiscordServer.DiscordServerDoesNotExist | DataBaseError, DiscordServer[]>>;
}

export type registerDiscordServerReturn = Promise<
	Response<RegisterDiscordServerError.DiscordServerAlreadyExistsError | DataBaseError, DiscordServers>
>;
export type updateDiscordServerServiceReturn = Promise<
	Response<UpdateDiscordServer.DiscordServerDoesNotExist | DataBaseError, DiscordServer[]>
>;

export interface IDiscordServerRepository {
	createDiscordServer(discordServerId: string): Promise<Response<DataBaseError, DiscordServers>>;

	findDiscordServers(config: FindAndCountAllConfig): Promise<Response<DataBaseError, DiscordServers[]>>;

	updateDiscordServer(
		discordServerId: string,
		newDiscordServerValues: IDiscordServerBodyPut
	): Promise<Response<DataBaseError, DiscordServers[]>>;

	checkIfDiscordServerAlreadyExists(discordServerId: string): Promise<Response<DataBaseError, Boolean>>;
}

export type createDiscordServerReturn = Promise<Response<DataBaseError, DiscordServers>>;
export type findDiscordServersReturn = Promise<Response<DataBaseError, DiscordServers[]>>;
export type updateDiscordServerReturn = Promise<Response<DataBaseError, DiscordServer[]>>;
export type checkIfAlreadyExistsReturn = Promise<Response<DataBaseError, Boolean>>;

export interface IDiscordCommandsService {
	createDiscordCommand(name: string, description: string, type: string): Promise<DiscordCommands>;
	readDiscordCommands(querys: IQueryParamsRead): Promise<DiscordCommands[] | null>;
	// updateDiscordCommand(name: string, type: string, newDiscordCommandsValues: IDiscordCommandBodyPut);
}

export interface IDiscordCommandsRepository {
	createDiscordCommand(name: string, description: string, type: string): Promise<DiscordCommands>;
	findDiscordCommands(config: FindAndCountAllConfig): Promise<DiscordCommands[]>;
	// updateDiscordCommand(name: string, type: string, newDiscordCommandsValues: IDiscordCommandBodyPut);
	checkIfDiscordCommandsAlreadyExists(name: string, type: string): Promise<Boolean>;
}
