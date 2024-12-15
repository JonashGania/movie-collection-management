import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getAllMoviesbyGenre } from "@/api"
import MovieWrapper from "@/components/MovieWrapper"
import NewMovieButton from "@/components/NewMovieButton"

const GenreMoviesPage = () => {
    const { genreId } = useParams<{ genreId: string }>();

    const { data } = useQuery({
        queryKey: ['genreMovies', genreId],
        queryFn: () => getAllMoviesbyGenre(genreId),
        enabled: !!genreId
    })

    return (
        <section className="max-w-7xl mx-auto w-full px-4 pb-12">
            <div className="pt-12">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="w-[5px] h-8 bg-cyan-300 rounded-lg"></div>
                        <h1 className="font-bold text-2xl pl-2 text-white">Popular movies</h1>
                    </div>
                    <NewMovieButton />
                </div>
                <h4 className="text-zinc-400 pt-2 font-medium text-lg mb-12">Trending in {data?.genre} movies</h4>
                {!data ? (
                    <p className="text-white text-xl text-center">No movies available in this genre.</p>
                ) :  (
                    <MovieWrapper movies={data}/>
                )}
            </div>
        </section>
    )
}

export default GenreMoviesPage