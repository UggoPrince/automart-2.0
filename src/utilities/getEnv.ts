import { config } from 'dotenv';

config();

const {
  NODE_ENV,
  DB_URL,
  DEV_DB_URL,
  TEST_DB_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_FOLDER,
  CLOUDINARY_DEV_FOLDER,
  CLOUDINARY_TEST_FOLDER,
  TOKEN_TIME,
  SECRET,
} = process.env;

export const getTokenTime = () => TOKEN_TIME;
export const getTokenSecret = () => SECRET;

export const isEnvProd = () => NODE_ENV === 'production';
export const isEnvDev = () => NODE_ENV === 'development';
export const isEnvTest = () => NODE_ENV === 'test';

export const getDbUrl = () => {
  if (isEnvProd()) return DB_URL;
  else if (isEnvDev()) return DEV_DB_URL;
  else return TEST_DB_URL;
};

export const cloudinaryStorageCreds = () => ({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const fileStorageFolder = () => {
  if (isEnvProd()) return CLOUDINARY_FOLDER;
  else if (isEnvDev()) return CLOUDINARY_DEV_FOLDER;
  else return CLOUDINARY_TEST_FOLDER;
};
