import express from 'express';
import { getAllGenres, getMoviesByGenres } from '../controllers/genresControllers.js';

const genresRouter = express.Router();

genresRouter.get('/', getAllGenres);
genresRouter.get('/:genreId', getMoviesByGenres)

export default genresRouter