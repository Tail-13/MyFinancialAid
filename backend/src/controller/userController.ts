import { count, sql } from 'drizzle-orm'
import db from '../config/db'
import { users } from '../model/userModel'
import { Request, Response } from 'express'
import logger from '../config/logger'
import { error } from 'winston'

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page = 1, entries = 10 } = req.body
        const offset = (page - 1) * entries
        const data = await db
            .select()
            .from(users)
            .where(sql`is_deleted = false`)
            .limit(entries)
            .offset(offset)

        const totalCount = await db
            .select({count: count()})
            .from(users)
            .where(sql`is_deleted = false`)

        const totalPages = Math.ceil(totalCount.length / entries)

        if (data.length < 1) {
            return res.status(204).json({
                message: 'no data found'
            })
        }

        return res.status(200).json({
            page: page,
            totalPages: totalPages,
            users: data
        })

    } catch (err) {
        if (err instanceof Error) {
            logger.error('error creating user: ' + err.message);
            return res.status(500).json({
                message: 'internal server error',
                error: err.message
            });
        } else {
            // If err is not an instance of Error, handle it as a generic unknown error
            logger.error('an unknown error occurred');
            return res.status(500).json({
                message: 'internal server error',
                error: 'an unknown error occurred'
            });
        }
    }
}

export const createUsers = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            logger.warn('New user not created, request incomplete. Missing username, email, or password.');
            return res.status(400).json({
                message: 'Username, email, and password are required!'
            });
        }
        res.status(200).json({
            message: `new user ${req.body.username} created`,
        })
    } catch (err) {
        if (err instanceof Error) {
            logger.error('error creating user: ' + err.message);
            return res.status(500).json({
                message: 'internal server error',
                error: err.message
            });
        } else {
            logger.error('An unknown error occurred');
            return res.status(500).json({
                message: 'internal server error',
                error: 'an unknown error occurred'
            });
        }
    }
};