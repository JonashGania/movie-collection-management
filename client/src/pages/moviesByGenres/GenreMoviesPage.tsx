import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getAllMoviesbyGenre } from "@/api"
import MovieWrapper from "@/components/MovieWrapper"

const GenreMoviesPage = () => {
    const { genreId } = useParams<{ genreId: string }>();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['genreMovies', genreId],
        queryFn: () => getAllMoviesbyGenre(genreId),
        enabled: !!genreId
    })

    console.log(data)

    return (
        <section className="max-w-7xl mx-auto w-full px-4 pb-12">
            <div className="pt-12">
                <div className="flex items-center">
                    <div className="w-[5px] h-8 bg-cyan-300 rounded-lg"></div>
                    <h1 className="font-bold text-2xl pl-2 text-white">Popular movies</h1>
                </div>
                <h4 className="text-zinc-400 pt-2 font-medium text-lg">Trending in {data?.genre} movies</h4>
                {!data ? (
                    <p>No movies available in this genre</p>
                ) :  (
                    <MovieWrapper movies={data}/>
                )}
            </div>
        </section>
    )
}

export default GenreMoviesPage