import { NextFunction, Request, Response } from "express";
import ApiError from "../helpers/apiError";

const errorMiddleware = (error: ApiError, request: Request, response: Response, next: NextFunction) => {
	const { status } = error;
	let { message } = error;

	console.log(message);
	if (status === 500 || status === undefined) {
		message = "Internal Server Error";
	}

	response.status(status || 500).json({
		status,
		message,
	});
};

export default errorMiddleware;
