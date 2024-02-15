import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST || 'http://localhost/8000',
  dbPassword: process.env.DB_PASSWORD || 'mypassword',
};

export default config;