import {
  dateType,
  errorMessage,
  errorType422,
  id,
  message,
  objectType,
  statusCode,
  v,
} from '../general-types';

const flag = {
  carId: {
    type: 'string',
    example: id.example,
  },
  reason: {
    type: 'string',
  },
  description: {
    type: 'string',
  },
  createdAt: {
    ...dateType,
  },
  updatedAt: {
    ...dateType,
  },
};

export const CreatedFlag = {
  type: 'object',
  properties: {
    ...statusCode(201),
    ...message('Advert report sent.'),
    data: {
      type: 'object',
      properties: {
        _id: id,
        ...flag,
        __v: v,
      },
    },
  },
};

export const CreateFlagError = {
  ...objectType({
    ...statusCode(422),
    ...errorMessage('reason'),
    error: {
      ...errorType422,
    },
  }),
};
