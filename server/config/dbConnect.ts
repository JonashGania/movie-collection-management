import pg from 'pg';
import * as dotenv from 'dotenv';

const { Pool } = pg;

dotenv.config();

export const pool = new Pool({
    connectionString: `${process.env.DATABASE_URL}`
})