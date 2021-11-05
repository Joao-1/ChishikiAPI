import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export default (validationType: "body" | "params" | "query", schema: Schema) => {
	// eslint-disable-next-line consistent-return
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = req[validationType];

		const { error } = schema.validate(validation, { abortEarly: false });
		if (error) {
			return res.status(422).json({
				status: "failed",
				error: {
					details: error.details.map((el) => {
						return {
							message: el.message,
						};
					}),
				},
			});
		}
		next();
	};
};
