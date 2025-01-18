import { Request, Response, NextFunction } from "express"
import { getUserWatchlistQuery, addMovieWatchlistQuery, removeMovieWatchlistQuery } from "../db/queries.js";

export const getAllWatchlist = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id

    try {
        const movies = await getUserWatchlistQuery(userId);

        if (!movies) {
            res.status(500).json({ 
                status: 500, 
                message: 'Failed to fetch the watchlist' 
            });
            return
        }


        res.status(200).json(movies);
    } catch (error) {
        console.error('Error in getAllWatchlist controller', error);
        res.status(500).json({ 
            status: 500, 
            message: "An error occured while fetching watchlist" 
        });
    }
}

export const addToWatchlist = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body
    const userId = req.user?.id

    try {
        if (!id) {
            res.status(400).json({ 
                status: 400, 
                message: 'Movie ID is required' 
            });
            return
        }
        
        await addMovieWatchlistQuery(userId, id);

        res.status(201).send("Movie added to watchlist successfully");
    } catch (error) {
        console.error('Error adding movie to watchlist', error);
        res.status(500).json({ 
            status: 500,
            message: "An error occured while adding movie to watchlist" 
        })
    }
}

export const removeFromWatchlist = async (req: Request, res: Response, next: NextFunction) => {
    const id  = req.params.movieId
    const userId = req.user?.id

    try {
        if (!id) {
            res.status(400).json({ 
                status: 400, 
                message: 'Movie ID is required' 
            });
            return
        }

        await removeMovieWatchlistQuery(userId, id)

        res.status(200).send('Movie removed from watchlist successfully');
    } catch (error) {
        console.error('Error removing movie from watchlist', error);
        res.status(500).json({ error: "An error occured while removing movie from watchlist"});
    }
}