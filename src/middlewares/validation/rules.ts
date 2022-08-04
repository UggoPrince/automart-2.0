import * as Joi from 'joi';

export const getErrors = (validated) => validated.e;

export const validator = (joiSchema: any, body: any) => {
  const valid = joiSchema.validate(body, { abortEarly: false });
  if (valid.error) return valid.error.details;
  return null;
};

export const text = (text: string) => ({
  [text]: Joi.string().min(2).required().messages({
    'any.required': `${text} is required`,
  }),
});
export const address = Joi.string().min(3).required().messages({
  'any.required': 'address is required',
});
export const email = Joi.string().email().required().messages({
  'string.email': 'email must be a valid email',
  'any.required': 'email is required',
});
export const password = Joi
  .string()
  .pattern(new RegExp('^[a-zA-Z0-9$&@!*%+-~]{8,24}$'))
  .required()
  .messages({
    'any.required': 'password is required',
    'string.pattern.base': 'Password should contain letters, numbers and/or special characters and minimun length 8.'
  });
