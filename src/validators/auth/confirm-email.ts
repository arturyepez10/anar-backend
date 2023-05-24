import Joi from 'joi';

export const confirmEmailSchemaBody = Joi.object({
  email: Joi.string().email().required()
});

export const confirmEmailSchemaParams = Joi.object({
  token: Joi.string().optional()
});