import { Request, Response, NextFunction } from "express";


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({
            status: 401,
            message: "Unauthorized access"
        })
    }
}

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true })
    } else {
        res.json({ isAuthenticated: false });
    }
}