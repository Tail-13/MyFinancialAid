import { PrismaClient } from "@prisma/client";
import { HashPassword } from "../utils/hash";
import { TokenJwt } from "../utils/jwt";
import logger from "../utils/logger"
import { UserService } from "./userService";

const prisma = new PrismaClient().accessToken

interface AuthData {
    username?: string
    email?: string
    password: string
}

export class AuthService {
    private us = new UserService()
    private hp = new HashPassword()
    private tokenJwt = new TokenJwt()

    login = async (data: Partial<AuthData>): Promise<string> => {
        try {
            logger.info(`verifying user`);
            const user = await this.us.getByUser(data, false, true)

            if(!user) {
                logger.error("user not found")
                throw new Error("user not found")
            }

            if (!await this.hp.compare(user.username, data.password!, user.password)) {
                logger.error("password not match")
                throw new Error("password not match")
            }
            const token = this.tokenJwt.generate({data: user, expiresHour: 1})
            logger.info(`user verified successfully`);


            return token;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }
}