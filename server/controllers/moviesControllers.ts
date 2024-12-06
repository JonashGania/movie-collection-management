import { Request, Response, NextFunction } from "express"
import { getMoviesPaginated } from "../db/queries.js"

export const getAllMoviesPaginated = async(req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;

    if (page < 1) {
        res.status(400).json({ error: "Page number must be greater than 1"});
        return
    }

    try {
        const allMovies = await getMoviesPaginated(page);

        if (allMovies?.length === 0) {
            res.status(404).json({ error: "No movies found on this page" });
            return;
        }

        res.status(200).json({page, allMovies});
    } catch (error) {
        console.error('Error in getAllMoviesPaginated controller', error);
        res.status(500).json({ error: "An error occured while fetching movies." });
    }
}

