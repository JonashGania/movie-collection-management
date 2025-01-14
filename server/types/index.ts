export interface GenreMovies {
    id: number;
    title: string;
    description: string;
    release_date: string;
    rating: number;
    slug: string;
    poster_url: string | null;
    total_count: number;
}

export interface QueryMoviesByGenreResult {
    genreName: string | null;
    movies: GenreMovies[]
}

export interface User {
    id: string;
    username: string;
    password: string
}