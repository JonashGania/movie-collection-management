import { useParams } from "react-router-dom"
import { getMovieDetails } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock, Star, PlusIcon } from "lucide-react";
import { formatYear } from "@/utils/formatYear";
import { Link } from "react-router-dom";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";

const MovieDetailsPage = () => {
    const { movieId } = useParams<{movieId: string}>();

    const {data, isLoading, isError} = useQuery({
        queryKey: ['movieDetails', movieId],
        queryFn: () => getMovieDetails(movieId),
        enabled: !!movieId
    })

    if (!data) {
        return <h2>No details</h2>
    }

    return (
        <section className="max-w-7xl mx-auto w-full pt-12 px-4 ">
            <div className="flex justify-between gap-4">
                <div>
                    <h1 className="text-white text-4xl pb-2">{data.title}</h1>
                    <ul className="flex items-center">
                        <li className="flex items-center gap-2 pr-2">
                            <CalendarDays className="h-4 w-4" color="#67e8f9"/>
                            <span className="text-white">{formatYear(data.release_date)}</span>
                        </li>
                        <li className="flex items-center pl-2 gap-2 border-l-2 border-zinc-600 ">
                            <Clock className="h-4 w-4" color="#67e8f9"/>
                            <span className="text-white">{data.duration} mins</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="flex flex-col justify-center">
                        <h4 className="text-zinc-400 font-semibold">IMDb RATING</h4>
                        <div className="flex items-center gap-2">
                            <Star className="h-7 w-7" fill="#FDE047" strokeWidth={0}/>
                            <h3 className="text-zinc-400">
                                <span className="text-white text-xl font-semibold">{data.rating}</span>
                                /10
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap w-full pt-4 gap-8">
                <div className="w-[25%] relative">
                    <img 
                        src={`${data.poster_url}`} 
                        alt={`${data.title} poster`} 
                        className="w-full max-h-[420px] rounded-md"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 pb-2">
                            {data.genres.map((genre) => (
                                <Link
                                    to={`/genres/${genre.genreSlug}`}
                                    key={genre.genreId} 
                                    className="text-cyan-500 font-medium px-4 py-1 bg-[rgba(90,115,146,0.2)] rounded-2xl"
                                >
                                    {genre.genreName}
                                </Link>
                            ))}
                        </div>
                        <p className="text-white pb-3">{data.description}</p>
                        <div className="flex items-center py-3 border border-l-transparent border-r-transparent border-t-zinc-600 border-b-zinc-600">
                            <span className="text-white font-semibold">Director</span>
                            <ul className="flex items-center">
                                {data.directors.map((director, index) => (
                                    <li key={index} className="pl-2 text-yellow-400 font-medium ">{director}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center py-3 border border-l-transparent border-r-transparent border-transparent border-b-zinc-600">
                            <span className="text-white font-semibold">Stars</span>
                            <ul className="flex items-center">
                                {data.actors.map((actor, index) => (
                                    <li key={index} className="pl-2 text-yellow-400 font-medium ">{actor}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-3 bg-cyan-700 hover:bg-cyan-600 px-6 py-2 rounded-3xl">
                            <PlusIcon className="h-5 w-5" color="#fff"/>
                            <span className="text-white">Add to Watchlist</span>
                        </button>
                        <EditButton />
                        <DeleteButton movieId={movieId}/>
                    </div>
                </div>
            </div>
        </ section>
    )
}

export default MovieDetailsPage