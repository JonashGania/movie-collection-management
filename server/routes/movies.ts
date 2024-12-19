import express from 'express';
import { getAllMoviesPaginated, createMovies, getMovieDetails, deleteMovie } from '../controllers/moviesControllers.js';

const moviesRouter = express.Router();

moviesRouter.get('/movies', getAllMoviesPaginated);
moviesRouter.get('/movies/:movieId', getMovieDetails);
moviesRouter.post('/movies', createMovies);
moviesRouter.delete('/movies/:movieId', deleteMovie);

export default moviesRouter;
