import express from 'express'
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { createUser } from '../controllers/authController.js';
import { User } from '../types/index.js';
import { checkAuthentication, isAuthenticated } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/sign-up', createUser);

authRouter.post('/login', (req, res, next) => {
    passport.authenticate("local", (err: Error, user: User, info: any) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: info ? info.message : 'Login failed'
            })
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.json({ 
                message: "Login successful", 
                isAuthenticated: true,
            });
        })
    })(req, res, next);
})

authRouter.post('/log-out', isAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }

        return res.json({ 
            message: "Logout successful", 
            isAuthenticated: false,
        });
    })
})

authRouter.get('/check-auth', isAuthenticated, checkAuthentication)

export default authRouter