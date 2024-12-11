import { and, count, sql } from 'drizzle-orm'
import db from '../utilites/db'
import { users } from '../model/userModel'
import { Request, Response } from 'express'
import logger from '../utilites/logger'
import { HashString } from '../utilites/hash'
import { InternalServerError } from '../utilites/errorHandling'
import { CustomValidator } from '../utilites/validation'
import { error } from 'winston'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page = 1, entries = 10, sortBy = 'username' } = req.body
        const offset = (page - 1) * entries
        const data = await db
            .select({
                username: users.username, 
                email: users.email,
                created: users.createdAt
            })
            .from(users)
            .where(sql`is_deleted = false`)
            .limit(entries)
            .offset(offset)
            .orderBy(sql`${sortBy} asc nulls first`)

        const totalCount = await db
            .select({count: count()})
            .from(users)
            .where(sql`is_deleted = false`)

        const totalPages = Math.ceil(totalCount.length / entries)

        logger.info('all user fetched')
        if (data.length < 1) {
            return res.status(200).json({
                message: 'fetch user success',
                page: page,
                totalPages: totalPages,
                data: 'no data found'
            })
        }

        return res.status(200).json({
            message: 'fetch user success',
            page: page,
            totalPages: totalPages,
            data: data
        })

    } catch (err) {
        InternalServerError(err, res)
    }
}

export const createUsers = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            logger.warn('New user not created, request incomplete. Missing username, email, or password.');
            return res.status(400).json({
                message: 'User not created',
                error: 'Username, email, and password are required!'
            });
        }

        if(username){
            const existingUser = await db.select().from(users).where(sql`username = ${username}`).limit(1);
            if(existingUser.length > 0){
                logger.warn('New user not created, user already exist.')
                return res.status(400).json({
                    message: 'User not created',
                    error: 'user already registered'
                })
            }
        }

        if(email){
            if(!CustomValidator.isEmail(email)){
                logger.warn('New user not created, email is invalid')
                return res.status(400).json({
                    message: 'User not created',
                    error: 'email format must be valid'
                })
            }
        }

        if(password) {
            const passwordErrors = CustomValidator.passwordValidation(password)
            if(passwordErrors.length > 0){
                logger.warn('New user not created, password is invalid')
                return res.status(400).json({
                    message: 'User not created',
                    error: passwordErrors
                })
            }
        }

        const hashedPassword = await HashString(password, username)

        await db
            .insert(users)
            .values({
                username: username,
                email: email,
                password: hashedPassword
            })

        res.status(200).json({
            message: `new user '${req.body.username}' created`,
        })
    } catch (err) {
        InternalServerError(err, res)
    }
};

export const editUsers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, email } = req.body;

    // Validate 'id' before database query
    if (!id) {
        return res.status(400).json({
            message: 'User not updated',
            error: 'id is required'
        });
    }

    try {
        const user = await db
            .select()
            .from(users)
            .where(sql`id = ${id}`)
            .limit(1);

        if (user.length === 0) {
            return res.status(400).json({
                message: 'User not updated',
                error: 'User does not exist'
            });
        }

        const updateUser: any = { updatedAt: new Date() };

        if (email) {
            if (!CustomValidator.isEmail(email)) {
                logger.warn(`User with ID ${id} not updated, invalid email`);
                return res.status(400).json({
                    message: 'User not updated',
                    error: 'Email format must be valid'
                });
            }
            updateUser.email = email;
        }

        if (password) {
            const passwordErrors = CustomValidator.passwordValidation(password);
            if (passwordErrors.length > 0) {
                logger.warn(`User with ID ${id} not updated, invalid password`);
                return res.status(400).json({
                    message: 'User not updated',
                    error: passwordErrors
                });
            }
            updateUser.password = await HashString(password, username);
        }

        if (username) updateUser.username = username;

        await db
            .update(users)
            .set(updateUser)
            .where(sql`id = ${id}`);

        const updatedUser = await db
            .select()
            .from(users)
            .where(sql`id = ${id}`)
            .limit(1);

        if (updatedUser.length > 0) {
            return res.status(200).json({
                message: `User ${updatedUser[0].username} updated successfully`
            });
        } else {
            return res.status(400).json({
                message: 'User not updated',
                error: 'User not found after update'
            });
        }
    } catch (err) {
        InternalServerError(err, res)
    }
}

export const deleteUsers = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const existingUser = await db
            .select()
            .from(users)
            .where(
                and(
                    sql`id = ${id}`,
                    sql`is_deleted = false`
                )
            )
            .limit(1)
    
        if(existingUser.length == 0){
            logger.warn(`user ${id} not deleted`)
            return res.status(400).json({
                message: 'user not deleted',
                error: 'user not found'
            })
        }
    
        await db
            .update(users)
            .set({
                deletedAt: new Date(),
                isDeleted: true
            })
            .where(sql`id = ${id}`)
        return res.status(200).json({
            message: `user ${id} deleted successfully`
        })
    } catch (err) {
        InternalServerError(err, res)
    }
}

export const restoreUsers = async (req: Request, res: Response) => {
    const { id } = req.params
    try{

        const existingUser = await db
            .select()
            .from(users)
            .where(
                and(
                    sql`id = ${id}`,
                    sql`is_deleted = true`
                )
            )
            .limit(1)
    
        if(existingUser.length == 0){
            logger.warn(`user ${id} not restored, user not found`)
            return res.status(400).json({
                message: 'user not restored',
                error: 'user not found'
            })
        }
    
        await db
            .update(users)
            .set({
                deletedAt: null,
                updatedAt: new Date(),
                isDeleted: false
            })
            .where(sql`id = ${id}`)
        return res.status(200).json({
            message: `user ${id} restored successfully`
        }) 
    } catch (err) {
        InternalServerError(err, res)
    }
}