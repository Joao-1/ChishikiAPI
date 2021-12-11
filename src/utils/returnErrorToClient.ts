import { NextFunction, Response } from "express";
import { ClientError, ServerError } from "../helpers/errors/domainError";

export default (value: ClientError | ServerError, res: Response, next: NextFunction) => {
	const { message, error, statusCode } = value;
	if (statusCode === 500) {
		next(error);
		return;
	}

	res.status(statusCode).json({ status: "error", message, error });
};
