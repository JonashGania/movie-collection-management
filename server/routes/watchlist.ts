import express from 'express';
import { addToWatchlist, getAllWatchlist } from '../controllers/watchlistControllers.js';

const watchlistRouter = express.Router();

watchlistRouter.get('/watchlist', getAllWatchlist);
watchlistRouter.post('/watchlist/:movieId', addToWatchlist);

export default watchlistRouter