import Joi from 'joi';

export const difficultySchema = Joi.object({
  name: Joi.string().required(),
  time: Joi.number().required()
});

export const difficultyUpdateSchema = Joi.object({
  name: Joi.string(),
  time: Joi.number()
});

export const difficultyIdSchema = Joi.string();

export const difficultyIdParamSchema = Joi.object({
  name: Joi.string().required()
});