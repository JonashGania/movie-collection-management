import { prisma } from "../config/prismaClient.js";
import { formatTitle } from "../utils/formatTitle.js";
import axios from "axios";


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