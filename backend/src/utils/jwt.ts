import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import logger from './logger';

dotenv.config();

interface TokenJwtInterface {
    data: any;
    expiresSecond?: number;
    expiresMinute?: number;
    expiresHour?: number;

}

export class TokenJwt {
    private  SECRET: jwt.Secret = process.env.APP_JWT_SECRET || 'secret';

    generate = (data: TokenJwtInterface) : string => {
        try {
            let expiresIn: number = 0
            if (data.expiresHour) {
                expiresIn += data.expiresHour * 60 * 60;
            }
            if (data.expiresMinute) {
                expiresIn += data.expiresMinute * 60;
            }
            if (data.expiresSecond) {
                expiresIn += data.expiresSecond;
            }
    
            const token = jwt.sign(data, this.SECRET, {
                expiresIn: `${expiresIn}`,
              });
    
              return token
        } catch (error) {
            logger.error(error);
            throw error
        }
    }

    extract = (token: string) : any => {
        try {
            const data = jwt.verify(token, this.SECRET);
            return data;
        } catch (error) {
            logger.error(error);
            throw error
        }
    }
}