import Joi from "joi";

export const discordServerBodyToCreateSchema = Joi.object({
	id: Joi.number().unsafe().required(),
});

export const discordServerBodyToUpdateSchema = Joi.object({
	prefix: Joi.string(),
	language: Joi.string().valid("english", "portuguese", "japonese"),
});

export const discordServerQueryParamsToReadSchema = Joi.object({
	servers: Joi.array().items(Joi.number()),
	offset: Joi.number().min(1),
	limit: Joi.number().min(1),
	include: Joi.array(),
	status: Joi.string().valid("active", "disabled"),
	top: Joi.number(),
});
