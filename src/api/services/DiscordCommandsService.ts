import { RegisterDiscordCommand } from "../../helpers/errors/errorsTypes";
import { failure, success } from "../../helpers/errors/responseError";
import generateReadMethodOptions from "../../helpers/generateReadMethodOptions";
import {
	IDiscordCommandsRepository,
	IDiscordCommandsService,
	IQueryParamsRead,
	readDiscordCommandsReturn,
	registerDiscordCommandReturn,
} from "../../types/types";

class DiscordCommandsService implements IDiscordCommandsService {
	discordCommandsRepository: IDiscordCommandsRepository;

	constructor(discordCommandsRepository: IDiscordCommandsRepository) {
		this.discordCommandsRepository = discordCommandsRepository;
	}

	async registerDiscordCommand(name: string, description: string, type: string): registerDiscordCommandReturn {
		const checkResult = await this.discordCommandsRepository.checkIfDiscordCommandsAlreadyExists(name, type);
		if (checkResult.isFailure()) return failure(checkResult.error);
		if (checkResult.value) return failure(RegisterDiscordCommand.DiscordCommandAlreadyExistsError.create(name));
		const newCommand = await this.discordCommandsRepository.createDiscordCommand(name, description, type);
		if (newCommand.isFailure()) return failure(newCommand.error);
		return success(newCommand.value);
	}

	async readDiscordCommands(querys: IQueryParamsRead): readDiscordCommandsReturn {
		const searchResult = await this.discordCommandsRepository.findDiscordCommands(
			generateReadMethodOptions(querys, this.discordCommandsRepository.getAssociations())
		);
		if (searchResult.isFailure()) return failure(searchResult.error);
		return success(searchResult.value);
	}

	// updateDiscordCommand(name: string, type: string, newDiscordCommandsValues: IDiscordCommandBodyPut) {
	// 	throw new Error("Method not implemented.");
	// }
}

export default DiscordCommandsService;
