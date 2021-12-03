import { Includeable } from "sequelize/types";
import ApiError from "../../helpers/apiErrror";
import {
	FindAndCountAllConfig,
	IBodyPut,
	IDiscordServerRepository,
	IDiscordServerService,
	IQueryParamsRead,
	IWhereClause,
} from "../../types/types";

class DiscordServerService implements IDiscordServerService {
	discordServerRepository: IDiscordServerRepository;

	constructor(discordServerRepository: IDiscordServerRepository) {
		this.discordServerRepository = discordServerRepository;
	}

	async createDiscordServer(newDiscordServerId: string | number) {
		if (await this.discordServerRepository.checkIfDiscordServerAlreadyExists(newDiscordServerId)) {
			throw new ApiError("There is already a Discord server with this id", 409);
		}
		const discordServerCreated = await this.discordServerRepository.createDiscordServer(newDiscordServerId);
		return discordServerCreated;
	}

	async readDiscordServers(querys: IQueryParamsRead) {
		const whereClause: IWhereClause = {};
		const includeModels: Includeable[] = [];
		const filtersConfig: { [key: string]: any } = {
			status: () => {
				whereClause.status = querys.status;
			},
			include: () => {
				includeModels.push(querys.include.toString());
			},
		};
		for (const requestFilters in querys) {
			if (Object.prototype.hasOwnProperty.call(querys, requestFilters)) {
				filtersConfig[requestFilters]();
			}
		}

		const options: FindAndCountAllConfig = {
			offset: querys.offset || 1,
			limit: querys.limit || 100,
			where: whereClause,
			include: includeModels,
		};

		const discordServer = await this.discordServerRepository.findDiscordServers(options);
		return discordServer;
	}

	async updateDiscordServer(discordServerId: string | number, newDiscordServerValues: IBodyPut) {
		if (!(await this.discordServerRepository.checkIfDiscordServerAlreadyExists(discordServerId))) {
			throw new ApiError("There is no Discord server with this id", 404);
		}
		return this.discordServerRepository.updateDiscordServer(discordServerId, newDiscordServerValues);
	}
}

export default DiscordServerService;
