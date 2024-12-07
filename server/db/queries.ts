import { pool } from "./pool.js";
import axios from 'axios';
import { formatTitle } from "../utils/formatTitle.js";

export const getMoviesPaginated = async(page: number) => {
    const limit = 30;
    const offset = (page - 1) * limit;

    try {
        const { rows } = await pool.query(`
            SELECT id, title, release_date, rating, slug 
            FROM movies
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        return rows
    } catch (error) {
        console.error('Error fetching paginated movies', error);
    }
}

export const getMoviePoster = async (movieId: number, title: string) => {
    try {
        const { rows } = await pool.query(`SELECT poster_url FROM movie_images WHERE movie_id = $1`, [movieId])

        if (rows.length > 0) {
            return rows[0].poster_url;
        }

    } catch (error) {
        
    }
}

export const getGenres = async() => {
    const { rows } = await pool.query("SELECT id, name FROM genres ORDER BY name ASC");
    return rows
};