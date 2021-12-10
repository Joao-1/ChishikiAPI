import DiscordServer from "../../database/models/DiscordServers";
import { DataBaseError } from "../../helpers/errors/errorsTypes";
import { failure, success } from "../../helpers/errors/responseError";
import {
	checkIfAlreadyExistsReturn,
	createDiscordServerReturn,
	FindAndCountAllConfig,
	findDiscordServersReturn,
	IDiscordServer,
	IDiscordServerRepository,
} from "../../types/types";
import { updateDiscordServerReturn } from "../../types/types.d";

class DiscordServerRepository implements IDiscordServerRepository {
	async createDiscordServer(newDiscordServerId: string): createDiscordServerReturn {
		try {
			const newDiscordServer = await DiscordServer.create({ id: newDiscordServerId });
			return success(newDiscordServer);
		} catch (error) {
			return failure(
				DataBaseError.create(
					"An error occurred while trying to create a new record in the database",
					error,
					"DiscordServerRepository"
				)
			);
		}
	}

	async findDiscordServers(config: FindAndCountAllConfig): findDiscordServersReturn {
		try {
			return success((await DiscordServer.findAndCountAll(config)).rows);
		} catch (error) {
			return failure(
				DataBaseError.create(
					"An error occurred while trying to retrieve Discord servers from the database",
					error,
					"DiscordServerRepository"
				)
			);
		}
	}

	async updateDiscordServer(DiscordServerId: string, newValues: IDiscordServer): updateDiscordServerReturn {
		try {
			return success((await DiscordServer.update(newValues, { where: { id: DiscordServerId } }))[1]);
		} catch (error) {
			return failure(
				DataBaseError.create(
					"An error occurred when trying to update data from a Discord server",
					error,
					"DiscordServerRepository"
				)
			);
		}
	}

	async checkIfDiscordServerAlreadyExists(discordServerId: string): checkIfAlreadyExistsReturn {
		try {
			const discordServerFromDb = await DiscordServer.findAll({ where: { id: discordServerId } });
			return success(
				discordServerFromDb.some((discordServer) => {
					return discordServer.id === discordServerId;
				})
			);
		} catch (error) {
			return failure(
				DataBaseError.create(
					"An error occurred when trying to check the existence of a certain value in the database",
					error,
					"DiscordServerRepository"
				)
			);
		}
	}
}

export default DiscordServerRepository;
