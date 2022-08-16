import { CreateCarError, CreatedCar } from './schemas';

export const createCar_201 = {
  schema: CreatedCar,
  description: 'The car has been successfully created.',
};

export const createCar_422 = {
  schema: CreateCarError,
  status: 422,
  description: 'One or more of the form fields submitted is not valid',
};

export const Resp = {
  createCar_201,
  createCar_422,
};
