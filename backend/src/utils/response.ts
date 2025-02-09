import { Response } from "express";

export const successResponse = (res: Response, data: unknown, message: string = "request success", status: number = 200): Response => {
    return res.status(status).json({
        status: "success",
        message: message,
        data: data
    });
};

export const errorResponse = (res: Response, error: unknown, message: string = "something went wrong", status: number = 500): Response => {
    return res.status(status).json({
        status: "error",
        message: message,
        error: error
    });
};