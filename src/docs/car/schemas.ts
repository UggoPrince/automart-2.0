import {
  dateType,
  id,
  statusCode,
  message,
  v,
  errorType422,
  objectType,
  errorMessage,
  errorType400,
  errorType404,
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
  updatedAt: {
    ...dateType,
  },
};

export const carNotFound = {
  ...objectType({
    ...statusCode(404),
    ...message('Car not found.'),
    error: {
      ...errorType404,
    },
  }),
};

export const carBadRequest = {
  ...objectType({
    ...statusCode(400),
    ...message('Invalid car ID.'),
    error: {
      ...errorType400,
    },
  }),
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
    ...message('Car added.'),
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

export const UpdatedCar = {
  type: 'object',
  properties: {
    ...statusCode(200),
    ...message('Car Updated.'),
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
