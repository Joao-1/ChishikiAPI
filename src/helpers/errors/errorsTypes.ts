/* eslint-disable no-useless-constructor */
/* eslint-disable max-classes-per-file */

import { ClientError, ServerError } from "./domainError";

/**
 * @desc General application errors (few of these as possible)
 * @http 500
 */

export namespace AppError {
	export class UnexpectedError extends ServerError {
		constructor(err: any, local: string) {
			super(`An unexpected error occurred.`, 500, err, local);
		}

		static create(err: any, local: string): UnexpectedError {
			return new UnexpectedError(err, local);
		}
	}
}

export class DataBaseError extends ServerError {
	constructor(message: string, error: any, repository: string) {
		super(message, error, 500, repository);
	}

	static create(message: string, error: any, repository: string): DataBaseError {
		return new DataBaseError(message, error, repository);
	}
}

export namespace JoiError {
	export class ValidationError extends ClientError {
		constructor(error: { details: {}[] }) {
			super("An error occurred while trying to validate the request.", error, 422);
		}

		static create(error: { details: {}[] }): ValidationError {
			return new ValidationError(error);
		}
	}
}

export namespace RegisterDiscordServerError {
	export class DiscordServerAlreadyExistsError extends ClientError {
		constructor(discordServerId: string) {
			super(
				"An error occurred when trying to register a new Discord server.",
				`The Discord server with "${discordServerId}" id has already been taken.`,
				422
			);
		}

		static create(discordServerId: string): DiscordServerAlreadyExistsError {
			return new DiscordServerAlreadyExistsError(discordServerId);
		}
	}
}

export namespace UpdateDiscordServer {
	export class DiscordServerDoesNotExist extends ClientError {
		constructor(discordServerId: string) {
			super(
				"An error occurred when trying to update a Discord server",
				`The Discord server with "${discordServerId}" id does not exist`,
				404
			);
		}

		static create(discordServerId: string): DiscordServerDoesNotExist {
			return new DiscordServerDoesNotExist(discordServerId);
		}
	}
}

export namespace RegisterDiscordCommand {
	export class DiscordCommandAlreadyExistsError extends ClientError {
		constructor(commandName: string) {
			super(
				"An error occurred when trying to register a new Discord command.",
				`The Discord server with "${commandName}" name has already been taken.`,
				422
			);
		}

		static create(commandName: string): DiscordCommandAlreadyExistsError {
			return new DiscordCommandAlreadyExistsError(commandName);
		}
	}
}
