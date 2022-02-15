/* eslint-disable max-classes-per-file */
export class ServerErrors {
	// eslint-disable-next-line no-unused-vars
	constructor(public message: string, public error: unknown, public place: string) { }
}

export class DataBaseError extends ServerErrors {
	constructor(message: string, error: unknown, repository: string) {
		super(message, error, repository);
	}
}

export namespace ServicesProvidersError {
	export class DiscordError extends ServerErrors {
		constructor(message: string, error: unknown, place: string) {
			super(message, error, place);
		}
	}
}
