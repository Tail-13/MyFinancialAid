import { PrismaClient } from "@prisma/client";
import { HashPassword } from "../utils/hash";
import logger from "../utils/logger";
import { CustomValidator } from "../utils/validation";

const pUser = new PrismaClient().user
const validator = new CustomValidator()

interface UserData {
    id: number;
    username: string;
    email: string;
    password: string;
    updatedAt?: Date;
}

export class UserService {
    private selectedData = {
        id: true, username: true, email: true, password: false
    }

    get = async (id?: number, deleted: boolean = false) => {
        try {
            if(id) {
                logger.info(`fetching user with id ${id}`);
                const user = await pUser.findUnique({
                    where: {id: id, deleted},
                    select: this.selectedData
                })
                if(!user) {
                    throw new Error("user not found")
                }
                logger.info(`user with id ${id} fetched successfully`);
                return user;
            } else {
                logger.info(`fetching all users`);
                const users = await pUser.findMany({
                    where: {deleted},
                    select: this.selectedData
                })
                logger.info(`all users fetched successfully`);
                return users;
            }
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    getByUser = async (data: Partial<UserData>, deleted: boolean = false, password?: boolean) => {
        try {
            logger.info(`fetching user with email or username ${data.email || data.username}`);
            
            if(password) {
                this.selectedData.password = true
            }

            const user = await pUser.findFirst({
                where: {
                    OR: [
                        { email: data.email },
                        { username: data.username }
                    ],
                    deleted
                },
                select: this.selectedData
            })
            if(!user) {
                throw new Error("user not found")
            }
            logger.info(`user with email or username ${data.email || data.username} fetched successfully`);
            return user;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    create = async (data: Partial<UserData>) => {
        try {
            const { username, email, password } = data;
            logger.info(`creating user ${username}`);
            if (!username || !email || !password) {
                throw new Error("missing required fields");
            }

            if(!validator.validateEmail(email)) {
                throw new Error("invalid email address")
            }

            const hashedPassword = await HashPassword.hash(password);

            const user = await pUser.create({
                data: {
                    username: username,
                    email: email,
                    password: hashedPassword!
                },
                select: this.selectedData
            })
            logger.info(`user ${username} created successfully`);
            return user;
        } catch (error) {
            logger.error(error);
            throw error
        }

    }

    edit = async (id: number, data: Partial<UserData>) => {
        try {
            logger.info(`editing user with id ${id}`);
            if(data.email) {
                if(!validator.validateEmail(data.email)) {
                    throw new Error("invalid email address")
                }
            }
            if(data.password) {
                data.password = await HashPassword.hash(data.password)!
            }

            data.updatedAt = new Date()
            const user = await pUser.update({
                where: {id: id},
                data: data,
                select: this.selectedData
            })
            logger.info(`user with id ${id} edited successfully`);
            return user;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    delete = async (id: number) => {
        try {
            logger.info(`deleting user with id ${id}`);
            const user = await pUser.update({
                where: {id: id},
                data: {
                    deleted: true,
                    deletedAt: new Date()
                },
                select: this.selectedData
            })
            logger.info(`user with id ${id} deleted successfully`);
            return user;

        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    restore = async (id: number) => {
        try {
            logger.info(`restoring user with id ${id}`);
            const user = await pUser.update({
                where: {id: id},
                data: {
                    deleted: false,
                    deletedAt: null,
                    updatedAt: new Date()
                },
                select: this.selectedData
            })
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

}