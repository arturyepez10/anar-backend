import Joi from 'joi';
import { getEnumValues } from '../../utils';
import { eApplication } from '../../classes';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  application: Joi.string().allow(...getEnumValues(eApplication)).optional()
});