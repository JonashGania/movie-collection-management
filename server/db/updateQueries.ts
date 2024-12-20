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

        await client.query(`
            DELETE FROM movie_genres WHERE movie_id = $1;`,
            [movieId]
        )

        await client.query(`
            INSERT INTO movie_genres (movie_id, genre_id)
            SELECT $1, unnest($2::integer[]);`,
            [movieId, genres]
        )

        const directorIds = (await Promise.all(
            directors.map(directorName => 
                client.query(`
                    INSERT INTO directors (director_name)
                    VALUES ($1)
                    ON CONFLICT (director_name) DO UPDATE 
                    SET director_name = EXCLUDED.director_name
                    RETURNING id;`,
                    [directorName]
                )
            )
        )).map(res => res.rows[0].id);


        await client.query(`
            INSERT INTO movie_directors (movie_id, director_id)
            SELECT $1, unnest($2::integer[])
            ON CONFLICT (movie_id, director_id) DO NOTHING;`,
            [movieId, directorIds]
        )

        const actorIds = (await Promise.all(
            actors.map(actorName => 
                client.query(`
                    INSERT INTO actors (actor_name)
                    VALUES ($1)
                    ON CONFLICT (actor_name) DO UPDATE 
                    SET actor_name = EXCLUDED.actor_name
                    RETURNING id;`,
                    [actorName]
                )
            )
        )).map(res => res.rows[0].id);
       
        await client.query(`
            INSERT INTO movie_actors (movie_id, actor_id)
            SELECT $1, unnest($2::integer[])
            ON CONFLICT (movie_id, actor_id) DO NOTHING;`,
            [movieId, actorIds]
        )
       
        await client.query("COMMIT");
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Error updating movie', error)
        throw error;
    } finally {
        client.release();
    }
}