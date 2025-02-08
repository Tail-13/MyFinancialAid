import { PrismaClient } from "@prisma/client"
import logger from "../utils/logger"

const prisma = new PrismaClient()

export class UserService {
    create = async ( data: userDto ) => {
        try {
            const user = await prisma.user.create({
                data: {
                    username: data.username,
                    password: data.password
                }
            })
            return user
        } catch (error) {
            let message = error instanceof Error ? error.message : 'unknown error'
            logger.error(message)
            throw new Error(message)
        }
    }

    getById = async ( id: number ) => {
        const user = await prisma.user.findFirst({
            where: {id: id}
        })

        return id
    }
}