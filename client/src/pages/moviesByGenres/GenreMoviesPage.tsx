import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { getAllMoviesbyGenre } from "@/api"
import { Helmet } from "react-helmet-async"
import MovieWrapper from "@/components/MovieWrapper"
import NewMovieButton from "@/components/NewMovieButton"

const GenreMoviesPage = () => {
    const { genreId } = useParams<{ genreId: string }>();
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['genreMovies', genreId],
        queryFn: () => getAllMoviesbyGenre(genreId),
        enabled: !!genreId,
        retry: 1,
        retryDelay: 1000,
        meta: { navigate }
    })


    return (
        <>
            <Helmet>
                <title>{`${data?.genre }`} - Genre</title>
                <meta name="description" content={`Check out these ${data?.genre} movies`}/>
            </Helmet>
            <section className="max-w-7xl mx-auto w-full px-4 pb-12">
                <div className="pt-12">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-12">
                        <div className="mb-4 sm:mb-0">
                            <div className="flex items-center">
                                <div className="w-[5px] h-8 bg-cyan-300 rounded-lg"></div>
                                <h1 className="font-bold text-2xl pl-2 text-white">Popular movies</h1>
                            </div>
                            <h4 className="text-zinc-400 pt-2 font-medium text-lg">Trending in {data?.genre} movies</h4>           
                        </div>
                        <NewMovieButton />
                    </div>
                    {data && (
                        data.movies.length === 0 ? (
                            <p className="text-white text-xl text-center">No movies available in this genre.</p>
                        ) : (
                            <MovieWrapper movies={data}/>
                        )
                    )}
                </div>
            </section>
        </>

    )
}

export default GenreMoviesPage