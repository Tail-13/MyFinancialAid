import express, { Request, Response } from 'express';
import { createUsers, getUsers } from '../controller/userController';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                   email:
 *                     type: string
 *                     description: The user's email
 */
router.get('/users', async (req: Request, res: Response) => {
    await getUsers(req, res);
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/user', async (req: Request, res: Response) => {
    await createUsers(req, res);
});

export default router;
