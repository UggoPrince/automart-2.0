import { duplicateUser, errorInvalidEmailPass } from '../../utilities/messages/user/failure';
import {
  dateType,
  id,
  statusCode,
  message,
  objectType,
  access_token,
  email,
  password,
  errorMessage,
  errorType422,
} from '../general-types';

const invalidFormField = {
  type: 'object',
  propeties: {
    ...message('"firstName" is required'),
    path: {
      type: 'array',
      items: {
        firstName: 'firstName',
      },
    },
  },
};

const user = {
  firstName: {
    type: 'string',
  },
  lastName: {
    type: 'string',
  },
  email: {
    type: 'string',
  },
  address: {
    type: 'string',
  },
  role: {
    type: 'string',
  },
  createdAt: {
    ...dateType,
  },
  deletedAt: {
    ...dateType,
  },
};

export const CreatedUser = {
  type: 'object',
  properties: {
    ...statusCode(201),
    ...message('Success'),
    data: {
      type: 'object',
      properties: {
        _id: id,
        access_token,
        ...user,
      },
    },
  },
};
export const signupFormError = {
  ...objectType({
    ...statusCode(422),
    ...errorMessage('firstName'),
    error: {
      ...errorType422,
    },
  }),
};
export const DuplicateUser = {
  ...objectType({
    ...statusCode(409),
    ...message(duplicateUser()),
  }),
};

export const loginUser = {
  ...objectType({
    email,
    password,
  }),
};
export const loginFormError = {
  ...objectType({
    ...statusCode(422),
    error: {
      ...errorType422,
    },
  }),
};
export const loginWrongCred = {
  ...objectType({
    ...statusCode(400),
    error: {
      ...errorType422,
    },
  }),
};

export const CreateUserApiDocs = {
  CreatedUser,
};
