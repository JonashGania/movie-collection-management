import { pool } from "../pool.js"

export const createMovieQuery = async (
    title: string,
    release_date: string,
    rating: number,
    description: string,
    duration: number,
    slug: string,
    poster_url: Promise<string>,
    genres: number[],
    actors: string[],
    directors: string[],
) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const movieResult = await client.query(`
            INSERT INTO movies (title, release_date, description, duration, rating, slug)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id`,
            [title, release_date, description, duration, rating, slug]
        )
    
        const movieId = movieResult.rows[0].id;

        await client.query(`
            INSERT INTO movie_images (movie_id, poster_url)
            VALUES ($1, $2)`,
            [movieId, poster_url]
        )
    
   
        await client.query(`
            INSERT INTO movie_genres (movie_id, genre_id) 
            SELECT $1, unnest($2::integer[])`,
            [movieId, genres]
        )

        const directorIds = (await Promise.all(
            directors.map(directorName => 
                client.query(`
                    INSERT INTO directors (director_name)
                    VALUES ($1)
                    ON CONFLICT (director_name) DO UPDATE SET director_name = EXCLUDED.director_name
                    RETURNING id`,
                    [directorName]
                )
            )
        )).map(res => res.rows[0].id);

        await client.query(`
            INSERT INTO movie_directors(movie_id, director_id)
            SELECT $1, unnest($2::integer[])`,
            [movieId, directorIds]
        )

        const actorIds = (await Promise.all(
            actors.map(actorName => 
                client.query(`
                    INSERT INTO actors (actor_name)
                    VALUES ($1)
                    ON CONFLICT (actor_name) DO UPDATE SET actor_name = EXCLUDED.actor_name
                    RETURNING id`,
                    [actorName]
                )
            )
        )).map(res => res.rows[0].id);

        await client.query(`
            INSERT INTO movie_actors (movie_id, actor_id)
            SELECT $1, unnest($2::integer[])`,
            [movieId, actorIds]
        )

        await client.query('COMMIT')
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Error creating movie', error)
        throw error;
    } finally {
        client.release();
    }
}

export const addMovieWatchlistQuery = async (movieId: number) => {
    try {
        await pool.query(`
            INSERT INTO movie_watchlist (movie_id)
            VALUES ($1)
            ON CONFLICT (movie_id) DO NOTHING;`,
            [movieId]
        )
    } catch (error) {
        console.error('Error adding movie in watchlist', error);
    }
}