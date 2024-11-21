import Joi from 'joi'

export const ADD_USER_VALIDATOR = Joi.object({
  date_birth: Joi.date().required().messages({
    'string.empty': 'Date of birth is required',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email',
    }),
  first_name: Joi.string().required().messages({
    'string.empty': 'First name is required',
  }),
  pin: Joi.string().length(4).pattern(/^\d+$/).required().messages({
    'string.empty': 'PIN is required',
    'string.length': 'PIN must be exactly 4 characters',
    'string.pattern.base': 'PIN must contain only numeric digits',
  }),
  last_name: Joi.string().required().messages({
    'string.empty': 'Last name is required',
  }),
})
