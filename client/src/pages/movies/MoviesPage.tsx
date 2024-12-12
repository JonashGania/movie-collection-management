import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getAllMovies } from "../../api";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import MovieWrapper from "../../components/MovieWrapper";
import PaginationComponent from "@/components/PaginationComponent";

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
        <section className="max-w-7xl mx-auto px-4 pb-12">
            <div className="pt-12">
                <div className="movies-header flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-[5px] h-10 bg-cyan-300 rounded-lg"></div>
                        <h1 className="font-bold text-4xl pl-4 text-white">All Movies</h1>
                    </div>
                    <Button className="bg-transparent border border-gray-400 text-lg py-5">
                        <Link to={'/add-movie'} className="flex items-center gap-2">
                            <PlusIcon/>
                            New movie
                        </Link>
                    </Button>
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