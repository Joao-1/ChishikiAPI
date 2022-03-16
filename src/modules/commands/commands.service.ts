import { Inject, Injectable } from "@nestjs/common";
import { RegisterCommandErrors } from "../../common/exceptions/htttpExceptions";
import { GetCommandDTO } from "./dto/commands.dto";
import { ICommandsRepository, ICommandsService, _ICommandsRepository } from "./structure";

@Injectable()
export default class CommandsService implements ICommandsService {
	// eslint-disable-next-line prettier/prettier
	constructor(@Inject(_ICommandsRepository) private commandsRepository: ICommandsRepository) { }

	async registerCommand(commandName: string, commandDescription: string, scope: string) {
		if (await this.commandsRepository.checkIfExistsByName(commandName)) {
			throw new RegisterCommandErrors.CommandWithIdAlreadyExists();
		}

		return this.commandsRepository.insert(commandName, commandDescription, scope);
	}

	async getCommands(clientArgs: GetCommandDTO) {
		return this.commandsRepository.read({
			skip: parseInt(clientArgs.offset, 10) || 0,
			take: parseInt(clientArgs.limit, 10) || 99,
		});
	}
}
