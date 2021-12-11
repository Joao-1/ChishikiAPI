import DiscordCommands from "../../database/models/DiscordCommands";
import { DataBaseError } from "../../helpers/errors/errorsTypes";
import { failure, success } from "../../helpers/errors/responseError";
import {
	checkIfDiscordCommandsAlreadyExists,
	createDiscordCommandReturn,
	FindAndCountAllConfig,
	findDiscordCommandsReturn,
	IDiscordCommandsRepository,
} from "../../types/types";

class DiscordCommandsRepository implements IDiscordCommandsRepository {
	async createDiscordCommand(name: string, description: string, type: string): createDiscordCommandReturn {
		try {
			return success(await DiscordCommands.create({ name, description, type }));
		} catch (error) {
			return failure(
				DataBaseError.create(
					"An error occurred while trying creating a new Discord command in database",
					error,
					"DiscordCommandsRepository"
				)
			);
		}
	}

	async findDiscordCommands(config: FindAndCountAllConfig): findDiscordCommandsReturn {
		try {
			return success((await DiscordCommands.findAndCountAll(config)).rows);
		} catch (error) {
			return failure(
				DataBaseError.create(
					"An error occurred while trying to retrieve Discord commands from the database",
					error,
					"DiscordCommandsRepository"
				)
			);
		}
	}

	// updateDiscordCommand(name: string, type: string, newDiscordCommandsValues: IDiscordCommandBodyPut) {
	// 	throw new Error("Method not implemented.");
	// }

	async checkIfDiscordCommandsAlreadyExists(name: string, type: string): checkIfDiscordCommandsAlreadyExists {
		try {
			const discordCommandsFromDb = await DiscordCommands.findAll({ where: { name, type } });
			return success(
				discordCommandsFromDb.some((discordCommand) => {
					return discordCommand.name === name && discordCommand.type === type;
				})
			);
		} catch (error) {
			return failure(
				DataBaseError.create(
					"An error occurred when trying to check the existence of a Discord command in the database",
					error,
					"DiscordCommandsRepository"
				)
			);
		}
	}
}

export default DiscordCommandsRepository;
