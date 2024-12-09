import { Request, Response, NextFunction } from "express"
import { getGenres, queryMoviesByGenre } from "../db/queries.js"

export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const allGenres = await getGenres();
        res.status(200).json(allGenres);
    } catch (error) {
        console.error('Error in getAllGenres controller', error);
        res.status(500).json({ error: "An error occured while fetching genres." })
    }
}

export const getMoviesByGenres = async (req: Request, res:Response) => {
    const page = parseInt(req.query.page as string) || 1;
    
    if (page < 1) {
        res.status(400).json({ error: "Page number must be greater than 1"});
        return
    }

    try {
        const movies = await queryMoviesByGenre()
    } catch (error) {
        
    }
}