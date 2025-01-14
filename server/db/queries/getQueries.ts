import { pool } from "../../config/dbConnect.js";
import { formatTitle } from "../../utils/formatTitle.js";
import { QueryMoviesByGenreResult } from "../../types/index.js";
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const getMoviesPaginated = async(page: number) => {
    const limit = 30;
    const offset = (page - 1) * limit;

    try {
        const { rows } = await pool.query(`
            SELECT 
                m.id, m.title, m.release_date, m.rating, m.slug, mi.poster_url,
                COUNT(*) OVER() AS total_count
            FROM movies m
            LEFT JOIN movie_images mi
            ON m.id = mi.movie_id
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        
        return rows.length > 0 ? rows : [];
    } catch (error) {
        console.error('Error fetching paginated movies', error);
        return null;
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
        return null;
    }
};

export const queryMoviesByGenre = async(slug: string, page: number): Promise<QueryMoviesByGenreResult | null> => {
    const limit = 30;
    const offset = (page - 1) * limit;

    try {
        const genreResult = await pool.query(`
            SELECT name FROM genres WHERE slug = $1;`,
            [slug]
        )

        const genreName = genreResult.rows[0].name;

        const { rows } = await pool.query(`
            SELECT 
                m.id, m.title, m.release_date, m.rating, m.slug, mi.poster_url,
                COUNT(*) OVER() AS total_count
            FROM genres g
            LEFT JOIN movie_genres mg ON g.id = mg.genre_id
            LEFT JOIN movies m ON mg.movie_id = m.id
            LEFT JOIN movie_images mi ON m.id = mi.movie_id
            WHERE g.slug = $1 AND m.id IS NOT NULL
            LIMIT $2 OFFSET $3`,
            [slug, limit, offset]
        );

        return { genreName, movies: rows }
    } catch (error) {
        console.error('Error fetching movies by genre with posters', error);
        return null
    }
}

export const queryMovieDetails = async (slug: string) => {
    try {
        const { rows } = await pool.query(`
            SELECT
                m.id, m.title, m.release_date, m.description, m.rating, m.duration, 
                mi.poster_url,
                COALESCE(genres.genres, '{}') AS genres,
                COALESCE(actors, '{}') AS actors,
                COALESCE(directors.directors, '{}') AS directors
            FROM movies m

            INNER JOIN movie_images mi ON m.id = mi.movie_id

            LEFT JOIN (
                SELECT mg.movie_id, 
                ARRAY_AGG(DISTINCT jsonb_build_object('genreId', g.id, 'genreName', g.name, 'genreSlug', g.slug)) AS genres
                FROM movie_genres mg
                INNER JOIN genres g ON mg.genre_id = g.id
                GROUP BY mg.movie_id
            ) genres ON m.id = genres.movie_id

            LEFT JOIN (
                SELECT ma.movie_id, ARRAY_AGG(DISTINCT a.actor_name) AS actors
                FROM movie_actors ma
                INNER JOIN actors a ON ma.actor_id = a.id
                GROUP BY ma.movie_id
            ) actors ON m.id = actors.movie_id

            LEFT JOIN (
                SELECT md.movie_id, ARRAY_AGG(DISTINCT d.director_name) AS directors
                FROM movie_directors md
                INNER JOIN directors d ON md.director_id = d.id
                GROUP BY md.movie_id
            ) directors ON m.id = directors.movie_id

            WHERE m.slug = $1`,
            [slug]
        )

        return rows[0] || null
    } catch (error) {
        console.error('error fetching all movie details', error);
        return null
    }
}

export const getWatchlistsQuery = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT m.id, m.title, m.rating, m.duration, m.description, m.release_date, m.slug, mi.poster_url
            FROM movie_watchlist mw
            JOIN movies m ON mw.movie_id = m.id
            JOIN movie_images mi ON m.id = mi.movie_id;`,
        )

        return rows.length > 0 ? rows : [];
    } catch (error) {
        console.error('error fetching movie watchlists', error);
        return null
    }
}