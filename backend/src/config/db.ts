import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres'

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT), 
  max: 10,    
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

const db = drizzle(pool)

export default db;
