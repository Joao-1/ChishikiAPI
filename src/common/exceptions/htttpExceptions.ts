/* eslint-disable max-classes-per-file */
import { HttpException, HttpStatus } from "@nestjs/common";

export namespace CommumError {
	export class WithThisIdDoesNotExists extends HttpException {
		constructor(bookId: number) {
			super(
				{
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: `There is no book id ${bookId} registered in the database`,
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}
}

export namespace RegisterDiscordServerErrors {
	export class GuildWithIdDoesNotExistsInDiscord extends HttpException {
		constructor() {
			super(
				{
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: "There is no guild with this id on the Discord servers",
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}

	export class DiscordServerWithIdAlreadyExists extends HttpException {
		constructor() {
			super(
				{
					statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
					message: "There is already a Discord server with this id registered in the system",
				},
				HttpStatus.UNPROCESSABLE_ENTITY
			);
		}
	}
}
