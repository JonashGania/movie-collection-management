import express from 'express';
import { addToWatchlist, getAllWatchlist, removeFromWatchlist } from '../controllers/watchlistControllers.js';

const watchlistRouter = express.Router();

watchlistRouter.get('/', getAllWatchlist);
watchlistRouter.post('/:movieId', addToWatchlist);
watchlistRouter.delete('/:movieId', removeFromWatchlist);

export default watchlistRouter