import express from 'express'
import dotenv from 'dotenv'
import logger from './utils/logger'

const { APP_PORT } = process.env

dotenv.config() 
const app = express()

app.use(express.json())

app.listen(Number(APP_PORT), () => {
    logger.info(`server running on port ${Number(APP_PORT)}`)
})