import { CreatedFlag, CreateFlagError } from './schemas';

export const createFlag_201 = {
  schema: CreatedFlag,
  status: 201,
  description: 'Report successfully saved.',
};

export const createFlag_422 = {
  schema: CreateFlagError,
  status: 422,
  description: 'One or more of the form fields submitted is not valid',
};

export const Resp = {
  createFlag_201,
  createFlag_422,
};
