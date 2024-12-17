import { MoviesPaginated, Genres, GenreMovies, MovieFormState } from "../types"
import axiosInstance from "@/utils/axiosInstance";

export const getAllMovies = async (page: string): Promise<MoviesPaginated> => {
    const response = await axiosInstance.get('/movies?page=' + page);
    return response.data
}

export const getAllGenres = async (): Promise<Genres[]> => {
    const response = await axiosInstance.get('/genres');
    return response.data
}

export const getMovieDetails = async (movieId: string | undefined) => {
    if (!movieId) {
        throw new Error("Movie ID is required");
    }

    const response = await axiosInstance.get(`/movies/${movieId}`);
    return response.data
}

export const getAllMoviesbyGenre = async (genreId: string | undefined): Promise<GenreMovies> => {
    if (!genreId) {
        throw new Error("Genre ID is required");
    }
    const response = await axiosInstance.get(`/genres/${genreId}`);
    return response.data
}

export const postCreateMovie = async (movieData: MovieFormState) => {
    const response = await axiosInstance.post('/movies', movieData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
};