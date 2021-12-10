import DiscordCommands from "../../database/models/DiscordCommands";
import ApiError from "../../helpers/apiError";
import generateReadMethodOptions from "../../helpers/generateReadMethodOptions";
import { IDiscordCommandsRepository, IDiscordCommandsService, IQueryParamsRead } from "../../types/types";

class DiscordCommandsService implements IDiscordCommandsService {
	discordCommandsRepository: IDiscordCommandsRepository;

	constructor(discordCommandsRepository: IDiscordCommandsRepository) {
		this.discordCommandsRepository = discordCommandsRepository;
	}

	async createDiscordCommand(name: string, description: string, type: string): Promise<DiscordCommands> {
		if (await this.discordCommandsRepository.checkIfDiscordCommandsAlreadyExists(name, type)) {
			throw new ApiError("There is already a Discord Command with this name and type", 409);
		}

		const newCommand = await this.discordCommandsRepository.createDiscordCommand(name, description, type);
		return newCommand;
	}

	readDiscordCommands(querys: IQueryParamsRead): Promise<DiscordCommands[]> {
		return this.discordCommandsRepository.findDiscordCommands(generateReadMethodOptions(querys));
	}

	// updateDiscordCommand(name: string, type: string, newDiscordCommandsValues: IDiscordCommandBodyPut) {
	// 	throw new Error("Method not implemented.");
	// }
}

export default DiscordCommandsService;
