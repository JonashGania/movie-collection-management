import express from "express";
import moviesRouter from "./movies.js";
import genresRouter from "./genres.js";
import watchlistRouter from "./watchlist.js";
import authRouter from "./auth.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use('/movies', isAuthenticated, moviesRouter);
router.use('/genres', isAuthenticated, genresRouter);
router.use('/watchlist', isAuthenticated, watchlistRouter);
router.use('/', authRouter);


export default router