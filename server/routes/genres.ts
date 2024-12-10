import express from 'express';
import { getAllGenres, getMoviesByGenres } from '../controllers/genresControllers.js';

const genresRouter = express.Router();

genresRouter.get('/genres', getAllGenres);
genresRouter.get('/genres/:genreId', getMoviesByGenres)

export default genresRouter