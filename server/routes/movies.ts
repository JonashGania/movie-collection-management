import express from 'express';
import { getAllMoviesPaginated, createMovies, getMovieDetails } from '../controllers/moviesControllers.js';

const moviesRouter = express.Router();

moviesRouter.get('/movies', getAllMoviesPaginated);
moviesRouter.get('/movies/:movieId', getMovieDetails);
moviesRouter.post('/movies', createMovies);

export default moviesRouter;
