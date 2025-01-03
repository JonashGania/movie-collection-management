import { Request, Response, NextFunction } from "express"
import { getMoviesPaginated, getMoviePoster, queryMovieDetails } from "../db/queries/getQueries.js"
import { createMovieQuery } from "../db/queries/postQueries.js";
import { queryDeleteMovie } from "../db/queries/deleteQueries.js";
import { updateMovieQuery } from "../db/queries/updateQueries.js";
import { movieTitleSlug } from "../utils/generateSlug.js";
import { fetchMoviePoster } from "../utils/fetchMoviePoster.js";

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

        const totalMovies = movies[0]?.total_count || 0;
        const totalPages = Math.ceil(totalMovies / 30);
        const mapMovies = movies.map(({ total_count, ...movie}) => movie);

        const allMovies = await Promise.all(
            mapMovies.map(async (movie) => {
                try {
                    const posterUrl = await getMoviePoster(movie.id, movie.title);
                    return {...movie, poster_url: posterUrl };
                } catch (error) {
                    console.error(`Failed to fetch poster for movie ID ${movie.id}`, error);
                    return {...movie, poster_url: null}
                }
                
            })
        )

        res.status(200).json({totalPages, movies: allMovies});
    } catch (error) {
        console.error('Error in getAllMoviesPaginated controller', error);
        res.status(500).json({ error: "An error occured while fetching movies." });
    }
}

export const getMovieDetails = async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.movieId;

    try {
        const movieDetails = await queryMovieDetails(slug);

        if (!movieDetails) {
            res.status(404).json({ error: "Movie not found" });
            return
        }

        res.status(200).json(movieDetails);
    } catch (error: any) {
        console.error('Error in getMovieDetails controller', error.message || error);

        if (error.code === '22P02') {
            res.status(400).json({ error: 'Invalid input syntax for Movie ID.' })
        }
        
        res.status(500).json({ error: "An error occured while fetching movie details" });
    }
} 

export const createMovies = async (req: Request, res: Response, next: NextFunction) => {
    const {  
        title,
        release_date,
        rating,
        duration,
        description,
        genres,
        actors,
        directors
    } = req.body

    try {
        const year = new Date(release_date).getFullYear().toString();
        const slug = movieTitleSlug(title, year)
        const posterUrl = await fetchMoviePoster(title)

        if (!title || !release_date || !rating || !duration || !description) {
            res.status(400).send("Missing required fileds: titles, release_date, rating, duration, description.")
            return
        }

        if (!Array.isArray(genres) || !Array.isArray(actors) || !Array.isArray(directors)) {
            res.status(400).send("Invalid data: genres, actors, directors must be an arrays.")
            return
        }

        await createMovieQuery(title, release_date, rating, description, duration, slug, posterUrl, genres, actors, directors)
    
        res.status(201).send("Movie created successfully.");
    } catch (error) {
        console.error('Error creating movie', error)
        res.status(500).json({ error: "An error occured while creating the movie" })
    }
}

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.movieId;

    try {
        await queryDeleteMovie(slug);

        res.status(200).json({ message: "Movie successfully deleted" })
    } catch (error: any) {
        if (error.message.includes("Not found")) {
            res.status(404).json({ error: "Movie not found" })
        } else {
            res.status(500).json({ 
                error: 'An error occured while deleting the movie', 
                details: error.message 
            });
        }
    }
}

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
    const {
        id,  
        title,
        release_date,
        rating,
        duration,
        description,
        genres,
        actors,
        directors
    } = req.body

    try {
        if (!id || !title || !release_date || !rating || !duration || !description) {
            res.status(400).send("Missing required fileds: titles, release_date, rating, duration, description.")
            return
        }

        if (!Array.isArray(genres) || !Array.isArray(actors) || !Array.isArray(directors)) {
            res.status(400).send("Invalid data: genres, actors, directors must be an arrays.")
            return
        }

        await updateMovieQuery(id, title, release_date, rating, description, duration, genres, actors, directors)

        res.status(201).send("Movie updated successfully.");
    } catch (error) {
        console.error('Error updating movie', error)
        res.status(500).json({ error: "An error occured while updating the movie" })
    }
}