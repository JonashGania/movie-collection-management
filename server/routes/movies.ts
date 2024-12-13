import express from 'express';
import { getAllMoviesPaginated, createMovies } from '../controllers/moviesControllers.js';

const moviesRouter = express.Router();

moviesRouter.get('/movies', getAllMoviesPaginated)
moviesRouter.post('/movies', createMovies);

export default moviesRouter;
