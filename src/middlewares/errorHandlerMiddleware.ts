import { NextFunction, Request, Response } from "express";
import logger from "../../logs/logger";
import { ServerError } from "../helpers/errors/domainError";

const errorHandlerMiddleware = (error: ServerError, request: Request, response: Response, next: NextFunction) => {
	logger.error(error.message, error.error, error.local);
	response.status(500).json({ status: "error", error: "Internal Server Error", message: error.message });
};
export default errorHandlerMiddleware;
