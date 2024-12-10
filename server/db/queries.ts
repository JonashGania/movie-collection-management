import { pool } from "./pool.js";
import { formatTitle } from "../utils/formatTitle.js";
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const getMoviesPaginated = async(page: number) => {
    const limit = 30;
    const offset = (page - 1) * limit;

    try {
        const { rows } = await pool.query(`
            SELECT m.id, m.title, m.release_date, m.rating, m.slug, mi.poster_url 
            FROM movies m
            LEFT JOIN movie_images mi
            ON m.id = mi.movie_id
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        return rows
    } catch (error) {
        console.error('Error fetching paginated movies', error);
        return [];
    }
}

export const getMoviePoster = async (movieId: number, title: string) => {
    const movieTitle = formatTitle(title);

    try {
        const { rows } = await pool.query(`SELECT poster_url FROM movie_images WHERE movie_id = $1`, [movieId])

        if (rows.length > 0) {
            return rows[0].poster_url;
        }

        const { data } = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${movieTitle}`)

        if (data.Response === 'True' && data.Poster !== 'N/A') {
            await pool.query(`INSERT INTO movie_images (movie_id, poster_url) VALUES ($1, $2)`, [movieId, data.Poster])
            return data.Poster;
        }

        return null
    } catch (error) {
        console.error('Error fetching movie image', error);
        return null
    }
}

export const getGenres = async() => {
    try {
        const { rows } = await pool.query("SELECT id, name, slug FROM genres ORDER BY name ASC");
        return rows
    } catch (error) {
        console.error('Error fetching genres', error);
        return [];
    }
};

export const queryMoviesByGenre = async(slug: string, page: number) => {
    const limit = 30;
    const offset = (page - 1) * limit;

    try {
        const { rows } = await pool.query(`
            SELECT 
                g.name AS genre_name,
                m.id, m.title, m.release_date, m.rating, m.slug, mi.poster_url, 
                COUNT(*) OVER() AS total_count
            FROM genres g
            LEFT JOIN movie_genres mg ON g.id = mg.genre_id
            LEFT JOIN movies m ON mg.movie_id = m.id
            LEFT JOIN movie_images mi ON m.id = mi.movie_id
            WHERE g.slug = $1
            LIMIT $2 OFFSET $3`,
            [slug, limit, offset]
        );

        return rows;
    } catch (error) {
        console.error('Error fetching movies by genre with posters', error);
        return [];
    }
}