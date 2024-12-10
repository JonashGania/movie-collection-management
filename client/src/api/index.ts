import { MoviesPaginated, Genres, GenreMovies } from "../types"
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAllMovies = async (page: string): Promise<MoviesPaginated> => {
    const response = await axios.get(`${API_BASE_URL}/api/movies?page=` + page);
    return response.data
}

export const getAllGenres = async (): Promise<Genres[]> => {
    const response = await axios.get(`${API_BASE_URL}/api/genres`);
    return response.data
}

export const getAllMoviesbyGenre = async (genreId: string | undefined): Promise<GenreMovies> => {
    if (!genreId) {
        throw new Error("Genre ID is required");
    }
    const response = await axios.get(`${API_BASE_URL}/api/genres/${genreId}`);
    return response.data
}