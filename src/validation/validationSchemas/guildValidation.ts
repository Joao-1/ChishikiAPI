import Joi from "joi";

export const guildBodySchema = Joi.object({
	id: Joi.number().unsafe().required(),
});

export const guildQueryParamsSchema = Joi.object({
	offset: Joi.number().min(1),
	limit: Joi.number().min(1),
	include: Joi.array(),
	status: Joi.string().valid("active", "inactive"),
	top: Joi.number(),
});
