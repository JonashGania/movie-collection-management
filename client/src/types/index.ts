export interface MovieImages {
    id: string,
    posterUrl: string,
}

export interface Movies {
    id: number,
    title: string,
    releaseDate: string,
    rating: string,
    slug: string,
    movieImages: MovieImages
}

export interface MoviesPaginated {
    totalPages: number,
    movies: Movies[]
}

export interface Genres {
    id: string,
    name: string,
}

export interface GenreMovies {
    totalPages: number,
    genre: string,
    movies: Movies[]
}


export interface MovieFormState {
    title: string,
    release_date: string,
    description: string,
    duration: number,
    rating: number,
    genres: string[],
    actors: string[],
    directors: string[],
}

export type MovieFormAction =
    | { type: 'SET_FIELD', field: keyof MovieFormState, value: string | number | string[] | number[] }
    | { type: 'SET_GENRES', genres: string[] }
    | { type: 'SET_DIRECTORS', directors: string[] }
    | { type: 'SET_ACTORS', actors: string[] }
    | { type: 'RESET' }

export interface MovieDetails extends Omit<MovieFormState, 'genres'> {
    id: number,
    poster_url: string,
    genres: {genreId: number, genreName: string, genreSlug: string}[]
}
 
export interface MutationFnArgs {
    movieData: MovieFormState,
    movieId?: string
}

export interface WatchlistMovieDetails {
    id: number,
    title: string,
    description: string,
    rating: number,
    duration: number,
    release_date: string,
    slug: string,
    poster_url: string
}

export interface AuthData {
    username: string,
    password: string
}