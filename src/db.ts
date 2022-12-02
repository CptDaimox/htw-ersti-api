import { createPool } from 'mysql2/promise';
import { dbConfig } from './config/config.js';

export const connection = createPool(dbConfig);
