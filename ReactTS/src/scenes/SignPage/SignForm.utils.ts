import Joi from 'joi'

export const AuthUserValidator = (isLogin: boolean) =>
  Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email',
      }),
    password: Joi.string().label('first name').required().messages({
      'string.empty': 'password is required',
    }),
    pin: isLogin
      ? Joi.string().allow('')
      : Joi.string().length(4).pattern(/^\d+$/).required().messages({
          'string.empty': 'PIN is required',
          'string.length': 'PIN must be exactly 4 characters',
          'string.pattern.base': 'PIN must contain only numeric digits',
        }),
  })
