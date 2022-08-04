import { duplicateUser, errorInvalidEmailPass } from '../../utilities/messages/user/failure';
import { dateType, id, statusCode, message, objectType, access_token, email, password } from '../general-types';

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
    ...message('Invalid form field(s)'),
    errors: {
      type: 'array',
      items: {
        ...invalidFormField,
      },
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
    ...message('Invalid form field(s)'),
    errors: {
      type: 'array',
      items: {
        ...invalidFormField,
      },
    },
  }),
};
export const loginWrongCred = {
  ...objectType({
    ...statusCode(400),
    ...message(errorInvalidEmailPass()),
  }),
};

export const CreateUserApiDocs = {
  CreatedUser,
};
