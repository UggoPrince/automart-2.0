import {
  carBadRequest,
  carNotFound,
  CreateCarError,
  CreatedCar,
  GetCar,
  UpdatedCar,
} from './schemas';

export const createCar_201 = {
  schema: CreatedCar,
  description: 'The car has been successfully created.',
};

export const createCar_422 = {
  schema: CreateCarError,
  status: 422,
  description: 'One or more of the form fields submitted is not valid',
};

export const updateCar_200 = {
  schema: UpdatedCar,
  status: 200,
  description: 'The car has been successfully updated.',
};

export const car404 = {
  schema: carNotFound,
  status: 404,
  description: 'The car is not saved',
};

export const updateCar_400 = {
  schema: carBadRequest,
  status: 400,
  description: 'The car Id is not valid',
};

export const getCar_200 = {
  schema: GetCar,
  status: 200,
  description: 'car retrieved.',
};

export const Resp = {
  createCar_201,
  createCar_422,
  updateCar_200,
  car404,
  updateCar_400,
  getCar_200,
};
