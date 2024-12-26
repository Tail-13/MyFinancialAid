import { and, sql } from "drizzle-orm"
import { users } from "../model/userModel"
import db from "../utilites/db"
import { CustomValidator } from "../utilites/validation"
import { error } from "winston"

export const findUserByEmail = async (email: string) => {
    if(!email) {
        return {error: 'email required!'}
    }
    if(!CustomValidator.isEmail(email)) {
        return {error: 'invalid email format'}
    }
    const data = await db
        .select({
            id: users.id,
            username: users.username,
            email: users.email
        })
        .from(users)
        .where(
            and(
                sql`is_deleted = false`,
                sql`email = ${email}`
            )
        )
        .limit(1)
    if(data.length < 1) {
        return {error: 'user not found'}
    }
    return data;
}

export const findUserByUsername = async (username: string) => {
    if(!username) {
        return {error: 'username required'}
    }
    const data = await db
        .select({
            id: users.id,
            username: users.id,
            email: users.email
        })
        .from(users)
        .where(and(
            sql`username = ${username}`,
            sql`is_deleted = false`
        ))
        .limit(1)
    
    if (data.length < 1) {
        return {error: 'user not found'}
    }
    return data
}