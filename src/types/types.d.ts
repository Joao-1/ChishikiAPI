/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

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

export interface IBodyPut {
	prefix?: string;
	language?: string;
}

export interface FindAndCountAllConfig {
	offset: number;
	limit: number;
	where: WhereAttributeHash;
	include: Includeable | Includeable[];
}

export interface IDiscordServerService {
	createDiscordServer(discordServerId: string | number): Promise<any>;
	readDiscordServers(querys: IQueryParamsRead): Promise<IDiscordServer[]>;
	updateDiscordServer(discordServerId: string | number, newDiscordServerValues: IBodyPut): Promise<DiscordServer[]>;
}

export interface IDiscordServerRepository {
	createDiscordServer(discordServerId: string | number): Promise<DiscordServer>;
	findDiscordServers(config: FindAndCountAllConfig): Promise<IDiscordServer[]>;
	checkIfDiscordServerAlreadyExists(discordServerId: string | number): Promise<boolean>;
	updateDiscordServer(discordServerId: string | number, newDiscordServerValues: IBodyPut): Promise<DiscordServer[]>;
}
