import { pool } from "../../config/dbConnect.js"

export const queryDeleteMovie = async (slug: string) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const { rows } = await client.query(`
            SELECT id FROM movies WHERE slug = $1`,
            [slug]
        )

        const movieId = rows[0]?.id;

        if (!movieId) {
            throw new Error(`Movie with slug ${slug} not found.`)
        }

        await client.query(`
            DELETE FROM movie_genres WHERE movie_id = $1;`,
            [movieId]
        )

        await client.query(`
            DELETE FROM movie_actors WHERE movie_id = $1;`,
            [movieId]
        )

        await client.query(`
            DELETE FROM movie_directors WHERE movie_id = $1;;`,
            [movieId]
        )

        await client.query(`
            DELETE FROM movie_images WHERE movie_id = $1;`,
            [movieId]
        )

        await client.query(`
            DELETE FROM movies WHERE id = $1;`,
            [movieId]
        )

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error deleting movie', error)
        throw error;
    } finally {
        client.release();
    }
}

export const removeMovieWatchlistQuery = async (movieId: number) => {
    try {
        await pool.query(`
            DELETE FROM movie_watchlist
            WHERE movie_id = $1;`,
            [movieId]
        )
    } catch (error) {
        console.error('Error removing movie from watchlist', error);
    }
}