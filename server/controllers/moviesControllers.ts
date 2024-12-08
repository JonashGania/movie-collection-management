import { Request, Response, NextFunction } from "express"
import { getMoviesPaginated, getMoviePoster } from "../db/queries.js"

export const getAllMoviesPaginated = async(req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;

    if (page < 1) {
        res.status(400).json({ error: "Page number must be greater than 1"});
        return
    }

    try {
        const movies = await getMoviesPaginated(page);

        if (!movies || movies.length === 0) {
            res.status(404).json({ error: "No movies found on this page" });
            return;
        }

        const allMovies = await Promise.all(
            movies.map(async (movie) => {
                try {
                    const posterUrl = await getMoviePoster(movie.id, movie.title);
                    return {...movie, poster_url: posterUrl };
                } catch (error) {
                    console.error(`Failed to fetch poster for movie ID ${movie.id}`, error);
                    return {...movie, poster_url: null}
                }
                
            })
        )

        res.status(200).json({page, movies: allMovies});
    } catch (error) {
        console.error('Error in getAllMoviesPaginated controller', error);
        res.status(500).json({ error: "An error occured while fetching movies." });
    }
}

