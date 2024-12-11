import express, { Request, Response } from 'express';
import { createUsers, deleteUsers, editUsers, getUsers, restoreUsers } from '../controller/userController';

const router = express.Router();

/**
 * @swagger
 * /api/users:
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
 * /api/user:
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

/**
 * @swagger
 * /user/{id}:
 *   post:
 *     summary: 'Edit an existing user'
 *     description: 'Update user details like username, email, and password by providing the user ID in the path.'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 'ID of the user to be updated'
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 'The username of the user to update'
 *               email:
 *                 type: string
 *                 description: 'The email address of the user to update'
 *               password:
 *                 type: string
 *                 description: 'The new password of the user'
 *     responses:
 *       200:
 *         description: 'User updated successfully'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'User updated successfully'
 *       400:
 *         description: 'Invalid data or user does not exist'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'User not updated'
 *                 error:
 *                   type: string
 *                   example: 'Email format must be valid'
 *       404:
 *         description: 'User not found'
 */
router.post('/user/:id', async (req: Request, res: Response) => {
    await editUsers(req, res);
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: 'delete an existing user'
 *     description: 'delete user by providing the user ID in the path.'
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 'ID of the user to be deleted'
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 'The username of the user to update'
 *               email:
 *                 type: string
 *                 description: 'The email address of the user to update'
 *               password:
 *                 type: string
 *                 description: 'The new password of the user'
 *     responses:
 *       200:
 *         description: 'User deleted successfully'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'User updated successfully'
 *       400:
 *         description: 'Invalid data or user does not exist'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'User not updated'
 *                 error:
 *                   type: string
 *                   example: 'Email format must be valid'
 *       404:
 *         description: 'User not found'
 */
router.delete('/user/:id', async (req: Request, res: Response) => {
    await deleteUsers(req, res)
})

router.patch('/user/:id', async (req: Request, res: Response) => {
    await restoreUsers(req, res)
})

export default router;
