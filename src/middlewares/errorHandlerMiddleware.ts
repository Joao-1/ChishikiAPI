import { NextFunction, Request, Response } from "express";
import { ServerError } from "../helpers/errors/domainError";

const errorHandlerMiddleware = (error: ServerError, request: Request, response: Response, next: NextFunction) => {
	response.status(500).json({ status: "error", error: "Internal Server Error", message: error.message });
};
export default errorHandlerMiddleware;
