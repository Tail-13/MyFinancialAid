import { count, sql } from 'drizzle-orm'
import db from '../utilites/db'
import { users } from '../model/userModel'
import { Request, Response } from 'express'
import logger from '../utilites/logger'
import { error } from 'winston'
import { HashString } from '../utilites/hash'
import { InternalServerError } from '../utilites/errorHandling'

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

        logger.info('fetch user')
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
        InternalServerError(err, res)
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

        const hashedPassword = await HashString(password, username)

        const data = await db
            .insert(users)
            .values({
                username: username,
                email: email,
                password: hashedPassword
            })

        res.status(200).json({
            message: `new user: ${req.body.username} created`,
        })
    } catch (err) {
        InternalServerError(err, res)
    }
};