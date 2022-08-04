/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  development: process.env.DB_URL,
  test: process.env.TEST_DB_URL,
  production: process.env.DATABASE_USER,
};
