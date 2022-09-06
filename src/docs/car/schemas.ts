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

const carObj = {
  _id: id.example,
  owner: '62e71f51e6220c5777f970e2',
  state: 'used',
  status: 'available',
  price: 1000000,
  title: 'clean venza',
  manufacturer: 'toyota',
  model: '2015 model',
  bodyType: 'SUV',
  imageUrl:
    'http://res.cloudinary.com/dya3r9cfe/image/upload/v1660305573/automart_dev/acf8dfba8e32deb42e67ab80b55e528d_l3qjbz.jpg',
  createdAt: '2022-09-02T23:55:04.850Z',
  updatedAt: '2022-09-02T23:55:04.850Z',
  __v: 0,
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

export const GetCar = {
  type: 'object',
  properties: {
    ...statusCode(200),
    ...message('Car successfully retrieved.'),
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

export const GetCars = {
  type: 'object',
  properties: {
    ...statusCode(200),
    ...message('Cars successfully retrieved.'),
    data: {
      type: 'array',
      example: [carObj],
    },
  },
};

export const GetCarsError = {
  ...objectType({
    ...statusCode(422),
    ...errorMessage('skip', 'skip must be a number string'),
    error: {
      ...errorType422,
    },
  }),
};

export const deleteCar = () => {
  const car = { ...GetCar };
  car.properties.message.example = 'Car deleted.';
  return car;
};
