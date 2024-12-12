import { Request, Response, NextFunction } from "express"
import { getGenres, queryMoviesByGenre } from "../db/getQueries.js"

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
    const slug = req.params.genreId;

    if (page < 1) {
        res.status(400).json({ error: "Page number must be greater than 1"});
        return
    }

    try {
        const movies = await queryMoviesByGenre(slug, page);

        if (movies.length === 0) {
            res.status(404).json({ message: "No movies found for this genre." });
            return
        }

        const totalMovies = movies[0]?.total_count || 0;
        const totalPages = Math.ceil(totalMovies / 30);

        const genre = movies[0].genre_name

        const movieList = movies.map(({ genre_name, total_count, ...movie }) => movie);

        res.status(200).json({ 
            totalPages, 
            genre,
            movies: movieList, 
        });
    } catch (error) {
        console.error('Error in getMoviesByGenres controller', error);
        res.status(500).json({ error: "An error occured while fetching movies by genre." });
    }
}