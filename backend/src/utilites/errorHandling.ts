import { Response } from "express"; // Make sure you import Response from express
import logger from "./logger";

export const InternalServerError = (err: any, res: Response) => {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    
    if (err instanceof Error) {
        logger.error('Error creating user: ' + err.message);
    } else {
        logger.error('An unknown error occurred: ' + JSON.stringify(err));
    }

    return res.status(500).json({
        message: 'Internal server error',
        error: errorMessage
    });
}
