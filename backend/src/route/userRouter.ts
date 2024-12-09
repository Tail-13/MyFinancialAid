import express, { Request, Response } from 'express'; // Ensure these types are imported
import { createUsers, getUsers } from '../controller/userController';

const router = express.Router();

// Route to get a list of users
router.get('/users', async (req: Request, res: Response) => {
    await getUsers(req, res);
});

// Route to create a new user
router.post('/user', async (req: Request, res: Response) => {
    await createUsers(req, res);
});

export default router;
