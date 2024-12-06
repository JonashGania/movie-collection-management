import express from 'express';
import { getAllMoviesPaginated } from '../controllers/moviesControllers.js';

const moviesRouter = express.Router();

moviesRouter.get('/movies', getAllMoviesPaginated)

export default moviesRouter;
