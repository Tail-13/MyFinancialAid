import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres';
import router from './route/userRouter';
import logger from './config/logger';
// import { testConnection } from '../drizzle.config';

const app = express();
const port = process.env.APP_PORT

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router)

app.listen(port, () => {
  logger.info(`server running on port ${port}`)
});
