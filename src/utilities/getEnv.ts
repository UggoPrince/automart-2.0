const {
    NODE_ENV,
    DB_URL,
    DEV_DB_URL,
    TEST_DB_URL,
} = process.env;

export const isEnvProd = () => NODE_ENV === 'production';
export const isEnvDev = () => NODE_ENV === 'development';
export const isEnvTest = () => NODE_ENV === 'test';

export const getDbUrl = () => {
    if (isEnvProd()) return DB_URL;
    else if (isEnvDev()) return DEV_DB_URL;
    else return TEST_DB_URL;
};
