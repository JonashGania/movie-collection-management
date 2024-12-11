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