import Joi from 'joi';
import { getEnumValues } from '../utils';
import { eApplication } from '../classes';

export const applicationIdSchema = Joi.string();

export const applicationParamSchema = Joi.object({
  id: applicationIdSchema.valid(...getEnumValues(eApplication)).required()
});

export const applicationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});
