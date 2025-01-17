import { Request, Response, NextFunction } from "express"
import { getGenres, getUserMoviesByGenre } from "../db/queries.js";

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
    const userId = req.user?.id;

    if (page < 1) {
        res.status(400).json({ 
            status: 400,
            message: "Page number must be greater than 1"
        });
        return
    }

    try {
        const result = await getUserMoviesByGenre(userId, slug, page);

        if (!result) {
            res.status(404).json({ message: "Found no movies for this genre" });
            return;
        }

        const { movies, totalCount, genreName } = result
        const totalPages = Math.ceil(totalCount / 30);

        if (movies.length === 0) {
            res.status(200).json({ 
                totalPages: 0,
                genre: genreName,
                movies: [],
            });
            return;
        }

        const allMovies = movies.map((movie) => {
            if (movie.movieImages) {
                const { movieId, ...restOfMovies } = movie.movieImages
                return {...movie, movieImages: restOfMovies}
            }
        })

        res.status(200).json({ 
            totalPages, 
            genre: genreName,
            movies: allMovies, 
        });
    } catch (error) {
        console.error('Error in getMoviesByGenres controller', error);
        res.status(500).json({ error: "An error occured while fetching movies by genre." });
    }
}