import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import router from './route/userRouter';
import logger from './utilites/logger';
import swaggerUi from 'swagger-ui-express'; // Import swagger-ui-express
import swaggerJsdoc from 'swagger-jsdoc'; // Import swagger-jsdoc

const app = express();
const port = process.env.APP_PORT;

// Swagger setup
const options = {
  definition: {
    MFA: '3.0.0',
    info: {
      title: process.env.APP_NAME + '',
      version: '1.0.0',
    },
  },
  apis: ['./src/route/*.ts'], // files containing annotations as above
};

const swaggerDocs = swaggerJsdoc(options);

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', router);

app.listen(port, () => {
  logger.info(`server running on port ${port}`);
});
