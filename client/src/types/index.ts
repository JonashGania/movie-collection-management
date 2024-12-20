export interface Movies {
    id: number,
    title: string,
    release_date: string,
    rating: string,
    slug: string,
    poster_url: string | null
}

export interface MoviesPaginated {
    totalPages: number,
    movies: Movies[]
}

export interface Genres {
    id: number,
    name: string,
    slug: string,
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
    genres: number[],
    actors: string[],
    directors: string[],
}

export type MovieFormAction =
    | { type: 'SET_FIELD', field: keyof MovieFormState, value: string | number | string[] | number[] }
    | { type: 'SET_GENRES', genres: number[] }
    | { type: 'SET_DIRECTORS', directors: string[] }
    | { type: 'SET_ACTORS', actors: string[] }
    | { type: 'RESET' }

export interface MovieDetails extends Omit<MovieFormState, 'genres'> {
    poster_url: string,
    genres: {genreId: number, genreName: string, genreSlug: string}[]
}
 
export interface MutationFnArgs {
    movieData: MovieFormState,
    movieId?: string
}