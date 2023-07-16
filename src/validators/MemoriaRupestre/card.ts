import Joi from 'joi';

export const cardSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required()
});

export const cardUpdateSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  image: Joi.string()
});

export const cardIdSchema = Joi.number();

export const cardIdParamSchema = Joi.object({
  id: Joi.number().required()
});