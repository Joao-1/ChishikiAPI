import DiscordServer from "../../database/models/DiscordServers";
import ApiError from "../../helpers/apiErrror";
import { FindAndCountAllConfig, IDiscordServer, IDiscordServerRepository } from "../../types/types";

class DiscordServerRepository implements IDiscordServerRepository {
	async createDiscordServer(newDiscordServerId: string | number) {
		const newDiscordServer = await DiscordServer.create({ id: newDiscordServerId }).catch((e) => {
			console.log(e);
			throw new ApiError("Error creating a new Discord server in database");
		});
		return newDiscordServer;
	}

	async findDiscordServers(config: FindAndCountAllConfig) {
		console.log(config);
		const discordServers = await DiscordServer.findAndCountAll(config).catch((e) => {
			console.log(e);
			throw new ApiError("Error getting all Discord servers from database");
		});
		console.log(discordServers);
		return discordServers.rows;
	}

	async updateDiscordServer(DiscordServerId: string | number, newDiscordServerValues: IDiscordServer) {
		const discordServerUpdated = await DiscordServer.update(newDiscordServerValues, {
			where: { id: DiscordServerId },
			returning: true,
		}).catch((e) => {
			console.log(e);
			throw new ApiError("Error updating a new Discord server in database");
		});

		if (!discordServerUpdated) throw new ApiError("Could not update Discord server");
		return discordServerUpdated[1];
	}

	async checkIfDiscordServerAlreadyExists(discordServerId: string | number) {
		const discordServerFromDb = await DiscordServer.findAll({ where: { id: discordServerId } });
		return discordServerFromDb.some((discordServer) => {
			return discordServer.id === discordServerId;
		});
	}
}

export default DiscordServerRepository;
