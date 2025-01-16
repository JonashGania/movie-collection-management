import { Request, Response, NextFunction } from "express"
import { queryMoviesByGenre } from "../db/queries/getQueries.js"
import { getGenres } from "../db/queries.js";

export const getAllGenres = async (req: Request, res: Response) => {
    try {
        const allGenres = await getGenres();
        res.status(200).json(allGenres);
    } catch (error) {
        console.error('Error in getAllGenres controller', error);
        res.status(500).json({
            status: 500,
            message: "An error occured while fetching genres." 
        })
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
        const result = await queryMoviesByGenre(slug, page);

        if (!result) {
            res.status(404).json({ message: "Found no movies for this genre" });
            return;
        }

        const { genreName, movies } = result

        if (movies.length === 0) {
            res.status(200).json({ 
                totalPages: 0,
                genre: genreName,
                movies: [],
            });
            return;
        }


        const totalMovies = movies[0]?.total_count || 0;
        const totalPages = Math.ceil(totalMovies / 30);

        const movieList = movies.map(({ total_count, ...movie }) => movie);

        res.status(200).json({ 
            totalPages, 
            genre: genreName,
            movies: movieList, 
        });
    } catch (error) {
        console.error('Error in getMoviesByGenres controller', error);
        res.status(500).json({ error: "An error occured while fetching movies by genre." });
    }
}