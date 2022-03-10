import { Inject, Injectable } from "@nestjs/common";
import { RegisterCommandErrors } from "../../common/exceptions/htttpExceptions";
import { IDiscordJsService, _IDiscordJsService } from "../external/discord.js/structure";
import { ICommandsRepository, ICommandsService, _ICommandsRepository } from "./structure";

@Injectable()
export default class CommandsService implements ICommandsService {
	// eslint-disable-next-line prettier/prettier
	constructor(@Inject(_ICommandsRepository) private commandsRepository: ICommandsRepository, @Inject(_IDiscordJsService) private discordJsService: IDiscordJsService) { }

	async registerCommand(commandId: string, scope: string) {
		if (await this.commandsRepository.checkIfExistsById(commandId)) {
			throw new RegisterCommandErrors.CommandWithIdAlreadyExists();
		}

		const command = await this.discordJsService.getDiscordCommand(commandId);

		if (!command) {
			throw new RegisterCommandErrors.CommandWithIdDoesNotExistsInDiscord();
		}

		return this.commandsRepository.insert(commandId, command.name, command.description, scope);
	}
}
