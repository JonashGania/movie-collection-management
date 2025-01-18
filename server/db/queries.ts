import { prisma } from "../config/prismaClient.js";

export const createUserQuery = async (username: string, password: string) => {
    return await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })
}

export const getUsersMoviesPaginated = async(userId: string | undefined, page: number) => {
    const limit = 30;
    const offset = (page - 1) * limit;

    const movies = await prisma.movies.findMany({
        where: {
            userId: userId,
        },
        skip: offset,
        take: limit,
        include: {
            movieImages: true
        },
        omit: {
            userId: true,
        }
    })
    const totalCount = await prisma.movies.count({
        where: { userId: userId }
    });

    return { movies, totalCount }
}


export const getGenres = async () => {
    return await prisma.genres.findMany({
        orderBy: {
            name: 'asc'
        }
    })
}

export const getUserMoviesByGenre = async (userId: string | undefined, slug: string, page: number) => {
    const limit = 30;
    const offset = (page - 1) * limit;

    const movies = await prisma.movies.findMany({
        where: {
            userId: userId,
            genres: {
                some: {
                    slug: slug
                }
            }
        },
        skip: offset,
        take: limit,
        include: {
            movieImages: true
        },
        omit: {
            userId: true,
        }
    })
    const totalCount = await prisma.movies.count({
        where: { userId: userId }
    });

    const genreName = await prisma.genres.findUnique({
        where: {
            slug: slug
        },
        select: {
            name: true
        }
    })

    return { movies, totalCount, genreName }
}

export const getMovieDetailsQuery = async (userId: string | undefined, slug: string) => {
    const movieDetails = await prisma.movies.findUnique({
        where: {
            userId: userId,
            slug: slug,
        },
        include: {
            movieImages: true,
            genres: true,
            actors: true,
            directors: true,
        },
        omit: {
            userId: true,
        }
    })

    return movieDetails
}

export const getUserWatchlistQuery = async (userId: string | undefined) => {
    const watchlist = await prisma.movieWatchlist.findMany({
        where: {
            userId: userId
        },
        include: {
            movies: {
                include: {
                    movieImages: true
                }
            }
        },
        omit: {
            userId: true,
            movieId: true
        }
    })
    const formattedWatchlist = watchlist.map(item => {
        const { userId, ...movieDetails } = item.movies;
        return {...movieDetails, posterUrl: item.movies.movieImages?.posterUrl};
    })

    const allMovies = formattedWatchlist.map(item => {
        const { movieImages, ...movieDetails } = item;
        return movieDetails
    })

    return { watchlist: allMovies }
}

export const createMovieQuery = async (
    userId: string | undefined,
    title: string,
    release_date: string,
    rating: number,
    description: string,
    duration: number,
    slug: string,
    poster_url: string,
    genres: string[],
    actors: string[],
    directors: string[],
) => {
    await prisma.movies.create({
        data: {
            title: title,
            releaseDate: new Date(release_date),
            rating: rating,
            description: description,
            duration: duration,
            slug: slug,
            userId: userId,
            movieImages: {
                create: {
                    posterUrl: poster_url
                }
            },
            genres: {
                connect: genres.map((genreId) => ({ id: genreId }))
            },
            actors: {
                connectOrCreate: actors.map((actorName) => ({
                    where: { actorName: actorName },
                    create: {  actorName: actorName},
                }))
            },
            directors: {
                connectOrCreate: directors.map((director) => ({
                    where: { directorName: director},
                    create: { directorName: director }
                }))
            }
        }
    })
}

export const deleteMovieQuery = async (userId: string | undefined, slug: string) => {
    const movie = await prisma.movies.findFirst({
        where: {
            userId: userId,
            slug: slug
        }
    })

    if (!movie) {
        throw new Error("Movie not found or you do not have permission to delete it");
    }

    await prisma.movies.delete({
        where: {
            id: movie.id
        }
    })
}

export const editMovieQuery = async (
    userId: string | undefined,
    movieId: string,
    title: string,
    release_date: string,
    rating: number,
    description: string,
    duration: number,
    genres: string[],
    actors: string[],
    directors: string[],
) => {
    const movie = await prisma.movies.findUnique({
        where: {
            userId: userId,
            id: movieId
        }
    })

    if (!movie) {
        throw new Error("Movie not found or you do not have permission to edit it");
    }

    await prisma.movies.update({
        where: {
            id: movie.id
        },
        data: {
            title: title,
            releaseDate: new Date(release_date),
            rating: rating,
            description: description,
            duration: duration,
            genres: {
                set: genres.map((genreId) => ({ id: genreId }))
            },
            actors: {
                connectOrCreate: actors.map((actorName) => ({
                    where: { actorName: actorName },
                    create: {  actorName: actorName},
                }))
            },
            directors: {
                connectOrCreate: directors.map((director) => ({
                    where: { directorName: director},
                    create: { directorName: director }
                }))
            }
        }
    })
}

export const addMovieWatchlistQuery = async (userId: string | undefined, movieId: string) => {
    if (!userId) {
        throw new Error("User Id is required.");
    }

    const existingEntry = await prisma.movieWatchlist.findUnique({
        where: {
            userId_movieId: {
                userId: userId,
                movieId: movieId
            }
        }
    })

    if (existingEntry) {
        throw new Error("Movie is already in the watchlist")
    }
    
    await prisma.movieWatchlist.create({
        data: {
            movieId: movieId,
            userId: userId,
        }
    })
}

export const removeMovieWatchlistQuery = async(userId: string | undefined, movieId: string) => {
    if (!userId) {
        throw new Error("User Id is required.");
    }

    const existingEntry = await prisma.movieWatchlist.findUnique({
        where: {
            userId_movieId: {
                userId: userId,
                movieId: movieId
            }
        }
    })

    if (!existingEntry) {
        throw new Error("Movie is not in the watchlist")
    }
    
    await prisma.movieWatchlist.delete({
        where: {
            userId_movieId: {
                userId: userId,
                movieId: movieId
            }
        }
    })
}
