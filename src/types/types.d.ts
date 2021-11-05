/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
export interface IGuild {
	id: string;
	prefix: string;
	language: string;
}

export interface IGuildService {
	createGuild(guildId: string | number): Promise<any>;
	readGuilds(querys: IQueryParams): Promise<IGuild[]>;
}

export interface IGuildRepository {
	createGuild(guildId: string | number): Promise<Guild>;
	findGuilds(config: FindAndCountAllConfig): Promise<IGuild[]>;
	checkIfGuildAlreadyExists(guildId: string | number): Promise<boolean>;
}

export interface IWhereClause {
	status?: "active" | "inactive";
}

export interface IQueryParams extends IWhereClause {
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

export interface FindAndCountAllConfig {
	offset: number;
	limit: number;
	where: WhereAttributeHash;
	include: Includeable | Includeable[];
}
