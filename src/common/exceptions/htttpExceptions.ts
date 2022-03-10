/* eslint-disable max-classes-per-file */
import { HttpException, HttpStatus } from "@nestjs/common";

export namespace RegisterGuildErrors {
	export class GuildWithIdDoesNotExistsInDiscord extends HttpException {
		constructor() {
			super(
				{
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: "Guild access with this id is unauthorized or does not exist on Discord servers",
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}

	export class GuildWithIdAlreadyExists extends HttpException {
		constructor() {
			super(
				{
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: "There is already a guild with this id registered in the system",
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}
}

export namespace RegisterCommandErrors {
	export class CommandWithIdDoesNotExistsInDiscord extends HttpException {
		constructor() {
			super(
				{
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: "Command does not exist on Discord servers",
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}

	export class CommandWithIdAlreadyExists extends HttpException {
		constructor() {
			super(
				{
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: "There is already a command with this id registered in the system",
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}
}
