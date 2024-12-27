import { useQuery } from "@tanstack/react-query"
import { getAllMovies } from "../../api";
import { Skeleton } from "@/components/ui/skeleton";
import MovieWrapper from "../../components/MovieWrapper";
import PaginationComponent from "@/components/PaginationComponent";
import NewMovieButton from "@/components/NewMovieButton";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);

    const {data, isLoading} = useQuery({
        queryKey: ['movies', page],
        queryFn: () => getAllMovies(String(page))
    })

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
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
                {isLoading ? (
                    <div className="skeleton-movies-wrapper pt-8">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={index} className="w-full h-[450px] round-md bg-zinc-800"/>
                        ))}
                    </div>
                ) : (
                    data && (
                        <>
                            <MovieWrapper movies={data}/>
                            <PaginationComponent 
                                totalPages={data.totalPages} 
                                currentPage={page} 
                                onPageChange={handlePageChange}
                            />
                        </>
                    )
                )}
            </div>
        </section>
    )
}

export default MoviesPage