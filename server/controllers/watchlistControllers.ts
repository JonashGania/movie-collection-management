import { Request, Response, NextFunction } from "express"
import { getWatchlistsQuery } from "../db/getQueries.js"
import { addMovieWatchlistQuery } from "../db/postQueries.js";
import { removeMovieWatchlistQuery } from "../db/deleteQueries.js";

export const getAllWatchlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await getWatchlistsQuery();

        if (!movies) {
            res.status(500).json({ error: 'Failed to fetch the watchlist' });
            return
        }

        res.status(200).json(movies);
    } catch (error) {
        console.error('Error in getAllWatchlist controller', error);
        res.status(500).json({ error: "An error occured while fetching watchlist" });
    }
}

export const addToWatchlist = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body
    
    try {
        if (!id) {
            res.status(400).send({ error: 'Movie ID is required' });
            return
        }
        
        await addMovieWatchlistQuery(id);

        res.status(201).send("Movie added to watchlist successfully");
    } catch (error) {
        console.error('Error adding movie to watchlist', error);
        res.status(500).send("An error occured while adding movie to watchlist")
    }
}

// export const removeToWatchlist = async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params

//     try {
//         await removeMovieWatchlistQuery(id)
//     } catch (error) {
        
//     }
// }