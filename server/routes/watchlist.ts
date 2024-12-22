import express from 'express';
import { addToWatchlist, getAllWatchlist, removeFromWatchlist } from '../controllers/watchlistControllers.js';

const watchlistRouter = express.Router();

watchlistRouter.get('/watchlist', getAllWatchlist);
watchlistRouter.post('/watchlist/:movieId', addToWatchlist);
watchlistRouter.delete('/watchlist/:movieId', removeFromWatchlist);

export default watchlistRouter