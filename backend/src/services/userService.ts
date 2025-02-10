import { PrismaClient } from "@prisma/client";
import { HashPassword } from "../utils/hash";
import logger from "../utils/logger";

const pUser = new PrismaClient().user

interface UserData {
    id: number;
    username: string;
    email: string;
    password: string;
}

export class UserService {
    create = async (data: Partial<UserData>) => {
        logger.info("creating user");
        try {
            const { username, email, password } = data;
            if (!username || !email || !password) {
                throw new Error("missing required fields");
            }

            const hashedPassword = await HashPassword.hash(password);

            const user = await pUser.create({
                data: {
                    username: username,
                    email: email,
                    password: hashedPassword!
                }
            })

            return user;
        } catch (error) {
            throw error
        }

    }
}