import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getAllMovies } from "../../api";
import MovieWrapper from "../../components/MovieWrapper";
import PaginationComponent from "@/components/PaginationComponent";
import NewMovieButton from "@/components/NewMovieButton";

const MoviesPage = () => {
    const [page, setPage] = useState(1);

    const {data, isError, isLoading} = useQuery({
        queryKey: ['movies', page],
        queryFn: () => getAllMovies(String(page))
    })

    if (isLoading) {
        return (
            <div>Loading</div>
        )
    }

    if (isError) {
        return (
            <div>Error</div>
        )
    }

    return (
        <section className="max-w-7xl w-full mx-auto px-4 pb-12">
            <div className="pt-12">
                <div className="movies-header flex justify-between flex-col sm:flex-row gap-4">
                    <div className="flex items-center">
                        <div className="w-[5px] h-8 sm:h-10 bg-cyan-300 rounded-lg"></div>
                        <h1 className="font-bold text-2xl sm:text-4xl pl-4 text-white">All Movies</h1>
                    </div>
                    <NewMovieButton />
                </div>
                {data && (
                    <>
                        <MovieWrapper movies={data}/>
                        <PaginationComponent 
                            totalPages={data.totalPages} 
                            currentPage={page} 
                            onPageChange={setPage}
                        />
                    </>
                )}
            </div>
        </section>
    )
}

export default MoviesPage