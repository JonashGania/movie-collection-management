export interface Movies {
    id: number,
    title: string,
    release_date: string,
    rating: string,
    slug: string,
    poster_url: string | null
}

export interface MoviesPaginated {
    page: number,
    movies: Movies[]
}