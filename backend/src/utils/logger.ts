import winston from "winston";
import dotenv from "dotenv"

dotenv.config()

const { APP_LOG_LEVEL } = process.env
const logger = winston.createLogger({
    level: APP_LOG_LEVEL,
    format: winston.format.combine(
        winston.format.colorize({all: true}),
        winston.format.timestamp(),
        winston.format.printf (({ level, message, timestamp }) => {
            return `[ ${timestamp} || ${level} ] ${message}`
        })
    ),
    transports: [
        new winston.transports.Console()
    ]
})

export default logger 