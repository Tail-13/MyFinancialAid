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

// my-express-app/
// ├── src/
// │   ├── controllers/
// │   │   ├── userController.ts
// │   │   └── accountController.ts
// │   ├── middlewares/
// │   │   ├── authMiddleware.ts
// │   │   └── errorMiddleware.ts
// │   ├── models/
// │   │   ├── userModel.ts
// │   │   └── accountModel.ts
// │   ├── routes/
// │   │   ├── userRoutes.ts
// │   │   └── accountRoutes.ts
// │   ├── utils/
// │   │   ├── logger.ts
// │   │   ├── response.ts
// │   │   └── validator.ts
// │   ├── index.ts
// │   ├── app.ts
// │   └── swagger.js
// ├── .env
// ├── .gitignore
// ├── package.json
// ├── tsconfig.json
// └── README.md