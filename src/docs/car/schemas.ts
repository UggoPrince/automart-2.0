import {
  dateType,
  id,
  statusCode,
  message,
  v,
  errorType422,
  objectType,
  errorMessage,
} from '../general-types';

const car = {
  owner: {
    type: 'string',
  },
  state: {
    type: 'string',
  },
  status: {
    type: 'string',
  },
  price: {
    type: 'number',
  },
  title: {
    type: 'string',
  },
  manufacturer: {
    type: 'string',
  },
  model: {
    type: 'string',
  },
  bodyType: {
    type: 'string',
  },
  imageUrl: {
    type: 'string',
    example:
      'http://res.cloudinary.com/dya3r9cfe/image/upload/v1660305573/automart_dev/acf8dfba8e32deb42e67ab80b55e528d_l3qjbz.jpg',
  },
  createdAt: {
    ...dateType,
  },
  deletedAt: {
    ...dateType,
  },
};

export const CreateCarError = {
  ...objectType({
    ...statusCode(422),
    ...errorMessage('state'),
    error: {
      ...errorType422,
    },
  }),
};

export const CreatedCar = {
  type: 'object',
  properties: {
    ...statusCode(201),
    ...message('Success'),
    data: {
      type: 'object',
      properties: {
        _id: id,
        ...car,
        __v: v,
      },
    },
  },
};
