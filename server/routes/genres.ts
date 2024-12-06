import express from 'express';
import { getAllGenres } from '../controllers/genresControllers.js';

const genresRouter = express.Router();

genresRouter.get('/genres', getAllGenres);

export default genresRouter