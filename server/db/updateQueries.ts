import { pool } from "./pool.js"

export const updateMovieQuery = async (
    movieId: number,
    title: string,
    release_date: string,
    rating: number,
    description: string,
    duration: number,
    genres: number[],
    actors: string[],
    directors: string[],
) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(`
            UPDATE movies
            SET title = $1, release_date = $2, description = $3, rating = $4, duration = $5
            WHERE id = $6`,
            [title, release_date, description, rating, duration, movieId]
        )

        
    } catch (error) {
        
    }
}