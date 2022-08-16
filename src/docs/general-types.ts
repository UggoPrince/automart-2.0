export const dateType = {
  type: 'string',
  format: 'date-time',
};

export const id = {
  type: 'string',
  example: '62d037d652e656cbce82bba8',
};

export const v = {
  type: 'number',
  example: 0,
};

export const access_token = {
  type: 'string',
  example:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQwMzdkNjUyZTY1NmNiY2U4MmJiYTgiLCJmaXJzdE5hbWUiOiJ1Z28iLCJsYXN0TmFtZSI6ImFuYXlvIiwiZW1haWwiOiJ1Z2dvcHJpbmNlQGdtYWlsLmNvbSIsImFkZHJlc3MiOiJzdXJ1bGVyZSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMTRUMTU6MzU6NDIuODY5WiIsImRlbGV0ZWRBdCI6IjIwMjItMDctMTRUMTU6MzU6NDIuODY5WiIsIl9fdiI6MCwiaWF0IjoxNjU4MTkwNzM4LCJleHAiOjE2NTgyNzcxMzh9.0SAXTFHHOXOcW5_oKJ-q5lWfzo6lvxdgPcNqtZDtC80',
};

export const bearerToken = {
  type: 'string',
  example:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQwMzdkNjUyZTY1NmNiY2U4MmJiYTgiLCJmaXJzdE5hbWUiOiJ1Z28iLCJsYXN0TmFtZSI6ImFuYXlvIiwiZW1haWwiOiJ1Z2dvcHJpbmNlQGdtYWlsLmNvbSIsImFkZHJlc3MiOiJzdXJ1bGVyZSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMTRUMTU6MzU6NDIuODY5WiIsImRlbGV0ZWRBdCI6IjIwMjItMDctMTRUMTU6MzU6NDIuODY5WiIsIl9fdiI6MCwiaWF0IjoxNjU4MTkwNzM4LCJleHAiOjE2NTgyNzcxMzh9.0SAXTFHHOXOcW5_oKJ-q5lWfzo6lvxdgPcNqtZDtC80',
};

export const sentToken = {
  ...bearerToken,
  description: 'Authorization token',
};

export const authHeader = {
  name: 'Authorization',
  required: true,
  in: 'header',
  schema: { ...sentToken },
};

export const email = {
  type: 'string',
  example: 'email@gmail.com',
};

export const password = {
  type: 'string',
  example: 'password$78',
};

export const statusCode = (example: number) => {
  return { statusCode: { type: 'integer', example } };
};

export const message = (example: string) => {
  return { message: { type: 'string', example } };
};

export const errorMessage = (field: string, text = `${field} should not be empty`) => {
  return {
    message: {
      type: 'object',
      properties: {
        [field]: {
          type: 'string',
          example: [text],
        },
      },
    },
  };
};

export const errorType422 = {
  type: 'string',
  example: 'Unprocessable Entity',
};

export const objectType = (obj: any) => {
  return {
    type: 'object',
    properties: {
      ...obj,
    },
  };
};

export const unAuthorized = {
  schema: {
    ...objectType({
      ...statusCode(422),
      message: {
        type: 'string',
        example: 'Unauthorized',
      },
    }),
  },
  status: 401,
  description: 'Absence of a valid token.',
};
