export interface MovieImages {
    id: string,
    posterUrl: string,
}

export interface Movies {
    id: string,
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
    slug: string
}

export interface Actors {
    id: string,
    actorName: string
} 

export interface Directors {
    id: string,
    directorName: string
} 

export interface GenreMovies {
    totalPages: number,
    genre: Genres
    movies: Movies[]
}

export interface MovieDetails extends Movies {
    description: string,
    duration: number,
    genres: Genres[],
    actors: Actors[],
    directors: Directors[]
}
 

export interface WatchlistMovieDetails {
    id: string,
    title: string,
    description: string,
    rating: string,
    duration: number,
    release_date: string,
    slug: string,
    poster_url: string
}

export interface Watchlist {
    watchlist: WatchlistMovieDetails[]
}

export interface MovieFormState {
    title: string,
    releaseDate: string,
    description: string,
    duration: number,
    rating: string,
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


export interface MutationFnArgs {
    movieData: MovieFormState,
    movieId?: string
}


export interface AuthData {
    username: string,
    password: string
}