import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import router from './route/userRouter';
import logger from './config/logger';
import swaggerUi from 'swagger-ui-express'; // Import swagger-ui-express
import swaggerJsdoc from 'swagger-jsdoc'; // Import swagger-jsdoc

const app = express();
const port = process.env.APP_PORT;

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing users',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./route/**/*.ts'], // Look for all `.ts` files in the route folder and subfolders
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', router);

app.listen(port, () => {
  logger.info(`server running on port ${port}`);
});
