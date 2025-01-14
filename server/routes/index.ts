import express from "express";
import moviesRouter from "./movies.js";
import genresRouter from "./genres.js";
import watchlistRouter from "./watchlist.js";
import passport from "passport";
import { User } from "../types/index.js";

const router = express.Router();

router.use('/movies', moviesRouter);
router.use('/genres', genresRouter);
router.use('/watchlist', watchlistRouter)

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err: Error, user: User, info: any) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'Login failed'
            })
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.json({ message: "Login successful" });
        })
    })(req, res, next);
})

export default router