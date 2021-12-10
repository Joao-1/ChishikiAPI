import DiscordCommands from "../../database/models/DiscordCommands";
import ApiError from "../../helpers/apiError";
import { FindAndCountAllConfig, IDiscordCommandsRepository } from "../../types/types";

class DiscordCommandsRepository implements IDiscordCommandsRepository {
	async createDiscordCommand(name: string, description: string, type: string): Promise<DiscordCommands> {
		const newDiscordCommand = await DiscordCommands.create({ name, description, type }).catch((e) => {
			console.log(e);
			throw new ApiError("Error creating a new Discord command in database");
		});
		return newDiscordCommand;
	}

	async findDiscordCommands(config: FindAndCountAllConfig): Promise<DiscordCommands[]> {
		const discordServers = await DiscordCommands.findAndCountAll(config).catch((e) => {
			console.log(e);
			throw new ApiError("Error getting all Discord commands from database");
		});
		return discordServers.rows;
	}

	// updateDiscordCommand(name: string, type: string, newDiscordCommandsValues: IDiscordCommandBodyPut) {
	// 	throw new Error("Method not implemented.");
	// }

	async checkIfDiscordCommandsAlreadyExists(name: string, type: string): Promise<Boolean> {
		const discordCommandsFromDb = await DiscordCommands.findAll({ where: { name, type } });
		return discordCommandsFromDb.some((discordCommand) => {
			return discordCommand.name === name && discordCommand.type === type;
		});
	}
}

export default DiscordCommandsRepository;
