import { NextFunction, Request, Response } from "express";
import { ServerError } from "../helpers/errors/domainError";

const errorMiddleware = (error: ServerError, request: Request, response: Response, next: NextFunction) => {
	const { statusCode } = error;
	let { message } = error;

	console.log(message);
	if (statusCode === 500 || statusCode === undefined) {
		message = "Internal Server Error";
	}

	response.status(statusCode || 500).json({
		statusCode,
		message,
	});
};

export default errorMiddleware;
