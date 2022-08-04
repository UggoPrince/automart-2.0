import { CreatedUser, DuplicateUser, loginFormError, loginWrongCred, signupFormError } from './schemas';

export const signup_201 = {
  schema: CreatedUser,
  status: 201,
  description: 'The record has been successfully created.',
};
export const signup_422 = {
  schema: signupFormError,
  status: 422,
  description: 'One or more of the form fields submitted is not valid',
};
export const signup_409 = { schema: DuplicateUser, status: 409, description: 'Duplicate User with same email.' };

export const login_200 = { schema: CreatedUser, status: 200, description: 'Successful login.' };
export const login_422 = { schema: loginFormError, status: 422, description: 'Invalid form field.' };
export const login_400 = { schema: loginWrongCred, status: 400, description: 'User does not exist, wrong email or password.' };

export const Res = {
  signup_201,
  signup_422,
  signup_409,
  login_200,
  login_422,
  login_400,
};
