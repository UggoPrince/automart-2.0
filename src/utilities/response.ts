import { Response } from 'express';
import { Logger } from '@nestjs/common';

const logger = new Logger();

/**
 * returns an error message to the client
 * @param {Response} res HTTP response object
 * @param {number} status HTTP status code
 * @param {object|string} message Error message as an object/text
 * @returns {object} response
 */
export const failure = (
  res: Response,
  statusCode = 503,
  message: object | string = 'An error occurred',
): Response<object, Record<string, unknown>> => {
  const errorObject = {
    statusCode,
    message,
  };
  logger.error(errorObject);
  return res.status(statusCode).send(errorObject);
};

/**
 * returns an success message to the client
 * @param {Response} res HTTP response object
 * @param {number} statusCode HTTP status code
 * @param {string} message message as an object/text
 * @param {object} data
 * @returns {object} response
 */
export const success = (
  res: Response,
  statusCode = 200,
  message = 'Success',
  data = {},
): object => {
  const successObject = {
    statusCode,
    message,
    data,
  };
  logger.verbose(message, data);
  return res.status(statusCode).send(successObject);
};

export const failure2 = (
  res: Response,
  statusCode = 503,
  message: object | string = 'An error occurred',
): object => {
  const errorObject = {
    statusCode,
    message,
  };
  logger.error(errorObject);
  return res.status(statusCode).send(errorObject);
};

export const formError = (res: Response, errors: any): object => {
  const errorObject = {
    statusCode: 422,
    message: 'Invalid form field(s).',
    errors,
  };
  logger.error(errorObject);
  return res.status(422).send(errorObject);
};
