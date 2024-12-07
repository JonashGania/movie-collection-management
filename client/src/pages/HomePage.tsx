import { useQuery } from "@tanstack/react-query"
import { getAllMovies } from "../api"
import { useEffect, useState } from "react"

const HomePage = () => {
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            const allMovies = await getAllMovies(String(page))
            console.log(allMovies);
        }

        fetchMovies();
    }, [page])

    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['movies', page],
    //     queryFn: () => getAllMovies(String(page))
    // })

    return (
        <section className="">
           
        </section>
    )
}

export default HomePage