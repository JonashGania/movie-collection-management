import { Request, Response, NextFunction } from "express"
import { generateMovieSlug } from "../utils/generateSlug.js";
import { fetchMoviePoster } from "../utils/fetchMoviePoster.js";
import { 
    getUsersMoviesPaginated, 
    createMovieQuery, 
    getMovieDetailsQuery, 
    deleteMovieQuery, 
    editMovieQuery 
} from "../db/queries.js";

export const getAllMoviesPaginated = async(req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const userId = req.user?.id

    if (page < 1) {
        res.status(400).json({ 
            statue: 400,
            message: "Page number must be greater than 1"
        });
        return
    }

    try {
        const { movies, totalCount } = await getUsersMoviesPaginated(userId, page);

        const totalPages = Math.ceil(totalCount / 30);

        const allMovies = movies.map((movie) => {
            if (movie.movieImages) {
                const { movieId, ...restOfMovies } = movie.movieImages
                return {...movie, movieImages: restOfMovies}
            }
        })

        res.status(200).json({totalPages, movies: allMovies});
    } catch (error) {
        console.error('Error in getAllMoviesPaginated controller', error);
        res.status(500).json({ 
            status: 500,
            message: "An error occured while fetching movies." 
        });
    }
}

export const getMovieDetails = async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.movieId;
    const userId =req.user?.id;

    try {
        const movieDetails = await getMovieDetailsQuery(userId, slug);

        if (!movieDetails) {
            res.status(404).json({
                status: 404,
                message: "Movie not found" 
            });
            return
        }

        res.status(200).json(movieDetails);
    } catch (error: any) {
        console.error('Error in getMovieDetails controller', error.message || error);

        if (error.code === '22P02') {
            res.status(400).json({ 
                status: 400,
                message: 'Invalid input syntax for Movie ID.' 
            })
        }
        
        res.status(500).json({ 
            status: 500,
            message: "An error occured while fetching movie details"
         });
    }
} 

export const createMovies = async (req: Request, res: Response, next: NextFunction) => {
    const {  
        title,
        releaseDate,
        rating,
        duration,
        description,
        genres,
        actors,
        directors
    } = req.body

    try {
        const slug = generateMovieSlug(title, releaseDate)
        const posterUrl = await fetchMoviePoster(title)
        const userId = req.user?.id

        if (!title || !releaseDate || !rating || !duration || !description) {
            res.status(400).json({
                status: 400,
                message: "Missing required fileds: titles, release_date, rating, duration, description."
            })
            return
        }

        if (!Array.isArray(genres) || !Array.isArray(actors) || !Array.isArray(directors)) {
            res.status(400).json({
                status: 400,
                message: "Invalid data: genres, actors, directors must be an arrays."
            })
            return
        }

        await createMovieQuery(userId, title, releaseDate, rating, description, duration, slug, posterUrl, genres, actors, directors)
    
        res.status(201).send("Movie created successfully.");
    } catch (error) {
        console.error('Error creating movie', error)
        res.status(500).json({ error: "An error occured while creating the movie" })
    }
}

export const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.movieId;
    const userId = req.user?.id

    try {
        await deleteMovieQuery(userId, slug);

        res.status(200).json({ 
            status: 200, 
            message: "Movie successfully deleted" 
        })
    } catch (error: any) {
        if (error.message.includes("Not found")) {
            res.status(404).json({ 
                status: 404, 
                message: "Movie not found" 
            })
        } else {
            res.status(500).json({ 
                status: 500,
                message: 'An error occured while deleting the movie', 
                details: error.message 
            });
        }
    }
}

export const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
    const {
        id,  
        title,
        releaseDate,
        rating,
        duration,
        description,
        genres,
        actors,
        directors
    } = req.body

    try {
        const userId = req.user?.id

        if (!id || !title || !releaseDate || !rating || !duration || !description) {
            res.status(400).json({
                status: 400,
                message: "Missing required fileds: titles, release_date, rating, duration, description."
            })
            return
        }

        if (!Array.isArray(genres) || !Array.isArray(actors) || !Array.isArray(directors)) {
            res.status(400).json({
                status: 400,
                message: "Invalid data: genres, actors, directors must be an arrays."
            })
            return
        }

        await editMovieQuery(userId, id, title, releaseDate, rating, description, duration, genres, actors, directors)

        res.status(201).send("Movie updated successfully.");
    } catch (error) {
        console.error('Error updating movie', error)
        res.status(500).json({ 
            status: 500,
            error: "An error occured while updating the movie" 
        })
    }
}