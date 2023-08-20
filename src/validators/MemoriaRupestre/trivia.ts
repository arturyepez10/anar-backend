import Joi from 'joi';

export const triviaIdParamSchema = Joi.object({
  id: Joi.number().required()
});

export const triviaSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  level_id: Joi.number().required()
});

export const triviaUpdateSchema = Joi.object({
  question: Joi.string(),
  answer: Joi.string(),
  level_id: Joi.number()
});

export const triviaIdSchema = Joi.number();
