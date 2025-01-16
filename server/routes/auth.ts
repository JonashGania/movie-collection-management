import express from 'express'
import passport from "passport";
import { createUser } from '../controllers/authController.js';
import { User } from '../types/index.js';
import { checkAuthentication } from '../middlewares/authMiddleware.js';

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

            console.log(req.user);

            return res.json({ message: "Login successful" });
        })
    })(req, res, next);
})

authRouter.get('/check-auth', checkAuthentication)

export default authRouter