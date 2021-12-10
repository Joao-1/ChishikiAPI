/* eslint-disable max-classes-per-file */
interface IError {
	message: string;
	error: any;
	statusCode: number;
}

export class ClientError implements IError {
	message: string;

	error: any;

	statusCode: number;

	constructor(message: string, error: any, statusCode: number) {
		this.message = message;
		this.error = error;
		this.statusCode = statusCode;
	}
}

export class ServerError implements IError {
	message: string;

	error: any;

	statusCode: number;

	local: string;

	constructor(message: string, error: any, statusCode: number, local: string) {
		this.message = message;
		this.error = error;
		this.statusCode = statusCode;
		this.local = local;
	}
}
