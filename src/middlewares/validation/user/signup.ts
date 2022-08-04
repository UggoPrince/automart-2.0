import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { formError } from '../../../utilities/response';
import { text, email, password, address, validator } from '../rules';

const joiSchema = Joi.object({
  ...text('firstName'),
  ...text('lastName'),
  email,
  address,
  password,
});

export default (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const error = validator(joiSchema, body);
  if (error) {
    return formError(res, error);
  }
  return next();
};
