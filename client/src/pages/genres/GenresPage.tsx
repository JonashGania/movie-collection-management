import { useQuery } from "@tanstack/react-query"
import { getAllGenres } from "@/api"
import GenresWrapper from "./GenresWrapper"

const GenresPage = () => {

    const {data} = useQuery({
        queryKey: ['genres'],
        queryFn: () => getAllGenres() 
    })

    return (
        <section className="max-w-7xl mx-auto w-full px-4 pb-12">
            <div className="pt-12">
                <div className="genre-header flex items-center">
                    <div className="w-[5px] h-10 bg-cyan-300 rounded-lg"></div>
                    <h1 className="font-bold text-4xl pl-4 text-white">Genres</h1>
                </div>
                {data && (
                    <GenresWrapper genres={data}/>
                )}
            </div>
        </section>
    )
}

export default GenresPage