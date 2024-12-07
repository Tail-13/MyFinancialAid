import { sql } from 'drizzle-orm'
import db from '../config/db'
import { users } from '../model/userModel'
import { Request, Response } from 'express'

export const getUsers = async (req: Request, res: Response) => {
    try{
        const { page = 1, entries = 10 } = req.body
        const offset = (page - 1) * entries
        const data = await db
            .select()
            .from(users)
            .where(sql`active = true`)
            .limit(entries)
            .offset(offset)

        const totalCount = data.length
        const totalPages = Math.ceil(totalCount / entries)

        res.status(200).json({
            page: page,
            totalPages: totalPages,
            users: data
        })
    } catch (err) {

    }
}