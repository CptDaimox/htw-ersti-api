import dotenv from 'dotenv';
import { PoolOptions } from 'mysql2';

dotenv.config();

export const dbConfig: PoolOptions = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};
