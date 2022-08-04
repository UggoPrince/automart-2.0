export default {
  port: parseInt(process.env.PORT, 10) || 6000,
  dbUrl: process.env.DB_URL,
  secret: process.env.SECRET,
  time: process.env.TOKEN_TIME,
};
