import Joi from 'joi';

export const levelSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  imageName: Joi.string().required(),
  goes_after: Joi.number().allow(null),
  goes_before: Joi.number().allow(null),
  difficulty_id: Joi.string().required()
});

export const levelUpdateSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  imageName: Joi.string(),
  goes_after: Joi.number().allow(null),
  goes_before: Joi.number().allow(null),
  difficulty_id: Joi.string()
});

export const levelIdSchema = Joi.number();

export const levelIdParamSchema = Joi.object({
  id: Joi.number().required()
});