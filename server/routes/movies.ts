import express from 'express';
import { getAllMoviesPaginated, createMovies, getMovieDetails, deleteMovie, updateMovie } from '../controllers/moviesControllers.js';

const moviesRouter = express.Router();

moviesRouter.get('/', getAllMoviesPaginated);
moviesRouter.get('/:movieId', getMovieDetails);
moviesRouter.post('/', createMovies);
moviesRouter.delete('/:movieId', deleteMovie);
moviesRouter.put('/:movieId', updateMovie);

export default moviesRouter;
