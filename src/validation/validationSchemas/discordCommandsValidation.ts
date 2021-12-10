import Joi from "joi";

export const discordCommandsBodyToCreateSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	type: Joi.string().valid("public", "private", "custom").required(),
});

export const discordCommandsQueryParamsToReadSchema = Joi.object({
	offset: Joi.number().min(1),
	limit: Joi.number().min(1),
	include: Joi.array(),
	type: Joi.string().valid("public", "private", "custom"),
});
