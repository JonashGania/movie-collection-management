export interface Movies {
    id: number,
    title: string,
    release_date: string,
    rating: string,
    slug: string,
}

export interface MoviesPaginated {
    page: number,
    allMovies: Movies[]
}