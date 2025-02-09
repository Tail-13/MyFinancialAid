import { NextFunction, Request, Response, Router } from "express";

export type RouteMethod = 'get' | 'post' | 'put' | 'delete';

export const setupRoutes = (
    router: Router, 
    routes: { 
        method: RouteMethod, 
        path: string, 
        action: (req: Request, res: Response, next: NextFunction) => void 
    }[]) => {
        routes.forEach(route => {
            router[route.method](route.path, (req: Request, res: Response, next: NextFunction) => {
                route.action(req, res, next);
            });
        });
}