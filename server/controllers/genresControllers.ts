import { Request, Response, NextFunction } from "express"
import { getGenres } from "../db/queries.js"

export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const allGenres = await getGenres();
        res.status(200).json(allGenres);
    } catch (error) {
        console.error('Error in getAllGenres controller', error);
        res.status(500).json({ error: "An error occured while fetching genres." })
    }
}