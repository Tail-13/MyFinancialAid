import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres';
// import { testConnection } from '../drizzle.config';


const app = express();
const port = process.env.APP_PORT

// Middleware
app.use(cors());
app.use(express.json());
// testConnection()

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

// Example route
app.get('/api/users', (req: Request, res: Response) => {
  // Logic for fetching users
  res.json({ message: 'User list' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
