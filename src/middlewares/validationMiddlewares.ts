import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { JoiError } from "../helpers/errors/errorsTypes";
import returnErrorToClient from "../utils/returnErrorToClient";

export default (validationType: "body" | "params" | "query", schema: Schema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = req[validationType];

		const { error } = schema.validate(validation, { abortEarly: false });
		if (error) {
			const errorDetails = {
				details: error.details.map((el) => {
					return {
						message: el.message,
					};
				}),
			};

			returnErrorToClient(JoiError.ValidationError.create(errorDetails), res, next);
			return;
		}
		next();
	};
};
