import Joi from 'joi';

export const changePasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  newPasswordRepeated: Joi.string().required()
});