import { useNavigate, useParams } from "react-router-dom"
import { getMovieDetails } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock, Star, PlusIcon, Check } from "lucide-react";
import {OrbitProgress} from 'react-loading-indicators'
import { formatYear } from "@/utils/formatYear";
import { formatDate } from "@/utils/formatDate";
import { Link } from "react-router-dom";
import { useWatchlist } from "@/context/WatchlistContext";
import { Helmet } from "react-helmet-async";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import SkeletonDetailsPage from "@/components/SkeletonDetailsPage";


const MovieDetailsPage = () => {
    const { movieId } = useParams<{movieId: string}>();
    const { watchlist, addMovieToWatchlist, removeMovieFromWatchlist, isAdding } = useWatchlist();
    const navigate = useNavigate();
    
    const {data, isLoading} = useQuery({
        queryKey: ['movieDetails', movieId],
        queryFn: () => getMovieDetails(movieId),
        enabled: !!movieId,
        retry: 1,
        retryDelay: 1000,
        meta: { navigate }
    })
    

    const movieData = data ? {
            ...data,
            releaseDate: formatDate(data.releaseDate),
            genres: data.genres.map((genre: {id: string }) => genre.id),
            actors: data.actors.map((actor: { actorName: string }) => actor.actorName),
            directors: data.directors.map((director: { directorName: string }) => director.directorName)
        }
    : undefined;


    if (!data) {
        return <h2>No details</h2>
    }

    const isInWatchlist = watchlist?.watchlist.some((item) => item.id === data.id);
    const isAddingMovie = isAdding(data.id);

    const handleWatchlistClick = () => {
        if (isInWatchlist) {
            removeMovieFromWatchlist(data.id)
        } else {
            addMovieToWatchlist(data.id)
        }
    }

    return (
        <>
            <Helmet>
                <title>{`${data.title} (${formatYear(data.releaseDate)})`}</title>
                <meta name="description" content={`${data.description}`}/>
            </Helmet>
            <section className="max-w-7xl mx-auto w-full py-12 px-4">
                {isLoading ? (
                    <SkeletonDetailsPage />
                ) : (
                    <>
                        <div className="flex justify-between gap-8">
                            <div>
                                <h1 className="text-white text-2xl sm:text-4xl pb-2">{data.title}</h1>
                                <ul className="flex items-center">
                                    <li className="flex items-center gap-2 pr-2">
                                        <CalendarDays className="h-4 w-4" color="#67e8f9"/>
                                        <span className="text-white">{formatYear(data.releaseDate)}</span>
                                    </li>
                                    <li className="flex items-center pl-2 gap-2 border-l-2 border-zinc-600 ">
                                        <Clock className="h-4 w-4" color="#67e8f9"/>
                                        <span className="text-white">{data.duration} mins</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="hidden sm:block min-w-[105px]">
                                <div className="flex flex-col justify-center w-full">
                                    <h4 className="text-zinc-400 text-sm sm:text-base font-semibold">IMDb RATING</h4>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-7 w-7" fill="#FDE047" strokeWidth={0}/>
                                        <h3 className="text-zinc-400">
                                            <span className="text-white text-lg sm:text-xl font-semibold">{data.rating}</span>
                                            /10
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full pt-4 gap-4">
                            <div className="w-[25%] min-w-[100px] sm:min-w-[150px] relative">
                                {data.movieImages.posterUrl !== 'N/A' ? (
                                    <img 
                                        src={`${data.movieImages.posterUrl}`} 
                                        alt={`${data.title} poster`} 
                                        className="w-full max-h-[420px] rounded-md"
                                    />
                                ) : (
                                    <img 
                                        src="/blank-poster.jpg" 
                                        alt="blank poster image" 
                                        className="w-full max-h-[420px] rounded-md object-cover"
                                    />
                                )}

                            </div>
                            <div className="flex-grow flex flex-col justify-between gap-4">
                                <div>
                                    <div className="flex items-center flex-wrap gap-2 sm:gap-4 pb-2">
                                        {data.genres.map((genre) => (
                                            <Link
                                                to={`/genres/${genre.slug}`}
                                                key={genre.id} 
                                                className="text-cyan-500 font-medium px-4 py-1 text-sm sm:text-base bg-[rgba(90,115,146,0.2)] rounded-2xl"
                                            >
                                                {genre.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <p className="text-white pb-3 hidden sm:block">{data.description}</p>
                                    <div className="hidden sm:flex flex-wrap py-3 border border-l-transparent border-r-transparent border-t-zinc-600 border-b-zinc-600">
                                        <span className="text-white font-semibold">Director</span>
                                        <ul className="flex items-center">
                                            {data.directors.map((director) => (
                                                <li key={director.id} className="pl-2 text-yellow-400 font-medium ">{director.directorName}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="hidden sm:flex gap-2 py-3 border border-l-transparent border-r-transparent border-transparent border-b-zinc-600">
                                        <span className="text-white font-semibold">Stars</span>
                                        <ul className="flex items-center flex-wrap">
                                            {data.actors.map((actor) => (
                                                <li key={actor.id} className="pl-2 text-yellow-400 font-medium ">{actor.actorName}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex sm:hidden items-center gap-2">
                                        <Star className="h-7 w-7" fill="#FDE047" strokeWidth={0}/>
                                        <h3 className="text-zinc-400">
                                            <span className="text-white text-lg sm:text-xl font-semibold">{data.rating}</span>
                                            /10
                                        </h3>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2">
                                    <button 
                                        onClick={handleWatchlistClick}
                                        className="flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-600 px-6 py-2 rounded-3xl w-[195px]"
                                    >
                                        {isAddingMovie ? (
                                            <OrbitProgress color="#ffffff" style={{ fontSize: "4px" }}/>
                                        ) : (
                                            <>
                                                {isInWatchlist ? (
                                                    <>
                                                    <Check className="h-6 w-5" color="#ffffff"/>
                                                    <span className="text-white">In Watchlist</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <PlusIcon className="h-6 w-5" color="#ffffff"/>
                                                        <span className="text-white">Add to Watchlist</span>
                                                    </>
                                                )}
                                                
                                            </>
                                        )}
                                    </button>
                                    <EditButton movieData={movieData} movieId={movieId}/>
                                    <DeleteButton movieId={movieId}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex sm:hidden flex-col pt-4">
                            <p className="text-white pb-3">{data.description}</p>
                            <div className="flex flex-wrap py-3 border border-l-transparent border-r-transparent border-t-zinc-600 border-b-zinc-600">
                                <span className="text-white font-semibold">Director</span>
                                <ul className="flex items-center">
                                    {data.directors.map((director) => (
                                        <li key={director.id} className="pl-2 text-yellow-400 font-medium ">{director.directorName}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex gap-2 py-3 border border-l-transparent border-r-transparent border-transparent border-b-zinc-600">
                                <span className="text-white font-semibold">Stars</span>
                                <ul className="flex items-center flex-wrap">
                                    {data.actors.map((actor) => (
                                        <li key={actor.id} className="pl-2 text-yellow-400 font-medium ">{actor.actorName}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex items-center gap-2 pt-4">
                                <button 
                                    onClick={handleWatchlistClick}
                                    className="flex items-center justify-center gap-2 bg-cyan-700 hover:bg-cyan-600 px-4 py-1 rounded-3xl"
                                >
                                    {isAddingMovie ? (
                                        <OrbitProgress color="#ffffff" style={{ fontSize: "4px" }}/>
                                    ) : (
                                        <>
                                            {isInWatchlist ? (
                                                <>
                                                    <Check className="h-6 w-5" color="#ffffff"/>
                                                    <span className="text-white">Watchlist</span>
                                                </>
                                            ) : (
                                                <>
                                                    <PlusIcon className="h-6 w-5" color="#ffffff"/>
                                                    <span className="text-white">Watchlist</span>
                                                </>
                                            )}
                                            
                                        </>
                                    )}
                                </button>
                                <EditButton movieData={movieData} movieId={movieId}/>
                                <DeleteButton movieId={movieId}/>
                            </div>
                        </div>
                    </>
                )}
            </ section>
        </>

    )
}

export default MovieDetailsPage